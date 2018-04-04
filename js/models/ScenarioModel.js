// Models Class interface for Scenarios JSON object

define(["jquery", "Phaser", "core/DrawLine"], function(jq, phaser, Line) {

	console.log("Load models/ScenarioModel");

	var ScenarioModel = function(phaser, scenario_name) {
	    var path = "./scenarios/" + scenario_name + ".json";
		this.phaser = phaser;
		this.drawed_paths = new Map();
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

	ScenarioModel.prototype.getName = function() {
	    return this.scenario_json.name;
	}

	ScenarioModel.prototype.getUrlToImage = function(){
	    return this.scenario_json.url_to_image;
	}

	ScenarioModel.prototype.getUrlTobackground = function(){
	    return this.scenario_json.url_to_background;
	}

	ScenarioModel.prototype.getDescription = function(){
	    return this.scenario_json.description;
	}

	ScenarioModel.prototype.getStopsList = function(){
	    return this.scenario_json.stops_list;
	}

	ScenarioModel.prototype.getNumberOfStops = function(){
	    return this.scenario_json.stops_list.length;
	}

	ScenarioModel.prototype.stop = function(index){
        return this.scenario_json.stops_list[index];
	}

	ScenarioModel.prototype.plotStops = function(stops_sprite) {

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
			let curr = this.phaser.add.sprite(stop.x, stop.y, stops_sprite);
			curr.anims.play(stop.available_vehicles[0], true);
		}
	}

	ScenarioModel.prototype.getPathsFrom = function(origin_stop){
		var return_list = [];
		for(let path of this.scenario_json.paths_list){
			if(path.from == origin_stop){
				return_list.push(path);
			}
		}			
		return return_list;
	}

	ScenarioModel.prototype.getPathsList = function(){
		return this.scenario_json.paths_list;
	}

	ScenarioModel.prototype.plotPath = function(origin_stop, arrival_stop, line_options){
		for(let path of this.scenario_json.paths_list){
			if(path.from == origin_stop && path.to == arrival_stop){
				var line = new Line(this.phaser, line_options);
				console.log(path.path);
				line.draw(path.path);
				this.drawed_paths.set({
					from: origin_stop, 
					to: arrival_stop
				}, line);
				return true;
			}
		}
		return false;
	}
		

	ScenarioModel.prototype.unPlotPath = function(origin_stop, arrival_stop){
		for(let key of this.drawed_paths.keys()){
			if(key.from == origin_stop && key.to == arrival_stop){
				this.drawed_paths.get(key).clean();
				this.drawed_paths.delete(key);
			}
		}
		return false;
	}

	return ScenarioModel;
});
