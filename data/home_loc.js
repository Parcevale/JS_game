var home_loc = {
	// roomOne: {
		enemy: [],
		obstacles: [
			{
				type: "home_platform",
				block: true,
				destroy: false,
				x: 0,
				y: 500,
				w: 1200,
				h: 15,
				color: "#964b00"
			},
			{
				type: "home_wall",
				block: true,
				destroy: false,
				x: 2,
				y: 0,
				w: 5,
				h: 500,
				color: "#964b00"
			},
			{
				type: "home_door",
				block: true,
				destroy: false,
				x: 800,
				y: 0,
				w: 15,
				h: 230,
				color: "#964b00"
			},
			{
				type: "home_roof",
				block: true,
				destroy: false,
				x: 0,
				y: 0,
				w: 800,
				h: 15,
				color: "#964b00"
			},
			{
				type: "safe_territory_block1",
				block: true,
				destroy: false,
				x: 0,
				y: 1000,
				w: 2000,
				h: 25,
				color: "#964b00"
			},
			{
				type: "safe_territory_block2",
				block: true,
				destroy: false,
				x: 2300,
				y: 1000,
				w: 2000,
				h: 25,
				color: "#964b00"
			},
			{
				type: "tp_level_1",
				// block: true,
				// destroy: false,
				x: 50,
				y: 800,
				// w: 150,
				// h: 150,
				props: objectsDb.bubble,
				// color: "#AFEEEE",
				action: "tp_level_1"
			},
						{
				type: "tp_level_2",
				// block: true,
				// destroy: false,
				x: 1667,
				y: 760,
				// w: 150,
				// h: 150,
				props: objectsDb.bubble,
				// color: "#AFEEEE",
				action: "tp_level_2"
			},
			{
				type: "coin1",
				block: true,
				destroy: false,
				x: 150,
				y: 150,
				state: "idle",
				props: objectsDb.coin,
				action: "pickCoin"
			},
			{
				type: "coin4",
				block: true,
				destroy: false,
				x: 300,
				y: 150,
				w: 20,
				h: 20,
				color: "#ffff00",
				action: "pickCoin"
			},
			{
				type: "chest",
				block: false,
				state: "idle",
				destroy: false,
				x: 50,
				y: 375,
				props: objectsDb.chest
			},
			{
				type: "torch",
				block: false,
				state: "idle",
				destroy: false,
				x: 150,
				y: 300,
				props: objectsDb.torch
			}
		]
	// }
}