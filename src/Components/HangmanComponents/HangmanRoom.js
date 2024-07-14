import { Button, Col, Container, Row } from "react-bootstrap";
import { socket } from "../../socket";
import Scoreboard from "./Scoreboard";
import HangmanGameboard from "./HangmanGameboard";
import RoomOwnerComponent from "./roomOwnerComponent";

export default function HangmanRoom({
  leaveRoom,
  room,
  roomStatus,
  setJoinCreate,
  setRoomStatus,
}) {
  const playername = roomStatus.playerArray.filter((x) => {
    if (x.id === socket.id) return x;
  })[0].pname;
  const roomOwner = roomStatus.playerArray[0].id === socket.id;
  console.log("owner", roomOwner);
  return (
    <Container>
      <Row className="m-2 p-2 text-white">
        Hi {playername} , Your Room Number is:
        <span className="h5">
          {"  "}
          {room}
        </span>
      </Row>
      {roomOwner ? <RoomOwnerComponent roomStatus={roomStatus} /> : null}

      <Row className="d-flex flex-nowrap ">
        <Scoreboard roomstatus={roomStatus} playername={playername} />

        {roomStatus.roomState === "started" ? (
          <HangmanGameboard roomstatus={roomStatus} />
        ) : null}
      </Row>

      <Button
        variant="danger"
        onClick={() => {
          leaveRoom(room);
          setJoinCreate("choose");
        }}
        style={{ width: "10%" }}
      >
        Quit Room
      </Button>
    </Container>
  );
}
