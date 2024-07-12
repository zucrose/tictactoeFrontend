import { Container, Row } from "react-bootstrap";
import { socket } from "../../socket";
import Scoreboard from "./Scoreboard";
import HangmanGameboard from "./HangmanGameboard";

export default function HangmanRoom({
  leaveRoom,
  room,
  roomStatus,
  setJoinCreate,
  RestartRoom,
  setRoomStatus,
}) {
  const playername = roomStatus.playerArray.filter((x) => {
    if (x.id === socket.id) return x;
  })[0].pname;

  return (
    <Container>
      <Row className="m-2 p-2 text-white">
        Hi {playername} , Your Room Number is:
        <span className="h5">
          {"  "}
          {room}
        </span>
      </Row>
      <Scoreboard roomstatus={roomStatus} playername={playername} />
      <HangmanGameboard roomstatus={roomStatus} />
    </Container>
  );
}
