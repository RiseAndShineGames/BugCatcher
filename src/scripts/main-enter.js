"use strict";

/**
 * Tilesets
 * What I know:
 *		imagewidth
 *		imageheight
 *		tilewidth
 *		tileheight
 * cols = imagewidth / tilewidth;
 * rows = imageheight / tileheight;
 * var x = (i % cols) * tilewidth;
 * var y = Math.floor(i/rows) * tileheight;
 */

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	var tile, image, image_index, tile_pos, cols, tileset_index = 0;
	var player = 1, container = 2;
	var collider, layer, object;
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];
		if (layer.type == "tilelayer") {
			for (j = 0; j < layer.data.length; j++) {
				for (var k = 0; k < file.tilesets.length; k++) {
					if (layer.data[j] > file.tilesets[k].firstgid) {
						tileset_index = k;
					}
				}
				cols = file.tilesets[tileset_index].imagewidth / file.tilesets[tileset_index].tilewidth;
				image_index = layer.data[j] - file.tilesets[tileset_index].firstgid;
				if (image_index >= 0) {
					tile = game.instantiatePrefab("tile");
					image = game.entities.get(tile, "image");
					tile_pos = game.entities.get(tile, "position");
					tile_pos.x = (j % file.width) * file.tilewidth;
					tile_pos.y = Math.floor(j / file.height) * file.tileheight;
					tile_pos.z = (layer.properties.Background == "True") ? -1 : 2;
					image.name = file.tilesets[tileset_index].image;
					image.sourceX = (image_index % cols) * file.tilesets[tileset_index].tilewidth;
					image.sourceY = Math.floor(image_index / cols) * file.tilesets[tileset_index].tileheight;
					image.sourceWidth = file.tilesets[tileset_index].tilewidth;
					image.sourceHeight = file.tilesets[tileset_index].tileheight;
					image.destinationWidth = file.tilesets[tileset_index].tilewidth;
					image.destinationHeight = file.tilesets[tileset_index].tileheight;
				}
			}
		}
		if (layer.type == "objectgroup") {
			for (var j = 0; j < layer.objects.length; j++) {
				object = layer.objects[j];
				if (object.properties.Collidable == "True") {
					collider = game.instantiatePrefab("collision");
					game.entities.set(collider, "size", { "width": object.width, "height": object.height });
					game.entities.set(collider, "position", { "x": object.x, "y": object.y });
				}
				if (object.properties.Spawn == "True") {
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
