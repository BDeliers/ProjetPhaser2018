//Draw a Gauge
//config is a dictionnary {background_color, color, x, y, height, width, coeff}

define(["Phaser"], function() {

console.log("Load core/PhaserGauge");

	var Gauge = function(phaser, percentage, config) {
	    this.set_percentage(percentage);
		this.rect_width = config.width - config.height;
		this.radius = config.height / 2;
		this.graphics = phaser.add.graphics();
		this.circle_center = config.x + this.radius;
		this.background_color = config.background_color;
		this.width = config.width;
		this.height = config.height;
		this.coeff = config.coeff;
		this.x = config.x;
		this.y = config.y;
		this.color = config.color;

		this.draw();
	}

	Gauge.prototype.set_percentage = function(percentage) {
		this.percentage = Math.abs(percentage) % 101;

		return this;
	}

	Gauge.prototype.draw = function(){
		//Drawing the gauge's background
		this.graphics.fillStyle(this.background_color);

		this.graphics.fillRect(this.circle_center, this.y, this.width - this.height, this.height);
		this.graphics.fillCircle(this.circle_center, this.y + this.radius, this.radius);
		this.graphics.fillCircle(this.circle_center + this.rect_width, this.y + this.radius, this.radius);

		//Drawing the Gauge itself
		this.graphics.fillStyle(this.color);

		this.graphics.fillRect(this.circle_center, this.y + (((1 - this.coeff) * this.height) / 2), (this.percentage/100) * (this.rect_width), this.coeff * this.height);
		this.graphics.fillCircle(this.circle_center, this.y + this.radius, this.coeff * this.height / 2);
		this.graphics.fillCircle(this.x + ((this.percentage/100) * this.rect_width) + this.radius, this.y + this.radius, this.coeff * this.height / 2);
	}


	return Gauge;

});
