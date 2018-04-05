// Models Class interface for event JSON object

// Event is a JS word

define(["jquery"], function($) {

	console.log("Load models/EventModel");

	var Events = function(events_list){
		this.events_json_list = [];
		this.active_events = []

		for(let event of events_list){

			const path = "./events" + event + ".json";
			$.ajax({
				'async': false,
				'global': false,
				'url': path,
				'dataType': "json",
				'success': data => this.events_json_list.push(JSON.parse(data))
			});
		}
	};

	Events.prototype.addEvent = function(event_name){
		for(let event of this.events_json_list){
			if(event_name == event.name && this.active_events.find(event) == undefined){
				this.active_events.push(event);
				return true;
			}
		}
		return false;
	}

	Events.prototype.addRandomEvent() = function(){
		const choose_index = Math.floor( (Math.random() * (this.events_json_list.length - 1) + 1));

		if(this.active_events(this.events_json_list[choose_index]) == undefined){
			this.active_events.push(this.events_json_list[choose_index]);
			return true;
		}
		return false;
	}

	Events.prototype.removeEvent = function(event_name){

	}

	Events.prototype.isBlocked = function(vehicle_name){

	}

	Events.prototype.getPolltionPertubativeCoeff = function(vehicle_name){

	}

	Events.prototype.getMoneyPerturbativeCoeff = function(vehicle_name){

	}

	Events.prototype.getTimePerturbativeCoeff = function(vehicle_name){

	}

	Events.prototype.getExhaustPerturbativeCoeff = function(vehicle_name){

	}

	return Events;
})
