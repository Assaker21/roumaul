import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [ws, setWs] = useState(new WebSocket("ws://localhost:8080"));

  useEffect(() => {
    const setupCall = {
      sender: "phone 1",
      action: "setup",
      team: "player",
      data: "",
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(setupCall));
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };
  }, []);

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
