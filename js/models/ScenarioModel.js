// Models Class interface for Scenarios JSON object

define(["jquery", "Phaser", "core/DrawLine"], function(Line) {

	console.log("Load models/ScenarioModel");

	var scenario_class = class Scenario{

	    constructor(phaser, scenario_name){
	        var path = "./scenarios/" + scenario_name + ".json";

			this.phaser = phaser;

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
	        this.scenario_json = scenario;

	        console.log("Create instance of " + scenario_name + " scenarios");
	    }

	    get name() {
	        return this.scenario_json.name;
	    }

	    get urlToImage(){
	        return this.scenario_json.url_to_image;
	    }

	    get urlTobackground(){
	        return this.scenario_json.url_to_background;
	    }

	    get description(){
	        return this.scenario_json.description;
	    }

	    get stopsList(){
	        return this.scenario_json.stops_list;
	    }

	    get numberOfStops(){
	        return this.scenario_json.stops_list.length;
	    }

	    stop(index){
	            return this.scenario_json.stops_list[index];
	    }

		plotStops(stops_sprite) {

			this.phaser.anims.create({
				key:'car',
				frames: this.phaser.anims.generateFrameNumbers(stops_sprite, { start: -1, end: 0})
			});
			this.phaser.anims.create({
				key:'bike',
				frames: this.phaser.anims.generateFrameNumbers(stops_sprite, { start: 0, end: 1})
			});
			this.phaser.anims.create({
				key:'train',
				frames: this.phaser.anims.generateFrameNumbers(stops_sprite, { start: 1, end: 2})
			});
			this.phaser.anims.create({
				key:'bus',
				frames: this.phaser.anims.generateFrameNumbers(stops_sprite, { start: 2, end: 3})
			});
			this.phaser.anims.create({
				key:'subway',
				frames: this.phaser.anims.generateFrameNumbers(stops_sprite, { start: 3, end: 4})
			});

			for (stop of this.scenario_json.stops_list) {
				let curr = phaser.add.sprite(stop.x, stop.y, stops_sprite);
				curr.anims.play(stop.available_vehicles[0], true);
			}
		}

		getPathsFrom(origin_stop){
			var return_list = [];
			for(let path of this.scenario_json.paths_list){
				if(path.from == origin_stop){
					return_list.push(path);
				}
			}
			return return_list;
		}

		get paths_list(){
			return this.scenario_json.paths_list;
		}

		drawPath(origin_stop, arrival_stop, line_options){
			for(let path of this.scenario_json.paths_list){
				if(path.from == origin_stop && path.to == arrival_stop){
					const line = new Line(this.phaser, line_options);
					line.draw(path.path);
					return true;
				}
			}
			return false;
		}
	};

	return scenario_class;

});
