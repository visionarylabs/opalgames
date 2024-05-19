/**
    Game Tools
    OG Render

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6

	OgRender
	takes canvas context
	optional:
	board
		a grid or tile system, hex, iso etc
		tiles can act as buttons
	sprites
		sprites could be pawns, tokens, cards
		sprites can also act as buttons
	window
		window defines size and zoom of play window
	interface
		interface could be a panel or an overlay
		interface could have buttons corresponding to sprites

**/
import u from './ogUtil.js';
import canvas from './ogCanvas.js';
import config from '../config.js';

u.clc('Import Module Loaded','orange');

export default{
    drawSprites : function(ctx,sprites){
        u.clc('Draw Sprites','red');
        sprites.forEach((value,key) => {
            u.cl(value);
        });
    },

    drawBoard : function(ctx,board,sprites) {

            let tiles = [];

            Object.values(board).forEach((value,key,map) => {

                let tile = value;

                let color = {
                    default : '#cccccc',
                    border : '#333333',
                    highlight : '#ffff99',
                    selected : '#ffccee',
                    target : '#330099',
                    occupied : '#ffffff',
                }

                let tileSize = config.screen.tileSize;
                let x = tile.col * tileSize - tileSize;
                let y = tile.row * tileSize - tileSize;
                //draw the tile
                ctx.fillStyle = color.border;
                ctx.fillRect(x,y,tileSize,tileSize);
                //inner tile
                ctx.fillStyle = color.default;

                //tile state colors
                if(tile.contains.length > 0){
                    ctx.fillStyle = color.occupied;
                }
                if(tile.highlight == true){
                    ctx.fillStyle = color.highlight;
                }
                if(tile.target == true){
                    ctx.fillStyle = color.target;
                }
                if(tile.selected == true){
                    ctx.fillStyle = color.selected;
                }

                ctx.fillRect(x+1,y+1,tileSize-2,tileSize-2);
                tiles[tile.num-1] = {x:x,y:y}
                if(config.debug.showTileNumber){
                    ctx.font = "11px Helvetica";
                    ctx.fillStyle = "rgb(20,20,20)";
                    ctx.fillText(tile.num, x + 2, y + 1);
                    ctx.fillText(tile.row, x + 2, y + 11);
                    ctx.fillText(tile.col, x + 2, y + 21);
                }

                if(tile.contains.length > 0){
                    sprites.forEach((value,key) => {
                        if(value.slug == tile.contains[0]){
                            ctx.fillStyle = value.color;
                            ctx.beginPath();
                            ctx.arc(x+tileSize/2,y+tileSize/2, tileSize/4, 0, 2 * Math.PI);
                            ctx.fill();
                            ctx.stroke();
                        }
                    });
                }

            });

            return tiles;
    },

    /**
        MODAL UI BOX
    **/
    showModal : function(message){
        let ctx = canvas.ctx;
        var verticalOffset = 20;
        var horizontalOffset = 40;
        var modalOffset = 20;
        verticalOffset += modalOffset;
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fillRect( modalOffset, modalOffset, config.screen.canvasSize - (modalOffset*2), config.screen.canvasSize - (modalOffset*2) );
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font = "18px Helvetica";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(message, horizontalOffset, verticalOffset);
    },

}
