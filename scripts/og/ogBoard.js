/**
    Game Tools
    OG Board

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6

    see ogBoard, og-tools, dd, warcapade, wierdquest
**/
import u from './ogUtil.js';
import config from '../config.js';

u.clc('Board Module Loaded','orange');

export default{

    tileSize : config.screen.tileSize,

    boardState : [],

    boardFactory : function() {
        var board = [];
        var tile = null;
        var iCol = 0;
        var iRow = 0;
        var num = 0;
        var color = '#cccccc';
        var tileType = null;

        for( iRow; iRow < config.screen.boardSize; iRow++ ) {
            for( iCol; iCol < config.screen.boardSize; iCol++ ) {
                num++;
                tileType = 'tile';
                tile = this.tileFactory( num, iCol+1, iRow+1, tileType, iCol * this.tileSize, iRow * this.tileSize, color );
                board.push(tile);
            }
            iCol = 0;
        }

        return board;
    },

    tileFactory : function(num,col,row,tileType,x,y,color) {
        var tile = {
            num : num,
            col : col,
            row : row,
            tileType : tileType,
            contains : [], // reference to sprite in game list
            ui : null,
            action : null, //current,moveTarget,attackTarget,actionTarget
            highlight : false,
            selected : false,
        };
        //tile.ui = setUi(x,y,this.tileSize,this.tileSize,color,0,0,0);
        if(tile.tileType === 'tile'){
            //tile.ui.image.src = './images/wq-tile.png';
        }
        return tile;
    },

    makeBoard : function(){
        this.boardState = this.boardFactory();
    },

    updateBoardByMouse : function(pos){
        this.clearTilesByState('highlight');
        //update from pos
        if(!pos) return;
        let tileNum = this.getTileNumFromPos(pos);
        if(tileNum){
            this.boardState[tileNum-1].highlight = true;
        }
    },

    colorTileWithClick : function(pos){
        if(!pos) return;
        let tileNum = this.getTileNumFromPos(pos);
        if(tileNum){
            let tile = this.boardState[tileNum-1];
            let wasSelected = tile.selected;
            this.clearTilesByState('selected');
            if(!wasSelected){
                tile.selected = true;
            }
        }
    },

    updateTileUi : function(tiles){
        var loopLength = tiles.length;
        var i = 0;
        for(i = 0; i < loopLength; i++) {
            this.boardState[i].ui = tiles[i];
        }
    },
    checkForEmptySpace : function(tileNum){
        let tile = this.boardState[tileNum-1];
        if(tile.contains.length == 0) return true;
    },


/**
    TO VET
    FROM OGTOOLS
**/

    setStartingTiles : function(spriteType){
        if (!state.sprites.hasOwnProperty(spriteType)){
            return;
        }
        var loopLength = state.sprites[spriteType].length;
        var tileNum = null;
        var sprite = null;
        var tempPos = null;
        var i = 0;
        for(i = 0; i < loopLength; i++) {
            sprite = state.sprites[spriteType][i];
            tileNum = state.sprites[spriteType][i].tile;
            tempPos = getPosFromTileNum(tileNum);
            placeSprite(sprite.slug,tileNum);
            snapSpriteToTile(sprite.slug,tempPos);
        }
    },

    //on reset -- scramble the board
    scrambleSprites : function(spriteType) {
        if (!state.sprites.hasOwnProperty(spriteType)){
            return;
        }
        var loopLength = state.sprites[spriteType].length;
        var tileNum = null;
        var sprite = null;
        var tempPos = null;
        var i = 0;
        for(i = 0; i < loopLength; i++) {
            sprite = state.sprites[spriteType][i];
            tileNum = getRandomUnoccupiedTile();
            tempPos = getPosFromTileNum(tileNum);
            placeSprite(sprite.slug,tileNum);
            snapSpriteToTile(sprite.slug,tempPos);
        }
    },

    getPosFromTileNum : function(tileNum) {
        var pos = {};
        var tileId = convertTileNumToId(tileNum);

        pos.x = board[tileId].ui.x;
        pos.y = board[tileId].ui.y;
        return pos;
    },

    getTileByNum : function(num){
        var tileId = convertTileNumToId(num);
        return board[tileId];
    },

    //look through tiles and find empty
    //could need rules edits for double occupants
    getRandomUnoccupiedTile : function() {
        var getTileNum = Math.floor( (Math.random() * options.rows * options.columns) + 1 );
        var availableTiles = [];
        var loopLength = board.length;
        for(i = 0; i < loopLength; i++) {
            if( board[i].contains.length === 0 && board[i].tileType === 'tile'){
                availableTiles.push( board[i].num );
            }
        }
        var randomKey = Math.floor((Math.random() * availableTiles.length));
        getTileNum = availableTiles[randomKey];
        return getTileNum;
    },

    //Set the sprite state
    placeSpritesOnBoard : function(sprites){
        sprites.forEach((element, index) => {
            this.placeSpriteOnSpace(element);
        });
    },

    placeSpriteOnSpace : function(sprite){
        let tile = this.boardState[sprite.space-1];
        tile.contains.push(sprite.slug);
    },

    moveSpriteToTile : function(slug,tileNum){
        var sprite = og.tools.getSprite(slug);
        if(!sprite) return;
        var tileId = convertTileNumToId(sprite.tile);
        board[tileId].contains = []; //set the sprite tile to be empty
        sprite.tile = tileNum; //set the sprite tile num to the new num
        board[sprite.tile - 1].contains.push(sprite.slug);
        og.tools.msg(sprite.slug + ' moves');
    },

    //Set the sprite state
    placeSprite : function(slug,tileNum){
        var sprite = og.tools.getSprite(slug);
        if(!sprite) return;
        var tileId = convertTileNumToId(sprite.tile);
        board[tileId].contains = []; //set the sprite tile to be empty
        sprite.tile = tileNum; //set the sprite tile num to the new num
        board[sprite.tile - 1].contains.push(sprite.slug);
    },

    snapSpriteToTile : function(slug,pos){
        var node = og.tools.getNode(slug);
        node.ui.x = pos.x;
        node.ui.y = pos.y;
    },

    showMoveTargets : function(tileId,num){
        var tileIds = [];

        //first round of tiles
        tileIds = getAdjacentTiles(tileId);
        num--;

        var i = 0;
        var j = 0;
        var loopLength = 0;

        //rest of the rounds per movement rating
        //TODO optimize this!
        for(j = 0; j < num; j++) {
            loopLength = tileIds.length;
            for(i = 0; i < loopLength; i++) {
                tileIds = tileIds.concat( getAdjacentTiles(tileIds[i]) );
            }
        }

        //Mark Tiles as Move Targets
        i = 0;
        loopLength = tileIds.length;
        for(i = 0; i < loopLength; i++) {
            if(board[tileIds[i]].contains.length == 0){
                board[tileIds[i]].action = 'moveTarget';
            }
        }
    },

    getAdjacentTiles : function(tileNum,unoccupied){
        var tiles = [];
        var loopLength = board.length;
        var id = convertTileNumToId(tileNum);
        var tile = board[id];
        var distance = 2; //TODO move stat
        for(i = 0; i < loopLength; i++) {
            if(
                Math.abs(tile.col - board[i].col) <= (distance) &&
                Math.abs(tile.row - board[i].row) <= (distance) &&
                //board[i].contains.length == 0 &&
                board[i].num != tileNum
            ){
                if(unoccupied == true && board[i].contains.length > 0){
                    //if we want unoccupied, skip tiles with contents
                }else{
                    tiles.push(board[i].num);
                }
            }
        }
        return tiles;
    },

    getAdjacentUnoccupiedTiles : function(tileNum){
        var tiles = [];
        var loopLength = board.length;
        var id = convertTileNumToId(tileNum);
        var tile = board[id];
        var distance = 2;
        for(i = 0; i < loopLength; i++) {
            if(
                Math.abs(tile.col - board[i].col) <= (distance) &&
                Math.abs(tile.row - board[i].row) <= (distance) &&
                board[i].contains.length == 0 &&
                board[i].num != tileNum
            ){
                tiles.push(board[i].num);
            }
        }
        return tiles;
    },

    //returns and marks for render possible action tiles
    markActionTiles : function(tiles){
        var loopLength = tiles.length;
        for(i = 0; i < loopLength; i++) {
            var id = convertTileNumToId(tiles[i])
            var tile = board[id];
            tile.action = true;
        }
        if( rules.hasOwnProperty('processActionTiles') ){
            return rules.processActionTiles(tiles);
        }
    },

    clearAllTileStates : function(){
        this.boardState.forEach((element, index) => {
            element.action = false;
            element.target = false;
            element.current = false;
            element.selected = false;
            element.highlight = false;
        });
    },

    clearTilesByState: function(tileState){
        this.boardState.forEach((element, index) => {
            element[tileState] = false;
        });
    },

    clearTileHighlights : function(){
        this.boardState.forEach((element, index) => {
            element.highlight = false;
        });
    },

    clearAllTiles : function(){
        this.boardState.forEach((element, index) => {
            element.contains = [];
        });
    },

    //TOOLS PRIVATE

    getTileNumFromPos : function(pos) {
        if(!pos) return;
        let board = this.boardState;
        var tileNum = null;
        var iTile = 0;
        var loopLength = board.length;
        for(iTile; iTile < loopLength; iTile++) {
            if(!board[iTile].ui) continue;
            if(
                board[iTile].ui.x < pos.x &&
                board[iTile].ui.y < pos.y &&
                board[iTile].ui.x >= pos.x - this.tileSize &&
                board[iTile].ui.y >= pos.y - this.tileSize
            ) {
                tileNum = board[iTile].num;
            }
        }
        return tileNum;
    },

    convertTileNumToId : function( num ){
        var tileId = num - 1;
        return tileId;
    },

}
