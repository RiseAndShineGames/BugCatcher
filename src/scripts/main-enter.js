"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	var tilemap = 1;
	var player = 2;
	var tilemap_component = game.entities.get(tilemap, "tilemap");
	var collider, layer, object;
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];
		if (layer.name == tilemap_component.layer) {
			tilemap_component.layer_index = i;
		}
		if (layer.name == "Collisions") {
			for (var j = 0; j < layer.objects.length; j++) {
				object = layer.objects[j];
				collider = game.instantiatePrefab("collision");
				game.entities.set(collider, "size", { "width": object.width, "height": object.height });
				game.entities.set(collider, "position", { "x": object.x, "y": object.y });
			}
		}
		if (layer.name == "Spawn") {
			object = layer.objects[0];
			game.entities.set(player, "position", { "x": object.x, "y": object.y });
		}
	}
	var map_size = {
		"width": file.width * file.tilewidth,
		"height": file.height * file.tileheight
	};
	game.entities.set(tilemap, "size", map_size);
};
