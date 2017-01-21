let words = require('./js/wordCtrl');

exports.getWords = (req,res) => {
	words.getWords(function(wds){
		res.json(wds);
	});
};

exports.getSelectWords = (req,res) => {
	var wordsSelect = req.body;
	console.log(wordsSelect);
	words.getSelectWords(wordsSelect,function(wds){
		res.json(wds);
	});
};

exports.saveWord = (req,res) => {
	var dados = req.body;
	words.saveWord(dados,function(result){
		res.json(result);
	});
};

exports.deleteWord = (req,res) => {
	let id = req.params.id;
	words.deleteWord(id,function(result){
		res.json(result);
	});
};

exports.updateWord = (req,res) => {
	let dados = req.body;
	words.updateWord(dados,function(result){
		res.json(result);
	});
};

/*
	Verbs irregular
*/

exports.getVerbs = function(req, res){
	words.getVerbs(function(result){
		res.json(result);
	});
};

exports.saveVerb = function(req,res){
	let dados = req.body;
	words.saveVerb(dados,function(result){
		res.json(result);
	});
};

exports.updateVerb = function(req,res){
	let dados = req.body;
	words.updateVerb(dados,function(result){
		res.json(result);
	});
};