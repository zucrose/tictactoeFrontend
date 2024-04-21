import Gameboard from "./gameboard";
import { Button, Container, Row, Col } from "react-bootstrap";
export default function Gameroom({
  leaveRoom,
  room,
  roomStatus,
  move,
  ox,
  setJoinCreate,
}) {
  return (
    <>
      <Container className="align-content-center  justify-content-center">
        <Row className="m-2 p-2">
          Your Room Number is : <span className="h5"> {room}</span>
        </Row>
        {roomStatus.roomsize == 2 ? (
          <>
            <Row className="m-2 p-2">
              <Gameboard
                room={room}
                move={move}
                ox={ox}
                roomStatus={roomStatus}
              />
            </Row>
          </>
        ) : (
          <Row className="m-2 p-2">
            <p>Waiting for opponent...</p>
          </Row>
        )}
        <Row className="m-2 p-2 justify-content-center">
          <Button
            variant="danger"
            onClick={() => {
              leaveRoom(room);
              setJoinCreate("choose");
            }}
            style={{ width: "50%" }}
          >
            Quit Room
          </Button>
        </Row>
      </Container>
    </>
  );
}
