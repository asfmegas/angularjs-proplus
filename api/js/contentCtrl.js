let db = require('../config/configDB');
let val = require('validator');


exports.getContents = (callback) => {
	db.Contents.find(function(error,data){
		if(error) callback(error);
		callback(data);
	});
};

exports.getOneContent = (id,callback) => {
	db.Contents.findOne({'_id':id},function(err,data){
		if(err) callback(err);
		callback(data);
	});
};

exports.saveText = (dados,callback) => {
	dados.createAt = new Date();
	if(!dados.titulo) dados.titulo = val.trim(dados.titulo);
	if(!dados.texto) dados.texto = val.trim(dados.texto);
	if(!dados.tipo) dados.tipo = val.trim(dados.tipo);
	if(!dados.traducao) dados.traducao = val.trim(dados.traducao);
	new db.Contents(dados).save(function(error,text){
		if(error) callback(error);
		callback(text);
	});
};

exports.deleteText = (id,callback) => {
	db.Contents.findById(id,function(error,content){
		if(error) callback(error);
		content.remove(function(error,result){
			if(error) callback(error);
			callback(result);
		});
	});
};

exports.updateText = (dados,callback) => {
	db.Contents.findById(dados._id,function(error,content){
		if(error) callback(error);
		if(content.titulo) content.titulo = dados.titulo;
		if(content.texto) content.texto = dados.texto;
		if(content.traducao) content.traducao = dados.traducao;
		if(content.tipo) content.tipo = dados.tipo;
		content.modifiedAt = new Date();
		content.save(function(error,result){
			if(error) callback(error);
			callback(result);
		});
	});
};