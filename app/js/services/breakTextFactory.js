angular.module('proplus').factory('breakText',function(){

	let _getBreakText = function(text){
		if(!text) return "";
		text = text.replace(/\n/g,' ')
								.replace(/\(/g,'')
								.replace(/\)/g,'')
								.replace(/\,/g,'')
								.replace(/\.\.\./g,' ')
								.replace(/\./g,' ')
								.replace(/\—/g,'')
								.replace(/[0-9]/g,'')
								.replace(/\[/g,'')
								.replace(/\]/g,'')
								.replace(/\;/g,'')
								.replace(/\?/g,'')
								.replace(/\!/g,'')
								.replace(/\:/g,'')
								.replace(/\#/g,'')
								.replace(/\=/g,'')
								.replace(/\"/g,'')
								.replace(/\<[a-zA-Z]{1,100}\>/g,' ')
								.replace(/\<\/[a-zA-Z]{1,100}\>/g,' ')
								.replace(/\>/g,' ')
								.replace(/\</g,' ')
								.toLowerCase();;

		let arrayWord = text.split(' ');

		let arrayNoRepeatWord = arrayWord.filter(function(item,i){
			return arrayWord.indexOf(item) == i;
		});

		let wordsFree = arrayNoRepeatWord.toString();

		return wordsFree.replace(/\,/g,' ');
	};

	return {
		getBreakText: _getBreakText
	}
});