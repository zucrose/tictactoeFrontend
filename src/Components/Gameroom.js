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
        <div>Your Room Number is : {room}</div>
        {roomStatus.roomsize == 2 ? (
          <>
            <Gameboard room={room} move={move} ox={ox} />
          </>
        ) : (
          <div>Waiting for opponent...</div>
        )}
        <Button
          onClick={() => {
            leaveRoom(room);
            setJoinCreate("choose");
          }}
        >
          Quit Room
        </Button>
      </Container>
    </>
  );
}
