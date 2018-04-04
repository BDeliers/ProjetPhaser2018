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
require(["Phaser", "core/Button", "core/Clock", "core/PhaserGauge", "models/ScenarioModel", "tools/PathGeneratorClient"],
function(Phaser, Button, Clock, Gauge, Scenario, pathGenerator) {

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

        this.load.spritesheet('stops_sprites',
						'image/buttons/earth.png',
						{ frameWidth: 30, frameHeight: 30}
					);
    }

    function create (){
        
        var work = new Scenario(this, "work");
        
        work.plotStops("stops_sprites");

        work.plotPath("Home", "Work", {width: 6, color: "0xFFFF00", rounded_angles: true});

        setTimeout(() => {
            work.unPlotPath("Home", "Work");
        }, 10000);
    }

    function update (){

    }

    console.log('Load application');

});
