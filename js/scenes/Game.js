define(["Phaser"], function(Phaser) {

	console.log("Load scenes/Game");

	var game_scene = {
		preload: function (){
					this.load.spritesheet('clock_sprite',
						'image/clock/sprite_clk.png',
						{ frameWidth: 60, frameHeight: 100 }
					);
				},
		create: function (){

				},
		update: function (){

				}
	}

	return game_scene;

});
