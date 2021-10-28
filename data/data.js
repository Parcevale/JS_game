var DATA = {
	gravity: 10,
	windowWidth: 1800,
	windowHeight: 1000,
	currentLocation: "home_loc",
	mainHero: {
		points: 0,
		x: 200,
		y: 520,
		state: "idleR",
		direction: "R",
		props: objectsDb.hero,
		color :"#0979db",
		actions: {}
	},
	actions: [
		{name : "moveRight", key: "KeyD"},
		{name : "moveLeft", key: "KeyA"},
		{name : "moveUp", key: "KeyW"},
		{name : "strike", key: "ControlRight"}

	],
	level_1: level_1,
	home_loc: home_loc
	
}

// 1100, y: 755