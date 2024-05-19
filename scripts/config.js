// config.js

let canvasSize = 600;
let boardSize = 8;
let tileSize = canvasSize / boardSize;

export default{
    screen: {
        canvasSize: canvasSize,
        boardSize: boardSize,
        tileSize: tileSize,
    },
    debug:{
        showTileNumber : true
    }
    // Other configuration parameters...
};
