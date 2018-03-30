define(["Phaser"], function(Phaser) {

	console.log("Load scenes/ScenarioSelection");

	var sceneario_selection_scene = {
		preload: function (){
			this.load.image('home', 'image/background/home.png');
				},
		create: function (){
 			this.add.image(480,300, 'home').setDisplaySize(960,600);
				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
