import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { socket } from "../../socket";
import PlayerWonLoss from "./playerWonLoss";
export default function RoomOwnerComponent({ roomStatus, pid }) {
  const [rounds, SetRounds] = useState(3);
  const [alertMessage, setAlertMessage] = useState();
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [show, setShow] = useState(true);
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
    <div
      className="h-100"
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5px" }}
    >
      {alertEnabled ? (
        <Alert
          className="m-2"
          variant="danger"
          onClose={() => closeAlert()}
          dismissible
        >
          {alertMessage}
        </Alert>
      ) : null}

      {roomStatus.roomState === "notStarted" ||
      roomStatus.roomState == "end" ? (
        <Col className="">
          <h1 className=" d-flex justify-content-center align-items-center  w-100 p-3">
            {" " + "Number of Rounds" + ": "}
            <FontAwesomeIcon
              className="p-3 scaleonhover"
              icon={faChevronLeft}
              onClick={() =>
                rounds > 1
                  ? SetRounds(rounds - 1)
                  : alertFunction("Must have atleast one round")
              }
              style={{ color: "darkcyan" }}
            />{" "}
            {" " + rounds + "  "}
            <FontAwesomeIcon
              className="p-3 scaleonhover"
              icon={faChevronRight}
              onClick={() =>
                rounds < 10
                  ? SetRounds(rounds + 1)
                  : alertFunction("Can have atmost 10 rounds")
              }
              style={{ color: "darkcyan" }}
            />
            <Button
              className=""
              onClick={() => {
                startGame();
              }}
            >
              START
            </Button>
          </h1>
        </Col>
      ) : null}
      {roomStatus.roomState === "end" ? (
        <PlayerWonLoss
          roomStatus={roomStatus}
          show={show}
          setShow={setShow}
          pid={pid}
        />
      ) : null}
    </div>
  );
}
