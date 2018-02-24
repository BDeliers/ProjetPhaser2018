

// Models Class interface for vehicule JSON object

class Vehicule{
    
    constructor(vehicule_name){
        var path = "../vehicules/" + vehicule_name + ".json";
        
        var vehicule;
        $.ajax({
            'async': false,
            'global': false,
            'url': path,
            'dataType': "json",
            'success': function (data){
                vehicule = data;
            }
        });

        this.vehicule = vehicule;
        this.events = [];

        for(let event of this.vehicule.available_events){
            this.events.push(new Event(event));
        }
        
        console.log(this.vehicule.available_events);
        
        console.log("Create instance of " + vehicule_name + " vehicule");
    }
    
    get name() {
        return this.vehicule.name;
    }

    get urlToImage(){
        return this.vehicule.url_to_image;
    }

    get urlToPathImage(){
        return this.vehicule.url_to_path_image
    }

    get description(){
        return this.vehicule.description;
    }

    get pollutionCoeff(){
        return this.vehicule.pollution_coeff;
    }
    
    get moneyCoeff(){
        return this.vehicule.money_coeff;
    }
    
    get exhaustCoeff(){
        return this.vehicule.exhaust_coeff;
    }
    
    get timeCoeff(){
        return this.vehicule.time_coeff;
    }

    get availableEvents(){
        return this.events;
    }
};



