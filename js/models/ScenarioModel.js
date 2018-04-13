// Models Class interface for Scenarios JSON object

define(["jquery", "Phaser", "core/DrawLine"], function(jq, phaser, Line) {

	console.log("Load models/ScenarioModel");

	/**
	 * @description Load a scenario from scenario folder
	 * @param {Phaser} phaser instance of the current phaser class
	 * @param {String} scenario_name name of the scenario to load
	 */
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

	/**
	 * @description getter of the scenario name
	 */
	ScenarioModel.prototype.getName = function() {
	    return this.scenario_json.name;
	}

	/**
	 * @description getter of the URL to the image
	 */
	ScenarioModel.prototype.getUrlToImage = function(){
	    return this.scenario_json.url_to_image;
	}

	/**
	 * @description getter of the url to the map image
	 */
	ScenarioModel.prototype.getUrlTobackground = function(){
	    return this.scenario_json.url_to_background;
	}

	/**
	 * @description getter of the scenario description
	 */
	ScenarioModel.prototype.getDescription = function(){
	    return this.scenario_json.description;
	}

	/**
	 * @description getter of an array of stops
	 */
	ScenarioModel.prototype.getStopsList = function(){
	    return this.scenario_json.stops_list;
	}

	/**
	 * @description getter of the number of stops in the current scenario
	 */
	ScenarioModel.prototype.getNumberOfStops = function(){
	    return this.scenario_json.stops_list.length;
	}

	/**
	 * get stop specified by index return undefined if index is out of range
	 * @param {JSON} index
	 */
	ScenarioModel.prototype.stop = function(index){
		if(index < this.scenario_json.stops_list.length){
			return this.scenario_json.stops_list[index];
		}else{
			return undefined;
		}
	}

	/**
	 * @description plots all stops in the map
	 * @param {Phaser sprite} stops_sprite the stop sprite (in the assets folder)
	 */
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

		const keys = ['car', 'bike', 'train', 'bus', 'subway'];
		var key_index = 0;
		for (stop of this.scenario_json.stops_list) {
			let curr = this.phaser.add.sprite(stop.x, stop.y -15, stops_sprite);
			curr.anims.play(keys[key_index++ % 5], true);

			let text = this.add.text(curr.x, curr.y-20, curr.name, {font : "10px Roboto"});
			text.x = text.x - text.width/2;
		}
	}

	/**
	 * @description return all the paths from a specified stop
	 * @param {String} origin_stop name of the path
	 */
	ScenarioModel.prototype.getPathsFrom = function(origin_stop){
		var return_list = [];
		for(let path of this.scenario_json.paths_list){
			if(path.from == origin_stop){
				return_list.push(path);
			}
		}
		return return_list;
	}

	/**
	 * @description getter of all the paths of the current scenario
	 */
	ScenarioModel.prototype.getPathsList = function(){
		return this.scenario_json.paths_list;
	}

	/**
	 * @description plot the path on the map specified by 2 stops
	 * @param {String} origin_stop name of the 1st stop
	 * @param {String} arrival_stop name of the 2nd stop
	 * @param {JSON} line_options options of the line to draw ( {colors: "HEX", width: NUMBER, rounded_angles: BOOLEAN} )
	 */
	ScenarioModel.prototype.plotPath = function(origin_stop, arrival_stop, line_options){
		for(let path of this.scenario_json.paths_list){
			if(path.from == origin_stop && path.to == arrival_stop){
				var line = new Line(this.phaser, line_options);
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

	/**
	 * @description
	 * @param {String} origin_stop
	 * @param {String} arrival_stop
	 */
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
