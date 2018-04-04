define(["Phaser", "core/Button"], function(Phaser, Button) {

	console.log("Load scenes/Home");

	var home_scene = {

		preload: function (){
					this.load.image('home', 'image/background/home.png');

					this.load.spritesheet('start_sprite',
						'image/buttons/earth.png',
						{ frameWidth: 300, frameHeight: 300 }
					);
				},
		create: function (){
				  this.add.image(480,300, 'home').setDisplaySize(960,600);
				  var start_sprite = this.add.sprite(480, 300, "start_sprite");

				  this.anims.create({
					  key:'commencer_0',
					  frames: this.anims.generateFrameNumbers("start_sprite", { start: -1, end: 0})
				  });
				  this.anims.create({
					  key:'commencer_1',
					  frames: this.anims.generateFrameNumbers("start_sprite", { start: 0, end: 1})
				  });

				  var button_start = new Button(this, "start_sprite", 480, 300);
				  button_start.on("hover_on", ()=>{
					  start_sprite.anims.play("commencer_1", true);
				  });
				  button_start.on("hover_off", ()=>{
					  start_sprite.anims.play("commencer_0", true);
				  });
				  button_start.on("click_on", ()=>{

				  });
				  button_start.on("click_off", ()=>{
					  this.scene.start("ScenarioSelection");
					  this.scene.stop("Home");
				  });

				  var start_text = this.add.text(480, 300, "Démarrer", {font : "45px Roboto"});
				  start_text.x = start_text.x - start_text.width/2;
				  start_text.y = start_text.y - start_text.height/2;
				  start_text.fontWeight = "bold";

				},
		update: function (){

				}
	}

	return home_scene;

});
