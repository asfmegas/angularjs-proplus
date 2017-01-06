let fs = require('fs');

exports.leitor = function(path,file){
	let dados = "" ;
	let caminho = path+file;

	let result = fs.existsSync(caminho);
	if(result){
		dados = fs.readFileSync(caminho,{charset:'uft-8',flag:'r'});
		return dados.toString();
	}else{
		return "Verifique se o caminho("+path+") ou \no nome do arquivo("+file+") estão corretos.";
	};
};