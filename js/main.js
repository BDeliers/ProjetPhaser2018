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
require(["Phaser", "core/Button", "core/Clock", "core/PhaserGauge", "models/ScenarioModel", "scenes/Home", "scenes/ScenarioSelection", "scenes/Game", "scenes/Win"],
function(Phaser, Button, Clock, Gauge, Scenario, Home, ScenarioSelection, Game, Win) {

	var config = {
        type: Phaser.AUTO,
        width: 960,
        height: 600,
        scene: Home
    };

    var game = new Phaser.Game(config);

    console.log('Load application');

});
