angular.module('proplus').controller('homeCtrl',function($scope,httpAPI){
	$scope.opcaoTexto = [
		{tipo:"Música"},
		{tipo:"Artigo"}];
	$scope.valueButton = "<<";
	$scope.valueButtonSearch = "<<";
	$scope.buttonSimpleVisible = false;
	$scope.buttonSearchVisible = false;
	
	$scope.corFrame1 = "cor-padrao1";
	$scope.corFrame2 = "cor-padrao2";
	$scope.corFrame4 = "cor-padrao4";

	$scope.corPadrao = function(){
		$scope.corFrame1 = "cor-padrao1";
		$scope.corFrame2 = "cor-padrao2";
		$scope.corFrame4 = "cor-padrao4";
	};

	$scope.corSuave = function(){
		$scope.corFrame1 = "cor-suave1";
		$scope.corFrame2 = "cor-suave2";
		$scope.corFrame4 = "cor-suave4";
	};

	$scope.corQuente = function(){
		$scope.corFrame1 = "cor-quente1";
		$scope.corFrame2 = "cor-quente2";
		$scope.corFrame4 = "cor-quente4";
	};


	$scope.exibirPrincipal = function(){
		$scope.buttonSimpleVisible = false;
		$scope.buttonSearchVisible = false;
		$scope.visibilidadeTexto = false;
		$scope.visibilidadePalavras = false;
		$scope.isVisibleAudio = true;
		$scope.framePrincipal = !$scope.framePrincipal;
	};

	$scope.limparCampos = function(value){
		if(valueBoolean) return value;
		return "";
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

	let ocultarSimples = function(){
		$scope.isVisibleSimple = false;
		if($scope.isVisibleSimple){
			$scope.valueButton = ">>";
		}else{
			$scope.valueButton = "<<";
		};
	};

	$scope.ocultarExibirSearch = function(){
		$scope.isVisibleSearch = !$scope.isVisibleSearch;
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
			$scope.palavras = result;
		});
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
	}

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
		console.log("janela");
		$scope.windowWord = !$scope.windowWord;
	};

	$scope.openText = function(dados){
		$scope.buttonSimpleVisible = true;
		$scope.buttonSearchVisible = true;
		ativarBotoes(false);
		carregarTexto();
		carregarMusica(dados.titulo);
		$scope.dadosTexto = dados;
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