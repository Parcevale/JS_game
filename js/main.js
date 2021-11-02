
//var a = [{ src: './img/backgraund.jpg' }];
var a = [{ src: './img/cave-background-2.jpg' }];
// var a = [{ src: './img/platforms/Ground-Additional_07.png' }];


$.when(
	$.getScript("./data/objects.js"),
	$.getScript("./data/level_1.js"),
	$.getScript("./data/level_2.js"),
	$.getScript("./data/home_loc.js"),
	$.getScript("./data/data.js"),
	$.getScript("./data/utils.js"),
	$.Deferred(function (deferred) {
		$(deferred.resolve);
	})
).done(function () {
	console.log("sources.lenght");
	loadResources(createSources(objectsDb), DATA, loadBackground);
	
	function loadBackground() {
		loadResources(a, null, startGame)
	}
	
	//([{ src: './img/backgraund.jpg' }])
});

var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var aObjects = [];


function startGame() {
	aObjects.push(DATA.mainHero);
	//DATA.currentLocation = "home_loc";
	// DATA.currentLocation = "level_1";
	setLocation("home_loc");
	cnv.setAttribute('width', DATA.windowWidth);
	cnv.setAttribute('height', DATA.windowHeight);
	setInterval(mainLoop,1000/60);
}

// список вынести


var clear = function() {
	//ctx.fillStyle = "#E3E3E3";
	ctx.fillRect(0,0,DATA.windowWidth,DATA.windowHeight);
}
var draw = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h,color);
} 

function getCam() {
	var x = DATA.mainHero.x - DATA.windowWidth/2 > 1 ? DATA.mainHero.x - DATA.windowWidth/2 : 1;
	var y = DATA.mainHero.y - DATA.windowHeight/2 > 1 ? DATA.mainHero.y - DATA.windowHeight/2 : 1;
	return {x, y}
}
function drawUI() {
	const ptrn = ctx.createPattern(a[0].img, 'repeat');

	ctx.fillStyle = ptrn;
	ctx.font = "15px serif";
	// ctx.fillText(DATA.mainHero.points,  40, 30);
	// ctx.strokeText(DATA.mainHero.points,  40, 30);
	
	//draw stats
	ctx.strokeStyle = "blue";
	ctx.strokeRect(30, 30, 300, 200);
	ctx.fillStyle = 'white';
	ctx.fillRect(31, 31, 298, 198);
	ctx.fillStyle = 'black';
	ctx.fillText('Level ' + DATA.mainHero.level,  50, 50);
	ctx.fillText('HP ' + DATA.mainHero.hp,  50, 70);
	ctx.fillText('Exp ' + DATA.mainHero.exp + " \\ " + DATA.expTable[DATA.mainHero.level],  50, 90);
	ctx.fillText('Money ' + DATA.mainHero.points,  50, 110);

	//inventary;
	if (DATA.mainHero.inventary) {
		ctx.strokeStyle = "blue";
		ctx.strokeRect(530, 30, 300, 200);
		ctx.fillStyle = 'white';
		ctx.fillRect(531, 31, 298, 198);
		DATA.mainHero.items.forEach(function(oItem, idx) {
			ctx.fillStyle = 'black';
			ctx.fillText(oItem.name,  540, 50 + idx*20);
		})
	}
		if (DATA.mainHero.equipment) {
		ctx.strokeStyle = "blue";
		ctx.strokeRect(930, 30, 300, 200);
		ctx.fillStyle = 'white';
		ctx.fillRect(930, 31, 298, 198);
	}
}

