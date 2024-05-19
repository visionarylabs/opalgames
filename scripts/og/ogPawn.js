/**
    Game Tools
    OG Pawn

    v0.1 - 05-16-2024
    Opal Games - Design and Development
    requirements: ES6

    PAWN:
    'slug' : 'one',
    'color' : '#009900',
    'letter' : 'A',
    'space' : 5,

**/
import config from '../config.js';
import state from '../state.js';

import u from './ogUtil.js';

u.clc('Pawn Loaded','orange');

export default{
    addSprite : function(sprite) {
        state.sprites.push(sprite);
    },
    pawnFactory : function(args) {
        var pawn = Object.assign({ ui: {} }, args);
        return pawn;
    },
}
