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

				{ name: "runR", src: "./img/elf_run.png", frames: 9 },
				// { name: "runR", src: "./img/warrior_run.png", frames: 8 },

				{ name: "runL", src: "./img/elf_run_revers.png", frames: 9},
				{ name: "idleR", src: "./img/Elf_IDLE.png", frames: 1},
				{ name: "idleL", src: "./img/Elf_IDLE_revers.png", frames: 1 },
				{ name: "upR", src: "./img/Elf_JUMP.png", frames: 1 },
				{ name: "upL", src: "./img/Elf_JUMP_revers.png", frames: 1 },
				{ name: "downR", src: "./img/Elf_IDLE.png", frames: 1 },
				{ name: "downL", src: "./img/Elf_IDLE_revers.png", frames: 1 }
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
	20: {
		w:20,
		h:20,
		state: "idle",
		block: true,
		action: "pickCoin",
		anim: 
			[
				{name: "idle", src: "./img/coin_4.png", frames: 5}
			]
	},
	// 30: {
	// 	w:150,
	// 	h:150,
	// 	state: "idle",
	// 	anim: 
	// 		[
	// 			{name: "idle", src: "./img/chest_1.png", frames: 1}
	// 		]
	// },
	21: {
		w:150,
		h:150,
		state: "idle",
		block: true,
		action: "pickCoin",
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
		attackSpeed: 50,
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

	},
		30: {
		w: 160,
		h: 120,
		hp: 50,
		ai: true,
		speed: 3,
		armor: 10,
		damage: 10,
		attackSpeed: 50,
		state: "idle",
		direction: "",
		actions: {},
		loot: [{name: 'coin', chance: 30}, {name: 'chest', chance: 70}],
		grav : 1,
			anim: 	
		[
			{name: "idle", src: "./img/slime-2.png", frames: 4, speed: 12},
			{name: "hit", src: "./img/slime-hit.png", frames: 2, speed: 12}
			// {name: "idleR", src: "./img/strike_1R.png", frames: 18, speed: 2},
			// {name: "idleL", src: "./img/strike_1L.png", frames: 18, speed: 2}
		]

	},
	ground_m: {
		w: 100,
		h: 100,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_11.png", frames: 1 }
			]
	},
	ground_r: {
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_12.png", frames: 1 }
			]
	},
	barrel: {
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Wooden_Barrel.png", frames: 1 }
			]
	},
	bubble: {
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Bubble.png", frames: 1 }
			]
	},
	1: {
		name:'left_wall', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_13.png", frames: 1 }
			]
	},
	2: {
		name:'floor_m', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_11.png", frames: 1 }
			]
	},
	3: {
		name:'right_wall', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground-Additional_01.png", frames: 1 }
			]
	},
	7: {
		name:'floor_right', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_12.png", frames: 1 }
			]
	},
	4: {
		name:'floor_left', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_10.png", frames: 1 }
			]
	},
	5: {
		name:'floor_left_corner', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_07.png", frames: 1 }
			]
	},
	6: {
		name:'full_block', 
		w: 100,
		h: 100,
		destroy: false,
		block: true,
		state: "idle",
		anim:
			[
				{ name: "idle", src: "./img/platforms/Ground_06.png", frames: 1 }
			]
	}

}


