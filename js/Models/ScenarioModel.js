

// Models Class interface for Scenarios JSON object

class Event{
    
    constructor(scenario_name){
        var path = "../scenarios/" + event_name + ".json";
        
        var scenar;
        $.ajax({
            'async': false,
            'global': false,
            'url': path,
            'dataType': "json",
            'success': function (data){
                scenar = data;
            }
        });

        this.scenario = scenar;
        
        console.log("Create instance of " + scenario_name + " scenarios");
    }
    
    get name() {
        return this.scenario.name;
    }

    get urlToImage(){
        return this.scenario.url_to_image;
    }

    get urlTobackground(){
        return this.scenario.url_to_background;
    }

    get description(){
        return this.scenario.description;
    }
    
    get stopsList(){
        return this.scenario.stops_list;
    }
};



