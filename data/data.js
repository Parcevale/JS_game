var DATA = {
	gravity: 10,
	windowWidth: 1800,
	windowHeight: 1000,
	currentLocation: "level_1",
	mainHero: {
		points: 0,
		x: 20,
		y: 705,
		state: "idleR",
		direction: "R",
		props: objectsDb.hero,
		color :"#0979db",
		actions: {}
	},
	actions: [
		{name : "moveRight", key: "KeyD"},
		{name : "moveLeft", key: "KeyA"},
		{name : "moveUp", key: "KeyW"}
	],
	level_1: level_1,
	home_loc: home_loc
	
}

// 1100, y: 755