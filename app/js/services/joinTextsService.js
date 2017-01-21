angular.module('proplus').factory('joinTextsService',function(httpAPI){

	/*
		Dividir o texto em frases
	*/
	let _getPhrasesText = function(titulo,callback){
		httpAPI.getContents().then(function(result){
			let objTexts = result.data;

			let text = objTexts.filter(function(elemento){
				return elemento.titulo === titulo;
			});

			let phrasesPT = [];
			text[0].texto.split('\n').forEach(function(item){
				phrasesPT.push(item);
			});

			let trad = [];
			text[0].traducao.split('\n').forEach(function(item){
				if(item){
					trad.push('@'+item);
				}else{
					trad.push("");
				}
			});

			let phrases = [];
			for(let i=0; i<phrasesPT.length; i++){
				phrases.push(phrasesPT[i]);
				phrases.push('\n');
				if(trad[i]){
					phrases.push(trad[i]);
					phrases.push('\n');
				}else{
					phrases.push("");
				}
			};

			callback(phrases);

		},function(error){
			console.log(error);
		});
	};

	let _getTitleText = function(callback){
		httpAPI.getContents().then(function(result){
			let objs = result.data;

			let titles = objs.map(function(item){
				return {
					titulo:item.titulo
				}
			});
			callback(titles);

		},function(error){
			console.log(error);
		});
	};

	return {
		getPhrasesText: _getPhrasesText,
		getTitleText: _getTitleText
	}
});