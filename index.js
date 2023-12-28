/*const express = require("express");
const app = express();
app.use(express.json());*/

//const WebSocket = require("ws");

var express = require("express");
var app = express();

var server = require("http").createServer(app);
var WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server }, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

server.listen(443);

wss.on("listening", () => {
  console.log("Server is listening on port 80");
});

var all = new Object();

wss.on("connection", (ws) => {
  ws.send("connected!");

  ws.on("message", (data) => {
    data = JSON.parse(data);
    if (data.action == "setup") {
      console.log("setup complete for: " + data.sender);
      all[data.sender] = {
        sender: data.sender,
        team: data.team,
        ws: ws,
      };
      ws.send("setup complete for: " + data.sender);
    } else if (data.action == "message") {
      console.log(
        "message received for: " +
          data.sender +
          " - message: " +
          data.data.direction
      );

      handleMessage(data);
    }
  });
});

function handleMessage(data) {
  if (data.team == "player" && all["host"]) {
    all["host"].ws.send(data.data.direction);
  }
}

/*const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

var counter = 0;
app.get("/", (req, res) => {
  console.log("Asked for me " + ++counter + "x");
  res.send({
    status: "err",
    data: "This is the data",
  });
});

app.post("/", (req, res) => {
  console.log("Asked for me " + ++counter + "x");
  console.log(req.body);
  res.json({
    status: "success",
    data: req.body,
  });
});*/
