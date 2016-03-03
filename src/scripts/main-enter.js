"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	var tile, image, image_index, tile_pos;
	var player = 1, container = 2;
	var collider, layer, object;
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];
		if (layer.type == "tilelayer") {
			for (j = 0; j < layer.data.length; j++) {
				tile = game.instantiatePrefab("tile");
				image = game.entities.get(tile, "image");
				tile_pos = game.entities.get(tile, "position");
				tile_pos.x = (j % file.width) * file.tilewidth;
				tile_pos.y = Math.floor(j / file.height) * file.tileheight;
				tile_pos.z = (layer.name == "Background") ? -1 : 2;
				image_index = layer.data[j] - 1;
				image.name = file.tilesets[image_index].image;
			}
		}
		if (layer.type == "objectgroup") {
			for (var j = 0; j < layer.objects.length; j++) {
				if (layer.properties.Collidable) {
					object = layer.objects[j];
					collider = game.instantiatePrefab("collision");
					game.entities.set(collider, "size", { "width": object.width, "height": object.height });
					game.entities.set(collider, "position", { "x": object.x, "y": object.y });
				} else if (layer.properties.spawnPoint) {
					object = layer.objects[0];
					game.entities.set(player, "position", { "x": object.x, "y": object.y });
				}
			}
		}
	}
	var map_size = {
		"width": file.width * file.tilewidth,
		"height": file.height * file.tileheight
	};
	game.entities.set(container, "size", map_size);
	game.entities.set(player, "constrainPosition", { "id": container });
};
