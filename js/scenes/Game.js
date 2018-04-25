define(["Phaser", "core/Clock", "core/DetailsPlot", "core/MessagesManager", "core/PhaserGauge", "models/ScenarioModel", "models/VehicleModel", "models/EventsModel", "models/LevelsModel", "tools/PathGeneratorClient"], function (Phaser, Clock, DetailsPlot, MessagesManager, Gauge, Scenario, Vehicle, Event, LevelsModel, PathGenerator) {

	console.log("Load scenes/Game");

	var scenario_model = undefined;

	var game_scene = {

		preload: function () {

			// Load the model of the Scenario
			scenario_model = new Scenario(this, document.cookie.split('=')[1]);

			// Load Sprite of the Clock
			this.load.spritesheet('clock_sprite',
				'image/clock/sprite_clk.png', {
					frameWidth: 60,
					frameHeight: 100
				}
			);

			// Load Sprite of Stops
			this.load.spritesheet('stops_sprite',
				'image/assets/stops_sprite.png', {
					frameWidth: 30,
					frameHeight: 30
				}
			);

			// Load Sprite of the text bubble
			this.load.spritesheet('bubble_sprite',
				'image/characters/text_bubble/bubble_sprite.png', {
					frameWidth: 214,
					frameHeight: 214
				}
			);

			// Load Sprite of the Women
			this.load.spritesheet('women_sprite',
				'image/characters/top_sprite.png', {
					frameWidth: 398,
					frameHeight: 398
				}
			);

			// Load statics images for background
			this.load.image('game', "image/background/game.png");
			this.load.image('background', scenario_model.getUrlTobackground());
			this.load.image('bottom', "image/assets/bottom.png");
			this.load.image('top', "image/assets/top_bar.png");
			this.load.image('sante', "image/assets/heart.png");
			this.load.image('pollution', "image/assets/earth.png");
			this.load.image('money', "image/assets/money.png");

			// Load images of vehicles
			var vehicles = ["autopartage", "bicycle", "bus", "car", "covoiturage", "feet", "metro", "mono", "taxi", "moto", "train", "tram", "trotinet"];
			for (let elt of vehicles) {
				this.load.image(elt, "vehicles/images/" + elt + ".png");
			}

			// Load images of events
			var events = ["free_public_transport", "fuel_taxi", "heat_wave", "jam", "metro_roadworks", "nuclear_war", "rain", "taxi_strike", "train_strike"];
			for (let elt of events){
				this.load.image(elt, "events/images" + elt + ".png");
			}
		},

		create: function () {
			// Blit statics image for background
			this.add.image(683, 384, 'game').setDisplaySize(1366, 768);
			this.add.image(500, 360, 'background').setDisplaySize(1000, 500);
			this.add.image(500, 55, 'top').setDisplaySize(1020, 105);
			this.add.image(683, 688, 'bottom').setDisplaySize(1470, 150);
			this.add.image(1020, 650, 'sante').setDisplaySize(30, 30);
			this.add.image(1020, 690, 'pollution').setDisplaySize(30, 30);
			this.add.image(1020, 730, 'money').setDisplaySize(30, 30);

			// Crete an instance of Clock in the game
			var clock = new Clock(this, "clock_sprite", 1100, 50);
			var messages_manager = new MessagesManager(this, "bubble_sprite", "women_sprite", 1175, 220);

			messages_manager.animate_bubble("green");
			messages_manager.animate_women("super");
			messages_manager.display_text(scenario_model.getDescription(), "#FF6600");

			var seconds = 0;
			var schedule_task = setInterval(() => {
				seconds += 1;
				clock.set_seconds(seconds);
				clock.update();
			}, 1000);

			// -- Plot Gauges
			var exhaust_gauge = new Gauge(this, 70, {background_color:"0xe74c3c", preview_color:"0x333333", color:"0xc0392b", x:1050, y:635, height:30, width:250, coeff:0.85});
			var pollution_gauge = new Gauge(this, 30, {background_color:"0x2ecc71", preview_color:"0x333333", color:"0x27ae60", x:1050, y:675, height:30, width:250, coeff:0.85});
			var money_gauge = new Gauge(this, 50, {background_color:"0xf1c40f", preview_color:"0x333333", color:"0xf39c12", x:1050, y:715, height:30, width:250, coeff:0.85});
			var levels = new LevelsModel();


			// --- Plot stops ---
			scenario_model.plotStops('stops_sprite');

			// -- def of the main game function
			var gameRoutine = function(phaser, stop_name){
				// get the object of the current stop for this turn

				if(stop_name === scenario_model.getStopsList()[scenario_model.getStopsList().length - 1].name){
					document.cookie += ",exhaust="+levels.getExhaustLevel();
					document.cookie += ",pollution="+levels.getPollutionLevel();
					document.cookie += ",money="+levels.getMoneyLevel();
					document.cookie += ",time="+clock.get_total_seconds();

					phaser.scene.start("Win");
					phaser.scene.stop("Game");
				}

				var current_stop = undefined;
				for(let stop of scenario_model.getStopsList()){
					if(stop.name === stop_name){
						current_stop = stop;
						break;
					}
				}
				if(current_stop === undefined){
					console.log(`erreur Main loop : nom du stop ${stop_name} introuvable`);
					return;
				}

				var current_vehicles = [];
				// get the connected stops list form the current stop
				var connected_stops = []
				const vehicles_images_positions = [[250, 690], [500, 690], [750, 690]];
				for(let path of scenario_model.getPathsFrom(current_stop.name)){
					connected_stops.push(path.to);
				}

				// add callback functions for hover and click on the 3 vehicles
				var index = 0;
				if(current_stop.available_vehicles.length != 3){
					console.log(`erreur Main loop : mauvais nombre de vehicles pour l'arrêt ${current_stop.name}`)
				}
				var selection_index = 0
				for(let vehicle_name of current_stop.available_vehicles){
					// create object for the current vehicle
					selection_index = ++selection_index % connected_stops.length;
					let vehicle_object = {
						vehicle: new Vehicle(vehicle_name),
						image: phaser.add.image(vehicles_images_positions[index][0], vehicles_images_positions[index][1], vehicle_name).setDisplaySize(200, 100).setInteractive(),
						associated_stop_name: connected_stops[selection_index]
					}

					var vehicle_selected = false;

					

					// callback function for hover-in the vehicle image
					vehicle_object.image.on('pointerover', () => {
						if(!vehicle_selected){
							scenario_model.plotPath(current_stop.name, vehicle_object.associated_stop_name, {
								color: vehicle_object.vehicle.PathColor,
								width: 4,
								rounded_angles: true
							});
						}
						console.log(vehicle_object.vehicle.PathColor);
						console.log(`mouse over ${vehicle_object.vehicle.name}`);

						messages_manager.animate_bubble("blue");
						messages_manager.animate_women("good");
						messages_manager.display_text(vehicle_object.vehicle.description, "#000000");
					});

					// callback function for hover-out the vehicle image
					vehicle_object.image.on('pointerout', () => {
						if(!vehicle_selected){
							scenario_model.unPlotPath(current_stop.name, vehicle_object.associated_stop_name);
							console.log(`mouse out ${vehicle_object.vehicle.name}`);
	
							messages_manager.animate_bubble("green");
							messages_manager.display_text(scenario_model.getDescription(), "#000000");
						}
					});

					var delay_ms = 200;
					// callback function triggered when the image is clicked
					vehicle_object.image.on('pointerdown', () => {
						if(!vehicle_selected){
							vehicle_selected = true;
							console.log(`clicked on ${vehicle_object.vehicle.name}`);
							scenario_model.unPlotPath(current_stop.name, vehicle_object.associated_stop_name)
							
							const wait_time = scenario_model.slow_plotPath(current_stop.name, vehicle_object.associated_stop_name, {
								color: vehicle_object.vehicle.PathColor,
								width: 3,
								rounded_angles: true
							}, delay_ms);
	
							levels.updateLevels(vehicle_object.vehicle, undefined);
							pollution_gauge.set_percentage(levels.getPollutionLevel()).draw();
							exhaust_gauge.set_percentage(levels.getExhaustLevel()).draw();
							money_gauge.set_percentage(levels.getMoneyLevel()).draw();
							
							setTimeout( () => {
								// remove images
								for(let vehicle of current_vehicles){
									vehicle.image.destroy();
								}
								scenario_model.plotStops('stops_sprite');
	
								// launch the routine for the next stop
								gameRoutine(phaser, vehicle_object.associated_stop_name);
							}, wait_time);
						}

					});

					// store all three vehicles
					current_vehicles.push(vehicle_object);
					index++;
				}
			}

			// --- Game routine here
			gameRoutine(this, scenario_model.stop(0).name);

			// ---- TEMPORAIRE ------
			/*for (let start of scenario_model.getStopsList()) {
				for (let end of scenario_model.getStopsList()) {
					scenario_model.plotPath(start.name, end.name, {
						color: "0x36E800",
						width: 3,
						rounded_angles: true
					});
				}
			}
			scenario_model.plotStops('stops_sprite');
			var path_g = PathGenerator(this, scenario_model.getName());*/

		},

		update: function () {

		}
	}

	return game_scene;

});
