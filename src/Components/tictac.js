import { useState } from "react";
import { socket } from "../socket";
import { Button, Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Timer from "./timer";
import ChooseRoom from "./chooseRoom";
import Gameroom from "./Gameroom";
import JoinroomComponent from "./Joinroom";

export default function Tictac({ roomStatus, setRoomStatus }) {
  const [room, setRoom] = useState(null);
  const [roomInput, setroomInput] = useState(null);
  const [joinCreate, setJoinCreate] = useState("choose");
  const [alertMessage, setAlertMessage] = useState(null);
  const [timerExpired, setTimerExpired] = useState(true);

  const joinRoom = ({ room, create }) => {
    socket.emit("joinRoom", { room: room, create: create }, (msg) => {
      console.log(msg.status);
      if (msg.status === "failure") {
        setAlertMessage("Failed to join room.");
        setJoinCreate("choose");
      } else {
        setJoinCreate("create");
        console.log(msg);
        setRoom(msg.room);
      }
    });
  };
  const leaveRoom = (room) => {
    socket.emit("leaveRoom", { room: room, id: socket.id });
    setRoom(null);

    setRoomStatus({ roomsize: null, restart: null });
  };
  const RestartRoom = (room) => {
    socket.emit("RestartRoom", { room: room });
  };
  return (
    <>
      {" "}
      {alertMessage != null ? (
        <Alert
          variant="danger"
          onClose={() => setAlertMessage(null)}
          dismissible
        >
          {alertMessage}
        </Alert>
      ) : null}
      <div>
        {joinCreate === "choose" ? (
          <>
            <ChooseRoom joinRoom={joinRoom} setJoinCreate={setJoinCreate} />
          </>
        ) : joinCreate === "create" ? (
          <Gameroom
            leaveRoom={leaveRoom}
            room={room}
            roomStatus={roomStatus}
            setJoinCreate={setJoinCreate}
            RestartRoom={RestartRoom}
            setRoomStatus={setRoomStatus}
          />
        ) : joinCreate === "join" ? (
          <JoinroomComponent
            roomInput={roomInput}
            setroomInput={setroomInput}
            joinRoom={joinRoom}
          />
        ) : null}
      </div>
    </>
  );
}
