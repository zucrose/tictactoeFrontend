import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import Gamepiece from "./gamepiece";
import Timer from "./timer";
import gameLogic from "./gamelogic";
export default function Gameboard({ room, move, ox, roomStatus }) {
  const [turn, setTurn] = useState(0);
  const [timerExpired, setTimerExpired] = useState(true);
  const [gameState, setGameState] = useState("inProgress");
  const [winner, setWinner] = useState("-");
  const [gb, setGB] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [gameboardColor, setGameboardColor] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const sendMove = (x, y) => {
    socket.emit("sendMove", {
      room: room,
      movex: x,
      movey: y,
      sender: ox,
      turn: turn,
    });
  };
  useEffect(() => {
    if (move !== null) {
      console.log(gb);
      setGB((gb) =>
        gb.map((ele, ind) => {
          if (ind === move.movex)
            return ele.map((e, index) => {
              console.log(ox);
              if (index === move.movey) return move.sender;
              else return e;
            });
          else return ele;
        })
      );
      setTurn((turn) => turn + 1);
    }
  }, [move]);

  useEffect(() => {
    if (roomStatus?.playerTimerExpired) {
      if (ox != roomStatus.playerTimerExpired) setWinner(ox);
      else setWinner(ox === "O" ? "X" : "O");
      setGameState("wonbydq");
    }
    gameLogic(gb, setWinner, setGameState, setGameboardColor, gameboardColor);
  }, [gb, roomStatus]);

  useEffect(() => {
    if (timerExpired === false) {
      socket.emit("gameEvents", { room: room, playerTimerExpired: ox });
    }
  }, [timerExpired]);
  console.log(gameboardColor);
  return (
    <>
      <Container fluid style={{ position: "relative" }}>
        {gameState === "won" ? (
          <div>{ox === winner ? "U WON" : "U LOST"}</div>
        ) : gameState === "wonbydq" ? (
          <div>
            {ox === winner
              ? "You Won. Opponent disqualified "
              : "You lost due to disqualification"}
          </div>
        ) : gameState === "Tied" ? (
          <div>TIED</div>
        ) : (ox == "O" && turn % 2 == 1) || (ox == "X" && turn % 2 == 0) ? (
          <>
            <div>Opponents turn</div>
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
              <Timer setTimerExpired={setTimerExpired} />
            ) : (
              <p>Timer Expired</p>
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
