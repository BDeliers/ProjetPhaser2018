define(["Phaser", "core/Clock", "models/ScenarioModel", "models/VehicleModel", "tools/PathGeneratorClient"], function (Phaser, Clock, Scenario, Vehicle, PathGenerator) {

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

			// Load images of vehicles
			var vehicles = ["autopartage", "bicycle", "bus", "car", "covoiturage", "feet", "metro", "mono", "taxi", "moto", "train", "tram", "trotinet"];
			for (elt of vehicles) {
				this.load.image(elt, "vehicles/images/" + elt + ".png");
			}
		},

		create: function () {
			// Crete an instance of Clock in the game
			var clock = new Clock(this, "clock_sprite", 1100, 50);
			var schedule_task = setInterval(() => {
				seconds += 1;
				clock.set_seconds(seconds);
				clock.update();
			}, 1000);

			// Blit statics image for background
			this.add.image(683, 384, 'game').setDisplaySize(1366, 768);
			this.add.image(500, 360, 'background').setDisplaySize(1000, 500);
			this.add.image(500, 55, 'top').setDisplaySize(1020, 105);
			this.add.image(683, 688, 'bottom').setDisplaySize(1470, 150);

			// Blit Sprite of the woman on the Game
			var women_sprite = this.add.sprite(1175, 400, "women_sprite");
			var seconds = 0;

			//Create annimations for the buble
			var bubble_sprite = this.add.sprite(1175, 220, "bubble_sprite");
			this.anims.create({
				key: 'bubble_orange',
				frames: this.anims.generateFrameNumbers("bubble_sprite", {
					start: -1,
					end: 0
				})
			});
			this.anims.create({
				key: 'bubble_green',
				frames: this.anims.generateFrameNumbers("bubble_sprite", {
					start: 0,
					end: 1
				})
			});
			this.anims.create({
				key: 'bubble_red',
				frames: this.anims.generateFrameNumbers("bubble_sprite", {
					start: 1,
					end: 2
				})
			});
			this.anims.create({
				key: 'bubble_gray',
				frames: this.anims.generateFrameNumbers("bubble_sprite", {
					start: 2,
					end: 3
				})
			});
			this.anims.create({
				key: 'bubble_blue',
				frames: this.anims.generateFrameNumbers("bubble_sprite", {
					start: 3,
					end: 4
				})
			});


			// --- Build Start ---
			scenario_model.plotStops('stops_sprite');

			// -- def of the main game function
			var gameRoutine = function(phaser, stop_name){
				// get the object of the current stop for this turn
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

				// get the connected stops list form the current stop
				var connected_stops = []
				const vehicles_images_positions = [[340, 690], [682, 690], [1023, 690]];
				for(let path of scenario_model.getPathsFrom(current_stop.name)){
					connected_stops.push(path.to);
				}

				// add callback functions for hover and click on the 3 vehicles
				var index = 0;
				if(current_stop.available_vehicles.length != 3){
					console.log(`erreur Main loop : mauvais nombre de vehicles pour l'arrêt ${current_stop.name}`)
				}
				for(let vehicle_name of current_stop.available_vehicles){
					// create object for the current vehicle
					let vehicle_object = {
						vehicle: new Vehicle(vehicle_name),
						image: phaser.add.image(vehicles_images_positions[index][0], vehicles_images_positions[index][1], vehicle_name).setDisplaySize(200, 100).setInteractive(),
						associated_stop_name: connected_stops[Math.floor(Math.random() * Math.floor(connected_stops.length))]
					}
					
					// callback function for hover-in the vehicle image
					vehicle_object.image.on('pointerover', () => {
						scenario_model.plotPath(current_stop.name, vehicle_object.associated_stop_name, {
							color: vehicle_object.vehicle.PathColor,
							width: 4,
							rounded_angles: true
						});
						console.log(vehicle_object.vehicle.PathColor);
						console.log(`mouse over ${vehicle_object.vehicle.name}`);
					});
					
					// callback function for hover-out the vehicle image
					vehicle_object.image.on('pointerout', () => {
						scenario_model.unPlotPath(current_stop.name, vehicle_object.associated_stop_name);
						console.log(`mouse out ${vehicle_object.vehicle.name}`);
					});
					
					// callback function triggered when the image is clicked
					vehicle_object.image.on('pointerdown', () => {
						console.log(`clicked on ${vehicle_object.vehicle.name}`);
						scenario_model.plotPath(current_stop.name, vehicle_object.associated_stop_name, {
							color: vehicle_object.vehicle.PathColor,
							width: 3,
							rounded_angles: true
						});
						
						// remove images 
						for(let vehicle of current_vehicles){
							vehicle.image.destroy();
						}
						
						// launch the routine for the next stop
						gameRoutine(phaser, vehicle_object.associated_stop_name);
					});
					
					// store all three vehicles
					var current_vehicles = [];
					current_vehicles.push(vehicle_object);
					index++;
				}
			}
			
			// --- Game routine here
			//gameRoutine(this, scenario_model.stop(0).name);

			// ---- TEMPORAIRE ------
			for (let start of scenario_model.getStopsList()) {
				for (let end of scenario_model.getStopsList()) {
					scenario_model.plotPath(start.name, end.name, {
						color: "0x36E800",
						width: 3,
						rounded_angles: true
					});
				}
			}
			scenario_model.plotStops('stops_sprite');
			var path_g = PathGenerator(this, scenario_model.getName());

		},

		update: function () {

		}
	}

	return game_scene;

});
