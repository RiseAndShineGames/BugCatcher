"use strict";

/**
 * When looping through layer data index
 * var x = (index % width) * tileWidth;
 * var y = Math.floor(index/height) * tileHeight;
 */

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	var file = require("../../data/tilemap.json");
	var x, y, image, image_index, i, index;
	game.entities.registerSearch("sampleRendererSystem", ["tilemap", "position", "size"]);
	ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
		index = game.entities.get(entity, "tilemap").layer_index;
		for (i = 0; i < file.layers[index].data.length; i++) {
			x = (i % file.width) * file.tilewidth;
			y = Math.floor(i / file.height) * file.tileheight;
			image_index = file.layers[index].data[i] - 1;
			image = game.images.get(file.tilesets[image_index].image);
			context.drawImage(image,x,y,file.tilewidth,file.tileheight);
		}
	}, "sampleRendererSystem");
};
