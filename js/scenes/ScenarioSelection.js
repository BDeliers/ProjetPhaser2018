define(["Phaser"], function(Phaser) {

	console.log("Load scenes/ScenarioSelection");
	
	var scenar_equivalencies = ["work", "nightclub", "shopping", "school", "cinema", "venice"];

	var sceneario_selection_scene = {
		preload: function (){
					this.load.image('game', 'image/background/game.png');

					for (var i = 1; i < 7; i++) {
						this.load.spritesheet('scenar'+i+'_sprite',
							'image/scenario/'+scenar_equivalencies[i-1]+'.png',
							{ frameWidth: 300, frameHeight: 200 }
						);
					}
				},
		create: function (){
		 			this.add.image(683,384, 'game').setDisplaySize(1366,768);

					var title = this.add.text(683, 120, "Choisissez votre scénario", {font : "70px Roboto"});
					title.x = title.x - title.width/2;
					title.y = title.y - title.height/2;
					title.fontWeight = "bold";
					title.setColor("#000000");

					var scenar_sprites = [];
					var origin = [350,340];

					for (let i = 1; i < 7; i++) {
						scenar_sprites.push(this.add.sprite(origin[0], origin[1], "scenar"+i+"_sprite").setInteractive());

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
							scenar = scenar_equivalencies[i-1];
	  					  	this.scene.stop("ScenarioSelection");
						});

						origin[0] += 330;

						if (i == 3) {
							origin[1] = 568;
							origin[0] = 350;
						}
					}
				},
		update: function (){

				}
	}
	return sceneario_selection_scene;

});
