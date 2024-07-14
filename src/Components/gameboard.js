import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import Gamepiece from "./gamepiece";
import Timer from "./timer";
import gameLogic from "./gamelogic";
import PlayerWon from "./playerWon";
import { Button, Modal } from "react-bootstrap";
export default function Gameboard({ room, ox, roomStatus, RestartRoom }) {
  const [timerExpired, setTimerExpired] = useState(true);
  const [show, setShow] = useState(true);
  const gameState = roomStatus.gameState;
  const winner = roomStatus.lastWinner;
  const gb = roomStatus.gameboard;
  const turn = roomStatus.turn;
  const [gameboardColor, setGameboardColor] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const sendMove = (x, y) => {
    if (gameState == "inProgress")
      socket.emit("sendMove", {
        room: room,
        movex: x,
        movey: y,
        sender: ox,
        turn: turn,
      });
    else return;
  };
  const winnerFound = (state, mark) => {
    if (ox == mark)
      socket.emit("declareWinner", {
        room: room,
        state: state,
        mark: mark,
      });
  };

  useEffect(() => {
    if (turn == 0) {
      setGameboardColor([
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
      ]);
      setTimerExpired(true);
    }
    if (gameState == "inProgress")
      gameLogic(gb, setGameboardColor, gameboardColor, winnerFound);
  }, [gb]);

  useEffect(() => {
    if (timerExpired === false) {
      socket.emit("timeExpired", { room: room, playerTimerExpired: socket.id });
      setTimerExpired(null);
    }
  }, [timerExpired]);

  return (
    <>
      <Container fluid style={{ position: "relative" }}>
        {gameState === "Won" ? (
          <div>
            {socket.id === winner ? (
              <PlayerWon
                show={show}
                setShow={setShow}
                roomStatus={roomStatus}
                RestartRoom={RestartRoom}
                room={room}
                ox={ox}
                type={1}
              />
            ) : (
              <PlayerWon
                show={show}
                setShow={setShow}
                roomStatus={roomStatus}
                RestartRoom={RestartRoom}
                room={room}
                ox={ox}
                type={2}
              />
            )}
          </div>
        ) : gameState === "DQ" ? (
          <div>
            {socket.id === winner ? (
              <PlayerWon
                show={show}
                setShow={setShow}
                roomStatus={roomStatus}
                RestartRoom={RestartRoom}
                room={room}
                ox={ox}
                type={3}
              />
            ) : (
              <PlayerWon
                show={show}
                setShow={setShow}
                roomStatus={roomStatus}
                RestartRoom={RestartRoom}
                room={room}
                ox={ox}
                type={4}
              />
            )}
          </div>
        ) : gameState === "Tied" ? (
          <PlayerWon
            show={show}
            setShow={setShow}
            roomStatus={roomStatus}
            RestartRoom={RestartRoom}
            room={room}
            ox={ox}
            type={5}
          />
        ) : (ox == "O" && turn % 2 == 1) || (ox == "X" && turn % 2 == 0) ? (
          <>
            <h6 className="text-white">Opponents turn</h6>
            {/*<p
              style={{
                position: "absolute",
                zIndex: 1,
                height: "90%",
                width: "100%",
                backgroundColor: "red",
                opacity: "20%",
                left: "5px",
              }}
            ></p>*/}
          </>
        ) : (
          <>
            {timerExpired === true ? (
              <Timer setTimerExpired={setTimerExpired} x={15} />
            ) : (
              <p className="text-danger">Timer Expired</p>
            )}
          </>
        )}
        <Row style={{ height: "20vh" }}>
          <Gamepiece
            gb={gb}
            x={0}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={0}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={0}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
        </Row>
        <Row style={{ height: "20vh" }}>
          <Gamepiece
            gb={gb}
            x={1}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={1}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={1}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
        </Row>
        <Row style={{ height: "20vh" }}>
          <Gamepiece
            gb={gb}
            x={2}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={2}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
          <Gamepiece
            gb={gb}
            x={2}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
            gameboardColor={gameboardColor}
          />
        </Row>
      </Container>
    </>
  );
}
