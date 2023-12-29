import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const devUrl = "ws://localhost:443";
const url = "wss://roumaul-server.onrender.com";

function App() {
  const [ws, setWs] = useState(null);
  const [url, setUrl] = useState(devUrl);
  const [code, setCode] = useState("");
  const [id, setId] = useState(uuidv4());

  function connect() {
    const _ws = new WebSocket(url, "echo-protocol");
    setWs(_ws);

    const setupCall = {
      code: code,
      sender: id,
      action: "setup",
      role: "player",
      data: "",
    };

    _ws.onopen = (event) => {
      _ws.send(JSON.stringify(setupCall));
    };

    _ws.onmessage = (event) => {
      console.log(event.data);
    };
  }

  function sendMessage(value) {
    const message = {
      code: code,
      sender: id,
      action: "move",
      role: "player",
      data: value,
    };

    ws.send(JSON.stringify(message));
  }

  return (
    <>
      <div className="container">
        <input
          defaultValue={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />

        <input
          defaultValue={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <button
          onClick={() => {
            connect();
          }}
        >
          Connect
        </button>
        <button
          onClick={() => {
            sendMessage("left");
          }}
        >
          Go Left
        </button>
        <button
          onClick={() => {
            sendMessage("right");
          }}
        >
          Go Right
        </button>
      </div>
    </>
  );
}

export default App;
