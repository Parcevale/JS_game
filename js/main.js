


$.when(
	$.getScript("./data/data.js"),
	$.getScript("./data/utils.js"),
	$.Deferred(function (deferred) {
		$(deferred.resolve);
	})
).done(function () {
	loadResources(sources, DATA, startGame);
});

var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');

var aObjects = [];

// список вынести
var sources = {
	 mob1: './img/pixel-goust.gif',
     mob2: './img/goust.png',
     mob3: './img/slime.jpg',
	test1: './img/sprite.png',
	hero: './img/sprite.png'
}


var clear = function() {
	ctx.fillStyle = "#E3E3E3";
	ctx.fillRect(0,0,DATA.windowWidth,DATA.windowHeight);
}
var draw = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h,color);
} 

function getCam() {
	var x = DATA.mainHero.x - DATA.windowWidth/2 > 1 ? DATA.mainHero.x - DATA.windowWidth/2 : 1;
	var y = DATA.mainHero.y - DATA.windowHeight/2 > 1 ? DATA.mainHero.y - DATA.windowHeight/2 : 1;
	return {x : x, y: y}
}
function drawUI(){
	ctx.fillStyle = "#000000";
	ctx.font = "30px serif";
	ctx.fillText(DATA.mainHero.points,  DATA.windowWidth - 40, 30);
}

var mainLoop = function() {
	clear();
	aObjects.forEach(calcObjects);
	aObjects.forEach(function(obj){
		//draw(obj.x - getCam().x,obj.y - getCam().y, obj.w,obj.h,obj.color);
		drawAnimation(obj)
		// ctx.drawImage(
		// 	obj.img,				//img
		// 	120,		//позиция начала по x
		// 	0,		//позиция начала по y
		// 	100,					//длина отрезка по x
		// 	140, 					//высота отрезка
		// 	obj.x - getCam().x,						//позиция изображения (где в мире) по x
		// 	obj.y - getCam().y,						//позиция изображения (где в мире) по y
		// 	60,						// ширина изображения, сжимает до указанных размеров
		// 	80						// высота изображения
		// );
	})
	DATA.roomOne.obstacles.forEach(function (obj) {
		if (obj.img && !obj.tst) ctx.drawImage(obj.img, obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h);
		if (!obj.destroy && !obj.img) draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);
		// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

		// if (obj.img && obj.tst) drawAnimation(obj); //ctx.drawImage(
		// 	obj.img,				//img
		// 	120,		//позиция начала по x
		// 	0,		//позиция начала по y
		// 	100,					//длина отрезка по x
		// 	140, 					//высота отрезка
		// 	obj.x - getCam().x,						//позиция изображения (где в мире) по x
		// 	obj.y - getCam().y,						//позиция изображения (где в мире) по y
		// 	60,						// ширина изображения, сжимает до указанных размеров
		// 	80						// высота изображения
		// 	);
	})

	drawUI();
}

function drawAnimation(obj) {
	// console.log(obj.img.width);
	var framePxls = obj.img.width/obj.moveFrames;
	obj.frame = obj.frame || 1;
	obj.frame = obj.frame == obj.moveFrames ? 1 : obj.frame + 1;
	// console.log(framePxls * obj.frame);
	// var frameX = 
	// context.scale(-1, 1);
	// ctx.scale(1, 1);

	// ctx.save();
	// ctx.translate(obj.width, 0);
	// ctx.scale(obj.scale, 1);
	// ctx.drawImage(img, 0, 0);


	ctx.drawImage(
			obj.img,				//img
			framePxls * obj.frame,		//позиция начала по x
			0,		//позиция начала по y
			100,					//длина отрезка по x
			140, 					//высота отрезка
			obj.x - getCam().x ,						//позиция изображения (где в мире) по x
			obj.y - getCam().y,						//позиция изображения (где в мире) по y
			obj.w,// * obj.scale,						// ширина изображения, сжимает до указанных размеров
			obj.h						// высота изображения
			);
	ctx.restore();
}

//скомпоновать keyup и keydown
document.addEventListener('keydown', function (event) {
	let hero = DATA.mainHero;
	let actions = DATA.actions;
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
	}
}.bind(this));

function calcObjects(Obj){
	var actions = Obj.actions;

	if (actions.moveRight) {
		if (checkMoveRight(Obj))
		Obj.x = Obj.x + checkMoveRight(Obj);
	}

	if (actions.moveLeft) {
		if (checkMoveLeft(Obj))
		Obj.x = Obj.x - checkMoveLeft(Obj);
	}

	if (!actions.jump) {
		if (checkMoveDown(Obj))
		Obj.y = Obj.y + checkMoveDown(Obj);
	}

	if (actions.moveUp) {
		if (checkJump(Obj)) {
			actions.jump = true;
			actions.jumpTime = Obj.jumpHeight;
		}
	}

	if (actions.jump) {
		if (actions.jumpTime) {
			actions.jumpTime = actions.jumpTime - 1
			if (checkMoveUp(Obj) && actions.jumpTime > 5) {

				Obj.y = Obj.y - checkMoveUp(Obj);
			}
		} else {
			actions.jump = false;
		} 
	}
}

function checkJump(Obj){
	return !checkMoveDown(Obj)
}
function checkMoveRight(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.speed;
	Obj.scale = 1;
	aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x < oObs.x) {// проверка по высоте, и, я слева
			nMove = checkCollision(Obj.x,Obj.w,oObs.x, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkMoveLeft(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.speed;
	Obj.scale = -1;
	aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x > oObs.x) {// проверка по y
			nMove = checkCollision(oObs.x,oObs.w,Obj.x, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}


function checkMoveUp(Obj) {
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.jumpSpeed;
	aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w && Obj.y > oObs.y) {// проверка по x
			nMove = checkCollision(oObs.y,oObs.h,Obj.y, Obj,oObs, nMove);
			return nMove;
		} else return true
	})
	return nMove;
}

function checkMoveDown(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.jumpSpeed;
	aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w && Obj.y < oObs.y) {// проверка по x
			nMove = checkCollision(Obj.y,Obj.h,oObs.y, Obj,oObs, nMove);
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


function startGame() {
	aObjects.push(DATA.mainHero);
	cnv.setAttribute('width', DATA.windowWidth);
	cnv.setAttribute('height', DATA.windowHeight);
	setInterval(mainLoop,1000/60);
}

function obsActions(sName) {
	var a = {
		pickCoin,
		tp1,
		tp2
	}
	console.log('action', sName);
	return a[sName]
}

// mainLoop();
//может события в отдельный файлик? 
function pickCoin(hero, obj) {
	hero.points = hero.points + 1;
	obj.destroy = true;
	obj.block = false;
}
function tp1(hero) {
	hero.x = 530;
	hero.y = 110;
}
function tp2(hero) {
	hero.x = 20;
	hero.y = 745;
}
