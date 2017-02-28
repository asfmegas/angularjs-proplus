angular.module('proplus').factory('httpAPI',function($http,config){

	let _getWords = function(){
		return $http.get(config.BASE_URL+'/words');
	};

	let _getSelectWords = function(value){
		return $http.post(config.BASE_URL+'/wordsselect',value);
	};

	let _getContents = function(){
		return $http.get(config.BASE_URL+'/contents');
	}

	let _getOneContent = function(value){
		return $http.get(config.BASE_URL+'/content/'+value);
	}

	let _saveText = function(value){
		return $http.post(config.BASE_URL+'/savetext',value);
	}

	let _removeText = function(id){
		return $http.get(config.BASE_URL+'/deletetext/'+id);
	};

	let _alterarText = function(value){
		return $http.post(config.BASE_URL+'/updatetext',value)
	};

	let _saveWord = function(value){
		return $http.post(config.BASE_URL+'/saveword',value);
	};

	let _removeWord = function(id){
		return $http.get(config.BASE_URL+'/deleteword/'+id);
	};

	let _updateWord = function(value){
		return $http.post(config.BASE_URL+'/updateword',value);
	};

	let _getListVerbs = function(){
		return $http.get(config.BASE_URL+'/listverbs');
	};

	let _saveVerb = function(value){
		return $http.post(config.BASE_URL+'/saveverb',value);
	};

	let _updateVerb = function(value){
		return $http.post(config.BASE_URL+'/updateverb',value);
	};

	return {
		getWords: _getWords,
		saveWord: _saveWord,
		getSelectWords: _getSelectWords,
		removeWord: _removeWord,
		updateWord: _updateWord,
		getContents: _getContents,
		getOneContent: _getOneContent,
		saveText: _saveText,
		removeText: _removeText,
		alterarText: _alterarText,
		getListVerbs: _getListVerbs,
		saveVerb: _saveVerb,
		updateVerb: _updateVerb
	}
});