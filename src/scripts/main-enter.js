"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap2.json");
	var importer = require("splat-ecs/lib/import-from-tiled.js");
	importer(file, game.entities);
	var player = 1;

	var spawn_pos;
	var spawn = game.entities.find("spawn");
	if (game.arguments.player_pos) {
		spawn_pos = game.arguments.player_pos;	
	} else if (spawn.length > 0) {
		spawn_pos = game.entities.get(spawn, "position");
	} else {
		spawn_pos = { "x": 0, "y": 0 };
	}
	game.entities.set(player, "position", spawn_pos);
	var tile = game.entities.find("tile")[0];
	var tile_size = game.entities.get(tile, "size");
	game.entities.set(player, "tile_size", tile_size);
	var container = game.entities.find("container");
	game.entities.set(player, "constrainPosition", { "id": container });
};
