var level_2 = {
	// roomOne: {
		obstacles: [
			// {
			// 	type: "home_platform",
			// 	block: true,
			// 	destroy: false,
			// 	x: 0,
			// 	y: 500,
			// 	w: 1200,
			// 	h: 15,
			// 	color: "#964b00"
			// },
			// {x: 0,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 100,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 200,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 300,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 400,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 500,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 600,y: 500,	type: "platform", props: objectsDb.ground_m},
			// {x: 700,y: 500,	type: "platform", props: objectsDb.ground_r},
			// {x: 600,y: 400,	type: "barrel", props: objectsDb.barrel, action: "pickCoin"},
			// // barrel
			// {
			// 	type: "exit",
			// 	block: true,
			// 	destroy: false,
			// 	x: 2,
			// 	y: 150,
			// 	w: 150,
			// 	h: 250,
			// 	color: "#8b00ff",
			// 	action: "tp_home"
			// }

		],
		enemy: [
		],
		map: [
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,21,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,20,0,3,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,20,0,0,3],
[5,2,2,2,2,2,2,2,2,2,2,2,2,7,0,0,0,0,4,2,2,2,0,0,0,4,2,2,2,2,2,2,2,2,2,2,7,0,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,2,2,2,2,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,0,0,0,0,3,2,2,2,2,2,2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,3],
[5,2,2,2,2,2,2,2,2,2,2,2,2,2,7,0,0,0,30,0,21,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,3,6,6,1,0,0,0,0,2,2,2,2,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,3,6,6,1,0,0,0,0,0,0,0,0,3,0,0,0,2,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,30,30,0,0,0,21,0,3],
[1,0,0,0,0,0,0,0,0,3,6,6,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
[1,0,0,0,0,0,20,0,30,3,6,6,1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,3],
[1,0,0,0,2,2,2,2,2,3,6,6,1,0,0,2,2,0,0,0,0,0,0,0,0,3,0,0,0,3],
[1,0,0,0,0,0,0,0,0,3,6,6,1,0,0,0,6,0,0,30,0,0,30,0,0,3,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[5,2,2,2,2,2,7,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0,0,3],
[1,0,0,0,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
[1,0,0,0,0,30,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,0,3],
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]


		]
	// }
}
// x: 388, y: 635