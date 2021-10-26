var DATA = {
	gravity: 10,
	windowWidth: 1000,
	windowHeight: 1000,
	mainHero: {
		x: 100,
		y: 230,
		w: 30,
		h: 40,
		jumpHeight: 10,
		jumpSpeed: 10,
		speed: 5,
		color :"#0979db",
		actions: {}
	},
	actions: [
		{name : "moveRight", key: "KeyD"},
		{name : "moveLeft", key: "KeyA"},
		{name : "moveUp", key: "KeyW"}
	],
	roomOne: {
		obstacles: [
			{
				type: "platform1",
				x: 0,
				y: 300,
				w: 150,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform2",
				x: 250,
				y: 400,
				w: 150,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform3",
				x: 0,
				y: 495,
				w: 700,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform4",
				x: 800,
				y: 600,
				w: 700,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform5",
				x: 0,
				y: 1000,
				w: 1500,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform3",
				x: 555,
				y: 495,
				w: 495,
				h: 5,
				color: "#964b00"
			},
			{
				type: "box",
				x: 250,
				y: 230,
				w: 50,
				h: 80,
				color: "#7fffd4"
			},
			{
				type: "wall",
				x: 0,
				y: 0,
				w: 5,
				h: 300,
				color: "#7fffd4"
			}
		]
	}
}