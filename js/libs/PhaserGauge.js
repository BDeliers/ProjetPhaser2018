//Draw a Gauge
//config is a dictionnary {background_color, color, x, y, height, width}

function Gauge(phaser, percentage, config) {
    var graphics = phaser.add.graphics();

    //Drawing the gauge's background
    graphics.fillStyle(config.background_color);

    graphics.fillRect(config.x + (config.height / 2), config.y, config.width - config.height, config.height);
    graphics.fillCircle(config.x + (config.height / 2 ), config.y + (config.height / 2 ), config.height / 2);
    graphics.fillCircle(config.x + (config.height / 2 ) + (config.width - config.height), config.y + (config.height / 2 ), config.height / 2);

    //Drawing the Gauge itself
    graphics.fillStyle(config.color);

    graphics.fillRect(config.x + (config.height / 2), config.y + ((0.1 * config.height) / 2), (percentage/100) * ((config.width - config.height)), 0.9 * config.height);
    graphics.fillCircle(config.x + (config.height / 2), config.y + (config.height / 2), (0.9 * config.height) / 2);
    graphics.fillCircle(config.x + ((percentage/100) * ((config.width - config.height))) + ((config.height / 2)), config.y + (config.height / 2), (0.9 * config.height) / 2);
}
