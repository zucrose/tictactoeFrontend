import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PlayerWon({
  roomStatus,
  show,
  setShow,
  RestartRoom,
  room,
  ox,
  type,
}) {
  const [rmButton, setrmButton] = useState("Rematch");
  const title =
    type % 2 === 1 && type != 5
      ? "Victory!!!"
      : type != 5
      ? "Defeat....."
      : "Tied..";
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>
          <div className={type % 2 === 1 ? "text-success" : "text-danger"}>
            {title}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          {type == 3
            ? "Opponent Timer Expired"
            : type == 4
            ? "Your Timer Expired"
            : null}
        </h5>
        <p>
          {roomStatus.player1.mark == ox
            ? "You have won " +
              roomStatus.player1.wins +
              " time(s)  and lost " +
              roomStatus.player1.loss +
              " time(s)"
            : "You have won " +
              roomStatus.player2.wins +
              " time(s)  and lost " +
              roomStatus.player2.loss +
              " time(s)"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (roomStatus.restart == 0) setrmButton("Waiting for Opponent...");
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
      </Modal.Footer>
    </Modal>
  );
}
