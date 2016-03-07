"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap2.json");
	var importer = require("splat-ecs/lib/import-from-tiled.js");
	importer(file, game.entities);
	var player = 1;

	var spawn_pos;
	var spawn = game.entities.find("spawn");
	if (spawn.length > 0) {
		spawn_pos = game.entities.get(spawn, "position");
	} else if (game.arguments.player_pos) {
		spawn_pos = game.arguments.player_pos;	
	} else {
		spawn_pos = { "x": 0, "y": 0 };
	}
	game.entities.set(player, "position", spawn_pos);
	var container = game.entities.find("container");
	game.entities.set(player, "constrainPosition", { "id": container });
};
