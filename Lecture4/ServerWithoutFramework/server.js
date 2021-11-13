const http = require('http');

// create a server object
const server = http.createServer((req, res) => {
  res.end('Hello World')
});

// ? we will tell the server object to listen to the request sent by the client
// thus we will assign a port to the server wheren in the client requests can be redirected to
server.listen(3000, () => {
  console.log("Server running at port 3000");
  // now the server objectt is booted up
});

