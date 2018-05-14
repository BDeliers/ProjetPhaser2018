define(["Phaser","jquery", "core/Clock", "core/PhaserGauge"], function (Phaser, $, Clock, Gauge) {

	console.log("Load scenes/Win");

	var texts_JSON = undefined;

	/**
	 * @description blit text ...
	 * @param {Phaser} phaser current phaser instance
	 * @param {Number} x x axix position
	 * @param {Number} y y axis position
	 * @param {String} text text to blit
	 */
	var blit_commentary = function(phaser, x, y, text){
		var msg = text.split(' ');
		var new_msg = "";

		var lsize = 0;
		for (let w of msg) {
			if (lsize + w.length <= 30) {
				new_msg += w + ' ';
				lsize += w.length + 1;
			}
			else {
				new_msg += "\n" + w + ' ';
				lsize = w.length + 1;
			}
		}

		phaser.add.text(x, y, new_msg, {fontSize: "15px", fill:"#000000"});
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

			// add background
			this.add.image(683, 384, 'end').setDisplaySize(1366, 768);

			// add pollution gauge
			const pollution_level = Number(document.cookie.split(',')[1].split('=')[1]);
			var pollution_gauge = new Gauge(this, pollution_level, {
				background_color: "0x1B5E20",
				color: "0x4CAF50",
				x: 250,
				y: 340,
				height: 40,
				width: 200,
				coeff: 0.75
			});

			// add exausth gauge
			const exausth_level = Number(document.cookie.split(',')[2].split('=')[1]);
			var exhaust_gauge = new Gauge(this, exausth_level, {
				background_color: "0xB71C1C",
				color: "0xF44336",
				x: 250,
				y: 230,
				height: 40,
				width: 200,
				coeff: 0.75
			});

			// add money gauge
			const money_level = Number(document.cookie.split(',')[3].split('=')[1]);
			var money_gauge = new Gauge(this, money_level, {
				background_color: "0x01579B",
				color: "0x03A9F4",
				x: 250,
				y: 450,
				height: 40,
				width: 200,
				coeff: 0.75
			});

			// add clock
			var clock = new Clock(this, "clock_sprite", 270, 580);
			clock.set_seconds(document.cookie.split(',')[4].split('=')[1]);
			clock.update();

			// -- add replay button --
			// add earth sprite
			var replay_sprite = this.add.sprite(1200, 300, "start_sprite").setScale(0.6).setInteractive();

			// add inner text
			var replay_text = this.add.text(1200, 300, "Rejouer", {
				fontSize: "30px"
			});
			replay_text.x = replay_text.x - replay_text.width / 2;
			replay_text.y = replay_text.y - replay_text.height / 2;
			replay_text.fontWeight = "bold";

			// add mouse event
			replay_sprite.on("pointerover", () => {
				replay_sprite.anims.play("commencer_1", true);
			});
			replay_sprite.on("pointerout", () => {
				replay_sprite.anims.play("commencer_0", true);
			});
			replay_sprite.on("pointerdown", () => {
				location.reload(true);
			});



			// add woomen sprite
			var women_sprite = this.add.sprite(950, 284, "women_sprite");
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

			//plot gauge commentaries texts
			// pollution
			var pollution_text = "";
			if(pollution_level > 70){
				pollution_text = texts_JSON.pollution.good
			}else if (pollution_level > 40){
				pollution_text = texts_JSON.pollution.medium;
			}else{
				pollution_text = texts_JSON.pollution.bad;
			}
			blit_commentary(this, 500, 340, pollution_text);

			//exausth
			var exausth_text = "";
			if(exausth_level > 80){
				exausth_text = texts_JSON.exhaust.good;
			}else if(exausth_level > 40){
				exausth_text = texts_JSON.exhaust.medium;
			}else{
				exausth_text = texts_JSON.exhaust.bad;
			}
			blit_commentary(this, 500, 230, exausth_text);

			// money
			var money_text = "";
			if(money_level > 70){
				money_text = texts_JSON.money.good;
			}else if(money_level > 40){
				money_text  =texts_JSON.money.medium;
			}else{
				money_text = texts_JSON.money.bad;
			}
			blit_commentary(this, 500, 450, money_text);

			// blit co2 commentary
			const co2 = Number(document.cookie.split(',')[5].split('=')[1]);
			this.add.text(860, 500, `Sur l'ensemble de votre trajet, les \ntransports que vous avez choisis ont \némi environ ${co2} Kg de CO2. Cela \ncorrespond à la quantité de CO2 que \n${Math.floor(co2 / 8)} arbres peuvent dissiper en 1 an !`, {fontSize: "18px", fill:"#000000"})
		},
		update: function () {

		}
	}

	return win_scene;

});
