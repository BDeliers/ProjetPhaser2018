define(["Phaser"], function(Phaser) {

	console.log("Load scenes/Home");

	var home_scene = {

		preload: function (){
					this.load.image('home', 'image/background/home.png');

					var vehicles = ["autopartage", "bicycle", "bus", "car", "covoiturage", "feet", "metro", "mono", "taxi", "moto", "train", "tram", "trotinet"];

					for(elt of vehicles) {
						this.load.image(elt, "vehicles/images/"+elt+".png");
					}

					this.load.spritesheet('start_sprite',
						'image/buttons/earth.png',
						{ frameWidth: 300, frameHeight: 300 }
					);
				},
		create: function (){
				  this.add.image(683,384, 'home').setDisplaySize(1366,768);
				  var start_sprite = this.add.sprite(683, 384, "start_sprite").setInteractive();

				  this.anims.create({
					  key:'commencer_0',
					  frames: this.anims.generateFrameNumbers("start_sprite", { start: -1, end: 0})
				  });
				  this.anims.create({
					  key:'commencer_1',
					  frames: this.anims.generateFrameNumbers("start_sprite", { start: 0, end: 1})
				  });

				  start_sprite.on("pointerover", ()=>{
					  start_sprite.anims.play("commencer_1", true);
				  });
				  start_sprite.on("pointerout", ()=>{
					  start_sprite.anims.play("commencer_0", true);
				  });
				  start_sprite.on("pointerdown", ()=>{
					  this.scene.start("ScenarioSelection");
					  this.scene.stop("Home");
				  });

				  var start_text = this.add.text(683, 384, "Démarrer", {fontSize : "45px"});
				  start_text.x = start_text.x - start_text.width/2;
				  start_text.y = start_text.y - start_text.height/2;
				  start_text.fontWeight = "bold";

				  var vehicles = ["autopartage", "bicycle", "bus", "car", "covoiturage", "feet", "metro", "mono", "taxi", "moto", "train", "tram", "trotinet"];
				  var vehicles_sprites = [];
				  for(elt of vehicles) {
					  vehicles_sprites.push(this.add.sprite(0,700, elt));
				  }
				  var origin = 100;
				  for(i in vehicles_sprites) {
					  vehicles_sprites[i].setDisplaySize((vehicles_sprites[i].width/vehicles_sprites[i].height)*100,100);
					  vehicles_sprites[i].x = origin;
					  origin += vehicles_sprites[i].displayWidth*1.5;
				  }

				},
		update: function (){

				}
	}

	return home_scene;

});
