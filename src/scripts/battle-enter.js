"use strict";

module.exports = function(game) { // eslint-disable-line no-unused-vars
	
	var initiativeHeight = game.canvas.height * 0.03;
	var initiativeWidth =  game.canvas.width * 0.4;


	var playerInitiative = game.instantiatePrefab("initiative");
	var enemyInitiative = game.instantiatePrefab("initiative");

	var battleMenu = game.instantiatePrefab("menu");
	var dialog = game.instantiatePrefab("dialog");

	game.entities.set(playerInitiative,"size",{ "width": initiativeWidth, "height": initiativeHeight });
	game.entities.set(enemyInitiative,"size",{ "width": initiativeWidth, "height": initiativeHeight });
	game.entities.set(dialog,"position",{ "x": 0, "y": game.canvas.height * (2 / 3), "z": 1 });
	game.entities.set(dialog,"size", { "width": game.canvas.width / 2, "height": game.canvas.height / 6 });

	game.entities.set(battleMenu,"position",{ "x": game.canvas.width / 2, "y": game.canvas.height * (2 / 3), "z": 1 });
	game.entities.set(battleMenu,"size", { "width": game.canvas.width / 2, "height": game.canvas.height / 6 });

	var piPos = game.entities.get(playerInitiative,"position");
	var eiPos = game.entities.get(enemyInitiative,"position");

	eiPos.x = initiativeHeight;
	eiPos.y = initiativeHeight;

	piPos.x = initiativeHeight; 
	piPos.y = initiativeHeight + initiativeHeight * 1.1;




};
