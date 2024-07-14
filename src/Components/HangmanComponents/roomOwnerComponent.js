import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { socket } from "../../socket";
export default function RoomOwnerComponent({ roomStatus }) {
  const [rounds, SetRounds] = useState(3);
  const [alertMessage, setAlertMessage] = useState();
  const [alertEnabled, setAlertEnabled] = useState(false);
  // console.log(roomStatus.roomState);
  const alertFunction = (msg) => {
    setAlertEnabled(true);
    setAlertMessage(msg);
  };
  const closeAlert = () => {
    setAlertEnabled(false);
    setAlertMessage("");
  };
  const startGame = () => {
    console.log(roomStatus);
    socket.emit("startRound", {
      room: roomStatus.roomID,
      rounds: rounds,
      type: "start",
    });
  };
  return (
    <Container>
      {alertEnabled ? (
        <Alert variant="danger" onClose={() => closeAlert()} dismissible>
          {alertMessage}
        </Alert>
      ) : null}

      {roomStatus.roomState === "notStarted" ||
      roomStatus.roomState == "end" ? (
        <Row>
          <Col className="text-white">
            {" " + "Number of Rounds" + ": "}
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() =>
                rounds > 1
                  ? SetRounds(rounds - 1)
                  : alertFunction("Must have atleast one round")
              }
            />{" "}
            {" " + rounds + "  "}
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() =>
                rounds < 10
                  ? SetRounds(rounds + 1)
                  : alertFunction("Can have atmost 10 rounds")
              }
            />
          </Col>
          <Col>
            <Button
              onClick={() => {
                startGame();
              }}
            >
              START
            </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
