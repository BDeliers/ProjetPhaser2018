define(["Phaser"], function(Phaser) {

	console.log("Load scenes/Win");

	var win_scene = {
		preload: function (){

				this.load.image('end', "image/background/end.png");
				
				},
		create: function (){

			this.add.image(683, 384, 'end').setDisplaySize(1366, 768);
				},
		update: function (){

				}
	}

	return win_scene;

});
