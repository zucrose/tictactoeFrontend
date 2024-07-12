import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function ChooseRoom({ joinRoom, setJoinCreate, setGamemode }) {
  return (
    <>
      <Row className="m-2 align-content-center  justify-content-center text-white">
        <div>Choose gamemode: </div>
        <Form.Select onChange={(e) => setGamemode(e.target.value)}>
          <option value="tictac">TicTacToe</option>
          <option value="hangman">HangMan</option>
        </Form.Select>
      </Row>
      <Row className="m-2 align-content-center  justify-content-center">
        <Button
          variant="warning"
          onClick={() => setJoinCreate("join")}
          style={{ width: "50%" }}
        >
          Join Room
        </Button>
      </Row>
      <Row className="m-2 align-content-center  justify-content-center">
        <Button
          variant="warning"
          onClick={() => {
            joinRoom({
              room: -1,
              create: true,
            });
          }}
          style={{ width: "50%" }}
        >
          Create Room
        </Button>
      </Row>
    </>
  );
}
