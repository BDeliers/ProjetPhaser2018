/**
 * @class PathModel
 */

 class PathModel{
     constructor(scenario_name, path_name){
        var path = "../scenario/" + scenario_name + "/paths/" + path_name + ".json";

        var path;
        $.ajax({
            'async': false,
            'global': false,
            'url': path,
            'dataType': "json",
            'success': function (data){
                path = data;
            }
        });
        this.path = path;

        console.log("Create instance of " + path_name + " path");

     }

     get name(){
         return this.path.name;
     }

     get path(){
         return this.path.path;
     }
 }