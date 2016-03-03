"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	var tile, image, image_index, x, y;
	var player = 1, container = 2;
	var collider, layer, object;
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];
		if (layer.type == "tilelayer") {
			/*
			tilemap = game.instantiatePrefab("tilelayer");
			tilemap_component = game.entities.get(tilemap, "tilemap");
			tilelayer_position = game.entities.get(tilemap, "position");
			tilelayer_position.z = i;
			tilemap_component.layer_index = i;
			tilemap_component.layer = layer.name;
			if (tilemap < background_layer) {
				background_layer = tilemap;
			}
			*/
			for (j = 0; j < layer.data.length; j++) {
				tile = game.instantiatePrefab("tile");
				image = game.entities.get(tile, "image");
				x = (j % file.width) * file.tilewidth;
				y = Math.floor(j / file.height) * file.tileheight;
				image_index = layer.data[j] - 1;
				image.name = file.tilesets[image_index].image;
				game.entities.set(tile, "position", { "x": x, "y": y });
			}
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
	game.entities.set(container, "size", map_size);
	game.entities.set(player, "constrainPosition", { "id": container });
};
