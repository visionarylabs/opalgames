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

export default{
    drawBoard : function(ctx,board) {

            Object.values(board).forEach((value,key,map) => {

                let tile = value;
                let color1 = '#333333';
                let color2 = '#cccccc';
                let tileSize = 25;
                let x = tile.col * tileSize - tileSize;
                let y = tile.row * tileSize - tileSize;
                //draw the tile
                ctx.fillStyle = color1;
                ctx.fillRect(x,y,tileSize,tileSize);
                //inner tile
                ctx.fillStyle = color2;
                ctx.fillRect(x+1,y+1,tileSize-2,tileSize-2);

            });
    }
}
