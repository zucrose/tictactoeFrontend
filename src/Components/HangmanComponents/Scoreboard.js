import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Scoreboard({ roomstatus, playername }) {
  const [sortedArray, setSortedArray] = useState([]);
  useEffect(() => {
    const obj = roomstatus.playerArray;
    obj.sort(function (a, b) {
      //console.log(a, b);
      return b.currentScore - a.currentScore;
    });
    //console.log(obj);
    setSortedArray(obj);
  }, [roomstatus.playerArray]);
  return (
    <div
      className="h-100"
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5px" }}
    >
      <Col className="d-flex justify-content-center w-100">
        <h3>Scoreboard</h3>
      </Col>

      {sortedArray.map((e) => {
        //console.log(e.pname === playername, playername);
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
