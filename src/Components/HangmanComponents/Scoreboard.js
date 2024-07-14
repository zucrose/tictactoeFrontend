import { Col, Container, Row } from "react-bootstrap";

export default function Scoreboard({ roomstatus, playername }) {
  return (
    <div
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5%" }}
      className="align-self-stretch p-3 m-2  "
    >
      <h3>Scoreboard</h3>
      {roomstatus.playerArray.map((e) => {
        console.log(e.pname === playername, playername);
        if (e.pname === playername) {
          return (
            <Col className=" ">
              <div className="text-success">{e.pname}</div>
              <div>{e.currentScore}</div>
            </Col>
          );
        } else {
          return (
            <Col className="">
              <div className="">{e.pname}</div>
              <div>{e.currentScore}</div>
            </Col>
          );
        }
      })}
    </div>
  );
}
