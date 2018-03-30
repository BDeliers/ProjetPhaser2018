const http = require('http');
const fs = require('fs')

console.log("Server created");
http.createServer((request, response) => {
  console.log("request recieved");
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    
    var 
    var path_json = JSON.parse(body);
    console.log(json);
    var file_name = json.json_scenario_name + ".json";
    fs.readFileSync(file_name, (err, data)=>{
      var scenario_json = JSON.parse(data);
      scenario_json.paths.push(path_json.object);
    });
    fs.writeFile(file_name, JSON.stringify(scenario_json), function(){
        console.log("file created");
    });

  });
}).listen(8080); // Activates this server, listening on port 8080.