define(["Phaser", "core/Clock"], function(Phaser, Clock) {

	console.log("Load scenes/Game");

	var game_scene = {
		preload: function (){
					this.load.spritesheet('clock_sprite',
						'image/clock/sprite_clk.png',
						{ frameWidth: 60, frameHeight: 100 }
					);

					this.load.image('game', 'image/background/game.png');
				},
		create: function (){
					this.add.image(683,384, 'game').setDisplaySize(1366,768);

					var clock = new Clock(this, "clock_sprite", 100, 100);
					clock.add_seconds(567);
					clock.update();
				},
		update: function (){

				}
	}

	return game_scene;

});
