var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');

var aObjects = [];

cnv.setAttribute('width', DATA.windowWidth);
cnv.setAttribute('height', DATA.windowHeight);

// пора утилз заводить и туда вынести
function loadResources(sources,db, callback) {
	    var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
          db.roomOne.obstacles.filter(x => x.type == src)[0].img = images[src];
        }
}
// список вынести
var sources = {
	 mob1: './img/pixel-goust.gif',
     mob2: './img/goust.png',
     mob3: './img/slime.jpg',
     test1: './img/sprite.png'
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
		draw(obj.x - getCam().x,obj.y - getCam().y, obj.w,obj.h,obj.color);
	})
	DATA.roomOne.obstacles.forEach(function (obj) {
		if (obj.img && !obj.tst) ctx.drawImage(obj.img, obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h);
		if (!obj.destroy && !obj.img) draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);
		// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
		if (obj.img && obj.tst) ctx.drawImage(
			obj.img,				//img
			120,		//позиция начала по x
			0,		//позиция начала по y
			100,					//длина отрезка по x
			140, 					//высота отрезка
			obj.x - getCam().x,						//позиция изображения (где в мире) по x
			obj.y - getCam().y,						//позиция изображения (где в мире) по y
			60,						// ширина изображения, сжимает до указанных размеров
			80						// высота изображения
			);
	})

	drawUI();
}
aObjects.push(DATA.mainHero);


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
	var nMove = Obj.speed, temp;

	var bResult =  aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x < oObs.x) {// проверка по высоте, и, я слева
			// отсюда и ниже можно вынести
			temp = Math.abs((Obj.x + Obj.w) - oObs.x); 
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			console.log(nMove);
			if (!nMove && oObs.action && !oObs.destroy) {
				console.log('123');
				pickCoin(Obj,oObs);//придумать нормальную обработку событий
			}
			return  nMove
			//до сюда
		} else return true
	})
	return nMove;
}

function checkMoveLeft(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.speed, temp;
	var bResult =  aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x > oObs.x) {// проверка по y
			temp = Math.abs((oObs.x + oObs.w) - Obj.x);
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			if (!nMove && oObs.action && !oObs.destroy) {
				pickCoin(Obj,oObs);
			}
			return  nMove
		} else return true
	})
	return nMove;
}


function checkMoveUp(Obj) {
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.jumpSpeed, temp;
	var bResult =  aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w && Obj.y > oObs.y) {// проверка по x
			temp = Math.abs((oObs.y + oObs.h) - Obj.y);
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			if (!nMove && oObs.action && !oObs.destroy) {
				pickCoin(Obj,oObs);
			}
			return  nMove
		} else return true
	})
	return nMove;
}

function checkMoveDown(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.jumpSpeed, temp;
	var bResult =  aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w && Obj.y < oObs.y) {// проверка по x
			temp = Math.abs((Obj.y + Obj.h) - oObs.y);
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			if (!nMove && oObs.action && !oObs.destroy) {
				console.log('123');
				pickCoin(Obj,oObs);
			}
			return  nMove
		} else return true
	})
	return nMove;
}

// mainLoop();

//может события в отдельный файлик? 
function pickCoin(hero, obj) {
	hero.points = hero.points + 1;
	obj.destroy = true;
	obj.block = false;
}

function getInfo() {
	console.log(DATA.mainHero);
}

loadResources(sources,DATA, startGame);

function startGame () {
	setInterval(mainLoop,1000/60);
}