// Models Class interface for Scenarios JSON object

define(["jquery", "Phaser"], function() {

	console.log("Load models/ScenarioModel");

	var scenario_class = class Scenario{

	    constructor(scenario_name){
	        var path = "./scenarios/" + scenario_name + "/" + scenario_name + ".json";

	        var scenario;
	        $.ajax({
	            'async': false,
	            'global': false,
	            'url': path,
	            'dataType': "json",
	            'success': function (data){
	                scenario = data;
	            }
	        });
	        this.scenario = scenario;

	        console.log("Create instance of " + scenario_name + " scenarios");
	    }

	    get name() {
	        return this.scenario.name;
	    }

	    get urlToImage(){
	        return this.scenario.url_to_image;
	    }

	    get urlTobackground(){
	        return this.scenario.url_to_background;
	    }

	    get description(){
	        return this.scenario.description;
	    }

	    get stopsList(){
	        return this.scenario.stops_list;
	    }

	    get numberOfStops(){
	        return this.scenario.stops_list.length;
	    }

	    stop(index){
	            return this.scenario.stops_list[index];
	    }

		plotStops(phaser, stops_sprite) {

			phaser.anims.create({
				key:'car',
				frames: phaser.anims.generateFrameNumbers(stops_sprite, { start: -1, end: 0})
			});
			phaser.anims.create({
				key:'bike',
				frames: phaser.anims.generateFrameNumbers(stops_sprite, { start: 0, end: 1})
			});
			phaser.anims.create({
				key:'train',
				frames: phaser.anims.generateFrameNumbers(stops_sprite, { start: 1, end: 2})
			});
			phaser.anims.create({
				key:'bus',
				frames: phaser.anims.generateFrameNumbers(stops_sprite, { start: 2, end: 3})
			});
			phaser.anims.create({
				key:'subway',
				frames: phaser.anims.generateFrameNumbers(stops_sprite, { start: 3, end: 4})
			});

			for (stop of this.scenario.stops_list) {
				let curr = phaser.add.sprite(stop.x, stop.y, stops_sprite);
				curr.anims.play(stop.available_vehicles[0], true);
			}
		}
	};

	return scenario_class;

});
