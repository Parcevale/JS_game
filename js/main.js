
//var a = [{ src: './img/backgraund.jpg' }];
var a = [{ src: './img/back_cave.jpg' }];


$.when(
	$.getScript("./data/objects.js"),
	$.getScript("./data/level_1.js"),
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
	setLocation("level_1");
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
	ctx.font = "30px serif";
	ctx.fillText(DATA.mainHero.points,  40, 30);
}

var mainLoop = function () {
	// var currentLocation = ;
	clear();
	// console.log(a);
	//ctx.canvas.width = window.innerWidth;
	//ctx.canvas.height = window.innerHeight;
	ctx.drawImage(a[0].img, 0,0);

	DATA.world.obstacles.forEach(function (obj) {

		if (obj.props && obj.props.anim && !obj.destroy) {
			drawAnimation(obj);
		}
		// if (obj.img && !obj.tst) ctx.drawImage(obj.img, obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h);
		if (!obj.destroy && !obj.img && !obj.props) draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);

	});
	DATA.world.enemy.forEach(calcObjects);
	DATA.world.enemy.forEach(function (obj){
		if (obj.props.anim && !obj.destroy) {
			drawAnimation(obj);
		}
	})
	aObjects.forEach(calcObjects);
	aObjects.forEach(function (obj) {
		drawAnimation(obj)
	})
	drawUI();
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
	if (Obj.ai) calcAi(Obj);
	if (!actions.jump && !Obj.cooldown) {
		if (checkMoveDown(Obj)  ) {
			Obj.y = Obj.y + checkMoveDown(Obj)*Obj.props.grav;
		} else {
			addAnim(Obj, "idle");
		}
			
	}

	if (actions.moveRight && !Obj.cooldown) {
		if (checkMoveRight(Obj))
		Obj.x = Obj.x + checkMoveRight(Obj);
	}

	if (actions.moveLeft && !Obj.cooldown) {
		if (checkMoveLeft(Obj))
		Obj.x = Obj.x - checkMoveLeft(Obj);

	}

	if (actions.moveUp && !Obj.cooldown) {
		if (checkJump(Obj)) {
			actions.jump = true;
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
		checkAttack(Obj);
	}
}

function strike(Obj) {
	Obj.cooldown = objectsDb.strike.time + Obj.attackSpeed;
	var aObj = aObjects; //DATA[DATA.currentLocation].roomOne.obstacles
	var direction = Obj.direction == "R" ? 1 : -1;
	var strikeObj = {
		damage: Obj.props.damage,
		x: Obj.x + 100 * direction,
		y: Obj.y + 70,
		state: "idle" + Obj.direction,
		props: objectsDb.strike,
		actions: {attack: true}
	}
	aObj.push(strikeObj);

	function clearStrike() {
		aObj.splice(aObj.indexOf(strikeObj), 1);

	}
	setTimeout(clearStrike, objectsDb.strike.time * 5);

}

function mobStrike(Obj) {
	Obj.cooldown = objectsDb.strike.time + Obj.attackSpeed;
	var aObj = DATA.world.enemy;
	var direction = Obj.direction == "R" ? 1 : -1;
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
	return !checkMoveDown(Obj)
}
function checkMoveRight(Obj){ 
	var aObs = DATA.world.obstacles;
	var nMove = Obj.props.speed;
	Obj.scale = 1;
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
		if (Obj.x + Obj.props.w > oObs.x && Obj.x < oObs.x + obsw && Obj.y < oObs.y) {// проверка по x
			nMove = checkCollision(Obj.y,Obj.props.h,oObs.y, Obj,oObs, nMove);
			// console.log(nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkCollision(a1,a2,b1, obj,obs, nMove) {
	temp = Math.abs((a1 + a2) - b1); 
	nMove = obs.block ? Math.min(nMove,temp) : nMove;
	if (!nMove && obs.action && !obs.destroy) {
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
		hero.state = "idle" + hero.direction;
	}
}.bind(this));


function obsActions(sName) {
	var a = {
		pickCoin,
		tp1,
		tp2,
		tp_home,
		tp_level_1
	}
	// console.log('action', sName);
	return a[sName]
}

// mainLoop();
//может события в отдельный файлик? 
function pickCoin(hero, obj) {
	hero.points = hero.points + 1;
	obj.destroy = true;
	obj.block = false;
	var Coin = new Audio('./Sounds/Coin.mp3');
	Coin.play();
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

function addAnim(Obj, state){
	// console.log(Obj,state);
	if (Obj.props.anim.filter(x => x.name == state + Obj.direction)[0]) {
		Obj.state = state + Obj.direction;
	}

}

function checkAttack(Obj) {
	console.log('check attack');
	var aEnemy = Obj.mob ? aObjects : DATA.world.enemy;
	// console.log()
	var aDots = getDots(Obj);
	Obj.actions.attack = false;
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
		if (bHit) hit(Obj,oEnemy);
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
	target.cooldown = 30;
	function restoreAnim () {
		addAnim(target, 'idle');
	}
	var Hit = new Audio('./Sounds/Hit.mp3');
	Hit.play();
	setTimeout(restoreAnim, 30);
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

	enemy.forEach(function(oEnemy) {
		for(var k in oEnemy.props) oEnemy[k]=oEnemy.props[k];
	})
	obs.forEach(function(obs) {
		if (obs.props) for(var k in obs.props) obs[k]=obs.props[k];
	})

	var oLocation = {
		name: sName,
		obstacles: obs,
		enemy : enemy
	}; 
	DATA.world = oLocation;
}
function kill(target) {
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

	if (checkEnemy(Obj)) {
		Obj.aggresive = true;
		// console.log('check enemy',checkEnemy(Obj)); 
		Obj.actions = {};
		Obj.actions[checkEnemy(Obj)] = true;
		return;
	} 
	if (Obj.aggresive) {
		Obj.actions = {};
		Obj.aggresive = false;
	}	
	
	var direction = Math.floor(Math.random() * 3); 
	var time = Math.floor(Math.random() * 5);

	var actions =  ["moveRight", "idle", "moveLeft"];

	function clearAction() {
		Obj.actions = {};
	}


	if (!Object.keys(Obj.actions)[0]){
		// console.log('set action',actions[direction], (time * 1000)/1000)
		Obj.actions[actions[direction]] = true;
		setTimeout(clearAction, time * 1000);
	}
}
//справа минус
function checkEnemy(Obj) {
	var hero = aObjects[0];
	var yDistance = Obj.y - hero.y;
	if (yDistance > 250) return false;
	var distance = Obj.x - hero.x;
	if (Math.abs(distance) <150 ) return "mobStrike";
	if (Math.abs(distance) < 500 ) return distance > 0 ? "moveLeft" : "moveRight";
	// console.log("distance", distance);
}