import { Col, Container, Row } from "react-bootstrap";

export default function Scoreboard({ roomstatus, playername }) {
  return (
    <Container>
      {roomstatus.playerArray.map((e) => {
        console.log(e.pname === playername, playername);
        if (e.pname === playername) {
          return (
            <Col className=" text-white">
              <div className="text-warning">{e.pname}</div>
              <div>{e.currentScore}</div>
            </Col>
          );
        } else {
          return (
            <Col className=" text-white">
              <div className="text-success">{e.pname}</div>
              <div>{e.currentScore}</div>
            </Col>
          );
        }
      })}
    </Container>
  );
}
