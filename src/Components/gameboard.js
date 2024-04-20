import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import Gamepiece from "./gamepiece";
export default function Gameboard({ room, move, ox }) {
  const [turn, setTurn] = useState(0);
  const [gameState, setGameState] = useState("inProgress");
  const [winner, setWinner] = useState("-");
  const [gb, setGB] = useState([
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
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
    for (let i = 0; i < 3; i++) {
      let cnt = 1;
      for (let j = 1; j < 3; j++) {
        if (gb[i][j] != "." && gb[i][j] === gb[i][j - 1]) cnt++;
        else cnt = 1;
      }
      if (cnt == 3) {
        setGameState("won");
        setWinner(gb[i][0]);
        return () => {};
      }
    }
    for (let i = 0; i < 3; i++) {
      let cnt = 1;
      for (let j = 1; j < 3; j++) {
        if (gb[j][i] != "." && gb[j][i] === gb[j - 1][i]) cnt++;
        else cnt = 1;
      }
      if (cnt == 3) {
        setGameState("won");
        setWinner(gb[0][i]);
        return () => {};
      }
    }
    if (gb[1][1] != "." && gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
      setGameState("won");
      setWinner(gb[1][1]);
      return () => {};
    }
    if (gb[1][1] != "." && gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
      setGameState("won");
      setWinner(gb[1][1]);
      return () => {};
    }
  }, [gb]);

  return (
    <>
      {gameState === "won" ? (
        <div>{ox === winner ? "U WON" : "U LOST"}</div>
      ) : null}
      <Container>
        <Row>
          <Gamepiece
            gb={gb}
            x={0}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={0}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={0}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
        </Row>
        <Row>
          <Gamepiece
            gb={gb}
            x={1}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={1}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={1}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
        </Row>
        <Row>
          <Gamepiece
            gb={gb}
            x={2}
            y={0}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={2}
            y={1}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
          <Gamepiece
            gb={gb}
            x={2}
            y={2}
            ox={ox}
            turn={turn}
            sendMove={sendMove}
            gameState={gameState}
          />
        </Row>
      </Container>
    </>
  );
}
