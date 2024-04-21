import { Col, Button } from "react-bootstrap";
export default function Gamepiece({ gb, x, y, ox, turn, sendMove, gameState }) {
  return (
    <Col className="p-2">
      <Button
        style={{ width: "100%", height: "100%", fontSize: "3rem" }}
        variant="info"
        onClick={() => sendMove(x, y)}
        disabled={
          gameState == "inProgress" && gb[x][y] === " "
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
