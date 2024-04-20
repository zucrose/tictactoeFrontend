import { useState } from "react";
import { socket } from "../socket";
import { Button, Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Timer from "./timer";
import ChooseRoom from "./chooseRoom";
import Gameroom from "./Gameroom";

export default function Tictac({ move, setMove, roomStatus }) {
  const [room, setRoom] = useState(null);
  const [roomInput, setroomInput] = useState(null);
  const [joinCreate, setJoinCreate] = useState("choose");
  const [alertMessage, setAlertMessage] = useState(null);
  const [ox, setOx] = useState("");
  const [timerExpired, setTimerExpired] = useState(true);

  const joinRoom = ({ room, create }) => {
    setRoom(room);
    socket.emit("joinRoom", { room: room, create: create }, (msg) => {
      console.log(msg.status);
      if (msg.status === "failure") {
        setAlertMessage("Failed to join room.");
        setJoinCreate("choose");
      } else {
        setJoinCreate("create");
        if (msg.roomsize === 2) setOx("X");
        else if (msg.roomsize === 1) setOx("O");
      }
    });
  };
  const leaveRoom = (room) => {
    socket.emit("leaveRoom", room);
    setRoom(null);
    setOx("");
    setMove(null);
  };

  return (
    <>
      <Container className="align-content-center  justify-content-center">
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
              move={move}
              ox={ox}
              setJoinCreate={setJoinCreate}
            />
          ) : joinCreate === "join" ? (
            <>
              <input
                type="number"
                value={roomInput}
                placeholder="join room"
                onChange={(e) => setroomInput(e.target.value)}
              ></input>
              <button
                type="submit"
                onClick={() => {
                  joinRoom({ room: parseInt(roomInput), create: false });
                }}
              >
                Join
              </button>
            </>
          ) : null}
        </div>
      </Container>
    </>
  );
}
