let express = require('express');
var app = module.exports = express();

let words = require('./words');
let contents = require('./contents');

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
	
app.listen(process.env.PORT || 3002,function(){
	console.log("Servidor rodando na porta 3002...");
});

app.get('/',function(req,res){
	res.json({'nome':'servidor 3002'});
});

app.get('/words', words.getWords);
app.post('/wordsselect',words.getSelectWords);
app.post('/saveword',words.saveWord);
app.get('/deleteword/:id',words.deleteWord);
app.post('/updateword',words.updateWord);

app.get('/contents',contents.getContents);
app.get('/content/:id',contents.getOneContent);
app.post('/savetext',contents.saveText);
app.get('/deletetext/:id',contents.deleteText);
app.post('/updatetext',contents.updateText);

app.get('/listverbs',words.getVerbs);
app.post('/saveverb',words.saveVerb);
app.post('/updateverb',words.updateVerb);