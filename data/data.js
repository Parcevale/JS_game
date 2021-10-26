var DATA = {
	gravity: 10,
	windowWidth: 2000,
	windowHeight: 800,
	mainHero: {
		points: 2,
		x: 20,
		y: 745,
		w: 30,
		h: 40,
		jumpHeight: 17,
		jumpSpeed: 10,
		speed: 8,
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
				type: "exit",
				block: true,
				x: 2,
				y: 745,
				w: 7,
				h: 50,
				color: "#8b00ff"
			},
			{
				type: "platform1",
				block: true,
				x: 0,
				y: 685,
				w: 150,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform2",
				block: true,
				x: 0,
				y: 620,
				w: 100,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform3",
				block: true,
				x: 585,
				y: 650,
				w: 495,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform4",
				block: true,
				x: 750,
				y: 550,
				w: 200,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform5",
				block: true,
				x: 1180,
				y: 450,
				w: 100,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform6",
				block: true,
				x: 555,
				y: 450,
				w: 50,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform7",
				block: true,
				x: 300,
				y: 150,
				w: 250,
				h: 5,
				color: "#964b00"
			},
			{
				type: "partition1",
				block: true,
				x: 550,
				y: 0,
				w: 5,
				h: 550,
				color: "#964b00"
			},
			{
				type: "teleport1",
				block: true,
				x: 2,
				y: 585,
				w: 30,
				h: 30,
				img:"",
				color: "#AFEEEE"
			},
			{
				type: "teleport2",
				block: true,
				x: 330,
				y: 120,
				w: 30,
				h: 30,
				color: "#AFEEEE"
			},
			{
				type: "box1",
				block: true,
				x: 350,
				y: 715,
				w: 150,
				h: 80,
				color: "#964b00"
			},
			{
				type: "box2",
				block: true,
				x: 950,
				y: 500,
				w: 150,
				h: 300,
				color: "#964b00"
			},
			{
				type: "floor",
				block: true,
				x: 0,
				y: 795,
				w: 2000,
				h: 5,
				color: "#964b00"
			},
			{
				type: "wall",
				block: true,
				x: 0,
				y: 0,
				w: 5,
				h: 800,
				color: "#7fffd4"
			},
			{
				type: "coin",
				block: false,
				x: 70,
				y: 745,
				w: 20,
				h: 20,
				color: "#ffff00"
			}
		]
	}
}