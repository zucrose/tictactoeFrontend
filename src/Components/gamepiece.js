import { Col, Button } from "react-bootstrap";
export default function Gamepiece({
  gb,
  x,
  y,
  ox,
  turn,
  sendMove,
  gameState,
  gameboardColor,
}) {
  return (
    <Col className="p-2">
      <Button
        style={
          gameState == "inProgress" && gb[x][y] === " "
            ? ox === "O"
              ? turn % 2 === 1
                ? {
                    opacity: "50%",
                    width: "100%",
                    height: "100%",
                    fontSize: "3rem",
                  }
                : {
                    width: "100%",
                    height: "100%",
                    fontSize: "3rem",
                  }
              : turn % 2 === 0
              ? {
                  opacity: "50%",
                  width: "100%",
                  height: "100%",
                  fontSize: "3rem",
                }
              : {
                  width: "100%",
                  height: "100%",
                  fontSize: "3rem",
                }
            : {
                width: "100%",
                height: "100%",
                fontSize: "3rem",
              }
        }
        variant={
          gameboardColor[x][y] == " "
            ? "info"
            : gameboardColor[x][y] == ox
            ? "success"
            : "danger"
        }
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
            : gameState != "inProgress"
            ? false
            : true
        }
      >
        {gb[x][y]}
      </Button>
    </Col>
  );
}
