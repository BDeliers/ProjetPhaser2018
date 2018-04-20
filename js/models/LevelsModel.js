//Levels management class

define([], function() {

	console.log("Load models/LevelsModel");

	var Levels = function() {
	    this.pollution_level = 0;
	    this.money_level = 100;
	    this.exhaust_level = 0;
	    this.time_level = 0;
	};

	//Updates the levels
	Levels.prototype.updateLevels = function(vehicle, active_events) {
	    var pollution_coeff = vehicle.pollutionCoeff;
	    var money_coeff = vehicle.moneyCoeff;
	    var exhaust_coeff = vehicle.exhaustCoeff;
	    var time_coeff = vehicle.timeCoeff;

	    for(event in active_events){
	        pollution_coeff *= (1 + event.getPollutionCoeffPerturbative());
	        money_coeff *= (1 + event.getMoneyCoeffPerturbative());
	        exhaust_coeff *= (1 + event.getExhaustCoeffPerturbative());
	        time_coeff *= (1 + event.getTimeCoeffPerturbative());
	    }

	    this.pollution_level += 33 * pollution_coeff;
	    this.money_level -= 33 * money_coeff;
	    this.exhaust_level += 33 * exhaust_coeff;
	    this.time_level += 33 * time_coeff;
	}

	//Getters

	Levels.prototype.getPollutionLevel = function() {
	    return this.pollution_level % 101;
	}

	Levels.prototype.getMoneyLevel = function() {
	    return this.money_level % 101;
	}

	Levels.prototype.getExhaustLevel = function() {
	    if (this.exhaust_level < 0) {
	        return 0;
	    }
	    else {
	        return this.exhaust_level;
	    }
	}

	Levels.prototype.getTimeLevel = function() {
	    return this.time_level;
	}

	return Levels;
});
