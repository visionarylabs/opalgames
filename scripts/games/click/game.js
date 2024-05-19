//game specific includes:
import config from  './config.js';
import {State} from  './state.js';

//OG tool includes:
import u from  '../../og/ogUtil.js';
import timer from   '../../og/ogTimer.js';

import {Canvas} from  '../../og/ogCanvas.js';
import {Render} from  '../../og/ogRender.js';

/**
* Game Tools Demo
*/

export class Click{

    constructor(config){
        this.config = config;
        u.cl('config:');
        u.cl(config);
        this.state = new State(config);

        this.canvas = new Canvas(config);
        this.render = new Render(config);

        /**
        * Canvas Demo
        */
        this.canvas.bindCanvas(this.onCanvasLoaded);

        /**
        * REGISTER CALLBACKS
        **/
        //this.canvas.registerCallbackClick( this.callBackClick );
        this.canvas.registerCallbackClick( (click) => this.callBackClick(click) );
    }

    /**
    * CLICK CALLBACK
    **/
    callBackClick(click) {
        u.cl('CLICK');
        u.clc('click pos:' + ' ' + click.x + ':' + click.y , 'red');
        //let main = this;
        u.cl(this);
        u.cl(this.state);
    }

    /**
    * RENDER
    */
    onCanvasLoaded() {
        timer.loop();
    }

}
