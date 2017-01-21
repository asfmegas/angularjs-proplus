let mongoose = require('mongoose').connect('mongodb://localhost/proplus');
let db =  mongoose.connection;

db.on('error',console.error.bind(console,'Error ao carregar o banco.'));

db.once('open',function(){
	let userSchema = mongoose.Schema({
		nome: String,
		email: String,
		login: String,
		senha: String,
		createAt: Date
	});

	let wordSchema = mongoose.Schema({
		nome:String,
		traducao:String,
		tipo: String,
		origem: String,
		createAt:Date,
		modifiedAt: Date
	});

	let contentSchema = mongoose.Schema({
		titulo:String,
		texto:String,
		tipo: String,
		traducao:String,
		anotacao:String,
		createAt:Date,
		modifiedAt: Date
	});

	let verbsSchema = mongoose.Schema({
		base:String,
		tense:String,
		participle:String,
		translation:String,
		phrase:String,
		hit:Number,
		point:Number,
	})

	exports.Words = mongoose.model('Words',wordSchema);
	exports.Contents = mongoose.model('Contents',contentSchema);
	exports.Verbs = mongoose.model('Verbs',verbsSchema);
});