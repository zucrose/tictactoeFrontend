import { Col, Button } from "react-bootstrap";
export default function Gamepiece({ gb, x, y, ox, turn, sendMove, gameState }) {
  return (
    <Col>
      <Button
        onClick={() => sendMove(x, y)}
        disabled={
          gameState == "inProgress" && gb[x][y] === "."
            ? ox === "O"
              ? turn % 2 === 1
                ? true
                : false
              : turn % 2 === 0
              ? true
              : false
            : true
        }
      >
        {gb[x][y]}
      </Button>
    </Col>
  );
}
