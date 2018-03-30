/**
 * @class Button Wrapper Phaser
 * create a new button on a Phaser asset and bind functions on mouse hover or mouse clic
 * TO DO : - annimate as a spritesheet
 */

define(["Phaser"], function() {

	console.log("Load core/Button");

	var button_class = class Button{
	    /**
	     * @param {phaser} phaser a phaser instance
	     * @param {string} sprite_name name of the loaded sprite
	     * @param {number} x x coordinate
	     * @param {number} y y coordinate
	     */
	    constructor(phaser, sprite_name, x, y){
	        this.sprite = phaser.add.sprite(x, y, sprite_name).setInteractive();
	    }

	    /**
	     * set a callback for a specific event
	     * @param {string} command a callback name : "hover_in", "hover_off", "click_on", "click_off"
	     * @param {function} callback_function pretty explicit
	     */
	    on(command, callback_function){
	        switch (command){
	            case 'hover_on':
	                this.sprite.on("pointerover", callback_function);
	                break;

	            case 'hover_off':
	                this.sprite.on("pointerout", callback_function);
	                break;

	            case 'click_on':
	                this.sprite.on("pointerdown", callback_function);
	                break;

	            case 'click_off':
	                this.sprite.on("pointerup", callback_function);
	                break;

	            default:
	                console.log("ERROR BUTTON : wrong command")
	        }
	    }

	    /**
	     * remove a callback function on a specific event
	     * @param {string} command
	     */
	    off(command){
	        if(command == "hover_on" || command == "click_on" || command == "click_off" || command == "hover_off"){
	            this.sprite.off(command);
	        }
	    }
	}

	return button_class;

});
