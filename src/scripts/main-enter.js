"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	var importer = require("splat-ecs/lib/import-from-tiled.js");
	importer(file, game.entities);
	var player = 1;

	var spawn = game.entities.find("spawn");
	var spawn_pos = game.entities.get(spawn, "position");
	game.entities.set(player, "position", spawn_pos);
	var container = game.entities.find("container");
	game.entities.set(player, "constrainPosition", { "id": container });
};
