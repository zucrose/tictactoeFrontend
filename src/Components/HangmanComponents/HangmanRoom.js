import { Button, Col, Container, Row } from "react-bootstrap";
import { socket } from "../../socket";
import Scoreboard from "./Scoreboard";
import HangmanGameboard from "./HangmanGameboard";
import RoomOwnerComponent from "./roomOwnerComponent";
import PlayerComponent from "./playerComponent";

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
  // console.log("owner", roomOwner);
  return (
    <Container fluid>
      <Row className="m-2 p-2 text-white">
        Hi {playername} , Your Room Number is:
        <span className="h5">
          {"  "}
          {room}
        </span>
      </Row>

      <Row className=" justify-content-around">
        <Col
          sm="12"
          md="2"
          className="align-self-stretch my-2 p-2"
          style={{
            backgroundColor: "beige",
            border: "solid",
            borderRadius: "5px",
          }}
        >
          <Scoreboard roomstatus={roomStatus} playername={playername} />
        </Col>
        <Col
          sm="12"
          md="9"
          className="flex-fill my-2 p-2 "
          style={{
            backgroundColor: "beige",
            border: "solid",
            borderRadius: "5px",
          }}
        >
          {roomStatus.roomState === "started" ? (
            <HangmanGameboard roomstatus={roomStatus} />
          ) : roomOwner ? (
            <RoomOwnerComponent roomStatus={roomStatus} pid={socket.id} />
          ) : (
            <PlayerComponent
              roomStatus={roomStatus}
              roomOwner={roomOwner}
              pid={socket.id}
            />
          )}
        </Col>
      </Row>
      <Row className=" justify-content-center m-2">
        <Button
          sm="8"
          md="4"
          variant="danger"
          onClick={() => {
            leaveRoom(room);
            setJoinCreate("choose");
          }}
          className="w-50"
        >
          Quit Room
        </Button>
      </Row>
    </Container>
  );
}
