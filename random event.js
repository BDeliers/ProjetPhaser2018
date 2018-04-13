var evts = new EventsModel(["free_public_transport", "fuel_taxi", "heat_wave", "jam", "metro_roadworks", "nuclear_war", "rain", "taxi_strike", "train_strike"]);

var random_event = () => {
   evts.addRandomEvent();
   window.setTimeout(random_event, Math.floor(Math.random() * 60) * 1000);
};

window.setTimeout(random_event, Math.floor(Math.random() * 60) * 1000);
