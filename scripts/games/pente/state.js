// state.js

//import config from './config.js';
import u from '../../og/ogUtil.js';

import {Pawn} from   '../../og/ogPawn.js';

export class State{

    constructor(config,board){
        console.log('State Loaded');
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
        u.cl(args);
        let temp = this.pawn.pawnFactory(args);
        u.cl(temp);
        this.pawn.addSprite(temp);
        this.board.placeSpritesOnBoard(this.sprites);
        this.addToPlayerChipCount(args.color);
    }

    /**
        CHECK FOR WINCON
    **/
    checkBoardStateForWinner(){
        u.clc('check for winner...','gray');
        let checkData = [];
        checkData['rows'] = [];
        checkData['columns'] = [];
        checkData['diagonals_right'] = [];
        checkData['diagonals_left'] = [];

        //lazy way to start
        //TODO
        var checkRowNum = 1;
        while(checkRowNum <= this.config.screen.boardSize){
            this.board.boardState.forEach((tile, key) => {
                if(!checkData['rows'][checkRowNum]) checkData['rows'][checkRowNum] = [];
                if(tile.row == checkRowNum){
                    if(tile.contains.length > 0){
                        checkData['rows'][checkRowNum].push(tile.contains[0])
                    }else{
                        checkData['rows'][checkRowNum].push('N');
                    }
                }
            });
            checkRowNum++;
        }
        var checkColNum = 1;
        while(checkColNum <= this.config.screen.boardSize){
            this.board.boardState.forEach((tile, key) => {
                if(!checkData['columns'][checkColNum]) checkData['columns'][checkColNum] = [];
                if(tile.col == checkColNum){
                    if(tile.contains.length > 0){
                        checkData['columns'][checkColNum].push(tile.contains[0])
                    }else{
                        checkData['columns'][checkColNum].push('N');
                    }
                }
            });
            checkColNum++;
        }
        //DIAGONAL CHECk
        let checkDiagonalNum = 1; //key for diag array
        let celCheckerCount = 1;
        let celPointer = 0;

        let i = 0;
        let edgePointerTileKey = null;

        //UP LEFT EDGE
        edgePointerTileKey = (this.config.screen.boardSize * this.config.screen.boardSize) - this.config.screen.boardSize;
        //don't need to check diags with fewer than win con:
        edgePointerTileKey -= (this.config.screen.boardSize * (this.rules.needToWin - 1) );
        i = (this.rules.needToWin - 1);
        u.clc('CHECKING DIAG, LEFT, DOWN RIGHT','orange');
        for(i; i < this.config.screen.boardSize; i++) {
            u.cl(edgePointerTileKey);
            //CELL LOOP DOWN THE DIAG
            //TODO CONSOLIDATE THIS
            celCheckerCount = 1;
            celPointer = edgePointerTileKey;
            while(celCheckerCount <= (this.config.screen.boardSize)){
                if(!this.board.boardState[celPointer]) break;
                let tile = this.board.boardState[celPointer];
                if(!checkData['diagonals_right'][checkDiagonalNum]) checkData['diagonals_right'][checkDiagonalNum] = [];
                if(tile.contains.length > 0){
                    checkData['diagonals_right'][checkDiagonalNum].push(tile.contains[0])
                }else{
                    checkData['diagonals_right'][checkDiagonalNum].push('N');
                }
                let celPointerNew = (celPointer + this.config.screen.boardSize + 1);
                if(!this.board.boardState[celPointerNew]) break;
                if(Math.abs( this.board.boardState[celPointer].col - this.board.boardState[celPointerNew].col) > 1) break;
                celPointer += this.config.screen.boardSize + 1;
                celCheckerCount++;
            }
            checkDiagonalNum++;
            //END CELL LOOP
            edgePointerTileKey -= this.config.screen.boardSize;
        }

        //ACROSS TOP EDGE, start at 1 since 0 was done already
        u.clc('CHECKING DIAG, TOP, DOWN RIGHT','orange');
        edgePointerTileKey = 1;
        for(i = 1; i < (this.config.screen.boardSize - (this.rules.needToWin - 1)); i++) {
            u.cl(edgePointerTileKey);
            //CELL LOOP DOWN THE DIAG
            celCheckerCount = 1;
            celPointer = edgePointerTileKey;
            while(celCheckerCount <= (this.config.screen.boardSize)){
                if(!this.board.boardState[celPointer]) break;
                let tile = this.board.boardState[celPointer];
                if(!checkData['diagonals_right'][checkDiagonalNum]) checkData['diagonals_right'][checkDiagonalNum] = [];
                if(tile.contains.length > 0){
                    checkData['diagonals_right'][checkDiagonalNum].push(tile.contains[0])
                }else{
                    checkData['diagonals_right'][checkDiagonalNum].push('N');
                }
                let celPointerNew = (celPointer + this.config.screen.boardSize + 1);
                if(!this.board.boardState[celPointerNew]) break;
                if(Math.abs( this.board.boardState[celPointer].col - this.board.boardState[celPointerNew].col) > 1) break;
                celPointer += this.config.screen.boardSize + 1;
                celCheckerCount++;
            }
            checkDiagonalNum++;
            //END CELL LOOP
            edgePointerTileKey += 1;
        }

        //UP RIGHT EDGE
        //reset check for daig left
        checkDiagonalNum = 1;
        u.clc('CHECKING DIAG, RIGHT, DOWN LEFT','orange');
        edgePointerTileKey = (this.config.screen.boardSize * this.config.screen.boardSize) -1; //last tile
        edgePointerTileKey -= (this.config.screen.boardSize * (this.rules.needToWin - 1) );
        i = (this.rules.needToWin - 1);
        for(i; i < this.config.screen.boardSize; i++) {
            u.cl(edgePointerTileKey);
            //CELL LOOP DOWN THE DIAG
            celCheckerCount = 1;
            celPointer = edgePointerTileKey;
            while(celCheckerCount <= (this.config.screen.boardSize)){
                if(!this.board.boardState[celPointer]) break;
                let tile = this.board.boardState[celPointer];
                if(!checkData['diagonals_left'][checkDiagonalNum]) checkData['diagonals_left'][checkDiagonalNum] = [];
                if(tile.contains.length > 0){
                    checkData['diagonals_left'][checkDiagonalNum].push(tile.contains[0])
                }else{
                    checkData['diagonals_left'][checkDiagonalNum].push('N');
                }
                let celPointerNew = (celPointer + this.config.screen.boardSize - 1);
                if(!this.board.boardState[celPointerNew]) break;
                if(Math.abs( this.board.boardState[celPointer].col - this.board.boardState[celPointerNew].col) > 1) break;
                celPointer += this.config.screen.boardSize - 1;
                celCheckerCount++;
            }
            checkDiagonalNum++;
            //END CELL LOOP
            edgePointerTileKey -= this.config.screen.boardSize;
        }

        //ACROSS TOP TO LEFT
        u.clc('CHECKING DIAG, TOP, DOWN LEFT','orange');
        edgePointerTileKey = (this.config.screen.boardSize) -2; //minus 1 for key, minus 1 more since the corner was done already
        for(i = 1; i < (this.config.screen.boardSize - (this.rules.needToWin - 1)); i++) {
            u.cl(edgePointerTileKey);
            //CELL LOOP DOWN THE DIAG
            celCheckerCount = 1;
            celPointer = edgePointerTileKey;
            while(celCheckerCount <= (this.config.screen.boardSize)){
                if(!this.board.boardState[celPointer]) break;
                let tile = this.board.boardState[celPointer];
                if(!checkData['diagonals_left'][checkDiagonalNum]) checkData['diagonals_left'][checkDiagonalNum] = [];
                if(tile.contains.length > 0){
                    checkData['diagonals_left'][checkDiagonalNum].push(tile.contains[0])
                }else{
                    checkData['diagonals_left'][checkDiagonalNum].push('N');
                }
                let celPointerNew = (celPointer + this.config.screen.boardSize - 1);
                if(!this.board.boardState[celPointerNew]) break;
                if(Math.abs( this.board.boardState[celPointer].col - this.board.boardState[celPointerNew].col) > 1) break;
                celPointer += this.config.screen.boardSize - 1;
                celCheckerCount++;
            }
            checkDiagonalNum++;
            //END CELL LOOP
            edgePointerTileKey -= 1;
        }

        u.clc('CHECK DATA','yellow');
        u.cl(checkData);
        //u.cl(this.board.boardState);

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
                        u.cl('RUN' + run);
                        u.cl(typeNumber);
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
