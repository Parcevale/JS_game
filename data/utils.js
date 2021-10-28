function loadResources(sources,db, callback) {
		// console.log(sources);

	    var images = {};
        var loadedImages = 0;
        // var numImages = 0;
        // console.log(sources.length);
        sources.forEach(function(item){
        	// console.log("item",item);
        	images[item.name] = new Image();
            images[item.name].onload = function() {
            	// console.log(loadedImages,sources.length )
	            if(++loadedImages >= sources.length) {
	              callback(images);
	            }
        	};
        	images[item.name].src = item.src;
        	item.img = images[item.name];
        })

   //      for(var src in sources) {
   //        numImages++;
   //      }
   //      for(var src in sources) {
   //        images[src] = new Image();
   //        images[src].onload = function() {
   //          if(++loadedImages >= numImages) {
   //            callback(images);
   //          }
   //        };
			// images[src].src = sources[src];

			// if (src === "hero") {
			// 	DATA.mainHero.img = images[src]
			// } else db.roomOne.obstacles.filter(x => x.type == src)[0].img = images[src];
   //      }
}

function createSources(db) {
	var sources = [];
	for (var o in db) {
		// console.log(db[o].anim);
		sources = sources.concat(db[o].anim);
		// sources.push(db[o].anim);
	}
	// console.log(sources);
	return sources;
}