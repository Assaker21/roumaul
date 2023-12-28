import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [ws, setWs] = useState(null);
  const [url, setUrl] = useState("wss://roumaul-server.onrender.com");

  function connect() {
    const _ws = new WebSocket(url, "echo-protocol");
    setWs(_ws);

    const setupCall = {
      sender: "phone 1",
      action: "setup",
      team: "player",
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
      sender: "phone 1",
      action: "message",
      team: "player",
      data: { direction: value },
    };

    ws.send(JSON.stringify(message));
  }

  return (
    <>
      <div className="container">
        <input
          defaultValue={url}
          onChange={(e) => {
            console.log(e.target.value);
            setUrl(e.target.value);
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
