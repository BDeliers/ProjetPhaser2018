define(["Phaser", "core/Clock", "core/DetailsPlot", "core/MessagesManager", "core/PhaserGauge", "models/ScenarioModel", "models/VehicleModel", "models/EventsModel", "tools/PathGeneratorClient"], function (Phaser, Clock, DetailsPlot, MessagesManager, Gauge, Scenario, Vehicle, Event, PathGenerator) {

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
					frameWidth: 80,
					frameHeight: 128
				}
			);

			// Load Sprite of the text bubble
			this.load.spritesheet('bubble_sprite',
				'image/characters/text_bubble/bubble_sprite.png', {
					frameWidth: 316,
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
			this.load.image('cloud', "image/assets/cloud.png");

			// Load sprites of vehicles
			var vehicles = ["autopartage", "bicycle", "bus", "car", "covoiturage", "feet", "metro", "mono", "taxi", "moto", "train", "tram", "trotinet"];
			for (let elt of vehicles) {
				this.load.spritesheet(elt, 'vehicles/images/' + elt + '.png', {
					frameHeight: 200,
					frameWidth: 330
				});
				this.anims.create({
					key: elt + "color",
					frames: this.anims.generateFrameNumbers(elt, {
						start: 0,
						end: 0
					})
				});
				this.anims.create({
					key: elt + "bandw",
					frames: this.anims.generateFrameNumbers(elt, {
						start: 1,
						end: 1
					})
				});
			}

			// Load images of events
			var events = ["free_public_transport", "fuel_tax", "heat_wave", "jam", "metro_roadworks", "nuclear_war", "rain", "taxi_strike", "train_strike"];
			for (let elt of events) {
				this.load.image(elt, "events/images/" + elt + ".png");
			}

			// load background music
			this.load.audio('bo', [
				'music/city-bo.mp3'
			]);
		},

		create: function () {

			var background_music = this.sound.add("bo");
			background_music.play({
				loop: true
			});

			// Blit statics image for background
			this.add.image(683, 384, 'game').setDisplaySize(1366, 768);
			this.add.image(500, 360, 'background').setDisplaySize(1000, 500);
			this.add.image(500, 55, 'top').setDisplaySize(1020, 105);
			this.add.image(683, 688, 'bottom').setDisplaySize(1470, 150);
			this.add.image(1020, 650, 'sante').setDisplaySize(30, 30);
			this.add.image(1020, 690, 'pollution').setDisplaySize(30, 30);
			this.add.image(1020, 730, 'money').setDisplaySize(30, 30);
			this.add.image(1170, 50, 'cloud').setDisplaySize(266, 114);

			// Crete an instance of Clock in the game
			var clock = new Clock(this, "clock_sprite", 1120, 70);
			//Create an instance of message buble in the game
			var messages_manager = new MessagesManager(this, "bubble_sprite", "women_sprite", 1175, 220);

			messages_manager.animate_bubble("green");
			messages_manager.animate_women("super");
			messages_manager.display_text("Scénario :", scenario_model.getDescription(), "#000000");

			var seconds = 0;
			var schedule_task = setInterval(() => {
				seconds += 1;
				clock.set_seconds(seconds);
				clock.update();
			}, 1000);

			// -- Plot Gauges
			var pollution_level = 100;
			var pollution_gauge = new Gauge(this, pollution_level, {
				background_color: "0x1B5E20",
				preview_color: "0x81C784",
				color: "0x4CAF50",
				x: 1050,
				y: 675,
				height: 30,
				width: 250,
				coeff: 0.70
			});
			
			var exausth_level = 50;
			var exhaust_gauge = new Gauge(this, exausth_level, {
				background_color: "0xB71C1C",
				preview_color: "0xE57373",
				color: "0xF44336",
				x: 1050,
				y: 635,
				height: 30,
				width: 250,
				coeff: 0.70
			});

			var money_level = 100;
			var money_gauge = new Gauge(this, money_level, {
				background_color: "0x01579B",
				preview_color: "0x4FC3F7",
				color: "0x03A9F4",
				x: 1050,
				y: 715,
				height: 30,
				width: 250,
				coeff: 0.70
			});

			var co2 = Number();
			
			// --- Plot stops ---
			scenario_model.plotStops('stops_sprite');
			
			// main game function
			var gameRoutine = function (phaser, stop_name) {

				// check if the game is finished
				if (stop_name === scenario_model.getStopsList()[scenario_model.getStopsList().length - 1].name) {
					// store data for next scene
					document.cookie += ",pollution=" + String(pollution_level);
					document.cookie += ",exhaust=" + String(exausth_level);
					document.cookie += ",money=" + String(money_level);
					document.cookie += ",time=" + String(clock.get_total_seconds());

					document.cookie += ",co2=" + String(co2);

					// end music 
					background_music.pause();

					// launch end scenne 
					phaser.scene.start("Win");
					phaser.scene.stop("Game");
				}

				// get the stop object of the current stop
				var current_stop = undefined;
				for (let stop of scenario_model.getStopsList()) {
					if (stop.name === stop_name) {
						current_stop = stop;
						break;
					}
				}
				if (current_stop === undefined) {
					console.log(`erreur Main loop : nom du stop ${stop_name} introuvable`);
					return;
				}

				// get the connected stops list form the current stop
				var current_vehicles = [];
				var connected_stops = []
				for (let path of scenario_model.getPathsFrom(current_stop.name)) {
					connected_stops.push(path.to);
				}

				// add callback functions for hover and click on the 3 vehicles
				const vehicles_images_positions = [
					[250, 690],
					[500, 690],
					[750, 690]
				];
				var index = 0;
				// check if we have 3 vehicles at the stop
				if (current_stop.available_vehicles.length != 3) {
					console.log(`erreur Main loop : mauvais nombre de vehicles pour l'arrêt ${current_stop.name}`)
				}
				var selection_index = 0
				for (let vehicle_name of current_stop.available_vehicles) {
					// create object for the current vehicle
					selection_index = ++selection_index % connected_stops.length;
					const vehicle_object = {
						vehicle: new Vehicle(vehicle_name),
						image: phaser.add.sprite(vehicles_images_positions[index][0], vehicles_images_positions[index][1], vehicle_name).setDisplaySize(200, 100).setInteractive(),
						associated_stop_name: connected_stops[selection_index]
					}
					index++;
					if (events.isBlocked(vehicle_name)) {
						vehicle_object.image.play(vehicle_name + 'bandw');						
					} else {
						vehicle_object.image.play(vehicle_name + "color");

						var vehicle_selected = false;

						// callback function for hover-in the vehicle image
						vehicle_object.image.on('pointerover', () => {
							if (!vehicle_selected) {
								scenario_model.plotPath(current_stop.name, vehicle_object.associated_stop_name, {
									color: vehicle_object.vehicle.PathColor,
									width: 5,
									rounded_angles: true
								});
							}
							console.log(`mouse over ${vehicle_object.vehicle.name}`);

							const preview_pollution_level = pollution_level + 25 * vehicle_object.vehicle.pollutionCoeff * events.getPollutionPerturbativeCoeff();
							const preview_exausth_level = exausth_level + 25 * vehicle_object.vehicle.exhaustCoeff * events.getExhaustPerturbativeCoeff();
							const preview_money_level = money_level + 25 * vehicle_object.vehicle.moneyCoeff * events.getMoneyPerturbativeCoeff();

							pollution_gauge.preview_draw(preview_pollution_level);
							exhaust_gauge.preview_draw(preview_exausth_level);
							money_gauge.preview_draw(preview_money_level);

							messages_manager.animate_bubble("blue");
							messages_manager.animate_women("good");
							messages_manager.display_text(vehicle_object.vehicle.display_name, vehicle_object.vehicle.description, "#000000");
						});

						// callback function for hover-out the vehicle image
						vehicle_object.image.on('pointerout', () => {
							if (!vehicle_selected) {
								scenario_model.unPlotPath(current_stop.name, vehicle_object.associated_stop_name);
								console.log(`mouse out ${vehicle_object.vehicle.name}`);

								pollution_gauge.draw();
								exhaust_gauge.draw();
								money_gauge.draw();

								messages_manager.animate_bubble("green");
								messages_manager.display_text("Scénario", scenario_model.getDescription(), "#000000");
							}
						});

						var delay_ms = 100;
						// callback function triggered when the image is clicked
						vehicle_object.image.on('pointerdown', () => {
							if (!vehicle_selected) {
								vehicle_selected = true;
								console.log(`clicked on ${vehicle_object.vehicle.name}`);
								scenario_model.unPlotPath(current_stop.name, vehicle_object.associated_stop_name)

								const wait_time = scenario_model.slow_plotPath(current_stop.name, vehicle_object.associated_stop_name, {
									color: vehicle_object.vehicle.PathColor,
									width: 3,
									rounded_angles: true
								}, delay_ms);

								pollution_level += 25 * vehicle_object.vehicle.pollutionCoeff * events.getPollutionPerturbativeCoeff();
								exausth_level += 25 * vehicle_object.vehicle.exhaustCoeff * events.getExhaustPerturbativeCoeff();
								money_level += 25 * vehicle_object.vehicle.moneyCoeff * events.getMoneyPerturbativeCoeff();

								co2 += vehicle_object.vehicle.co2;

								console.log(co2);
								pollution_gauge.set_percentage(pollution_level).draw();
								exhaust_gauge.set_percentage(exausth_level).draw();
								money_gauge.set_percentage(money_level).draw();

								setTimeout(() => {
									// remove images
									for (let vehicle of current_vehicles) {
										vehicle.image.destroy();
									}
									scenario_model.plotStops('stops_sprite');

									// launch the routine for the next stop
									gameRoutine(phaser, vehicle_object.associated_stop_name);
								}, wait_time);
							}

						});

					}
					// store all three vehicles
					current_vehicles.push(vehicle_object);
				}
			}

			// add Events
			const events = new Event(["free_public_transport", "fuel_tax", "heat_wave", "jam", "metro_roadworks", "nuclear_war", "rain", "taxi_strike", "train_strike"]);
			var x_axis = 100;
			var y_axis = 55;
			setInterval(() => {
				if (events.getActivesEvents().length < 6) {
					const new_event = events.addRandomEvent();
					if (new_event) {
						const event_image = this.add.image(x_axis, y_axis, new_event.name).setDisplaySize(80, 80).setInteractive();
						event_image.on("pointerover", () => {
							messages_manager.display_text(new_event.display_name, new_event.description, "#000000");
						});
						x_axis += 150;
					}
				}
			}, 1000 * 10);

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