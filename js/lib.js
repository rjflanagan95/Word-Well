$(document).ready(function(){
// module.exports =  function getWord(callback){
    // Dependencies
    require('dotenv').config();
    var Dictionary = require("oxford-dictionary-api");
    var randomWords = require('random-words');
    var keys = require('./keys.js');

    var dict = new Dictionary(keys.app_id, keys.app_key);
    var randomWord = randomWords();

    //global variable
    var wordInfo = {};
    

    dict.find(randomWord,function(error,data){   
        if(error) return console.log(error); 

        //local variables 
        var wordDef = [];
    
        var defArr = data.results[0].lexicalEntries[0].entries[0].senses;
        var len = defArr.length;

        //ensuring that etymologies exist 
        var etyArr =  data.results[0].lexicalEntries[0].entries[0].etymologies;
        if(etyArr){
            var etymologies =  etyArr[0];
        }else{
            var etymologies =  "Etymologies is not available"
        }

        //ensuring that pronunciations exist  in API
        var audArr = data.results[0].lexicalEntries[0].pronunciations;

        if(audArr){
            var audioFile =   data.results[0].lexicalEntries[0].pronunciations[0].audioFile;
            var phoneticSpelling  = data.results[0].lexicalEntries[0].pronunciations[0].phoneticSpelling;

        }else{
            var audioFile  =  "Audio is not available"
            var phoneticSpelling = "PhoneticSpelling is not available"
        };


        //loop though defArr and veryfy that definitions array exist
        for (var i = 0; i< len; i++){
            var definitionsArr = defArr[i].definitions;
            var  examplesArr = defArr[i].examples; 
        
            //ensuring that example exist for definition
            if(examplesArr){
                var  examples = examplesArr[0].text; 
            }else{
                var examples = "Example is not available"
            }
            
            // if definition array exist get  list of definitions, examples and short_definitions
            //if definition do not exist print message to notify user
            if(definitionsArr){
                var definitions = defArr[i].definitions[0];
                var short_definitions = defArr[i].short_definitions[0];

            var defObj = {
                    definition : definitions,
                    examples: examples,
                    short_definitions: short_definitions    
            };
            
            //push defObj in wordInfo array
            wordDef.push(defObj);
            }
        }//end of for loop
        
        // if definition array exist set wordInfo with porper values else return message
        if(definitionsArr){
            wordInfo = {
                randomWord: randomWord, 
                etymologies: etymologies,
                pronounciation: audioFile,
                phoneticSpelling:phoneticSpelling,  
                wordDef: wordDef
            }
        
        }else{
            wordInfo = {
                randomWord: "Definition is not available for " +  randomWord       
        }
        } 
        // callback(wordInfo);
        console.log(wordInfo)
        $('#etymology').text(data.etymology); 
    });

//}
});
