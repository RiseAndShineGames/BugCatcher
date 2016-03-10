"use strict";

function wasLeft(entityLastPosition, entitySize, otherPosition) {
	return entityLastPosition.x + entitySize.width <= otherPosition.x;
}
function wasRight(entityLastPosition, otherPosition, otherSize) {
	return entityLastPosition.x >= otherPosition.x + otherSize.width;
}
function wasAbove(entityLastPosition, entitySize, otherPosition) {
	return entityLastPosition.y + entitySize.height <= otherPosition.y;
}
function wasBelow(entityLastPosition, otherPosition, otherSize) {
	return entityLastPosition.y >= otherPosition.y + otherSize.height;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
	ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
		var entityCollisions = game.entities.get(entity, "collisions");
		var entityPosition = game.entities.get(entity, "position");
		var entitySize = game.entities.get(entity, "size");
		var entityVelocity = game.entities.get(entity, "velocity");
		var entityLastPosition = game.entities.get(entity, "lastPosition");
		var timers = game.entities.get(entity, "timers");

		for (var i = 0; i < entityCollisions.length; i++) {
			var other = entityCollisions[i];
			var tiledProperties = game.entities.get(other, "tiledProperties");
			var otherPosition = game.entities.get(other, "position");
			var otherSize = game.entities.get(other, "size");

			if (typeof tiledProperties !== undefined) {

				if (tiledProperties.Collidable) {
					if (wasLeft(entityLastPosition, entitySize, otherPosition)) {
						entityPosition.x = otherPosition.x - entitySize.width;
						entityVelocity.x = 0;
					}
					if (wasRight(entityLastPosition, otherPosition, otherSize)) {
						entityPosition.x = otherPosition.x + otherSize.width;
						entityVelocity.x = 0;
					}
					if (wasAbove(entityLastPosition, entitySize, otherPosition)) {
						entityPosition.y = otherPosition.y - entitySize.height;
						entityVelocity.y = 0;
					}
					if (wasBelow(entityLastPosition, otherPosition, otherSize)) {
						entityPosition.y = otherPosition.y + otherSize.height;
						entityVelocity.y = 0;
					}
				} else if (tiledProperties.SpawnBug) {
					var spawnChance = tiledProperties.SpawnChance;
					var chance = getRandomInt(0, 9999);
					if (chance < spawnChance && !timers.spawn_delay.running) {
						var args = {
							"player_pos": entityPosition
						};
						game.switchScene("battle", args);
					}
				}

			}

		}
	}, "player");

};
