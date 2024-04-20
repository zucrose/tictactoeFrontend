import { Button, Container, Row, Col } from "react-bootstrap";
export default function ChooseRoom({ joinRoom, setJoinCreate }) {
  return (
    <>
      <Row className="m-2 align-content-center  justify-content-center">
        <Button onClick={() => setJoinCreate("join")} style={{ width: "50%" }}>
          Join Room
        </Button>
      </Row>
      <Row className="m-2 align-content-center  justify-content-center">
        <Button
          onClick={() => {
            joinRoom({
              room: Math.floor(Math.random() * 1000),
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
