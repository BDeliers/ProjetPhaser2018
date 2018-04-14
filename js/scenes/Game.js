define(["Phaser", "core/Clock", "models/ScenarioModel", "tools/PathGeneratorClient"], function (Phaser, Clock, Scenario, PathGenerator) {

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






			// ---- TEMPORAIRE ------
			for (let start of scenario_model.getStopsList()) {
				for (let end of scenario_model.getStopsList()) {
					scenario_model.plotPath(start.name, end.name, {
						color: "0x000000",
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
