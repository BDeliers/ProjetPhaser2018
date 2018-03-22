/**
 * Draw a line between the set of points 
 * @function DrawLine
 * @param {Phaser} phaser  a instance of a Phaser object
 * @param {json} options {color : "0xHEX", width: pixel_width, rounded_angles: boolean}
 * @param {array} points a 2D array with the coordonate of each point as : [[x0, y0], [x1, y1], [xn, yn]]
 */
  
 console.log("Load DrawLine");
 
 function DrawLine(phaser, options, points){
     // add a new graphics object
     console.log("line draw");
     var graphics = phaser.add.graphics({lineStyle: { width: options.width, color: options.color}, fillStyle: {color: options.color} });

     // draw the first circle (out of index for for loop)
     if(options.rounded_angles === true){
         graphics.fillCircleShape(new Phaser.Geom.Circle(points[0][0], points[0][0], options.width / 2));
     }
     for(var i = 1; i < points.length; i++){
         // draw the line
        graphics.strokeLineShape( new Phaser.Geom.Line(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]) );
         // draw circle for rounded shape if needed 
        if(options.rounded_angles === true){
            graphics.fillCircleShape( new Phaser.Geom.Circle(points[i][0], points[i][1], options.width / 2) );
        }
     }

 }