var mainLoop = function () {
	// var currentLocation = ;
	clear();
	ctx.drawImage(a[0].img,-getCam().x/15,0,DATA.windowWidth*2, DATA.windowHeight);

	// console.log(a);
	//ctx.canvas.width = window.innerWidth;
	//ctx.canvas.height = window.innerHeight;
	// ctx.drawImage(a[0].img, 0,0);

	DATA.world.obstacles.forEach(function (obj,n,array) {
		if (obj.destroy) clearArray(array, obj);
		if (obj.props && obj.props.anim && !obj.destroy) {
			drawAnimation(obj);
		}
		// if (obj.img && !obj.tst) ctx.drawImage(obj.img, obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h);
		if (!obj.destroy && !obj.img && !obj.props) draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);

	});
	DATA.world.enemy.forEach(function(obj,n,array) {
		if (obj.destroy) clearArray(array, obj);
	});
	DATA.world.enemy.forEach(calcObjects);
	DATA.world.enemy.forEach(function (obj){
		if (obj.props.anim && !obj.destroy) {
			drawAnimation(obj);
		}
	})
	aObjects.forEach(function(obj,n,array) {
		// if (obj.destroy) clearArray(array, obj);//походу героя удаляет при убийстве моба
	});
	aObjects.forEach(calcObjects);
	aObjects.forEach(function (obj) {
		if (!obj.destroy) {
			drawAnimation(obj);
		}
		// drawAnimation(obj)
	})
	drawUI();
}
function clearArray(array, object){
	if (~array.indexOf(object)) {
		console.log('нашел', object);
		array.splice(array.indexOf(object), 1);
	}
}

function drawAnimation(obj) {
	var oAnim = obj.props.anim.filter(x => x.name === obj.state)[0];
	var currentFrame = 1;
	var speed = oAnim.speed || 5;
	// if (oAnim.frames > 1) {// убрать просчет если всего 1 фрейм
		var framePxls = oAnim.img.width/oAnim.frames;//количество пикселей в кадре
		obj.frame = obj.frame || 1;//текущий кадр, если нет то первый.
		obj.frame = obj.frame >= (oAnim.frames-1)*speed ? 1 : obj.frame + 1;//
		currentFrame = Math.floor(obj.frame/speed) * framePxls;
	// }

	// console.log('anim',framePxls, obj.frame);
	ctx.drawImage(
			oAnim.img,				//img
			currentFrame,		//позиция начала по x
			0,		//позиция начала по y
			framePxls,					//длина отрезка по x
			oAnim.img.height, 					//высота отрезка
			obj.x - getCam().x ,						//позиция изображения (где в мире) по x
			obj.y - getCam().y,						//позиция изображения (где в мире) по y
			obj.props.w,// * obj.scale,						// ширина изображения, сжимает до указанных размеров
			obj.props.h						// высота изображения
			);

}

//скомпоновать keyup и keydown


function calcObjects(Obj){
	if (Obj.destroy) return;
	var actions = Obj.actions;
	Obj.cooldown && --Obj.cooldown;
	// console.log(Obj.cooldown);
	if (actions.inventary) {
		actions.inventary = false;
		Obj.inventary = !Obj.inventary;
	}
		if (actions.equipment) {
		actions.equipment = false;
		Obj.equipment = !Obj.equipment;
	}
	if (Obj.cooldown) return;
	if (Obj.ai) calcAi(Obj);

	if (!actions.jump && !Obj.cooldown) {
		if (checkMoveDown(Obj)  ) {
			Obj.y = Obj.y + checkMoveDown(Obj)*Obj.props.grav;
		} else {
			addAnim(Obj, "idle");
			// actions.jump = false;
		}
			
	}

	if (actions.moveRight && !Obj.cooldown) {
		// console.log('check move right');
		if (checkMoveRight(Obj))
		Obj.x = Obj.x + checkMoveRight(Obj);
	}

	if (actions.moveLeft && !Obj.cooldown) {
		// console.log('check move left');
		if (checkMoveLeft(Obj))
		Obj.x = Obj.x - checkMoveLeft(Obj);

	}

	if (actions.moveUp && !Obj.cooldown) {
		// console.log("checkJump", actions.jump);
		if ( actions.jump != 2) {//checkJump(Obj) &&
			actions.jump = actions.jump ? actions.jump + 1 : 1;
			actions.jumpTime = Obj.props.jumpHeight;
		}
	}

	if (actions.jump && !Obj.cooldown) {
		if (actions.jumpTime) {
			actions.jumpTime = actions.jumpTime - 1
			if (checkMoveUp(Obj) && actions.jumpTime > 5) {

				Obj.y = Obj.y - checkMoveUp(Obj);
			}
		} else {
			actions.jump = false;
		} 
	}
	if (actions.strike && !Obj.cooldown) {

		strike(Obj)
	}
	if (actions.mobStrike && !Obj.cooldown) {
		mobStrike(Obj)
	}
	if (actions.attack) {
		// console.log('check attack');
		checkAttack(Obj);
	}
	if (actions.useItem) {
		// console.log('check attack');
		useItem(Obj);
	}
}

