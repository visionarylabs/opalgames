// config.js
let canvasSize = 600;
let boardSize = 8;
let tileSize = canvasSize / boardSize;

console.log('Config Loaded');

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
