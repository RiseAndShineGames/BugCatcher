"use strict";
var prefabLibrary = require("prefabLib");

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

	// Tile layer variables
	var tile, image, image_index, tile_pos;
	var collider, layer, object;
	var cols = file.tilesets[0].imagewidth / file.tilesets[0].tilewidth;
	
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];

		// Render Tile Layers
		if (layer.type == "tilelayer") {
			for (j = 0; j < layer.data.length; j++) {

				// Tiled gives 1-based indexes. Subtract one for position math
				image_index = layer.data[j] - 1;
				if (image_index >= 0) {

					// Create tile and get properties
					tile = game.instantiatePrefab("tile");
					image = game.entities.get(tile, "image");
					tile_pos = game.entities.get(tile, "position");

					// Position based on index
					tile_pos.x = (j % file.width) * file.tilewidth;
					tile_pos.y = Math.floor(j / file.height) * file.tileheight;

					// Character position z: 1 so anything without background true will layer over player
					tile_pos.z = (layer.properties.Background == "True") ? -1 : 2;

					// Select which "tile" of the tileset image to render
					image.name = file.tilesets[0].image;
					image.sourceWidth = file.tilesets[0].tilewidth;
					image.sourceHeight = file.tilesets[0].tileheight;
					image.destinationWidth = file.tilesets[0].tilewidth;
					image.destinationHeight = file.tilesets[0].tileheight;
					image.sourceX = (image_index % cols) * file.tilesets[0].tilewidth;
					image.sourceY = Math.floor(image_index / cols) * file.tilesets[0].tileheight;
					
				}
			}
		}

		// Loop object layer for collisions and spawn point
		// TODO Bug spawn chance triggers, doors, switches (buttons), warp zones, NPC Spawn points
		if (layer.type == "objectgroup") {
			for (var j = 0; j < layer.objects.length; j++) {
				object = layer.objects[j];

				// Collision box prefabs
				if (object.properties.Collidable == "True") {
					collider = game.instantiatePrefab("collision");
					game.entities.set(collider, "size", { "width": object.width, "height": object.height });
					game.entities.set(collider, "position", { "x": object.x, "y": object.y });
				}

				// Spawn points
				if (object.properties.Spawn == "True") {
					game.entities.set(player, "position", { "x": object.x, "y": object.y });
				}
			}
		}
	}

	// Define map bounding box for contrain position
	var player = 1, container = 2;
	var map_size = {
		"width": file.width * file.tilewidth,
		"height": file.height * file.tileheight
	};
	game.entities.set(container, "size", map_size);
	game.entities.set(player, "constrainPosition", { "id": container });
};
