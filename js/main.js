console.log('Load main.js');

// RequireJS Configuration
require.config({
    // Par défaut, aller chercher les modules dans le dossier js/
    baseUrl: 'js',
    // Définition des racourccis
    paths: {
        jquery:     'libs/jquery.min',
        text:       'libs/text',
		Phaser:		'libs/phaser.min'
    },
    // Encapsulation des bibliothèques externes dans des modules
    shim: {
        jquery: {
            exports: '$'
        }
    }
});

// Load Application
require(["Phaser", "core/Button", "core/Clock", "core/PhaserGauge", "models/ScenarioModel"],
function(Phaser, Button, Clock, Gauge, Scenario) {

	var config = {
        type: Phaser.AUTO,
        width: 960,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload (){
      this.load.image('background', './image/background/accueil.png');
      this.load.image('dame', './image/characters/full/0.png');
      var start_sprite = this.load.spritesheet('start_sprite',
          './image/buttons/commencer.png',
          { frameWidth: 267, frameHeight: 134 }
      	);

      this.anims.create({
    		key:'commencer_0',
    		frames: this.anims.generateFrameNumbers("start_sprite", { start: -1, end: 0})
    	});
    	this.anims.create({
    		key:'commencer_1',
    		frames: this.anims.generateFrameNumbers("start_sprite", { start: 0, end: 1})
    	});
    }

    function create (){
      this.add.image(480,300, 'background');
      this.add.image(280,300,'dame');

      var button_start = new Button(this, "start_sprite", 800, 500);
      button_start.on("hover_on", ()=>{
          start_sprite.anims.play("commencer_1", true);
      });
      button_start.on("hover_off", ()=>{
          start_sprite.anims.play("commencer_0", true);
      });
      button_start.on("click_on", ()=>{
          console.log("click on button");
      });
      button_start.on("click_off", ()=>{
          console.log("click off button");
      });

    }

    function update (){

    }

    console.log('Load application');

});
