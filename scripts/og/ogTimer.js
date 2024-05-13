/**
    Game Tools
    OG Timer

    v0.1 - 02-28-2024
    Opal Games - Design and Development
    requirements: ES6
**/

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
		count : 0
	},
	loop : function(){
		console.log('main loop');
		let t = ogTimer.time;
		t.now = performance.now();
		t.delta = t.now - t.then;
		t.modifier = t.delta / 1000; //modifier in seconds
		t.then = t.now;
		requestAnimationFrame(ogTimer.loop);
	}
}

export default ogTimer;