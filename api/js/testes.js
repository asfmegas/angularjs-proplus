// Testando leitorDados
var teste = require('./leitorDados');

var result = teste.leitor('/home/asfmint/Downloads/','Dic_de_expressoes.txt');


var regExp = /[^;]/g; ///[a-zA-Záéóàôãõẽç]*/g;
var texto = "water:água;waves:ondas";
// console.log(result.match(regExp));
console.log(texto.match(regExp));


