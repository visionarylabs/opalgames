/**
    Game Tools
    OG Canvas

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6

    see og-tools, dd
**/

const ogCanvas = {

    canvas : null,
    ctx : null,
    pos : {},
    click : {},

    bindCanvas : function(callback){
        console.log('bind canvas');
        document.addEventListener('DOMContentLoaded', () => {

            //get the canvas element and set the size and context
            this.buildCanvas();

            //add canvas listeners
            this.addCanvasListeners();

            // Call the callback function if provided
            if (typeof callback === 'function') {
                callback();
            }

        });
    },

    buildCanvas : function(){
        this.canvas = document.getElementById('game-canvas');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.canvas.onselectstart = function () { return false; } //stop text select on double click
        this.ctx = this.canvas.getContext("2d");
    },

    addCanvasListeners : function(){

        //mouse move on canvas
        this.canvas.addEventListener('mousemove', (e) => {
            this.pos = this.getMousePos(this.canvas,e);
            console.log('mouse pos:' + ' ' + this.pos.x + ':' + this.pos.y);
        });

        //click on canvas
        this.canvas.addEventListener('click', (e) => {
            this.click = this.getMousePos(this.canvas,e);
            console.log('click pos:' + ' ' + this.click.x + ':' + this.click.y);
        });

    },

    getMousePos : function(canvas,e) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.floor(e.clientX - rect.left),
            y: Math.floor(e.clientY - rect.top)
        };
    },

}

export default ogCanvas;
