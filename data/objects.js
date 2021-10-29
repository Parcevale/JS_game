var objectsDb = {
	hero : {
		w: 180,
		h: 240,
		jumpHeight: 22,
		jumpSpeed: 28,
		speed: 10,
		grav: 1,
		hp:100,
		armor: 10,
		damage: 10,
		anim: 
			[ 
				{name : "runR", src : "./img/sprite.png", frames: 8},
				{name : "runL", src : "./img/sprite-revers.png", frames: 8},
				{name : "idleR", src : "./img/sprite-costs.png", frames: 1},
				{name : "idleL", src: "./img/sprite-costs-revers.png", frames: 1 },
				{ name: "upR", src: "./img/sprite-up.png", frames: 1 },
				{ name: "upL", src: "./img/sprite-up-revers.png", frames: 1 },
				{ name: "downR", src: "./img/sprite-down.png", frames: 1 },
				{ name: "downL", src: "./img/sprite-down-revers.png", frames: 1 }
			]
	},
	ninja: {
		w: 60,
		h: 80,
		jumpHeight: 20,
		jumpSpeed: 10,
		speed: 7,
		grav: 1,
		anim:
			[
				{ name: "runR", src: "./img/sprite.png", frames: 8 },
				{ name: "runL", src: "./img/sprite-revers.png", frames: 8 },
				{ name: "idleR", src: "./img/sprite-costs.png", frames: 1 },
				{ name: "idleL", src: "./img/sprite-costs-revers.png", frames: 1 }
			]
	},
	cave_texture: {
		w: 850,
		h: 220,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/cave_texture.png", frames: 1 }
			]
	},
	coin: {
		w:20,
		h:20,
		anim: 
			[
				{name: "idle", src: "./img/coin_4.png", frames: 5}
			]
	},
	chest: {
		w:150,
		h:150,
		anim: 
			[
				{name: "idle", src: "./img/chest_1.png", frames: 1}
			]
	},
	strike: {
		w: 140,
		h: 140,
		grav: 0,
		anim: 	
			[
				{name: "idleR", src: "./img/strike_1R.png", frames: 18, speed: 2},
				{name: "idleL", src: "./img/strike_1L.png", frames: 18, speed: 2}
			],
		time: 30

	},
	slime: {
		w: 160,
		h: 120,
		hp: 50,
		ai: true,
		speed: 3,
		armor: 10,
		damage: 10,
		direction: "",
		loot: [{name: 'coin', chance: 30}, {name: 'chest', chance: 70}],
		grav : 1,
			anim: 	
		[
			{name: "idle", src: "./img/slime-2.png", frames: 4, speed: 12},
			{name: "hit", src: "./img/slime-hit.png", frames: 2, speed: 12}
			// {name: "idleR", src: "./img/strike_1R.png", frames: 18, speed: 2},
			// {name: "idleL", src: "./img/strike_1L.png", frames: 18, speed: 2}
		]

	}

}


