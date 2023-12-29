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
  console.log("Server is listening on port 443");
});

var all = new Object();

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    data = JSON.parse(data);
    handleMessage(data, ws);
  });
});

function handleMessage(_data, ws) {
  const { code, sender, role, action, data } = _data;

  if (action == "setup") {
    if (role == "host") {
      all[code] = {};
      all[code]["host"] = {
        ws: ws,
      };

      console.log("Host setup");
    } else {
      all[code][sender] = {
        ws: ws,
      };

      all[code]["host"].ws.send(
        JSON.stringify({
          sender: "server",
          action: "setup-player",
          data: sender,
        })
      );

      console.log("Player setup");
    }
  } else if (action == "move") {
    all[code]["host"].ws.send(
      JSON.stringify({
        sender: sender,
        action: "move",
        data: data,
      })
    );

    console.log("Move action");
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
