var home_loc = {
	roomOne: {
		enemy: [],
		obstacles: [
			{
				type: "platform1",
				block: true,
				destroy: false,
				x: 0,
				y: 200,
				w: 1500,
				h: 5,
				color: "#964b00"
			},
			{
				type: "tp_level_1",
				block: true,
				destroy: false,
				x: 630,
				y: 120,
				w: 30,
				h: 30,
				color: "#AFEEEE",
				action: "tp_level_1"
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
				block: true,
				state: "idle",
				destroy: false,
				x: 400,
				y: 150,
				props: objectsDb.chest
				// action: "pickCoin"
			}
		]
	}
}