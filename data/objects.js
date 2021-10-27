var objectsDb = {
	hero : {
		w: 60,
		h: 80,
		jumpHeight: 18,
		jumpSpeed: 10,
		speed: 7,
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
		anim:
			[
				{ name: "runR", src: "./img/sprite.png", frames: 8 },
				{ name: "runL", src: "./img/sprite-revers.png", frames: 8 },
				{ name: "idleR", src: "./img/sprite-costs.png", frames: 1 },
				{ name: "idleL", src: "./img/sprite-costs-revers.png", frames: 1 }
			]
	}
}


