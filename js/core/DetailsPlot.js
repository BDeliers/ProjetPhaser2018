

define([
    'Phaser'
], function(Phaser) {
    
    console.log("Load core/DetailsPlot.js");

    var DetailsPlot = function(phaser, bubble_sprite, x, y){
        this.phaser = pahser;
        this.x = x;
        this.y = y;
        this.background = this.phaser.add.sprite(this.x, this.y, bubble_sprite);
        this.phaser.anims.create({
			key: 'bubble_gray',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: 2,
				end: 3
			})
        });
    };
    
    DetailsPlot.prototype.plot = function(vehicle){
        this.background.play("bubble_gray").setDisplaySize(300, 200);

    }

    DetailsPlot.prototype.deplot = function(){

    }
    
});