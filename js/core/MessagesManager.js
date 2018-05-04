//Messages management class

define(["Phaser"], function() {

	console.log("Load core/MessagesManager");

	var MessagesManager = function(phaser, bubble_sprite, women_sprite, x, y) {
		this.phaser = phaser;
		this.women_sprite = women_sprite;
		this.bubble_sprite = bubble_sprite;
		this.x = x;
		this.y = y;
		this.last_body = undefined;

		this.last_update = 0;

		this.create();
	};

	MessagesManager.prototype.create = function() {
		// Blit Sprite of the woman on the Game and create animations
		this.women_sprite_obj = this.phaser.add.sprite(this.x, this.y+250, this.women_sprite).setDisplaySize(280,280);
		this.phaser.anims.create({
			key: 'no_care',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: -1,
				end: 0
			})
		});
		this.phaser.anims.create({
			key: 'koala',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 0,
				end: 1
			})
		});
		this.phaser.anims.create({
			key: 'super',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 1,
				end: 2
			})
		});
		this.phaser.anims.create({
			key: 'super_2',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 2,
				end: 3
			})
		});
		this.phaser.anims.create({
			key: 'super_3',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 3,
				end: 4
			})
		});
		this.phaser.anims.create({
			key: 'map',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 4,
				end: 5
			})
		});
		this.phaser.anims.create({
			key: 'brain',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 5,
				end: 6
			})
		});
		this.phaser.anims.create({
			key: 'thinking',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 6,
				end: 7
			})
		});
		this.phaser.anims.create({
			key: 'thinking_2',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 7,
				end: 8
			})
		});
		this.phaser.anims.create({
			key: 'angry',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 8,
				end: 9
			})
		});
		this.phaser.anims.create({
			key: 'glasses',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 9,
				end: 10
			})
		});
		this.phaser.anims.create({
			key: 'wtf',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 10,
				end: 11
			})
		});
		this.phaser.anims.create({
			key: 'no',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 11,
				end: 12
			})
		});
		this.phaser.anims.create({
			key: 'clap',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 12,
				end: 13
			})
		});
		this.phaser.anims.create({
			key: 'first',
			frames: this.phaser.anims.generateFrameNumbers(this.women_sprite, {
				start: 14,
				end: 15
			})
		});

		//Blit bubble and create annimations for the buble
		this.bubble_sprite_obj = this.phaser.add.sprite(this.x, this.y, this.bubble_sprite);
		this.phaser.anims.create({
			key: 'bubble_orange',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: -1,
				end: 0
			})
		});
		this.phaser.anims.create({
			key: 'bubble_green',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: 0,
				end: 1
			})
		});
		this.phaser.anims.create({
			key: 'bubble_red',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: 1,
				end: 2
			})
		});
		this.phaser.anims.create({
			key: 'bubble_gray',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: 2,
				end: 3
			})
		});
		this.phaser.anims.create({
			key: 'bubble_blue',
			frames: this.phaser.anims.generateFrameNumbers(this.bubble_sprite, {
				start: 3,
				end: 4
			})
		});
	};

	MessagesManager.prototype.animate_bubble = function(color) {
		this.bubble_sprite_obj.anims.play("bubble_"+color, true);
	};

	MessagesManager.prototype.animate_women = function(feeling) {
		const good_woman_feeling = ["koala", "super", "super_2", "super_3", "clap", "first"];
		const bad_woman_feeling = ["no_care", "angry", "glasses"];
		const other_woman_feeling = ["map", "brain", "thinking_2", "wtf", "no"];
		
		const time = new Date();
		if( (time.getTime() - this.last_update) > 4000){
			this.last_update = time.getTime();
			switch (feeling){
				case "good":
					this.women_sprite_obj.anims.play(good_woman_feeling[Math.floor(Math.random() * Math.floor(good_woman_feeling.length))], true);
					break;
				case "bad":
					this.women_sprite_obj.anims.play(bad_woman_feeling[Math.floor(Math.random() * Math.floor(bad_woman_feeling.length))], true);
					break;
				case "even":
					this.women_sprite_obj.anims.play(even_woman_feeling[Math.floor(Math.random() * Math.floor(even_woman_feeling.length))], true);
					break;
				default:
					return false;
			}
			return true;
		}
	};

	MessagesManager.prototype.destroy_text = function() {
		if (this.last_body != undefined) {
			this.last_body.destroy();
		}
		this.last_body = undefined;
		if(this.last_title != undefined){
			this.last_title.destroy();
		}
		this.last_title = undefined;

	};

	MessagesManager.prototype.display_text = function(title_msg, body_msg, color) {
		var msg = body_msg.split(' ');
		var new_msg = "";

		var lsize = 0;
		for (let w of msg) {
			if (lsize + w.length <= 30) {
				new_msg += w + ' ';
				lsize += w.length + 1;
			}
			else {
				new_msg += "\n" + w + ' ';
				lsize = w.length + 1;
			}
		}

		const title_words = title_msg.split(' ');
		var new_title = "";
		var nb_line_title = 1;
		for(let word of title_words){
			if(new_title.length + word.length < 20){
				new_title += " " + word ;
			}else{
				new_title += "\n" + " " + word;
				nb_line_title++;
			}
		}

		this.destroy_text();
		
		const y_axis_offset_body = 60 - 20 * nb_line_title;

		this.last_title = this.phaser.add.text(this.x - 140, this.y - 90, new_title, {fontSize: "25px", fill:color});
		this.last_title.fontWeight = "bold";
		this.last_body = this.phaser.add.text(this.x - 140, this.y - y_axis_offset_body, new_msg, {fontSize : "16px", fill:color});
	};

	return MessagesManager;

});
