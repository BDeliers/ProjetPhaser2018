(function() {

    console.log("Enter main");
    
    //event 
    var jam = new Event("jam");
    console.log(jam.name);

    //scenario
    var work = new Scenario("work");
    console.log(work.stop(1));
    console.log(work.description);

    //vehicle
    var car = new Vehicle("car");
    console.log(car.availableEvents);
})();