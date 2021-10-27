
var a = [{ src: './img/backgraund.jpg' }];

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

var aObjects = [];


function startGame() {
	aObjects.push(DATA.mainHero);
	DATA.currentLocation = "level_1";
	cnv.setAttribute('width', DATA.windowWidth);
	cnv.setAttribute('height', DATA.windowHeight);
	setInterval(mainLoop,1000/60);
}

// список вынести


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
	return {x, y}
}
function drawUI(){
	ctx.fillStyle = "#000000";
	ctx.font = "30px serif";
	ctx.fillText(DATA.mainHero.points,  DATA.windowWidth - 40, 30);
}

var mainLoop = function() {
	// var currentLocation = ;
	clear();
	// console.log(a);
	ctx.drawImage(a[0].img, 0,0);
	aObjects.forEach(calcObjects);
	aObjects.forEach(function(obj){
		drawAnimation(obj)
	})
	DATA[DATA.currentLocation].roomOne.obstacles.forEach(function (obj) {

		if (obj.props && obj.props.anim && !obj.destroy) {
			drawAnimation(obj);
		}
		if (obj.img && !obj.tst) ctx.drawImage(obj.img, obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h);
		if (!obj.destroy && !obj.img && !obj.tst) draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);

	})

	drawUI();
}

function drawAnimation(obj) {
	var oAnim = obj.props.anim.filter(x => x.name === obj.state)[0];
	var currentFrame = 1;
	// if (oAnim.frames > 1) {// убрать просчет если всего 1 фрейм
		var framePxls = oAnim.img.width/oAnim.frames;//количество пикселей в кадре
		obj.frame = obj.frame || 1;//текущий кадр, если нет то первый.
		obj.frame = obj.frame >= (oAnim.frames-1)*5 ? 1 : obj.frame + 1;//
		currentFrame = Math.floor(obj.frame/5) * framePxls;
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
	var actions = Obj.actions;

	if (!actions.jump) {
		if (checkMoveDown(Obj)) {
			Obj.y = Obj.y + checkMoveDown(Obj);
		} else {
			Obj.state = "idle" + Obj.direction;
        }
			
	}

	if (actions.moveRight) {
		if (checkMoveRight(Obj))
		Obj.x = Obj.x + checkMoveRight(Obj);
	}

	if (actions.moveLeft) {
		if (checkMoveLeft(Obj))
		Obj.x = Obj.x - checkMoveLeft(Obj);
	}

	if (actions.moveUp) {
		if (checkJump(Obj)) {
			actions.jump = true;
			actions.jumpTime = Obj.props.jumpHeight;
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
	var aObs = DATA[DATA.currentLocation].roomOne.obstacles;
	var nMove = Obj.props.speed;
	Obj.scale = 1;
	Obj.state = "runR";
	Obj.direction = "R";
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
	var aObs = DATA[DATA.currentLocation].roomOne.obstacles;
	var nMove = Obj.props.speed;
	// Obj.scale = -1;
	Obj.state = "runL";
	Obj.direction = "L";
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
	var aObs = DATA[DATA.currentLocation].roomOne.obstacles;
	var nMove = Obj.props.jumpSpeed;
	// console.log(nMove);
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
	var aObs = DATA[DATA.currentLocation].roomOne.obstacles;
	var nMove = DATA.gravity;
	Obj.state = "down" + Obj.direction;
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

function tp_home(hero){
	DATA.currentLocation = "home_loc";
	hero.x = 20;
	hero.y = 100;
}
function tp_level_1(hero){
	DATA.currentLocation = "level_1";
	hero.x = 20;
	hero.y = 705;
}
