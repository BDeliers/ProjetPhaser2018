const http = require('http');
const fs = require('fs')

console.log("Server created");
http.createServer((request, response) => {
  console.log("request recieved");
  const { headers, method, url } = request;
  let body = "";

  request.on('error', err => {
    console.error(err);
  });

  request.on('data', chunk => {
    body += String(chunk)
  });
  
  request.on('end', () => {
    
    var received_json = JSON.parse(body);

    var file_name = "./" + received_json.json_scenario_name + ".json";
    console.log(file_name);
    var scenario_json;

    fs.readFile(file_name, 'utf8', (err, data)=>{
      if(err){
        console.log(err); 
        return;
      }else{
        scenario_json = JSON.parse(String(data));
        console.log(data);
        var finded = false;
        for(let i= 0; i < scenario_json.paths_list.length; i++){
          if(scenario_json.paths_list[i].from == received_json.object.from && scenario_json.paths_list[i].to == received_json.object.to){
            scenario_json.paths_list[i] = received_json.object;
            finded = true;
            break;
          }
        }
        if(!finded){
          scenario_json.paths_list.push(received_json.object);
        }
        
        fs.writeFile(file_name, JSON.stringify(scenario_json), () => {
          console.log("file created : ");
          console.log(scenario_json);
        });
      }
    });

    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.write('');
    response.end();

  });
}).listen(8080); // Activates this server, listening on port 8080.