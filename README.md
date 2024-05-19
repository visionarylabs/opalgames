------------------------------------------------------------
# Game Tools Demo
## Examples of Opal Games Game Tools
------------------------------------------------------------
* https://opalgames.com/games/gametools
------------------------------------------------------------

#how to use
* include a main.js or game.js in your html
* game a game-canvas canvas inside a game-area div
* set a config.js
* include in main.js the modules you want to use, and build your game components / logic

#terms
* sprites - a list of all sprites, sprites have a type, and that type can be used to group and manipulate certain sprites
* * types: pawn, actor,
* box - box is the data needed to build the game, e.g. everything in the box, cards, pieces, board, etc
* * box is generated via php/mysql or just with a json file (spreadsheet to json)
* selected - the active item(s) being manipulated with the next input e.g. selected pawn to move
* target - a list of available clickable tiles e.g. tiles to move to or tiles to attack
