define(["Phaser"], function(Phaser) {

	console.log("Load scenes/ScenarioSelection");

	var sceneario_selection_scene = {
		preload: function (){
			this.load.image('game', 'image/background/game.png');
				},
		create: function (){
 			this.add.image(480,300, 'game').setDisplaySize(960,600);
				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
