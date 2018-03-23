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
    
    
    var json = JSON.parse(body);
    console.log(json);
    var file_name = json.name + ".json";
    fs.writeFile(file_name, JSON.stringify(json), function(){
        console.log("file created");
    });

  });
}).listen(8080); // Activates this server, listening on port 8080.