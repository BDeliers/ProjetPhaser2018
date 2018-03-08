//Draw a Gauge
//config is a dictionnary {background_color, color, x, y, height, width, coeff}

function Gauge(phaser, percentage, config) {
    var graphics = phaser.add.graphics();
    var radius = config.height / 2;
    var rect_width = config.width - config.height;
    var circle_center = config.x + radius;
    var percentage = Math.abs(percentage) % 101;

    //Drawing the gauge's background
    graphics.fillStyle(config.background_color);

    graphics.fillRect(circle_center, config.y, config.width - config.height, config.height);
    graphics.fillCircle(circle_center, config.y + radius, radius);
    graphics.fillCircle(circle_center + rect_width, config.y + radius, radius);

    //Drawing the Gauge itself
    graphics.fillStyle(config.color);

    graphics.fillRect(circle_center, config.y + (((1 - config.coeff) * config.height) / 2), (percentage/100) * (rect_width), config.coeff * config.height);
    graphics.fillCircle(circle_center, config.y + radius, config.coeff * config.height / 2);
    graphics.fillCircle(config.x + ((percentage/100) * rect_width) + radius, config.y + radius, config.coeff * config.height / 2);
}
