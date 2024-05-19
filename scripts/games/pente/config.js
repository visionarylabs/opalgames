// config.js

let canvasSize = 800;
let boardSize = 21;
let tileSize = canvasSize / boardSize;

console.log('Config Loaded');

export default{
    screen: {
        canvasSize: canvasSize,
        boardSize: boardSize,
        tileSize: tileSize,
    },
    debug:{
        showTileNumber : false
    }
    // Other configuration parameters...
};
