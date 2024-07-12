import { useState } from "react";
import { Container } from "react-bootstrap";
import checkReplace from "../../utils/checkReplace";

export default function HangmanGameboard({ roomstatus }) {
  const alphaArray = [];
  for (let i = 0; i <= 25; i++) {
    alphaArray.push({ char: String.fromCharCode(65 + i), used: false });
  }
  // console.log(alphaArray);
  const [lives, setLives] = useState(9);
  const [alphabets, setAlphabets] = useState(alphaArray);
  console.log(alphabets);
  return (
    <Container>
      {alphabets.map((e) => {
        if (e.used == false) {
          return (
            <button
              onClick={() => checkReplace(e.char, roomstatus.currentWord)}
            >
              {e.char}
            </button>
          );
        } else return <button disabled>{e.char}</button>;
      })}
    </Container>
  );
}
