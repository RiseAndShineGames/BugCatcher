"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function trackLastPosition(entity, elapsed) { // eslint-disable-line no-unused-vars
		var timers = game.entities.get(entity, "timers");
		var tile_size = game.entities.get(entity, "tile_size");
		if (!timers.move.running) {
			if (game.inputs.button("up")) {
				timers.move.running = true;	
				game.entities.set(entity, "velocity", { "x": 0, "y": -(tile_size.height / (timers.move.max * 1.0)) });
			}
			if (game.inputs.button("down")) {
				timers.move.running = true;		
				game.entities.set(entity, "velocity", { "x": 0, "y": (tile_size.height / (timers.move.max * 1.0)) });
			}
			if (game.inputs.button("left")) {
				timers.move.running = true;		
				game.entities.set(entity, "velocity", { "x": -(tile_size.height / (timers.move.max * 1.0)), "y": 0 });
			}
			if (game.inputs.button("right")) {
				timers.move.running = true;		
				game.entities.set(entity, "velocity", { "x": (tile_size.height / (timers.move.max * 1.0)), "y": 0 });
			}
		}
	}, "player");
};
