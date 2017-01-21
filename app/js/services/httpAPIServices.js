angular.module('proplus').factory('httpAPI',function($http){

	let _getWords = function(){
		return $http.get('http://localhost:3000/words');
	};

	let _getSelectWords = function(value){
		return $http.post('http://localhost:3000/wordsselect',value);
	};

	let _getContents = function(){
		return $http.get('http://localhost:3000/contents');
	}

	let _getOneContent = function(value){
		return $http.get('http://localhost:3000/content/'+value);
	}

	let _saveText = function(value){
		return $http.post('http://localhost:3000/savetext',value);
	}

	let _removeText = function(id){
		return $http.get('http://localhost:3000/deletetext/'+id);
	};

	let _alterarText = function(value){
		return $http.post('http://localhost:3000/updatetext',value)
	};

	let _saveWord = function(value){
		return $http.post('http://localhost:3000/saveword',value);
	};

	let _removeWord = function(id){
		return $http.get('http://localhost:3000/deleteword/'+id);
	};

	let _updateWord = function(value){
		return $http.post('http://localhost:3000/updateword',value);
	};

	let _getListVerbs = function(){
		return $http.get('http://localhost:3000/listverbs');
	};

	let _saveVerb = function(value){
		return $http.post('http://localhost:3000/saveverb',value);
	};

	let _updateVerb = function(value){
		return $http.post('http://localhost:3000/updateverb',value);
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