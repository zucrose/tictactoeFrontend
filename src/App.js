import { useEffect, useState } from "react";
import { socket } from "./socket";
import Tictac from "./Components/tictac";
import { Container } from "react-bootstrap";

function App() {
  const [move, setMove] = useState(null);
  const [roomStatus, setRoomStatus] = useState({ roomsize: null });

  useEffect(() => {
    // no-op if the socket is already connected
    console.log("why");
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("roomStatus", (data) => {
      console.log(data);
      setRoomStatus(data);
    });
    return () => {
      socket.off("roomStatus");
    };
  }, [roomStatus]);

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
    <Container
      fluid
      className="align-content-center  justify-content-center p-3 m-2"
      style={{ backgroundColor: "blueviolet" }}
    >
      <Tictac
        move={move}
        setMove={setMove}
        roomStatus={roomStatus}
        setRoomStatus={setRoomStatus}
      ></Tictac>
    </Container>
  );
}

export default App;
