// Models Class interface for vehicle JSON object

define(["jquery"], function() {

	console.log("Load models/VehicleModel");

	var vehicle_class = class Vehicle{

	    constructor(vehicle_name){
	        var path = "./vehicles/" + vehicle_name + ".json";

	        var vehicle;
	        $.ajax({
	            'async': false,
	            'global': false,
	            'url': path,
	            'dataType': "json",
	            'success': function (data){
	                vehicle = data;
	            }
	        });
	        this.vehicle = vehicle;

	        this.events = [];
	        for(let event of this.vehicle.available_events){
	            this.events.push(new Event(event));
	        }

	        console.log("Create instance of " + vehicle_name + " vehicle");
	    }

	    get name() {
			return this.vehicle.name;
	    }
		get display_name(){
			return this.vehicle.display_name;
		}
		
	    get urlToImage(){
	        return this.vehicle.url_to_image;
	    }

	    get PathColor(){
	        return this.vehicle.path_color;
	    }

	    get description(){
	        return this.vehicle.description;
	    }

	    get pollutionCoeff(){
	        return Number(this.vehicle.pollution_coeff);
	    }

	    get moneyCoeff(){
	        return Number(this.vehicle.money_coeff);
	    }

	    get exhaustCoeff(){
	        return Number(this.vehicle.exhaust_coeff);
	    }

	    get timeCoeff(){
	        return Number(this.vehicle.time_coeff);
		}
		
		get co2(){
			return Number(this.vehicle.co2);
		}

	    get availableEvents(){
	        return this.events;
	    }
	};

	return vehicle_class;

});
