

// Models interface for event JSON object

var EventModel = function(event_json){

    this.event = JSON.parse(event_json);

}

EventModel.prototype.getName = function(){
    return this.event.name;
}

Event.prototype.getUrlToImage = function(){
    return this.event.url_to_image;
}

Event.prototype.getDescription = function(){
    return this.event.description;
}

Event.prototype.getPerturbativePollutionCoeff = function(){
    return thiis.event.perturbative_pollution_coeff;
}

Event.prototype.getPerturbativeMoneyCoeff = function(){
    return thiis.event.perturbative_money_coeff;
}

Event.prototype.getPerturbativeExhaustCoeff = function(){
    return thiis.event.perturbative_exhaust_coeff;
}

Event.prototype.getPerturbativeTimeCoeff = function(){
    return thiis.event.perturbative_time_coeff;
}