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

    created: function () {
    },

    mounted: function () {
    },

    methods: {
        getBlocksSevices() {

        },
        onAddStat(e) {
            var dataHero = appHome.$data.dataHero.mainHero;
            if (!dataHero.props.freeStat) return;
            var sStat = e.target.dataset.bind;
            appHome.$data.dataHero.mainHero.props.stats.forEach(function (el) {
                if (el.name == sStat) {
                    appHome.$data.dataHero.mainHero.props.freeStat--;
                    el.number++
                }
            })
        }
    }
});

document.addEventListener('keydown', function (event) {
    appHome.$data.dataHero = DATA;
    let actions = DATA.actions;
    let action = actions.filter(action => action.key === event.code);
    let oEquipment = document.getElementById('equipment');
    let oInventory = document.getElementById('inventory');
    if (action[0].name == "equipment") oEquipment.classList.toggle('equipment-on-off');
    if (action[0].name == "inventary") oInventory.classList.toggle('inventory-on-off');
}.bind(this));