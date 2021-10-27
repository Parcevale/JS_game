function loadResources(sources,db, callback) {
	    var images = {};
        var loadedImages = 0;
        var numImages = 0;
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
			if (src === "hero") {
				DATA.mainHero.img = images[src]
			} else db.roomOne.obstacles.filter(x => x.type == src)[0].img = images[src];
        }
}