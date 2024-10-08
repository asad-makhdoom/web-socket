import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

let socket = io.connect("http://localhost:3001");

function App() {
  const [outGoingMessage, setOutGoingMessage] = useState({});
  const [inCommingMessage, setInComingMessage] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", outGoingMessage.room);
  };

  const sendMessage = () => {
    socket.emit("send_message", outGoingMessage);
  };

  const connectSocket = () => {
    socket = io.connect("http://localhost:3001");
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setInComingMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Room"
        onChange={(ev) =>
          setOutGoingMessage({ ...outGoingMessage, room: ev.target.value })
        }
        value={outGoingMessage?.room || ""}
      />
      <button type="button" onClick={joinRoom}>
        Join Room
      </button>
      <br />
      <br />
      <input
        type="text"
        placeholder="Message"
        onChange={(ev) =>
          setOutGoingMessage({ ...outGoingMessage, message: ev.target.value })
        }
        value={outGoingMessage?.message || ""}
      />
      <button type="button" onClick={sendMessage}>
        Send
      </button>
      <br />
      <br />
      <button type="button" onClick={disconnectSocket}>
        Disconnect
      </button>
      <button type="button" onClick={connectSocket}>
        Connect
      </button>

      <div>
        <h3>Incoming Messages</h3>
        <p>{inCommingMessage}</p>
      </div>
    </div>
  );
}

export default App;
