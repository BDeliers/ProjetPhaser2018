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
require(["Phaser", "core/Clock", "core/PhaserGauge", "models/ScenarioModel", "models/EventsModel", "tools/PathGeneratorClient"],
function(Phaser, Clock, Gauge, Scenario, Events, pathGenerator) {

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
        
        const event_list = [
            "free_public_transport", 
            "fuel_tax", 
            "heat_wave", 
            "jam", 
            "metro_roadworks", 
            "nuclear_war", 
            "rain"
        ];
        var event = new Events(event_list);
        
        for(let i = 0; i < 2; i++){
            console.log(event.addRandomEvent());
        }

        console.log(event.getPollutionPerturbativeCoeff("car"));
        console.log(event.addEvent("Bouchon sur la Rocade"));
        console.log(event.getActivesEvents());
    }

    function update (){
        
    }

    console.log('Load application');

});
