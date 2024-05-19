//game specific includes:
import config from  './config.js';
import {State} from  './state.js';

//OG tool includes:
import u from  '../../og/ogUtil.js';
import timer from   '../../og/ogTimer.js';

import {Canvas} from  '../../og/ogCanvas.js';
import {Render} from  '../../og/ogRender.js';
import {Board} from   '../../og/ogBoard.js';
import {Pawn} from   '../../og/ogPawn.js';

/**
* Game Tools Demo
*/

export class Pente{

    constructor(config){
        this.config = config;
        u.clc('New Pente Game Class Loaded','yellow');
        u.cl('config:');
        u.cl(config);
        this.canvas = new Canvas(config);
        this.board = new Board(config);
        this.render = new Render(config);
        this.state = new State(config,this.board);
        this.pawn = new Pawn(this.state);

        //setup board - demo
        this.setupBoard();
        this.state.restartGame();

        u.clc('all sprites','orange');
        console.log(this.state.sprites);
        //u.cl(boardState);

        /**
        * Time Demo
        */
        console.log('TIMER');
        console.log(timer.time);

        /**
        * Canvas Demo
        */
        this.canvas.bindCanvas(this.onCanvasLoaded);

        /**
        * REGISTER CALLBACKS
        **/
        timer.registerCallbackFrame(() => this.callBackFrame());
        timer.registerCallbackTick(() => this.callBackTick());
        this.canvas.registerCallbackClick( (click) => this.callBackClick(click) );
    }

    setupBoard(){
        //let boardState = board.boardFactory();
        this.board.makeBoard();
        //console.table(board.boardState);

        //PAWNS
        let args = {
            'slug' : 'one',
            'color' : '#009900',
            'letter' : 'A',
            'space' : 5,
        };
        let temp = this.pawn.pawnFactory(args);
        //this.pawn.addSprite(temp);
        this.board.placeSpritesOnBoard(this.state.sprites);
    };

    /**
    * CLICK CALLBACK
    **/
    callBackClick(click) {
        u.cl('CLICK');
        u.clc('click pos:' + ' ' + click.x + ':' + click.y , 'red');
        //ALL MAIN GAME / GRID CLICK LOGIC HERE:
        if(this.state.game.phase == 'start') this.state.game.phase = 'game';
        if(this.state.game.phase == 'end'){
            this.state.restartGame();
            return;
        }
        let tileNum = this.board.getTileNumFromPos(click);
        if(!this.board.checkForEmptySpace(tileNum)) return;
        this.board.colorTileWithClick(click);
        this.state.placeNextPawn(tileNum);
        this.state.setNextPlayer();
        u.cl(this.state);
        let winnerColor = this.state.checkWinCondition();
        if(winnerColor){
            u.clc('WINNER!!!!!!!!!!!!!!!!!!!','yellow');
            this.state.game.screen = 'overlay';
            this.state.game.phase = 'end';
            this.state.game.winnerColor = winnerColor;
        }
    }

    callBackFrame() {
        //u.cl(canvas.pos);
        this.board.updateBoardByMouse(this.canvas.pos);
        let tiles = this.render.drawBoard(this.canvas.ctx,this.board.boardState,this.state.sprites);
        this.board.updateTileUi(tiles);
        if(this.state.game.screen == 'overlay'){
            this.render.showModal(this.canvas.ctx,this.state.game.winnerColor + ' won');
        }
    }

    callBackTick() {
        //u.cl('--------TICK-------');
        //u.cl(this.board.boardState);
    }

    /**
    * RENDER
    */
    onCanvasLoaded() {
        timer.loop();
    }

}
