angular.module('proplus').controller('homeCtrl',function($scope,httpAPI){
	$scope.opcaoTexto = [
		{tipo:"Música"},
		{tipo:"Artigo"}];
	$scope.valueButton = "<<";
	$scope.valueButtonSearch = "<<";
	$scope.buttonSimpleVisible = false;
	$scope.buttonSearchVisible = false;
	$scope.proplusLogo = "proplus";
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

	$scope.exibirResultado = function(){
		console.log("pesquisar");
	};

	// Configuração de palavra
	$scope.exibirPalavras = function(){
		carregarPalavras();
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		ocultarSimples();
		ocultarExibirSearch();
		$scope.framePrincipal = false;
		$scope.visibilidadeTexto = false;
		$scope.isVisibleAudio = false;
		$scope.visibilidadePalavras = !$scope.visibilidadePalavras;
	};

	$scope.ocultarExibirSimples = function(){
		$scope.isVisibleSimple = !$scope.isVisibleSimple;
		if($scope.isVisibleSimple){
			$scope.valueButton = ">>";
		}else{
			$scope.valueButton = "<<";
		};
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
		if($scope.isVisibleSimple){
			$scope.valueButton = ">>";
		}else{
			$scope.valueButton = "<<";
		};
	};

	$scope.ocultarExibirSearch = function(value){
		if(!value){
			$scope.isVisibleSearch = value;
		}else{
			$scope.isVisibleSearch = !$scope.isVisibleSearch;
		};
		carregarPalavras();
		if($scope.isVisibleSearch){
			$scope.valueButtonSearch = ">>";
		}else{
			$scope.valueButtonSearch = "<<";
		};
	};

	let ocultarExibirSearch = function(){
		$scope.isVisibleSearch = false;
		if($scope.isVisibleSearch){
			$scope.valueButtonSearch = ">>";
		}else{
			$scope.valueButtonSearch = "<<";
		};
	};

		// Obter lista das palavras
	let getListWords = function(callback){
		httpAPI.getWords().then(function(result){
			callback(result.data);
		},function(erro){
			console.log(erro);
		});
	};

	let carregarPalavras = function(){
		getListWords(function(result){
			if(changeSearchRadio){
				$scope.palavras = result;
				$scope.corEspecial = "cor-change-search-disable";
			}else{
				$scope.corEspecial = "cor-change-search-enable";
				$scope.palavras = result.map(function(elemento){
					return {
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

	$scope.buscarUmaPalavra = function(dados){
		$scope.wordEnter = angular.copy(dados);
		delete dados;
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
		httpAPI.saveWord(dados).then(function(result){
			delete $scope.simpleWord;
		},function(error){
			alert("Error ao salvar dados!");
		});
	};

	$scope.removeWord = function(id){
		console.log(id);
		httpAPI.removeWord(id).then(function(result){
			alert("Dados removido com sucesso!");
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

	// Obter lista dos textos
	let getListContents = function(callback){
		httpAPI.getContents().then(function(result){
			callback(result.data);
		},function(error){
			console.log(error);
		});
	};

	// Obter apenas um texto
	let getOneContent = function(param,callback){
		httpAPI.getOneContent(param).then(function(result){
			callback(result.data);
		},function(error){
			console.log(error);
		});
	};

	$scope.removeText = function(id){
		httpAPI.removeText(id).then(function(result){
			alert("Dados apagados com sucesso!");
			buscarTextos();
			delete $scope.dadosTexto;
			carregarConsulta();
			$scope.corAlertaAlteracao = "cor-botao-intacto";
		});
	};

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
			$scope.corAlertaAlteracao = "cor-botao-intacto";
			alterarValor = true;
		},function(error){
			console.log(error);
		});
	}

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
			$scope.corAlertaAlteracao = "cor-botao-intacto";
			alterarValor = true;
		},function(error){
			console.log(error);
		});
	};

	var buscarTextos = function(){
		getListContents(function(result){
			$scope.textos = result;
		});
	};

	$scope.buscarUmTexto = function(id){
		getOneContent(id,function(result){
			$scope.textoSelecionado = result;
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
		carregarMusica(dados.titulo);
		$scope.dadosTexto = dados;
	};

	$scope.verificarAlteracoes = function(dados){
		if(alterarValor){
			conteudoTexto = angular.copy(dados);	
			alterarValor = false;
		};
		
		if(dados){
			if(dados.titulo !== conteudoTexto.titulo){
				$scope.corAlertaAlteracao = "botao-cor-alterado";
			};
			if(dados.texto !== conteudoTexto.texto){
				$scope.corAlertaAlteracao = "botao-cor-alterado";
			};
			if(dados.traducao !== conteudoTexto.traducao){
				$scope.corAlertaAlteracao = "botao-cor-alterado";
			};
			if(dados.tipo !== conteudoTexto.tipo){
				$scope.corAlertaAlteracao = "botao-cor-alterado";
			};
		};
	};

	let carregarMusica = function(musica){
		$scope.tituloMusica = "../musics/"+musica.toLowerCase().replace(/ /g,"_")+".ogg";
	};

	let ativarBotoes = function(value){
		$scope.isValidButton = value;
	};

	$scope.seaOneWord = function(traducao){
		$scope.seaOnlyWord = traducao;
	};

});