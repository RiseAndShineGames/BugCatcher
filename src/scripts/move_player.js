"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
	game.entities.set(entity, "velocity", { "x": 0, "y": 0 });
};
