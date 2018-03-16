//Clock management class

var Clock = function(phaser, numbers, sprite) {
    this.seconds = 0;
    this.minutes = 0;
	this.phaser = phaser;
	this.numbers = numbers;
	this.sprite = sprite;
};

Clock.prototype.add_seconds = function(value) {
	this.seconds += value;

	if (seconds > 59) {
		this.minutes++;
		this.seconds = 0;
	}
}

Clock.prototype.add_minutes = function(value) {
	this.minutes += value;
}

Clock.prototype.increment_time = function() {
	this.add_seconds(1);
}

Clock.prototype.create = function(x,y) {
	//Creating the clock tiles sprites
	this.minutes_1 = this.phaser.add.sprite(x, y, this.sprite);
	this.minutes_0 = this.phaser.add.sprite(this.minutes_1.x + 100, this.minutes_1.y + 100, this.sprite);
	this.seconds_1 = this.phaser.add.sprite(this.minutes_0.x + 100, this.minutes_0.y + 100, this.sprite);
	this.seconds_0 = this.phaser.add.sprite(this.seconds_1.x + 100, this.seconds_1.y + 100, this.sprite);

	//Numbers animations
	this.phaser.anims.create({
		key:'0',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 0, end: 1})
	});
	this.phaser.anims.create({
		key:'1',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 1, end: 2})
	});
	this.phaser.anims.create({
		key:'2',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 2, end: 3})
	});
	this.phaser.anims.create({
		key:'3',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 3, end: 4})
	});
	this.phaser.anims.create({
		key:'4',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 4, end: 5})
	});
	this.phaser.anims.create({
		key:'5',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 5, end: 6})
	});
	this.phaser.anims.create({
		key:'6',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 6, end: 7})
	});
	this.phaser.anims.create({
		key:'7',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 7, end: 8})
	});
	this.phaser.anims.create({
		key:'8',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 8, end: 9})
	});
	this.phaser.anims.create({
		key:'9',
		frames: this.phaser.anims.generateFrameNumbers('this.sprite', { start: 9, end: 10})
	});
}

Clock.prototype.update = function() {
	this.minutes_1.anims.play(String(Math.trunc(this.minutes/10)), true);
	this.minutes_0.anims.play(String(Math.trunc(this.minutes%10)), true);
	this.seconds_1.anims.play(String(Math.trunc(this.seconds/10)), true);
	this.seconds_0.anims.play(String(Math.trunc(this.seconds%10)), true);
}
