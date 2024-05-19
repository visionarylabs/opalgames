// state.js

//import config from './config.js';
import u from '../../og/ogUtil.js';

import {Pawn} from   '../../og/ogPawn.js';

export class State{

    constructor(config,board){
        u.clc('State Loaded','yellow');
        this.pawn = new Pawn(this);
        this.config = config;
        this.board = board;
        this.sprites = [];
        this.rules = {
            needToWin : 5,
        };
        this.game = {};
        this.players = {};
    }
    restartGame(){
        u.clc('restart game','yellow');
        this.board.clearAllTiles();
        this.board.clearAllTileStates();
        this.sprites = [];
        this.game = {
            currentPlayer: null, //color string
            currentPlayerColor: null, //color string
            screen : 'game', //game, overlay, menu
            phase : 'start', //start, game, end
            winnerColor : '',
        };
        this.players = {
            'red':{
                chipCount : 0,
                nextChipSlug : 'R0',
            },
            'blue':{
                chipCount : 0,
                nextChipSlug : 'B0',
            },
        };
        this.setNextPlayer();
    }
    setCurrentPlayer(color){
        this.game.currentPlayer = color;
    }
    determineNextPlayer(){
        if(!this.game.currentPlayer) return 'red';
        if(this.game.currentPlayer == 'blue') return 'red';
        if(this.game.currentPlayer == 'red') return 'blue';
    }
    setNextPlayer(){
        let color = this.determineNextPlayer();
        this.setCurrentPlayer(color);
        this.setNextClipSlug(color);
    }
    setNextClipSlug(color){
        let slug = '';
        if(color == 'red') this.players.red.nextChipSlug = 'R' + Number(this.players.red.chipCount + 1);
        if(color == 'blue') this.players.blue.nextChipSlug = 'B' + Number(this.players.blue.chipCount + 1);
    }
    addToPlayerChipCount(color){
        this.players[color].chipCount++;
    }
    checkForMinimumChips(){
        if(this.players.red.chipCount >= this.rules.needToWin) return true;
        if(this.players.blue.chipCount >= this.rules.needToWin) return true;
    }

    checkWinCondition(){
        if(!this.checkForMinimumChips()) return;
        return this.checkBoardStateForWinner(this.board.boardState);
    }

    placeNextPawn(tileNum){
        let args = {
            'slug' : this.players[this.game.currentPlayer].nextChipSlug,
            'color' : this.game.currentPlayer,
            'letter' : 'A',
            'space' : tileNum,
        }
        this.placePawnOnTile(args);
    }

    placePawnOnTile(args){
        let temp = this.pawn.pawnFactory(args);
        this.pawn.addSprite(temp);
        this.board.placeSpritesOnBoard(this.sprites);
        this.addToPlayerChipCount(args.color);
    }

    /**
        CHECK FOR WINCON
    **/
    checkBoardStateForWinner(){
        //u.clc('check for winner...','gray');

        //pass in minimumLengthToCheck
        let checkData = this.board.checkAllTileContentsForRuns(this.rules.needToWin);

        let run = 0;
        let lastCheck = 'N';
        for (let key in checkData) {
            let checkType = checkData[key];
            for (let key in checkType) {
                let typeNumber = checkType[key];
                for (let key in typeNumber) {
                    let cell = typeNumber[key];
                    if( cell.charAt(0) == lastCheck && lastCheck !== 'N'){
                        run++;
                    }else{
                        run = 0;
                    }
                    if(run >= this.rules.needToWin - 1){ //we are on the last one after the a run-1
                        if( cell.charAt(0) == 'R' ) return 'red';
                        if( cell.charAt(0) == 'B' ) return 'blue';
                    }
                    lastCheck = cell.charAt(0);
                }
                run = 0;
                lastCheck = 'N';
            }
        }
    }
};
