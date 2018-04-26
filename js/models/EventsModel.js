/**
 * @description Model for drive events of the game, instance 1 Event Model per game
 */

define(["jquery"], function($) {

	console.log("Load models/EventModel");

	/**
	 * @description Constructor : load all JSON named from events_list
	 * @param {Array} events_list array with name of all event files to load (without extention .JSON)
	 */
	var Events = function(events_list){
		this.events_json_list = [];
		this.active_events = []

		for(let event of events_list){

			const path = "./events/" + event + ".json";
			$.ajax({
				'async': false,
				'global': false,
				'url': path,
				'dataType': "json",
				'success': data => {
					this.events_json_list.push(data);
				}
			});
		}
	};


	/**
	 * @description get the relative URL of the event image 
	 * @param {String} event_name name of the event (field "name" of the JSON)
	 */
	Events.prototype.getUrlToImage = function(event_name){
		for(let event of this.events_json_list){
			if(event.name == event_name){
				return event.url_to_image;
			}
		}
		return false;
	}


	/**
	 * @description return an array with all event triggered in the current game
	 */
	Events.prototype.getActivesEvents = function(){
		return this.active_events;
	}


	/**
	 * @description return the description of the event
	 * @param {String} event_name name of the event (field "name" of the JSON)
	 */
	Events.prototype.getDescription = function(event_name){
		for(let event of this.events_json_list){
			if(event.name == event_name){
				return event.description;
			}
		}
	}

	/**
	 * @description return the display_name of the event
	 * @param {String} event_name name of the event (field "name" of the JSON)
	 */

	Events.prototype.getDisplay_name = function(event_name){
		for(let event of this.events_json_list){
			if(event.name == event_name){
				return event.display_name;
			}
		}
	}

	/**
	 * @description add the event to the list of active events
	 * @param {String} event_name name of the event (field "name" of the JSON)
	 */
	Events.prototype.addEvent = function(event_name){
		for(let event of this.events_json_list){
			if(event_name == event.name && this.active_events.indexOf(event) == -1){
				this.active_events.push(event);
				return event;
			}
		}
		return false;
	}

	/**
	 * @description add a random event to the list of active events (do nothing sometime if the choosen event is already triggered)
	 */
	Events.prototype.addRandomEvent = function(){
		const choose_index = Math.floor( (Math.random() * (this.events_json_list.length - 1)));
		if(this.active_events.indexOf(this.events_json_list[choose_index]) == -1){
			this.active_events.push(this.events_json_list[choose_index]);
			return this.events_json_list[choose_index];
		}
		return false;
	}

	/**
	 * @description remove the event from the active list, return false if the event is not found
	 * @param {String} event_name name of the event (field "name" of the JSON)
	 */
	Events.prototype.removeEvent = function(event_name){
		for(let event of this.active_events){
			if(event_name == event.name){
				this.active_events.splice(this.active_events.indexOf(event), 1);
				return true;
			}
		}
		return false;
	}

	/**
	 * @description check if the vehicle is blocked depending of currently active events
	 * @param {String} vehicle_name name of the vehicle
	 */
	Events.prototype.isBlocked = function(vehicle_name){
		for(let event of this.active_events){
			for(let blocked_vehicle of event.blocked_vehicles){
				if(vehicle_name == blocked_vehicle){
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * @param {String} vehicle_name name of the vehicle
	 */
	Events.prototype.getPollutionPerturbativeCoeff = function(vehicle_name){
		var pollution_perturbative_coeff = 1;
		for(let event of this.active_events){
			if(event.apply_to.indexOf(vehicle_name) != -1){
				pollution_perturbative_coeff *= event.perturbative_pollution_coeff;
			}
		}
		return pollution_perturbative_coeff;
	}

	/**
	 * @param {String} vehicle_name name of the vehicle
	 */
	Events.prototype.getMoneyPerturbativeCoeff = function(vehicle_name){
		var money_perturbative_coeff = 1;
		for(let event of this.active_events){
			if(event.apply_to.indexOf(vehicle_name) != -1){
				money_perturbative_coeff *= event.money_pollution_coeff;
			}
		}
		return money_perturbative_coeff;
	}

	/**
	 * @param {String} vehicle_name name of the vehicle
	 */
	Events.prototype.getTimePerturbativeCoeff = function(vehicle_name){
		var time_perturbative_coeff = 1;
		for(let event of this.active_events){
			if(event.apply_to.indexOf(vehicle_name) != -1){
				time_perturbative_coeff *= event.time_pollution_coeff;
			}
		}
		return time_perturbative_coeff;
	}

	/**
	 * @param {String} vehicle_name name of the vehicle
	 */
	Events.prototype.getExhaustPerturbativeCoeff = function(vehicle_name){
		var exhaust_perturbative_coeff = 1;
		for(let event of this.active_events){
			if(event.apply_to.indexOf(vehicle_name) != -1){
				exhaust_perturbative_coeff *= event.exhaust_pollution_coeff;
			}
		}
		return exhaust_perturbative_coeff;
	}

	return Events;
})
