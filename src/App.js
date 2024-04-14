import { useEffect, useState } from "react";
import { socket } from "./socket";
import Tictac from "./tictac";

function App() {
  const [chat, setChat] = useState([]);
  const [move, setMove] = useState();
  useEffect(() => {
    // no-op if the socket is already connected
    console.log("why");
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("incomingMessage", (data) => {
      console.log(data);
      setChat((chat) => [...chat, data]);
    });
    return () => {
      socket.off("incomingMessage");
    };
  }, [chat]);
  useEffect(() => {
    socket.on("newMove", (data) => {
      console.log(data);
      setMove(data);
    });
    return () => {
      socket.off("newMove");
    };
  }, [move]);
  console.log(move + "Lslsl");
  return (
    <div className="App">
      <Tictac chat={chat} move={move}></Tictac>
    </div>
  );
}

export default App;
