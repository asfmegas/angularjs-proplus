let content = require('./js/contentCtrl');

exports.getContents = (req,res) => {
	content.getContents(function(cont){
		res.json(cont);
	});
};

exports.getOneContent = (req,res) => {
	let id = req.params.id;
	content.getOneContent(id,function(cont){
		res.json(cont);
	});
};

exports.saveText = (req,res) => {
	let dados = req.body;
	content.saveText(dados,function(result){
		res.json(result);
	});
};

exports.deleteText = (req,res) => {
	let id = req.params.id;
	content.deleteText(id,function(result){
		res.json(result);
	});
};

exports.updateText = (req,res) => {
	let dados = req.body;
	content.updateText(dados,function(result){
		res.json(result);
	});	
};