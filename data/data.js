var DATA = {
	gravity: 20,
	windowWidth: 1800,
	windowHeight: 1000,
	currentLocation: "home_loc",
	mainHero: {
		playable: true,
		points: 0,
		x: 1007, y: 260,
		attackSpeed: 5,
		hp: 100,
		armor: 10,
		state: "idleR",
		direction: "R",
		exp: 0,
		level: 1,
		props: objectsDb.hero,
		color :"#0979db",
		actions: {},
		inventary: false,
		equipment: false,
	},
	actions: [
		{name : "moveRight", key: "KeyD"},
		{name : "moveLeft", key: "KeyA"},
		{name : "moveUp", key: "KeyW"},
		{name : "moveUp", key: "Space"},
		{name : "strike", key: "ControlRight"},
		{name : "inventary", key: "KeyI"},
		{ name: "equipment", key: "KeyO" },
		{ name: "inspect", key: "KeyF" },

	],
	level_1: level_1,
	home_loc: home_loc,
	level_2 : level_2
	
}

// 1100, y: 755 x: 1007, y: 260