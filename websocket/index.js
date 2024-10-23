const ws = require("ws");

const PORT = 4001;

const wss = new ws.Server({ port: PORT }, () =>
 console.log(`Server start on port: ${PORT}`)
);

wss.on("connection", function connection(ws) {
 //======для лобби =====//
 // ws.id = Date.now()
 //======для лобби =====//

 ws.on("message", (message) => {
  message = JSON.parse(message);
  switch (message.event) {
   case "message":
    broadcastMessage(message);
    break;
   case "connection":
    broadcastMessage(message);
    break;
  }
 });
});

function broadcastMessage(message) {
 // ,id
 wss.clients.forEach((client) => {
  // if(client.id === id) {
  // client.send(JSON.stringify(message)); }
  client.send(JSON.stringify(message));
 });
}
