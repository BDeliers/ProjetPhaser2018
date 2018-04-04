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
						key:'scenar1_0',
						frames: this.anims.generateFrameNumbers("scenar1_sprite", { start: -1, end: 0})
					});
					this.anims.create({
						key:'scenar1_1',
						frames: this.anims.generateFrameNumbers("scenar1_sprite", { start: 0, end: 1})
					});

					var button_start = new Button(this, "scenar1_sprite", 200, 200);
					button_start.on("hover_on", ()=>{
						scenar1_sprite.anims.play("scenar1_1", true);
					});
					button_start.on("hover_off", ()=>{
						scenar1_sprite.anims.play("scenar1_0", true);
					});
					button_start.on("click_on", ()=>{

					});
					button_start.on("click_off", ()=>{
						this.scene.start("Game");
						this.scene.stop("ScenarioSelection");
					});

				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
