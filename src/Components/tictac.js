import { useState } from "react";
import { socket } from "../socket";
import { Button, Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Timer from "./timer";
import ChooseRoom from "./chooseRoom";
import Gameroom from "./Gameroom";
import JoinroomComponent from "./Joinroom";
import HangmanRoom from "./HangmanComponents/HangmanRoom";

export default function Tictac({ roomStatus, setRoomStatus }) {
  const [room, setRoom] = useState(null);
  const [roomInput, setroomInput] = useState(null);
  const [joinCreate, setJoinCreate] = useState("choose");
  const [alertMessage, setAlertMessage] = useState(null);
  const [gamemode, setGamemode] = useState("tictac");
  const joinRoom = ({ room, create }) => {
    console.log(room);
    socket.emit(
      "joinRoom",
      { room: room, create: create, type: gamemode, id: socket.id },
      (msg) => {
        console.log(msg.status);
        if (msg.status === "success") {
          setJoinCreate("create");
          console.log(msg);
          setRoom(msg.room);
        } else {
          setAlertMessage("Failed to join room.");
          setJoinCreate("choose");
        }
      }
    );
  };
  const leaveRoom = (room) => {
    socket.emit("leaveRoom", { room: room, id: socket.id, type: gamemode });
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
            <ChooseRoom
              joinRoom={joinRoom}
              setJoinCreate={setJoinCreate}
              setGamemode={setGamemode}
            />
          </>
        ) : joinCreate === "create" ? (
          gamemode === "tictac" ? (
            <Gameroom
              leaveRoom={leaveRoom}
              room={room}
              roomStatus={roomStatus}
              setJoinCreate={setJoinCreate}
              RestartRoom={RestartRoom}
              setRoomStatus={setRoomStatus}
            />
          ) : (
            <HangmanRoom
              leaveRoom={leaveRoom}
              room={room}
              roomStatus={roomStatus}
              setJoinCreate={setJoinCreate}
              RestartRoom={RestartRoom}
              setRoomStatus={setRoomStatus}
            ></HangmanRoom>
          )
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
