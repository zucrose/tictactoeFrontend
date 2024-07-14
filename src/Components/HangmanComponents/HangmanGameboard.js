import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import checkReplace from "./checkReplace";
import { socket } from "../../socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faA,
  faB,
  faHeart,
  faHeartCrack,
  faO,
} from "@fortawesome/free-solid-svg-icons";
import Timer from "./hangmanTimer";
export default function HangmanGameboard({ roomstatus }) {
  const alphaArray = [];
  for (let i = 0; i <= 25; i++) {
    alphaArray.push({ char: String.fromCharCode(65 + i), used: false });
  }
  // console.log(alphaArray);
  const [lives, setLives] = useState(9);
  const [alphabets, setAlphabets] = useState(alphaArray);
  const [word, setWord] = useState([]);
  const [timerExpired, setTimerExpired] = useState(true);
  const [seconds, setSeconds] = useState(50);
  const [hearts, setHearts] = useState([]);

  const disableAlpha = () => {
    setAlphabets(
      alphabets.map((e) => {
        e.used = true;
        return e;
      })
    );
  };
  useEffect(() => {
    let str = "";
    for (let i = 0; i < roomstatus.currentWord.length; i++) {
      let char = roomstatus.currentWord[i];
      if (char.toLowerCase() != char.toUpperCase()) str += "_";
      else str += char;
    }
    setWord(str);
    setLives(9);
    setAlphabets(alphaArray);
    setTimerExpired(true);
  }, [roomstatus.currentRound]);

  useEffect(() => {
    if (timerExpired === false) setLives(0);
  }, [timerExpired]);

  useEffect(() => {
    const currWord = [...roomstatus.currentWord];
    /* console.log(
      word.toString(),
      currWord.toString(),
      word.toString() == currWord.toString()
    );*/
    if (word.toString() == currWord.toString() || lives == 0) {
      setTimerExpired(false);
      setSeconds(50);
      disableAlpha();
      updateScore(lives);
    }
  }, [word, lives]);
  //console.log(alphabets);
  const updateScore = (score) => {
    socket.emit("updateScore", {
      score: score,
      id: socket.id,
      room: roomstatus.roomID,
    });
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < lives; i++) arr.push(1);
    for (let i = lives; i < 9; i++) arr.push(0);
    setHearts(arr);
  }, [lives]);
  //console.log(hearts);
  return (
    <div
      className="flex-fill my-2"
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5%" }}
    >
      <Col className="d-flex justify-content-center w-100">
        <h1 className>{roomstatus.currentTopic}</h1>
      </Col>
      <Col className="d-flex justify-content-center w-100">
        <h1>
          {[...word].map((e) => (
            <span className="m-2">{e}</span>
          ))}
        </h1>
      </Col>
      <Col>
        {hearts.map((e) =>
          e ? (
            <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
          ) : (
            <FontAwesomeIcon icon={faHeartCrack} style={{ color: "red" }} />
          )
        )}
      </Col>
      <Col>
        {timerExpired ? (
          <Timer
            setTimerExpired={setTimerExpired}
            seconds={seconds}
            setSeconds={setSeconds}
          />
        ) : null}
      </Col>
      <Col className="d-flex flex-wrap">
        {alphabets.map((e, ind) => {
          if (e.used == false) {
            return (
              <>
                {/*ind % 9 == 0 && ind > 0 ? <br></br> : null*/}
                <Button
                  className="m-2 "
                  onClick={() =>
                    checkReplace(
                      e.char,
                      roomstatus.currentWord,
                      word,
                      setWord,
                      lives,
                      setLives,
                      alphabets,
                      setAlphabets
                    )
                  }
                  style={{
                    fontSize: "4vh",
                    height: "10vh",
                    width: "7vh",
                    padding: "1vh",
                  }}
                >
                  {e.char}
                </Button>
              </>
            );
          } else
            return (
              <>
                {" "}
                <Button
                  className="m-2 "
                  style={{
                    fontSize: "4vh",
                    height: "10vh",
                    width: "7vh",
                    padding: "1vh",
                  }}
                  disabled
                >
                  {e.char}
                </Button>
              </>
            );
        })}
      </Col>
    </div>
  );
}
