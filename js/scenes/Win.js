define(["Phaser", "core/Clock" , "core/MessagesManager", "core/PhaserGauge"], function(Phaser, Clock, MessagesManager, Gauge) {

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
					'image/characters/top_sprite.png', {
						frameWidth: 398,
						frameHeight: 398
					}
				);

				this.load.spritesheet('transparent_sprite',
					'image/characters/text_bubble/transparent.png', {
						frameWidth: 214,
						frameHeight: 214
					}
				);

				},
		create: function (){

				this.add.image(683, 384, 'end').setDisplaySize(1366, 768);
				var exhaust_gauge = new Gauge(this, 70, {background_color:"0xe74c3c", color:"0xc0392b", x:250, y:230, height:40, width:200, coeff:0.85});
				var pollution_gauge = new Gauge(this, 30, {background_color:"0x2ecc71", color:"0x27ae60", x:250, y:340, height:40, width:200, coeff:0.85});
				var money_gauge = new Gauge(this, 50, {background_color:"0xf1c40f", color:"0xf39c12", x:250, y:450, height:40, width:200, coeff:0.85});

				var clock = new Clock(this, "clock_sprite", 270, 580);

				var messages_manager = new MessagesManager(this, "transparent_sprite", "women_sprite", 1100, 220);

				messages_manager.animate_women("super");


				},
		update: function (){

				}
	}

	return win_scene;

});
