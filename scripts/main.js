/**
    Game Tools
    v0.1 - 05-11-2021
    Opal Games - Design and Development
    screen: 600px x 600px
    requirements: JS, require.js
**/

//global HTML vars
// Cross-browser support for requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

import {Pente} from  './games/pente/game.js';
import config from  './games/pente/config.js';
let game = new Pente(config);

//import {Click} from  './games/click/game.js';
//import config from  './games/click/config.js';
//let game = new Click(config);
