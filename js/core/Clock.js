//Clock management class

define(["Phaser"], function() {

	console.log("Load core/Clock");

	var Clock = function(phaser, sprite, x, y) {
	    this.seconds = 0;
	    this.minutes = 0;
		this.phaser = phaser;
		this.sprite = sprite;
		this.x = x;
		this.y = y;

		this.create();
	};

	Clock.prototype.add_seconds = function(value) {
		this.seconds += value;

		this.minutes += Math.trunc(this.seconds / 60);
		this.seconds %= 60;
	}

	Clock.prototype.set_seconds = function(value) {
		this.seconds = value;

		this.minutes = Math.trunc(this.seconds / 60);
		this.seconds %= 60;
	}

	Clock.prototype.add_minutes = function(value) {
		this.minutes += value;
	}

	Clock.prototype.increment_time = function() {
		this.add_seconds(1);
	}

	Clock.prototype.create = function() {
		//Creating the clock tiles sprites
		this.minutes_1 = this.phaser.add.sprite(this.x, this.y, this.sprite).setScale(0.4);
		this.minutes_0 = this.phaser.add.sprite(this.minutes_1.x + this.minutes_1.width*0.4 + 2, this.minutes_1.y, this.sprite).setScale(0.4);
		this.dots = this.phaser.add.sprite(this.minutes_0.x + this.minutes_0.width*0.4 + 2, this.minutes_0.y, this.sprite).setScale(0.4);
		this.seconds_1 = this.phaser.add.sprite(this.dots.x + this.dots.width*0.4 + 2, this.dots.y, this.sprite).setScale(0.4);
		this.seconds_0 = this.phaser.add.sprite(this.seconds_1.x + this.minutes_1.width*0.4 + 2, this.seconds_1.y, this.sprite).setScale(0.4);

		this.sprite_height = this.dots.height;
		this.sprite_width = this.dots.width;

		//Numbers animations
		this.phaser.anims.create({
			key:'0',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 0, end: 1})
		});
		this.phaser.anims.create({
			key:'1',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 1, end: 2})
		});
		this.phaser.anims.create({
			key:'2',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 2, end: 3})
		});
		this.phaser.anims.create({
			key:'3',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 3, end: 4})
		});
		this.phaser.anims.create({
			key:'4',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 4, end: 5})
		});
		this.phaser.anims.create({
			key:'5',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 5, end: 6})
		});
		this.phaser.anims.create({
			key:'6',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 6, end: 7})
		});
		this.phaser.anims.create({
			key:'7',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 7, end: 8})
		});
		this.phaser.anims.create({
			key:'8',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 8, end: 9})
		});
		this.phaser.anims.create({
			key:'9',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 9, end: 10})
		});
		this.phaser.anims.create({
			key:'dots',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 10, end: 11})
		});
		this.phaser.anims.create({
			key:'empty',
			frames: this.phaser.anims.generateFrameNumbers(this.sprite, { start: 11, end: 12})
		});

		this.dots.anims.play('dots', true);
	}

	Clock.prototype.update = function() {
		this.minutes_1.anims.play(String((this.minutes-this.minutes%10)/10), true);
		this.minutes_0.anims.play(String(this.minutes%10), true);
		this.seconds_1.anims.play(String((this.seconds-this.seconds%10)/10), true);
		this.seconds_0.anims.play(String(this.seconds%10), true);
	}

	return Clock;

});
