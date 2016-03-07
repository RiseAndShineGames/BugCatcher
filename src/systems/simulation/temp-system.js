"use script";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entity_pos = game.entities.get(entity, "position");
		var entity_size = game.entities.get(entity, "size");
		if (game.inputs.buttonPressed("action")) {
			if (game.inputs.mouse.x > entity_pos.x 
				&& game.inputs.mouse.x < entity_pos.x + entity_size.width
				&& game.inputs.mouse.y > entity_pos.y 
				&& game.inputs.mouse.y < entity_pos.y + entity_size.height) {
				game.switchScene("main", game.arguments);
			}
		}
	}, "return");
};
