define(["Phaser", "core/Button"], function(Phaser, Button) {

	console.log("Load scenes/ScenarioSelection");

	var sceneario_selection_scene = {
		preload: function (){
			this.load.image('game', 'image/background/game.png');

			this.load.spritesheet('scenar1_sprite',
				'image/scenario/scenar1.png',
				{ frameWidth: 300, frameHeight: 200 }
			);

				},
		create: function (){
 			this.add.image(480,300, 'game').setDisplaySize(960,600);
			var scenar1_sprite = this.add.sprite(200, 200, "scenar1_sprite");

			this.anims.create({
				key:'scenario1_0',
				frames: this.anims.generateFrameNumbers("scenar1_sprite", { start: -1, end: 0})
			});
			this.anims.create({
				key:'scenario1_1',
				frames: this.anims.generateFrameNumbers("scenar1_sprite", { start: 0, end: 1})
			});

			var button_scenar1 = new Button(this, "scenar1_sprite", 200, 200);
			button_scenar1.on("hover_on", ()=>{
				console.log("on");
				scenar1_sprite.anims.play("scenario1_1", true);
			});
			button_scenar1.on("hover_off", ()=>{
				scenar1_sprite.anims.play("scenario1_0", true);
			});
			button_scenar1.on("click_on", ()=>{

			});
			button_scenar1.on("click_off", ()=>{
				this.scene.start("Game");

			});

				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
