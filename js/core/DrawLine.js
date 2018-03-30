/**
 * Draw a line between the set of points
 * @class Line : Wrapper of Phaser functions to draw line with differents params
 * @param {Phaser} phaser  a instance of a Phaser object
 * @param {array} points a 2D array with the coordonate of each point as : [[x0, y0], [x1, y1], [xn, yn]]
 */

define([], function() {

	console.log("Load core/DrawLine");

	var line_class = class Line{
	     /**
	      * @method constructor Create a new instance of Line with initials params
	      * @param {Phaser} phaser a instance of a Phaser Object
	      * @param {json} options {color : "0xHEX", width: pixel_width, rounded_angles: boolean}
	      */
	    constructor(phaser, options){
	        // add a new graphics object
	        this.options = options;
	        this.phaser = phaser;
	        this.graphics = this.phaser.add.graphics({lineStyle: { width: this.options.width, color: this.options.color}, fillStyle: {color: this.options.color} });
	    }

	    /**
	     * @method draw Draw the line following a array of coordonates
	     * @param {array} points a 2D array with the coordonate of each point as : [[x0, y0], [x1, y1], [xn, yn]]
	     */
	    draw(points){
	        // draw the first circle (out of index for for loop)
	        if(this.options.rounded_angles === true){
	            this.graphics.fillCircleShape(new Phaser.Geom.Circle(points[0][0], points[0][0], this.options.width / 2));
	        }
	        if(points.length >= 2){
	            for(var i = 1; i < points.length; i++){
	                // draw the line
	                this.graphics.strokeLineShape( new Phaser.Geom.Line(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]) );
	                // draw circle for rounded shape if needed
	                if(this.options.rounded_angles === true){
	                    this.graphics.fillCircleShape( new Phaser.Geom.Circle(points[i][0], points[i][1], this.options.width / 2) );
	                }
	            }
	        }
	    }

	    /**
	     * @method clean remove the current line of the Phaser Canvas and re-initialize a Phaser graphics object
	     */
	    clean(){
	        this.graphics.destroy();
	        this.graphics = this.phaser.add.graphics({lineStyle: { width: this.options.width, color: this.options.color}, fillStyle: {color: this.options.color} });
	    }

	    /**
	     * @method setOptions re-set new options for lines
	     * @param {json} options
	     */
	    setOptions(options){
	        this.options = options;
	    }
	 };

	 return line_class;

});
