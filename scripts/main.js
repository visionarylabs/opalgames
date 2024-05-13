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

console.log('game tools');

import util from './og/ogUtil.js';
import dice from './og/ogDice.js';
import board from './og/ogBoard.js';
import canvas from './og/ogCanvas.js';
import render from './og/ogRender.js';
import timer from './og/ogTimer.js';

/**
* Game Tools Demo
*/

/**
* Dice Demo
*/
let diceGroup1 = {
    sides : 100,
    count : 2,
    modifier : 0
}

let values = [];
let value = 0;

value = dice.rollDice(diceGroup1);
console.log(value);
values.push( value );

value = dice.rollDice(diceGroup1);
console.log(value);
values.push( value );

let total = dice.calculateTotal(values);
console.log(total);


/**
* Board Demo
*/
let boardState = board.boardFactory(10,10);
console.table(boardState);

/**
* Time Demo
*/
console.log(timer.time);

/**
* Canvas Demo
*/
canvas.bindCanvas(onCanvasLoaded);

/**
* Render Demo
*/
function onCanvasLoaded() {
    render.drawBoard(canvas.ctx,boardState);
	timer.loop();
}
