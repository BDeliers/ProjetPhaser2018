// J'ai esquissé un début de classe pour le controle des jauges, après tu fait comme tu veut pour prendre des idées dedans 
// ou l'utilisé comme base pour ton code


class Gauge{
    constructor(scenario){
        // number of steps
        var steps = scenario.numberOfStops();
        //percentage for starting game 
        var pollution_level = 0;
        var money_level = 100;
        var exhaust_level = 0;
        var time_level = 0;
    }

    // Arguments : 
    // vehicle : VehicleModel
    // actives_events : a tab filled with all actives events of the game
    updateLevels(vehicle, actives_events){

        var pollution_coeff = vehicle.pollutionCoeff();
        var money_coeff = vehicle.moneyCoeff();
        var exhaust_coeff = vehicle.exhaustCoeff();
        var time_coeff = timeCoeff();

        for(event in actives_events){
            pollution_coeff += event.perturbativePollutionCoeff();
            money_coeff += event.perturbativeMoneyCoeff();
            exhaust_coeff += event.perturbativeExhaustCoeff();
            time_coeff += event.perturbativeTimeCoeff();
        }

        // We update the level of each gauge
        this.pollution_level += (100 / this.steps) * pollution_coeff;
        this.money_level += (100 / this.steps) * money_coeff;
        this.exhaust_level += (100 / this.steps) * exhaust_coeff;
        this.time_level += (100 / this.steps) * time_coeff;
        
        // We check that each level is under 100 (max)
        // sinon de toute facon la partie est perdue non ? 
        if(this.pollution_level > 100){
            this.pollution_level = 100;
        }
        if(this.money_level > 100){
            this.money_level = 100;
        }
        if(this.exhaust_level > 100){
            this.exhaust_level = 100;
        }
        if(this.time_level > 100){
            this.time_level = 100;
        }
    }

    // a toi de jouer :) 
    displayPollutionGauge(){

    }
    
    displayMoneyGauge(){
        
    }

    displayExhaustGauge(){
        
    }

    displayTimeGauge(){
        
    }
    
}
