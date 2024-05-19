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

import u from './ogUtil.js';

export class Pawn{
    constructor(state){
        this.state = state;
        u.clc('New Pawn Class Loaded','yellow');
        u.cl(this.state);
    }
    addSprite(sprite) {
        this.state.sprites.push(sprite);
    }
    pawnFactory(args) {
        var pawn = Object.assign({ ui: {} }, args);
        return pawn;
    }
}
