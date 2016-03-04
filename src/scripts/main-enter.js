"use strict";

/*
function clone(obj) {
	if (obj === undefined) {
		return undefined;
	}
	return JSON.parse(JSON.stringify(obj));
}
function splitFilmStripAnimations(animations) {
	Object.keys(animations).forEach(function(key) {
		var firstFrame = animations[key][0];
		if (firstFrame.filmstripFrames) {
			splitFilmStripAnimation(animations, key);
		}
	});
}
function splitFilmStripAnimation(animations, key) {
	var firstFrame = animations[key][0];
	if (firstFrame.properties.image.sourceWidth % firstFrame.filmstripFrames != 0) {
		console.warn("The \"" + key + "\" animation is " + firstFrame.properties.image.sourceWidth + " pixels wide and that is is not evenly divisible by " + firstFrame.filmstripFrames + " frames.");
	}
	for (var i = 0; i < firstFrame.filmstripFrames; i++) {
		var frameWidth = firstFrame.properties.image.sourceWidth / firstFrame.filmstripFrames;
		var newFrame = clone(firstFrame);
		newFrame.properties.image.sourceX = frameWidth * i;
		newFrame.properties.image.sourceWidth = frameWidth;
		animations[key].push(newFrame);
	}
	animations[key].splice(0,1);
}
*/

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
	var tile, image, image_index, tile_pos;
	var player = 1, container = 2;
	var collider, layer, object;
	var cols = file.tilesets[0].imagewidth / file.tilesets[0].tilewidth;
	for (var i = 0; i < file.layers.length; i++) {
		layer = file.layers[i];
		if (layer.type == "tilelayer") {
			for (j = 0; j < layer.data.length; j++) {
				image_index = layer.data[j] - 1;
				if (image_index >= 0) {
					tile = game.instantiatePrefab("tile");
					image = game.entities.get(tile, "image");
					tile_pos = game.entities.get(tile, "position");
					tile_pos.x = (j % file.width) * file.tilewidth;
					tile_pos.y = Math.floor(j / file.height) * file.tileheight;
					tile_pos.z = (layer.properties.Background == "True") ? -1 : 2;
					image.name = file.tilesets[0].image;
					image.sourceWidth = file.tilesets[0].tilewidth;
					image.sourceHeight = file.tilesets[0].tileheight;
					image.destinationWidth = file.tilesets[0].tilewidth;
					image.destinationHeight = file.tilesets[0].tileheight;
					image.sourceX = (image_index % cols) * file.tilesets[0].tilewidth;
					image.sourceY = Math.floor(image_index / cols) * file.tilesets[0].tileheight;
					console.log(image);
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
	console.log(game.entities);
};
