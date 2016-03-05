"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	var file = require("../data/tilemap.json");
	// Tile layer variables
	var tile, image, image_index, tile_pos, cols, tileset_index = 0;
	var collider, layer, object;
	var player = 1, container = 2;

	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];

		// Render Tile Layers
		if (layer.type == "tilelayer") {
			for (j = 0; j < layer.data.length; j++) {
				
				// Select tileset index based on firstgid and image index
				// Set image index minus firstgid for positioning math
				for (var k = 0; k < file.tilesets.length; k++) {
					if (layer.data[j] > file.tilesets[k].firstgid) {
						tileset_index = k;
					}
				}
				cols = file.tilesets[tileset_index].imagewidth / file.tilesets[tileset_index].tilewidth;
				image_index = layer.data[j] - file.tilesets[tileset_index].firstgid;

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
					image.name = file.tilesets[tileset_index].image;
					image.sourceWidth = file.tilesets[tileset_index].tilewidth;
					image.sourceHeight = file.tilesets[tileset_index].tileheight;
					image.destinationWidth = file.tilesets[tileset_index].tilewidth;
					image.destinationHeight = file.tilesets[tileset_index].tileheight;
					image.sourceX = (image_index % cols) * file.tilesets[tileset_index].tilewidth;
					image.sourceY = Math.floor(image_index / cols) * file.tilesets[tileset_index].tileheight;
					
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
	var map_size = {
		"width": file.width * file.tilewidth,
		"height": file.height * file.tileheight
	};
	game.entities.set(container, "size", map_size);
	game.entities.set(player, "constrainPosition", { "id": container });
};
