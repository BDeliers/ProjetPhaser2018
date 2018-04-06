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
require(["Phaser", "core/PhaserGauge", "scenes/Home", "scenes/ScenarioSelection", "scenes/Game", "scenes/Win"],
function(Phaser, Gauge, Home, ScenarioSelection, Game, Win) {

	var config = {
        type: Phaser.AUTO,
        width: 1366,
        height: 768
    };

    var game = new Phaser.Game(config);
	game.scene.add("Home", Home);
	game.scene.add("ScenarioSelection", ScenarioSelection);
	game.scene.add("Game", Game);
	game.scene.add("Win", Win);
	game.scene.start("Home");

    console.log('Load application');

});
