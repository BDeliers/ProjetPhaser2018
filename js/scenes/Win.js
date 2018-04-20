define(["Phaser", "core/Clock" , "core/PhaserGauge"], function(Phaser, Clock, Gauge) {

	console.log("Load scenes/Win");

	var win_scene = {
		preload: function (){

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



				},
		create: function (){

				this.add.image(683, 384, 'end').setDisplaySize(1366, 768);
				var exhaust_gauge = new Gauge(this, document.cookie.split(',')[1].split('=')[1], {background_color:"0xe74c3c", color:"0xc0392b", x:250, y:230, height:40, width:200, coeff:0.85});
				var pollution_gauge = new Gauge(this, document.cookie.split(',')[2].split('=')[1], {background_color:"0x2ecc71", color:"0x27ae60", x:250, y:340, height:40, width:200, coeff:0.85});
				var money_gauge = new Gauge(this, document.cookie.split(',')[3].split('=')[1], {background_color:"0xf1c40f", color:"0xf39c12", x:250, y:450, height:40, width:200, coeff:0.85});

				var clock = new Clock(this, "clock_sprite", 270, 580);
				clock.set_seconds(document.cookie.split(',')[4].split('=')[1]);
				clock.update();

				var women_sprite = this.add.sprite(1000, 384, "women_sprite");

			  this.anims.create({
				  key:'sad',
				  frames: this.anims.generateFrameNumbers("women_sprite", { start: -1, end: 0})
			  });
			  this.anims.create({
				  key:'mid',
				  frames: this.anims.generateFrameNumbers("women_sprite", { start: 0, end: 1})
			  });
				this.anims.create({
				 key:'fine',
				 frames: this.anims.generateFrameNumbers("women_sprite", { start: 1, end: 2})
			 });


				},
		update: function (){

				}
	}

	return win_scene;

});
