import { useEffect, useState } from "react";
import { socket } from "./socket";
import Tictac from "./Components/tictac";
import { Container } from "react-bootstrap";

function App() {
  const [roomStatus, setRoomStatus] = useState();

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
      console.log(data, "roomstatus sent");
      setRoomStatus({ ...data.roomObject });
    });
    return () => {
      socket.off("roomStatus");
    };
  }, [roomStatus]);
  console.log(roomStatus);
  return (
    <Container
      fluid
      className=" align-content-center  justify-content-center p-3 m-2  "
    >
      <Tictac roomStatus={roomStatus} setRoomStatus={setRoomStatus}></Tictac>
    </Container>
  );
}

export default App;
