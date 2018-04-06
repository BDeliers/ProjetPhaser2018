define(["Phaser"], function(Phaser) {

	console.log("Load scenes/Game");

	var game_scene = {
		preload: function (){
					this.load.spritesheet('clock_sprite',
						'image/clock/sprite_clk.png',
						{ frameWidth: 60, frameHeight: 100 }
					);

					this.load.image('game', 'image/background/game.png');
					this.load.image('map', image/maps/)
				},
		create: function (){
					this.add.image(683,384, 'game').setDisplaySize(1366,768);

				},
		update: function (){

				}
	}

	return game_scene;

});
