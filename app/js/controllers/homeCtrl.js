angular.module('proplus').controller('homeCtrl',function($scope,httpAPI,breakText){
	$scope.opcaoTexto = [
		{tipo:"Música"},
		{tipo:"Artigo"}];
	$scope.valueButton = "<<";
	$scope.valueButtonSearch = "<<";
	$scope.buttonSimpleVisible = false;
	$scope.buttonSearchVisible = false;
	$scope.proplusLogo = "proplus";
	$scope.valueBtnOnlyWords = "Text";
	$scope.valorJanelaUnica = false;
	let changeSearchRadio = true;
	let conteudoTexto = {};
	let alterarValor = true;
	
	$scope.corFrame1 = "cor-padrao1";
	$scope.corFrame2 = "cor-padrao2";
	$scope.corFrame3 = "cor-padrao3";
	$scope.corFrame4 = "cor-padrao4";
	$scope.corFrame5 = "cor-padrao5";
	$scope.corFrame6 = "cor-padrao6";
	$scope.corFrame7 = "cor-padrao7";
	$scope.corFrame8 = "cor-padrao8";
	$scope.corFrame9 = "cor-padrao9";

	$scope.corFonte1 = "font-cor-padrao1";
	$scope.corFonte2 = "font-cor-padrao2";
	$scope.corFonte3 = "font-cor-padrao3";
	$scope.corFonte4 = "font-cor-padrao4";

	$scope.corAlertaAlteracao = "botao-cor-intacto";

	$scope.corPadrao = function(){
		$scope.corFrame1 = "cor-padrao1";
		$scope.corFrame2 = "cor-padrao2";
		$scope.corFrame3 = "cor-padrao3";
		$scope.corFrame4 = "cor-padrao4";
		$scope.corFrame5 = "cor-padrao5";
		$scope.corFrame6 = "cor-padrao6";
		$scope.corFrame7 = "cor-padrao7";
		$scope.corFrame8 = "cor-padrao8";
		$scope.corFrame9 = "cor-padrao9";
		$scope.corFonte1 = "font-cor-padrao1";
		$scope.corFonte2 = "font-cor-padrao2";
		$scope.corFonte3 = "font-cor-padrao3";
		$scope.corFonte4 = "font-cor-padrao4";
	};

	$scope.corSuave = function(){
		$scope.corFrame1 = "cor-suave1";
		$scope.corFrame2 = "cor-suave2";
		$scope.corFrame3 = "cor-suave3";
		$scope.corFrame4 = "cor-suave4";
		$scope.corFrame5 = "cor-suave5";
		$scope.corFrame6 = "cor-suave6";
		$scope.corFrame7 = "cor-suave7";
		$scope.corFrame8 = "cor-suave8";
		$scope.corFrame9 = "cor-suave9";
		$scope.corFonte1 = "font-cor-suave1";
		$scope.corFonte2 = "font-cor-suave2";
		$scope.corFonte3 = "font-cor-suave3";
		$scope.corFonte4 = "font-cor-suave4";
	};

	$scope.corQuente = function(){
		$scope.corFrame1 = "cor-quente1";
		$scope.corFrame2 = "cor-quente2";
		$scope.corFrame3 = "cor-quente3";
		$scope.corFrame4 = "cor-quente4";
		$scope.corFrame5 = "cor-quente5";
		$scope.corFrame6 = "cor-quente6";
		$scope.corFrame7 = "cor-quente7";
		$scope.corFrame8 = "cor-quente8";
		$scope.corFrame9 = "cor-quente9";
		$scope.corFonte1 = "font-cor-quente1";
		$scope.corFonte2 = "font-cor-quente2";
		$scope.corFonte3 = "font-cor-quente3";
		$scope.corFonte4 = "font-cor-quente4";
	};

	$scope.exibirPrincipal = function(){
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		$scope.visibilidadeTexto = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = true;
		$scope.framePrincipal = !$scope.framePrincipal;
	};

	$scope.ampliarLogo = function(){
		$scope.proplusLogo = "proplus-dois";
	};

	$scope.reduzirLogo = function(){
		$scope.proplusLogo = "proplus";
	};

	$scope.limparSeaWord = function(){
		delete $scope.seaWord;
	};

	$scope.limparWordEnter = function(){
		delete $scope.searchWord;
	};

	$scope.limparSearchText = function(){
		delete $scope.searchText;
	};

	// Configuração de palavra
	$scope.exibirPalavras = function(){
		carregarPalavras();
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		$scope.framePrincipal = false;
		$scope.visibilidadeTexto = false;
		$scope.isVisibleAudio = false;
		$scope.visibilidadePalavras = !$scope.visibilidadePalavras;
		ocultarSimples();
		ocultarExibirSearch();
	};

	$scope.ocultarExibirSimples = function(){
		$scope.isVisibleSimple = !$scope.isVisibleSimple;
		if(!$scope.isVisibleSimple) delete $scope.simpleWord;
		getSymbol($scope.isVisibleSimple, function(result){
			$scope.valueButton = result;
		});
	};

	$scope.exibirOcultarJanelaUnica = function(value,dados){
		if(value){
			$scope.valorJanelaUnica = value;
			$scope.janelaUnica = dados;
		}else{
			delete $scope.janelaUnica;
			$scope.valorJanelaUnica = value;
		};
	};

	let ocultarSimples = function(){
		$scope.isVisibleSimple = false;
		getSymbol($scope.isVisibleSimple,function(result){
			$scope.valueButton = result;
		});
	};

	$scope.ocultarExibirSearch = function(value){
		if(!value){
			$scope.isVisibleSearch = value;
		}else{
			$scope.isVisibleSearch = !$scope.isVisibleSearch;
			delete $scope.seaWord;
		};
		if($scope.isVisibleSearch) carregarPalavras();
		getSymbol($scope.isVisibleSearch,function(result){
			$scope.valueButtonSearch = result;
		});
	};

	let ocultarExibirSearch = function(){
		$scope.isVisibleSearch = false;
		delete $scope.seaWord;
		getSymbol($scope.isVisibleSearch, function(result){
			$scope.valueButtonSearch = result;
		});
	};

	/* 
		Função que altera o símbolo dos botões laterais
	*/
	let getSymbol = function(value, callback){
		if(value) return callback(">>");
		return callback("<<");
	};

		// Obter lista das palavras
	let getListWords = function(callback){
		httpAPI.getWords().then(function(result){
			callback(result.data);
		},function(erro){
			console.log(erro);
		});
	};

	$scope.buscarUmaPalavra = function(dados){
		$scope.wordEnter = angular.copy(dados);
		delete dados;
	};

	let carregarPalavras = function(){
		getListWords(function(result){
			if(changeSearchRadio){
				$scope.palavras = result;
				console.log("Quantidade de palavras: "+result.length);
				$scope.corEspecial = "cor-change-search-disable";
			}else{
				$scope.corEspecial = "cor-change-search-enable";
				$scope.palavras = result.map(function(elemento){
					return {
						_id: elemento._id,
						nome:elemento.nome,
						traducao: elemento.traducao,
						tipo: elemento.tipo
					}
				});
			};
		});
	};

	$scope.changeSearch = function(){
		changeSearchRadio = !changeSearchRadio;
		carregarPalavras();
	};

	$scope.saveWord = function(dados){
		dados.origem = "desconhecida";
		httpAPI.saveWord(dados).then(function(result){
			alert("Salvo com sucesso!");
			carregarPalavras();
			delete $scope.dadosWord;
		},function(error){
			alert("Error ao salvar dados!");
		});
	};

	$scope.saveWordSimple = function(dados,origem){
		dados.tipo = "Palavra";
		dados.origem = origem;
		dados.nome = dados.nome.toLowerCase();
		dados.traducao = dados.traducao.toLowerCase();

		httpAPI.saveWord(dados).then(function(result){
			delete $scope.simpleWord;
		},function(error){
			alert("Error ao salvar dados!");
		});
	};

	$scope.removeWord = function(id){
		httpAPI.removeWord(id).then(function(result){
			alert("Dados removidos com sucesso!");
			delete $scope.wordEnter;
			carregarPalavras();
		},function(error){
			console.log(error);
		});
	};

	$scope.alterarPalavra = function(dados){
		if(!dados.origem) dados.origem = "desconhecida";
		httpAPI.updateWord(dados).then(function(result){
			alert("Dados alterado com sucesso!");
			carregarPalavras();
		},function(error){
			console.log(error);
		});
	};

	$scope.getWordsSelected = function(){
		getListContents(function(result){
			$scope.textoSelecionado = result;
		});
	};

	$scope.newWord = function(){
		delete $scope.wordEnter;
		delete $scope.typeGroup;
	};	

	// Configuração de texto
	$scope.exibirTexto = function(){
		buscarTextos();
		ocultarSimples();
		ocultarExibirSearch();
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		$scope.framePrincipal = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = false;
		$scope.visibilidadeTexto = !$scope.visibilidadeTexto;
	};

	$scope.novoTexto = function(value){
		$scope.isValidButton = value;
		ocultarSimples();
		ocultarExibirSearch();
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		carregarTextoMenu(value);
		delete $scope.dadosTexto;
	};

	
	let carregarTexto = function(){
		$scope.visibilidadeTexto = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = true;
		$scope.framePrincipal = !$scope.framePrincipal;
	};

	let carregarTextoMenu = function(value){
		$scope.visibilidadeTexto = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = false;
		$scope.framePrincipal = value;
	};

	let carregarConsulta = function(){
		$scope.framePrincipal = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = false;
		$scope.visibilidadeTexto = !$scope.visibilidadeTexto;
	};

	/*
		Obtem os dados texto do banco
	*/
	let getListContents = function(callback){
		httpAPI.getContents().then(function(result){
			callback(result.data);
		},function(error){
			console.log(error);
		});
	};

	/*
		Função desnecessário que atua chamando a função getListContents
		e levar os dados ao scope para exibição
	*/
	var buscarTextos = function(){
		getListContents(function(result){
			$scope.textos = result;
			console.log("Qunatidade de textos: "+result.length);
		});
	};

	/*
		Remove dados do banco de dados texto
	*/
	$scope.removeText = function(id){
		httpAPI.removeText(id).then(function(result){
			alert("Dados apagados com sucesso!");
			buscarTextos();
			delete $scope.dadosTexto;
			carregarConsulta();
			$scope.corAlertaAlteracao = "cor-botao-intacto";
		});
	};


	/*
		Armazena os dados no banco de dados texto
	*/
	$scope.saveText = function(dados,novosDados){
		if(!novosDados){
			novosDados = dados;
			novosDados._id = undefined;
		}else{
			if(!novosDados.titulo) novosDados.titulo = dados.titulo;
			if(!novosDados.texto) novosDados.texto = dados.texto;
			if(!novosDados.traducao) novosDados.traducao = dados.traducao;
			if(!novosDados.tipo) novosDados.tipo = dados.tipo;
		};

		httpAPI.saveText(novosDados).then(function(result){
			alert("Dados salvos com sucesso!");
			buscarTextos();
			delete $scope.dados;
			alterarValor = true;
			$scope.corAlertaAlteracao = "cor-botao-intacto";
		},function(error){
			console.log(error);
		});
	}

	/*
		Realiza alterações no banco dos dados texto
	*/
	$scope.alterarText = function(dados,novosDados){
		if(!novosDados){
			novosDados = dados;
		}else{
			if(!novosDados.titulo) novosDados.titulo = dados.titulo;
			if(!novosDados.texto) novosDados.texto = dados.texto;
			if(!novosDados.id) novosDados.id = dados._id;
			if(!novosDados.traducao) novosDados.traducao = dados.traducao;
		};
		httpAPI.alterarText(novosDados).then(function(result){
			alert('Dados alterados com sucesso!');
			buscarTextos();
			alterarValor = true;
			$scope.corAlertaAlteracao = "cor-botao-intacto";
		},function(error){
			console.log(error);
		});
	};

	$scope.ocultarJanela = function(){
		$scope.windowWord = !$scope.windowWord;
	};

	$scope.openText = function(dados){
		alterarValor = true;
		$scope.corAlertaAlteracao = "botao-cor-intacto";
		$scope.buttonSimpleVisible = true;	
		$scope.buttonSearchVisible = true;
		ativarBotoes(false);
		carregarTexto();
		if($scope.onlyWords) dados.texto = breakText.getBreakText(dados.texto);
		$scope.dadosTexto = dados;
	};

	/*
		Verificar se houve alterações no documento texto. Caso ocorrida alguma alteração
		é trocada a class da barra de botões tornando-a vermelha.
	*/
	$scope.verificarAlteracoes = function(dados){
		let copiaDados = angular.copy(dados);
		/*
			Teste que verifica a necessidade de renovar o valor da variável conteudoTexto
			isso ocorre quando é salvo a alteração e é precico atualizar o valor desse objeto
			para que volte a se igualar com os dados exibidos
		*/
		if(alterarValor){
			// Guarda o valor inicial dos dados obtidos do banco
			conteudoTexto = angular.copy(dados);	
			alterarValor = false;
		};
		
		/*
			O primeiro if verifica se o objeto não é undefined.
			O segundo if verifica se o objeto possui um id.
			O terceiro if verifica se ocorreu alguma alteração entre os dados do banco e os exibidos
		*/
		if(copiaDados){
			if(copiaDados._id){
				if(copiaDados.titulo !== conteudoTexto.titulo){
					$scope.corAlertaAlteracao = "botao-cor-alterado";
				};
				if(copiaDados.texto !== conteudoTexto.texto){
					$scope.corAlertaAlteracao = "botao-cor-alterado";
				};
				if(copiaDados.traducao !== conteudoTexto.traducao){
					$scope.corAlertaAlteracao = "botao-cor-alterado";
				};
				if(copiaDados.tipo !== conteudoTexto.tipo){
					$scope.corAlertaAlteracao = "botao-cor-alterado";
				};
			};
		};
	};

	let ativarBotoes = function(value){
		$scope.isValidButton = value;
	};

	$scope.seaOneWord = function(traducao){
		$scope.seaOnlyWord = traducao;
	};

	$scope.btnOnlyWordsFn = function(){
		$scope.onlyWords = !$scope.onlyWords;
		if($scope.onlyWords){
			$scope.valueBtnOnlyWords = "Only Words";
		}else{
			$scope.valueBtnOnlyWords = "Text";
		};
	};

});