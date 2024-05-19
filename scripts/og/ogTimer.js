/**
    Game Tools
    OG Timer

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6
**/

let callbacksFrame = [];
let callbacksTick = [];

const ogTimer = {
	time : {
		start : performance.now(),
		timerStart : performance.now(),
		current : 0,
		now : performance.now(),
		then : performance.now(),
		modifier : 0,
		delta : 0,
		gameSpeed : 1,
		count : 0,
		lastTick : 0,
		tickSpeed : 1000 // low = faster
	},
	loop : function(){
		let t = ogTimer.time;
		t.now = performance.now();
		t.delta = t.now - t.then;
		t.modifier = t.delta / 1000; //modifier in seconds
		t.then = t.now;
		callbacksFrame.forEach(callback => callback());
		if(t.lastTick + t.tickSpeed < t.now){
			t.lastTick = t.now;
			callbacksTick.forEach(callback => callback());
		}
		requestAnimationFrame(ogTimer.loop);
	},
	registerCallbackFrame : function(callback) {
		callbacksFrame.push(callback);
	},
	registerCallbackTick : function(callback) {
		callbacksTick.push(callback);
	}
}

export default ogTimer;