function strike(Obj) {
	Obj.cooldown = objectsDb.strike.time + Obj.attackSpeed;
	addAnim(Obj, "strike");
	var aObj = aObjects; //DATA[DATA.currentLocation].roomOne.obstacles
	var direction = Obj.direction == "R" ? 1 : -1;
	var strikeObj = {
		damage: Obj.props.damage,
		x: Obj.x + 100 * direction,
		y: Obj.y + 120,
		state: "idle" + Obj.direction,
		// grav: 0.3,
		props: objectsDb.arrow,
		projectile: true,
		actions: {attack: true}
	}
	if (Obj.direction == "R") {
		strikeObj.actions.moveRight = true;
	} else strikeObj.actions.moveLeft = true;
	// strikeObj.actions = Obj.direction == "R" ? 1 : -1;
	for(var k in strikeObj.props) strikeObj[k]=strikeObj.props[k];
	// var strikeObj = {
	// 	damage: Obj.props.damage,
	// 	x: Obj.x + 100 * direction,
	// 	y: Obj.y + 70,
	// 	state: "idle" + Obj.direction,
	// 	props: objectsDb.strike,
	// 	actions: {attack: true}
	// }
	// aObj.push(strikeObj);
	function performStrike() {
		aObj.push(strikeObj);
}	

	function clearStrike() {
		aObj.splice(aObj.indexOf(strikeObj), 1);

	}
	setTimeout(performStrike, Obj.attackSpeed*70);
	setTimeout(clearStrike, 5000);

}

function mobStrike(Obj) {
	Obj.cooldown = objectsDb.strike.time + Obj.attackSpeed;
	var aObj = DATA.world.enemy;
	var direction = Obj.direction == "R" ? 1 : -1;
	addAnim(Obj, "strike");
	console.log(Obj, "strike");
	var strikeObj = {
		damage: Obj.props.damage,
		x: Obj.x + 100 * direction,
		y: Obj.y + 10,
		state: "idle" + Obj.direction,
		props: objectsDb.strike,
		mob: true,
		actions: {attack: true}
	}
	aObj.push(strikeObj);

	function clearStrike() {
		aObj.splice(aObj.indexOf(strikeObj), 1);

	}
	setTimeout(clearStrike, objectsDb.strike.time * 5);

}


