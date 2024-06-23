import { useState } from "react";
import Gameboard from "./gameboard";
import { Button, Container, Row, Col } from "react-bootstrap";
import { socket } from "../socket";
export default function Gameroom({
  leaveRoom,
  room,
  roomStatus,
  setJoinCreate,
  RestartRoom,
  setRoomStatus,
}) {
  const ox =
    roomStatus.player1.id === socket.id
      ? roomStatus.player1.mark
      : roomStatus.player2.mark;

  const [rmButton, setrmButton] = useState("Rematch");

  return (
    <>
      <Container className="align-content-center  justify-content-center">
        <Row className="m-2 p-2 text-white">
          Your Room Number is : <span className="h5"> {room}</span>
        </Row>
        {roomStatus.roomsize == 2 ? (
          <>
            <Row className="m-2 p-2">
              <Gameboard
                room={room}
                ox={ox}
                roomStatus={roomStatus}
                setRoomStatus={setRoomStatus}
                RestartRoom={RestartRoom}
              />
            </Row>
            <Row className="m-2 p-2 justify-content-center">
              <Button
                variant="success"
                onClick={() => {
                  if (roomStatus.restart == 0)
                    setrmButton("Waiting for Opponent...");
                  RestartRoom(room);
                }}
                style={
                  roomStatus.gameState === "inProgress"
                    ? { display: "none" }
                    : { width: "50%" }
                }
              >
                {rmButton}
              </Button>
            </Row>
          </>
        ) : (
          <Row className="m-2 p-2 text-white muted">
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
