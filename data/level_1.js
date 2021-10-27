var level_1 = {
	roomOne: {
		obstacles: [
			{
				type: "exit",
				block: true,
				destroy: false,
				x: 2,
				y: 745,
				w: 7,
				h: 50,
				color: "#8b00ff",
				action: "tp_home"
			},
			{
				type: "platform1",
				block: true,
				destroy: false,
				x: 0,
				y: 685,
				w: 150,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform2",
				block: true,
				destroy: false,
				x: 0,
				y: 620,
				w: 100,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform3",
				block: true,
				destroy: false,
				x: 585,
				y: 650,
				w: 495,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform4",
				block: true,
				destroy: false,
				x: 750,
				y: 550,
				w: 200,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform5",
				block: true,
				destroy: false,
				x: 1180,
				y: 450,
				w: 100,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform6",
				block: true,
				destroy: false,
				x: 555,
				y: 450,
				w: 50,
				h: 5,
				color: "#964b00"
			},
			{
				type: "platform7",
				block: true,
				destroy: false,
				x: 300,
				y: 150,
				w: 250,
				h: 5,
				color: "#964b00"
			},
			{
				type: "partition1",
				block: true,
				destroy: false,
				x: 550,
				y: 0,
				w: 5,
				h: 550,
				color: "#964b00"
			},
			{
				type: "teleport1",
				block: true,
				destroy: false,
				x: 2,
				y: 585,
				w: 30,
				h: 30,
				img:"",
				color: "#AFEEEE",
				action: "tp1"
			},
			{
				type: "teleport2",
				block: true,
				destroy: false,
				x: 330,
				y: 120,
				w: 30,
				h: 30,
				color: "#AFEEEE",
				action: "tp2"
			},
			{
				type: "box1",
				block: true,
				destroy: false,
				x: 350,
				y: 715,
				w: 150,
				h: 80,
				color: "#964b00"
			},
			{
				type: "box2",
				block: true,
				destroy: false,
				x: 950,
				y: 500,
				w: 150,
				h: 300,
				color: "#964b00"
			},
			{
				type: "floor",
				block: true,
				destroy: false,
				x: 0,
				y: 795,
				w: 2000,
				h: 5,
				color: "#964b00"
			},
			{
				type: "wall",
				block: true,
				destroy: false,
				x: 0,
				y: 0,
				w: 5,
				h: 800,
				color: "#7fffd4"
			},
			{
				type: "coin",
				block: true,
				destroy: false,
				x: 70,
				y: 745,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "coin2",
				block: true,
				destroy: false,
				x: 55,
				y: 505,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "mob3",
				block: true,
				destroy: false,
				x: 570,
				y: 410,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "coin4",
				block: true,
				destroy: false,
				x: 1214,
				y: 410,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "mob1",
				block: true,
				destroy: false,
				x: 395,
				y: 675,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "mob2",
				block: true,
				destroy: false,
				x: 682,
				y: 610,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "heroL",
				tst:true,
				block: true,
				destroy: false,
				x: 682,
				y: 610,
				w: 20,
				h: 20,
				moveFrames: 8,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "dead zone",
				block: true,
				destroy: false,
				x: 1100,
				y: 745,
				w: 300,
				h: 50,
				color: "#ff0000",
				action: "tp2"
			}

		]
	}
}