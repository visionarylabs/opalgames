/**
    Game Tools
    OG Util

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6

    see og-tools, dd
**/

export default{
    cl : function(string){
        console.log(string);
    },
    clc : function(string,color){
        console.log('%c '+string, 'color: '+color+'; font-weight: bold;');
    },
    clt : function(string,color){
        console.log('%c '+string, 'color: '+color+'; font-weight: bold; border: 3px solid '+color+'; padding: 5px; background: #eee');
    }
}
