define(["Phaser", "core/Button"], function(Phaser, Button) {

	console.log("Load scenes/ScenarioSelection");

	var sceneario_selection_scene = {
		preload: function (){
					this.load.image('game', 'image/background/game.png');

					for (var i = 1; i < 7; i++) {
						this.load.spritesheet('scenar'+i+'_sprite',
							'image/scenario/scenar'+i+'.png',
							{ frameWidth: 300, frameHeight: 200 }
						);
					}
				},
		create: function (){
		 			this.add.image(480,300, 'game').setDisplaySize(960,600);
					var scenar_sprites = [];
					var origin = [225,225];

					for (let i = 1; i < 7; i++) {
						scenar_sprites.push(this.add.sprite(origin[0], origin[1], "scenar"+i+"_sprite").setDisplaySize(250, 166.6).setInteractive());

						this.anims.create({
							key:'scenar'+i+'_0',
							frames: this.anims.generateFrameNumbers("scenar"+i+"_sprite", { start: -1, end: 0})
						});
						this.anims.create({
							key:'scenar'+i+'_1',
							frames: this.anims.generateFrameNumbers("scenar"+i+"_sprite", { start: 0, end: 1})
						});

						scenar_sprites[i-1].on("pointerover", ()=>{scenar_sprites[i-1].anims.play("scenar"+i+"_1", true);});
						scenar_sprites[i-1].on("pointerout", ()=>{scenar_sprites[i-1].anims.play("scenar"+i+"_0", true)});
						scenar_sprites[i-1].on("pointerdown", ()=>{
							this.scene.start("Game");
	  					  	this.scene.stop("ScenarioSelection");
						});

						origin[0] += 250;

						if (i == 3) {
							origin[1] = 391;
							origin[0] = 225;
						}
					}
				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
