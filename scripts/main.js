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

import config from  './config.js';
import state from  './state.js';
import u from       './og/ogUtil.js';

import canvas from  './og/ogCanvas.js';
import ui from  './og/ogUi.js';
import render from  './og/ogRender.js';
import timer from   './og/ogTimer.js';

import dice from    './og/ogDice.js';
import board from   './og/ogBoard.js';
import pawn from   './og/ogPawn.js';

/**
* Game Tools Demo
*/

/**
* Util Demo
*/
u.cl(config);

/**
* Board
*/
function setupBoard(){
    //let boardState = board.boardFactory();
    board.makeBoard();
    //console.table(board.boardState);

    //PAWNS
    let args = {
        'slug' : 'one',
        'color' : '#009900',
        'letter' : 'A',
        'space' : 5,
    };
    let temp = pawn.pawnFactory(args);
    //pawn.addSprite(temp);
    board.placeSpritesOnBoard(state.sprites);
};
//setup board - demo
setupBoard();
state.restartGame();

u.clc('all sprites','orange');
console.log(state.sprites);
//u.cl(boardState);

/**
* Time Demo
*/
console.log('TIMER');
console.log(timer.time);

/**
* Canvas Demo
*/
canvas.bindCanvas(onCanvasLoaded);

/**
* TIMER CALLBACKS
**/

/**
* CLICK CALLBACK
**/

function callBackClick(click) {
    u.clc('click pos:' + ' ' + click.x + ':' + click.y , 'red');
    //ALL MAIN GAME / GRID CLICK LOGIC HERE:
    if(state.game.phase == 'start') state.game.phase = 'game';
    if(state.game.phase == 'end'){
        state.restartGame();
        return;
    }
    let tileNum = board.getTileNumFromPos(click);
    if(!board.checkForEmptySpace(tileNum)) return;
    board.colorTileWithClick(click);
    placeNextPawn(tileNum);
    state.setNextPlayer();
    u.cl(state);
    let winnerColor = checkWinCondition();
    if(winnerColor){
        u.clc('WINNER!!!!!!!!!!!!!!!!!!!','yellow');
        ui.showOverlayScreen(winnerColor + ' won');
        state.game.screen = 'overlay';
        state.game.phase = 'end';
        state.game.winnerColor = winnerColor;
    }
}

function callBackFrame() {
    //u.cl(canvas.pos);
    board.updateBoardByMouse(canvas.pos);
    let tiles = render.drawBoard(canvas.ctx,board.boardState,state.sprites);
    board.updateTileUi(tiles);
    if(state.game.screen == 'overlay'){
        render.showModal(state.game.winnerColor + ' won');
    }
}

function callBackTick() {
    //u.cl('--------TICK-------');
    //u.cl(board.boardState);
}

/**
* REGISTER CALLBACKS
**/
timer.registerCallbackFrame(callBackFrame);
timer.registerCallbackTick(callBackTick);
canvas.registerCallbackClick(callBackClick);

/**
* RENDER
*/
function onCanvasLoaded() {
	timer.loop();
}

/**
* GAME LOGIC
*/
function placeNextPawn(tileNum){
    let args = {
        'slug' : state.players[state.game.currentPlayer].nextChipSlug,
        'color' : state.game.currentPlayer,
        'letter' : 'A',
        'space' : tileNum,
    }
    placePawnOnTile(args);
}
function placePawnOnTile(args){
    u.cl(args);
    let temp = pawn.pawnFactory(args);
    u.cl(temp);
    pawn.addSprite(temp);
    board.placeSpritesOnBoard(state.sprites);
    state.addToPlayerChipCount(args.color);
}
function checkWinCondition(){
    if(!state.checkForMinimumChips()) return;
    return state.checkBoardStateForWinner(board.boardState);
}
