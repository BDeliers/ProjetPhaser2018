

// Models Class interface for Scenarios JSON object

class Scenario{
    
    constructor(scenario_name){
        var path = "../scenarios/" + scenario_name + ".json";
        
        $.ajax({
            'async': false,
            'global': false,
            'url': path,
            'dataType': "json",
            'success': function (data){
                this.scenario = data;
            }
        });
        
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

    get numberOfStops(){
        return this.scenario.stops_list.length;
    }

    stop(index){
            return this.scenario.stops_list[index];
    }
};



