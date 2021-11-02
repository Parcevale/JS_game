"use strict";


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
	console.log("sources.lenght1231232");
});

var appHome = new Vue({
    el: '#appInterface',
    data: {
        dataHero: [],
        date: new Date().getFullYear()
    },
    // до полной загрузки document
    created: function () {
    },
    // после полной загрузки document
    mounted: function () {
        console.log('123123')
    },
    // список функций
    methods: {
        getBlocksSevices() {

        }
    }
});

document.addEventListener('keydown', function (event) {
    appHome.$data.dataHero = DATA;
    let actions = DATA.actions;
    let action = actions.filter(action => action.key === event.code);
    let oEquipment = document.getElementById('equipment');
    if (action[0].name == "equipment") oEquipment.classList.toggle('equipment-on-off');
}.bind(this));