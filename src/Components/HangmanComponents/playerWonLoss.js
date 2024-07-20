import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function PlayerWonLoss({ roomStatus, show, setShow, pid }) {
  const type =
    roomStatus.lastWinner === pid
      ? 1
      : roomStatus.lastWinner === "tied"
      ? 4
      : 2;
  const player = roomStatus.playerArray.filter((e) => e.id === pid)[0];
  console.log(player);
  const title = type == 1 ? "Victory!!!" : type == 2 ? "Defeat....." : "Tied..";
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
          {(type == 1 ? "You Won with a score of " : "You got a score of ") +
            player.currentScore}
        </h5>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
