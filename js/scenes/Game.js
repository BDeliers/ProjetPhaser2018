define(["Phaser", "core/Clock", "models/ScenarioModel"], function(Phaser, Clock, Scenario) {

	console.log("Load scenes/Game");

	var game_scene = {
		preload: function (){
					this.load.spritesheet('clock_sprite',
						'image/clock/sprite_clk.png',
						{ frameWidth: 60, frameHeight: 100 }
					);

					var scenario_model = new Scenario(this, document.cookie.split('=')[1]);

					this.load.image('game', "image/background/game.png");
					this.load.image('background', scenario_model.getUrlTobackground());
					this.load.image('bottom', "image/assets/bottom.png");
					this.load.image('top', "image/assets/top_bar.png");
				},
		create: function (){
					this.add.image(683,384, 'game').setDisplaySize(1366,768);
					this.add.image(500,350, 'background').setDisplaySize(1000,500);
					this.add.image(500,680, 'bottom').setDisplaySize(1012,150);
					this.add.image(500,50, 'top').setDisplaySize(1012,100);

					var clock = new Clock(this, "clock_sprite", 100, 100);

					var seconds = 0;

					var schedule_task = setInterval(()=>{
						seconds += 1;
						clock.set_seconds(seconds);
						clock.update();
					}, 1000);
				},
		update: function (){

				}
	}

	return game_scene;

});
