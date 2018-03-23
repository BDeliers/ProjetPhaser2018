

// Models Class interface for event JSON object

// Event is a JS word
class Event{
    
    constructor(event_name){
        var path = "./events/" + event_name + ".json";
        
        var event;
        $.ajax({
            'async': false,
            'global': false,
            'url': path,
            'dataType': "json",
            'success': function (data){
                event = data;
            }
        });
        this.event = event;
        
        console.log("Create instance of " + event_name + " event");
    }
    
    get name() {
        return this.event.name;
    }

    get urlToImage(){
        return this.event.url_to_image;
    }

    get description(){
        return this.event.description;
    }

    get perturbativePollutionCoeff(){
        return this.event.perturbative_pollution_coeff;
    }
    
    get perturbativeMoneyCoeff(){
        return this.event.perturbative_money_coeff;
    }
    
    get perturbativeExhaustCoeff(){
        return this.event.perturbative_exhaust_coeff;
    }
    
    get perturbativeTimeCoeff(){
        return this.event.perturbative_time_coeff;
    }
};



