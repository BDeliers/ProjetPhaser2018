define(["Phaser","jquery", "core/Clock", "core/PhaserGauge"], function (Phaser, $, Clock, Gauge) {

	console.log("Load scenes/Win");

	var texts_JSON = undefined;

	var blit_text = function(phaser, x, y, text){
		var new_text = "";
		var text = text.split(' ');
		var line = "";
		for (let word of text) {
			if (line.length + word.length <= 30) {
				line += word + ' ';
			}
			else {
				new_text += line + "\n";
				line = word + ' ';
			}
		}	

		phaser.add.text(x, y, new_text, {fontSize: "15px", fill:"#000000"});
	}

	var win_scene = {
		preload: function () {

			this.load.image('end', "image/background/end.png");
			this.load.spritesheet('clock_sprite',
				'image/clock/sprite_clk.png', {
					frameWidth: 60,
					frameHeight: 100
				}
			);

			this.load.spritesheet('women_sprite',
				'image/characters/end_mood.png', {
					frameWidth: 398,
					frameHeight: 398
				}
			);

			// load JSON of texts
			$.ajax({
				'async': false,
				'global': false,
				'url': "./text/end_text.json",
				'dataType': "json",
				'success': function(data){
					texts_JSON = data;
					console.log(texts_JSON);
				}
			});



		},
		create: function () {

			this.add.image(683, 384, 'end').setDisplaySize(1366, 768);
			var pollution_gauge = new Gauge(this, Number(document.cookie.split(',')[2].split('=')[1]), {
				background_color: "0x1B5E20",
				color: "0x4CAF50",
				x: 250,
				y: 340,
				height: 40,
				width: 200,
				coeff: 0.75
			});
			var exhaust_gauge = new Gauge(this, Number(document.cookie.split(',')[1].split('=')[1]), {
				background_color: "0xB71C1C",
				color: "0xF44336",
				x: 250,
				y: 230,
				height: 40,
				width: 200,
				coeff: 0.75
			});
			var money_gauge = new Gauge(this, Number(document.cookie.split(',')[3].split('=')[1]), {
				background_color: "0x01579B",
				color: "0x03A9F4",
				x: 250,
				y: 450,
				height: 40,
				width: 200,
				coeff: 0.75
			});

			var clock = new Clock(this, "clock_sprite", 270, 580);
			clock.set_seconds(document.cookie.split(',')[4].split('=')[1]);
			clock.update();

			const co2 = Number(document.cookie.split(',')[5].split('=')[1]);
			console.log(co2);
			var women_sprite = this.add.sprite(1000, 384, "women_sprite");

			this.anims.create({
				key: 'sad',
				frames: this.anims.generateFrameNumbers("women_sprite", {
					start: -1,
					end: 0
				})
			});
			this.anims.create({
				key: 'mid',
				frames: this.anims.generateFrameNumbers("women_sprite", {
					start: 0,
					end: 1
				})
			});
			this.anims.create({
				key: 'fine',
				frames: this.anims.generateFrameNumbers("women_sprite", {
					start: 1,
					end: 2
				})
			});

			//plot texts
			blit_text(this, 500, 220, texts_JSON.pollution.bad);


		},
		update: function () {

		}
	}

	return win_scene;

});