function checkJump(Obj){
	// return !checkMoveDown(Obj)
	false;
}
function checkMoveRight(Obj){ 
	var aObs = DATA.world.obstacles;
	var nMove = Obj.props.speed;
	// Obj.scale = 1;
	Obj.direction = "R";
	addAnim(Obj, "run");
	// Obj.state = "runR";
	// var obsw = oObs.props ? oObs.props.w : oObs.w;
	aObs.every(function (oObs){
	var obsh = oObs.props ? oObs.props.h : oObs.h;
		if (Obj.y + Obj.props.h > oObs.y && Obj.y < oObs.y + obsh && Obj.x < oObs.x) {// проверка по высоте, и, я слева
			nMove = checkCollision(Obj.x,Obj.props.w,oObs.x, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkMoveLeft(Obj){ 
	var aObs = DATA.world.obstacles;
	var nMove = Obj.props.speed;
	// Obj.scale = -1;
	Obj.direction = "L";
	addAnim(Obj, "run");
	// Obj.state = "runL";
	aObs.every(function (oObs){
	var obsh = oObs.props ? oObs.props.h : oObs.h;
	var obsw = oObs.props ? oObs.props.w : oObs.w;
		if (Obj.y + Obj.props.h > oObs.y && Obj.y < oObs.y + obsh && Obj.x > oObs.x) {// проверка по y
			nMove = checkCollision(oObs.x,obsw,Obj.x, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}


function checkMoveUp(Obj) {
	var aObs = DATA.world.obstacles;
	var nMove = Obj.props.jumpSpeed;
	// console.log(nMove);d

	Obj.state = "up" + Obj.direction;
	aObs.every(function (oObs){
	var obsw = oObs.props ? oObs.props.w : oObs.w;
		if (Obj.x + Obj.props.w > oObs.x && Obj.x < oObs.x + obsw && Obj.y > oObs.y) {// проверка по x
			nMove = checkCollision(oObs.y,oObs.h,Obj.y, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkMoveDown(Obj){ 
	var aObs = DATA.world.obstacles;
	var nMove = DATA.gravity;
	addAnim(Obj, "down");
	// Obj.state = "down" + Obj.direction;
	aObs.every(function (oObs){
	var obsw = oObs.props ? oObs.props.w : oObs.w;
	var objw = Obj.props ? Obj.props.w : Obj.w;
	var objh = Obj.props ? Obj.props.h : Obj.h;
		if (Obj.x + objw > oObs.x && Obj.x < oObs.x + obsw && Obj.y < oObs.y) {// проверка по x
			nMove = checkCollision(Obj.y,objh,oObs.y, Obj,oObs, nMove);
			// console.log(nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkCollision(a1,a2,b1, obj,obs, nMove) {
	temp = Math.abs((a1 + a2) - b1); 
	nMove = obs.block ? Math.min(nMove,temp) : nMove;
	if (temp < 20 && obs.action && !obs.destroy) {
		obsActions(obs.action)(obj,obs);
	}
	return  nMove
}


function getInfo() {
	console.log(DATA.mainHero);
}
document.addEventListener('keydown', function (event) {
	let hero = DATA.mainHero;
	let actions = DATA.actions;
	console.log(event.code);
	let action = actions.filter(action => action.key === event.code);
	if (action[0]){
		hero.actions[action[0].name] = true;
	}
}.bind(this));

document.addEventListener('keyup', function (event) {
	let hero = DATA.mainHero;
	let actions = DATA.actions;
	let action = actions.filter(action => action.key === event.code);
	if (action[0]){
		hero.actions[action[0].name] = false;
		// hero.state = "idle" + hero.direction;
	}
}.bind(this));


function obsActions(sName) {
	var a = {
		pickCoin,
		openChest,
		tp1,
		tp2,
		tp_home,
		tp_level_1,
		tp_level_2,
		showUseIcon,
		useItem
	}
	// console.log('action', sName);
	return a[sName]
}

// mainLoop();
//может события в отдельный файлик? 
function pickCoin(hero, obj) {
	// console.log('pickCoin');
	if (!hero.playable) return;
	hero.points = hero.points + 1;
	obj.destroy = true;
	obj.block = false;
	var Coin = new Audio('./Sounds/Coin.mp3');
	Coin.play();
}
function openChest(hero, obj) {
	// console.log('pickCoin');
	if (!hero.playable) return;

	addAnim(obj, "Open");
	// function openedChest () {
	// 	addAnim(obj, "idleOpen");
	// }
	// setTimeout(clearPick_icon, 1000);
	setTimeout(function() {addAnim(obj, "idleOpen");}, 300);
	obj.block = false;
	var openChest = new Audio('./Sounds/openChest.mp3');
	openChest.play();

}
function tp1(hero) {
	hero.x = 5000;
	hero.y = 2800;
}
function tp2(hero) {
	hero.x = 25;
	hero.y = 85;
}

function tp_home(hero){
	setLocation("home_loc");
	// DATA.currentLocation = "home_loc";
	hero.x = 20;
	hero.y = 100;
}
function tp_level_1(hero){
	setLocation("level_1");
	// DATA.currentLocation = "level_1";
	hero.x = 150;
	hero.y = 505;
}
function tp_level_2(hero){
	setLocation("level_2");
	hero.x = 140;
	hero.y = 1160;
	
}
function showUseIcon(hero, obj) {
	// console.log("showUseIcon",hero, obj);
	var obs = DATA.world.obstacles;
	var pick_icon = {
				block: false,
				destroy: false,
				x: obj.x,
				y: obj.y - 20,
				state:"idle",
				props: objectsDb[24]
	}

	function clearPick_icon() {
		if (obs.indexOf(pick_icon)) {
		obs.splice(obs.indexOf(pick_icon), 1);
		hero.useItem = null;
		}
	}
	hero.useItem =  obj;
	// clearpick_icon()
	// if (obs.indexOf(pick_icon)) clearpick_icon();
	obs.push(pick_icon);
	setTimeout(clearPick_icon, 1000);
}
function useItem(hero) {
	console.log('useItem');
	var obj = hero.useItem;
	if (!obj || obj.destroy) return;
	console.log('type', obj.type);
	if (obj.type == "item") {
		var temp = Object.assign({},obj);
		hero.useItem.destroy = true;
		hero.items.push(temp);
	} else if (obj.type = "container") {

		// obj.
		openChest(hero, obj);
	}
}

function addAnim(Obj, state){
	if (!Obj.props) return;
	if (Obj.props.anim.filter(x => x.name == state + Obj.direction)[0]) {
		Obj.state = state + Obj.direction;
		return;
	}
	if (Obj.props.anim.filter(x => x.name == state)[0]) {
		Obj.state = state;
	}

}

function checkAttack(Obj) {
	var aEnemy = Obj.mob ? aObjects : DATA.world.enemy;
	var aDots = getDots(Obj);
	var bHit = false;

	// console.log(aDots);
	aEnemy.forEach(function(oEnemy) {
		// console.log('oEnemy', oEnemy);
		if (oEnemy.destroy) return;
		bHit = aDots.some(function (oDot) {// тут что то не так, проверяет остальные попадания даже если попадание было
			if (checkDot(oDot.x, oDot.y, oEnemy.x, oEnemy.y, oEnemy.x + oEnemy.props.w, oEnemy.y + oEnemy.props.h)){
				// oEnemy.destroy = true;
				console.log('hit!', oEnemy); 
				return true;
			} return false;
		})
		if (bHit) {
			hit(Obj,oEnemy);
			if (Obj.projectile) Obj.destroy = true;
			Obj.destroy = true;
		}

	})

}
function checkDot(x, y, ax, ay,bx,cy){
	if (ax < x && x < bx && ay < y && y < cy ) return true; 
	else return false; 
}
function getDots(obj){
	var aDots = [
		{x:obj.x,              y:obj.y},
		{x:obj.x+obj.props.w,  y: obj.y},
		{x:obj.x,                  y:obj.y + obj.props.h},
		{x:obj.x+obj.props.w,  y:obj.y + obj.props.h},
		{x:obj.x,                  y:obj.y + obj.props.h/2},
		{x:obj.x+obj.props.w,  y:obj.y + obj.props.h/2}
	]
	return aDots;

}
function hit(source,target) {
	var dmg = source.damage-(source.damage*(target.armor/100));
	target.hp = target.hp - dmg;
	console.log('hit');
	addAnim(target, 'hit');
	showHP(target);
	if (target.hp <= 0) kill(target);
	console.log("target",target);
	target.cooldown = 100;
	function restoreAnim () {
		addAnim(target, 'idle');
	}
	var Hit = new Audio('./Sounds/Hit.mp3');
	Hit.play();
	setTimeout(restoreAnim, 200);
	//show dmg.


	// victim.
}

function showHP(target){
	var obs = DATA.world.obstacles;
	var hp = target.hp;
	console.log("hp", hp);
	var width = (hp*100)/target.props.hp;
	var color = width > 30 ? "#0fed0f" : "#ed0f23";
	var bar = 	{
				type: "health bar",
				block: false,
				destroy: false,
				x: target.x,
				y: target.y - 10,
				w: width ,
				h: 5,
				color: color
			}
	target.healthBar = bar;
	
	function clearBar() {
		if (obs.indexOf(bar)) {
		obs.splice(obs.indexOf(bar), 1);
		}
	}
	// clearBar()
	// if (obs.indexOf(bar)) clearBar();
	obs.push(bar);
	setTimeout(clearBar, 600);
}

//может x y еще добавить
function setLocation(sName){
	if (!DATA[sName]) return;
	var enemy = DATA[sName].enemy; 
	var obs = DATA[sName].obstacles; 
	var aMap = DATA[sName].map;

	enemy.forEach(function(oEnemy) {
		for(var k in oEnemy.props) oEnemy[k]=oEnemy.props[k];
	})
	// obs.forEach(function(obs) {
	// 	if (obs.props) for(var k in obs.props) obs[k]=obs.props[k];
	// })
	if (aMap){
		aMap.forEach(function(row, rowIndx) {
			row.forEach(function(cell, ind){
				if (!cell) return; 
				var ix = objectsDb[cell].x || 0;
				var shift_y =  objectsDb[cell].shift_y || 0;
				if (!objectsDb[cell].ai) obs.push({x: (100 * ind) + ix,y: (100 * rowIndx) + shift_y, props: objectsDb[cell]});
				if (objectsDb[cell].ai) enemy.push({x: 100 * ind ,y: (100 * rowIndx) -60, props: objectsDb[cell]});
			})
		})
	}
	enemy.forEach(function(enemy) {
		if (enemy.props) for(var k in enemy.props) enemy[k]=enemy.props[k];
	})
	obs.forEach(function(obs) {
		if (obs.props) for(var k in obs.props) obs[k]=obs.props[k];
	})


	// console.log(obs);
	var oLocation = {
		name: sName,
		obstacles: obs,
		enemy : enemy
	}; 
	DATA.world = oLocation;
}
function addExp(exp) {
	DATA.mainHero.exp += exp;
	if (DATA.mainHero.exp >= DATA.expTable[DATA.mainHero.level]) {
		DATA.mainHero.level += 1;
		//play some sound
		//add stats
	}
}
function kill(target) {
	if (!target.ai) {
		tp_home(target);
		return;
	}
	addExp(target.exp);
	// DATA.mainHero.exp += target.exp;

	var aLoot;
	if (target.loot){
		aLoot = target.loot.filter(function(item) {
			// Math.floor(Math.random() * 100)
			return item.chance > Math.floor(Math.random() * 100);
		})
	}
	aLoot.forEach(function(item) {
		var oDropItem = {
				type: "coinMob",
				block: true,
				destroy: false,
				x: target.x + target.w/2,
				y: target.y,
				state: "idle",
				props: objectsDb[item.name],
				action: "pickCoin"
		};
		console.log(oDropItem);
		DATA.world.obstacles.push(oDropItem);
	})
	console.log(aLoot);
	target.destroy = true;
}
function calcAi(Obj) {
	if (Obj.cooldown) console.log('cd', Obj.cooldown);
	// console.log(Obj.cooldown)
	if (!Obj.cooldown) {
		// console.log(Obj.cooldown);
		if (checkEnemy(Obj)) {
			Obj.aggresive = true;
			console.log('check enemy',checkEnemy(Obj)); 
			Obj.actions = {};
			Obj.actions[checkEnemy(Obj)] = true;
			return;
		} 
		if (Obj.aggresive) {
			Obj.actions = {};
			Obj.aggresive = false;
		}	

	}
	
	var direction = Math.floor(Math.random() * 3); 
	var time = Math.floor(Math.random() * 5);

	var actions =  ["moveRight", "idle", "moveLeft"];

	function clearAction() {
		Obj.actions = {};
	}
	var tempDirection = Obj.actions.moveRight ? Obj.w : Obj.actions.moveLeft ? -Obj.w : 0;
	//проверка падения
	if (!Object.keys(Obj.actions)[0]){
			// console.log('set action',actions[direction], (time * 1000)/1000)
			Obj.actions[actions[direction]] = true;
			setTimeout(clearAction, time * 1000);
	}

	if (checkMoveDown(
		{
			x:Obj.x + tempDirection,
			y:Obj.y,
			w:Obj.w,
			h:Obj.h
		}
	)) {
		Obj.actions = {};
		// console.log('gonna fall');
		clearAction();
	}
	
}
//справа минус
function checkEnemy(Obj) {
	var hero = aObjects[0];

	var yDistance = Obj.y - hero.y;
	if (Math.abs(yDistance) > 200) return false;
	var distance = Obj.x - hero.x;
	if (Math.abs(distance) <150 ) return "mobStrike";
	if (Math.abs(distance) < 500 ) return distance > 0 ? "moveLeft" : "moveRight";
	// console.log("distance", distance);
}