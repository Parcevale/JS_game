var level_1 = {
	// roomOne: {
		obstacles: [
			{
				type: "exit",
				block: true,
				destroy: false,
				x: 2,
				y: 545,
				w: 15,
				h: 250,
				color: "#8b00ff",
				action: "tp_home"
			},
			{
				type: "teleport1",
				// block: true,
				// destroy: false,
				x: 25,
				y: 185,
				// w: 150,
				// h: 150,
				// color: "#AFEEEE",
				props: objectsDb.bubble,
				action: "tp1"
			},
			{
				type: "teleport2",
				// block: true,
				// destroy: false,
				x: 5000,
				y: 2800,
				// w: 150,
				// h: 150,
				props: objectsDb.bubble,
				// color: "#AFEEEE",
				action: "tp2"
			},
			{
				type: "box1",
				block: true,
				destroy: false,
				x: 850,
				y: 580,
				//w: 850,
				//h: 220,
				color: "#964b00",
				props: objectsDb.cave_texture
			},
			{
				type: "box2",
				block: true,
				destroy: false,
				x: 1500,
				y: 1200,
				w: 1500,
				h: 700,
				color: "#964b00"
			},
			{
				type: "box3",
				block: true,
				destroy: false,
				x: 4300,
				y: 1600,
				w: 1100,
				h: 300,
				color: "#964b00"
			},
			{
				type: "box3",
				block: true,
				destroy: false,
				x: 4200,
				y: 3100,
				w: 2100,
				h: 300,
				color: "#964b00"
			},
			{
				type: "platform1",
				block: true,
				destroy: false,
				x: 0,
				y: 370,
				w: 600,
				h: 15,
				color: "#964b00"
			},
			{
				type: "platform2",
				block: true,
				destroy: false,
				x: 3275,
				y: 1600,
				w: 300,
				h: 15,
				color: "#964b00"
			},
			{
				type: "platform3",
				block: true,
				destroy: false,
				x: 2200,
				y: 3100,
				w: 600,
				h: 15,
				color: "#964b00"
			},
			{
				type: "platform4",
				block: true,
				destroy: false,
				x: 0,
				y: 3000,
				w: 800,
				h: 15,
				color: "#964b00"
			},
			{
				type: "partition",
				block: true,
				destroy: false,
				x: 3275,
				y: 0,
				w: 25,
				h: 1600,
				color: "#964b00"
			},
			{
				type: "partition2",
				block: true,
				destroy: false,
				x: 1100,
				y: 1500,
				w: 25,
				h: 800,
				color: "#964b00"
			},
			{
				type: "partition3",
				block: true,
				destroy: false,
				x: 3600,
				y: 2300,
				w: 25,
				h: 800,
				color: "#964b00"
			},
			{
				type: "edge",
				block: true,
				destroy: false,
				x: 5375,
				y: 0,
				w: 600,
				h: 3800,
				color: "#964b00"
			},

			{
				type: "floor",
				block: true,
				destroy: false,
				x: 0,
				y: 795,
				w: 2300,
				h: 15,
				color: "#964b00"
			},
			{
				type: "floor2",
				block: true,
				destroy: false,
				x: 2600,
				y: 795,
				w: 700,
				h: 15,
				color: "#964b00"
			}, 
			{
				type: "floor3",
				block: true,
				destroy: false,
				x: 0,
				y: 1500,
				w: 1100,
				h: 15,
				color: "#964b00"
			}, 
			{
				type: "floor4",
				block: true,
				destroy: false,
				x: 1100,
				y: 2300,
				w: 2500,
				h: 15,
				color: "#964b00"
			}, 
			{
				type: "floor5",
				block: true,
				destroy: false,
				x: 3775,
				y: 1900,
				w: 1600,
				h: 15,
				color: "#964b00"
			}, 
			{
				type: "floor6",
				block: true,
				destroy: false,
				x: 0,
				y: 3400,
				w: 5375,
				h: 15,
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
				type: "dead_zone",
				block: true,
				destroy: false,
				x: 1100,
				y: 745,
				w: 300,
				h: 50,
				color: "#ff0000",
				action: "tp2"
			},
			{
				type: "chest",
				block: false,
				state: "idle",
				destroy: false,
				x: 3100,
				y: 670,
				props: objectsDb.chest
				// action: "pickCoin"
			},
			{
				type: "chest",
				block: false,
				state: "idle",
				destroy: false,
				x: 5200,
				y: 1475,
				props: objectsDb.chest
				// action: "pickCoin"
			},
			{
				type: "chest",
				block: false,
				state: "idle",
				destroy: false,
				x: 150,
				y: 2870,
				props: objectsDb.chest
				// action: "pickCoin"
			}

		],
		enemy: [
			{
				type: "slime1",
				block: true,
				destroy: false,
				state:"idle",
				// hp: objectsDB.slime.hp,
				x: 860,
				y: 340,
				props: objectsDb.slime,
				actions: {}
			},
			{
				type: "slime2",
				block: true,
				destroy: false,
				state: "idle",
				// hp: objectsDB.slime.hp,
				x: 2900,
				y: 605,
				props: objectsDb.slime,
				actions: {}
			},
			{
				type: "slime3",
				block: true,
				destroy: false,
				state: "idle",
				// hp: objectsDB.slime.hp,
				x: 2000,
				y: 1300,
				props: objectsDb.slime,
				actions: {}
			},
			{
				type: "slime4",
				block: true,
				destroy: false,
				state: "idle",
				// hp: objectsDB.slime.hp,
				x: 3350,
				y: 1400,
				props: objectsDb.slime,
				actions: {}
			},
			{
				type: "slime5",
				block: true,
				destroy: false,
				state: "idle",
				// hp: objectsDB.slime.hp,
				x: 1000,
				y: 3200,
				props: objectsDb.slime,
				actions: {}
			}
		]
	// }
}
// x: 388, y: 635