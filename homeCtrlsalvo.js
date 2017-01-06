angular.module('proplus').controller('homeCtrl',function($scope){


	let texto = "When I find myself in times of trouble \n "+
				"Mother Mary comes to me \n "+
				"Speaking words of wisdom, let it to be. \n "+
				"time";
	$scope.app = texto;

	let arrayWord = [];

	let banco = [
		{word:'time',content:'tempo'},
		{word:'word',content:'palavra'},
		{word:'come',content:'vim'},
		{word:'comes',content:'vinha'},
		{word:'when',content:'quando'},
		{word:'wisdom',content:'tristeza'},
		{word:'times',content:'vezes'},
		{word:'be',content:'ser,está'},
		{word:'play',content:'brincar,jogar'}
	];

	let wordKey = [];

	// Identificar cada palavra do texto
	texto.split(" ").forEach(function(palavra){
		if(palavra !== "\n") arrayWord.push(palavra.replace(/,/,'').replace('.',''));
	});

	arrayWord.forEach(function(item){
		// console.log(banco.word[item]);
	});

	$scope.content = banco;
	// console.log(wordKey);

	$scope.palavrasBD = wordKey;

});