define(["Phaser", "core/PhaserGauge"], function(Phaser, Gauge) {

	console.log("Load scenes/Win");

	var win_scene = {
		preload: function (){

				this.load.image('end', "image/background/end.png");

				},
		create: function (){

				this.add.image(683, 384, 'end').setDisplaySize(1366, 768);
				var pollution_gauge = new Gauge(this, 30, {background_color:"0xFF6600", color:"0xFE3123", x:200, y:200, height:40, width:200, coeff:0.85});
				var exhaust_gauge = new Gauge(this, 70, {background_color:"0xFF6600", color:"0xFE3123", x:200, y:300, height:40, width:200, coeff:0.85});
				var money_gauge = new Gauge(this, 50, {background_color:"0xFF6600", color:"0xFE3123", x:200, y:400, height:40, width:200, coeff:0.85});

				},
		update: function (){

				}
	}

	return win_scene;

});
