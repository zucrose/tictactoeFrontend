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
  let correctAudio = new Audio("./sound/correct-choice-43861.mp3");
  let incorrectAudio = new Audio(
    "./sound/training-program-incorrect1-88736.mp3"
  );
  let buzzer = new Audio("./sound/buzzer-or-wrong-answer-20582.mp3");
  const alphaArray = [];
  for (let i = 0; i <= 25; i++) {
    alphaArray.push({ char: String.fromCharCode(65 + i), used: false });
  }
  // console.log(alphaArray);
  const [lives, setLives] = useState(9);
  const [alphabets, setAlphabets] = useState(alphaArray);
  const [word, setWord] = useState([]);
  const [timerExpired, setTimerExpired] = useState("on");
  const [seconds, setSeconds] = useState(1000);
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
    setTimerExpired("on");
  }, [roomstatus.currentRound]);

  useEffect(() => {
    if (timerExpired === "off") {
      setLives(0);
      buzzer.play();
    }
  }, [timerExpired]);

  useEffect(() => {
    const currWord = [...roomstatus.currentWord];
    /*console.log(
      word.toString(),
      currWord.toString(),
      word.toString() == currWord.toString()
    );*/
    if (word.toString() == currWord.toString() || lives == 0) {
      setTimerExpired("disabled");
      updateScore(lives * seconds);
      setSeconds(50);
      disableAlpha();
    }
  }, [word, lives]);
  //console.log(alphabets);
  const updateScore = (score) => {
    // console.log("updateScore Triggered");
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
      className="h-100"
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5px" }}
    >
      <Row>
        {" "}
        <Col>
          <h4 className="p-3 ">
            {hearts.map((e) =>
              e ? (
                <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartCrack}
                  style={{ color: "black" }}
                />
              )
            )}
          </h4>
        </Col>
        <Col>
          {timerExpired == "on" ? (
            <Timer
              className=""
              setTimerExpired={setTimerExpired}
              seconds={seconds}
              setSeconds={setSeconds}
            />
          ) : null}
        </Col>
      </Row>

      <Col
        className="d-flex justify-self-center justify-content-center w-100"
        style={{ fontFamily: "Playfair Display" }}
      >
        <h1 className>{roomstatus.currentTopic}</h1>
      </Col>

      <Col className="d-flex justify-content-center w-100">
        <h1>
          {[...word].map((e) => (
            <span className="m-2">{e}</span>
          ))}
        </h1>
      </Col>

      <Col className="d-flex flex-wrap justify-content-center">
        {alphabets.map((e, ind) => {
          if (e.used == false) {
            return (
              <>
                {/*ind % 9 == 0 && ind > 0 ? <br></br> : null*/}
                <Button
                  className="m-2 hangmanButton"
                  onClick={() =>
                    checkReplace(
                      e.char,
                      roomstatus.currentWord,
                      word,
                      setWord,
                      lives,
                      setLives,
                      alphabets,
                      setAlphabets,
                      incorrectAudio,
                      correctAudio
                    )
                  }
                >
                  {e.char}
                </Button>
              </>
            );
          } else
            return (
              <>
                <Button className="m-2 hangmanButton" disabled>
                  {e.char}
                </Button>
              </>
            );
        })}
      </Col>
    </div>
  );
}
