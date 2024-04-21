import { Row, Button } from "react-bootstrap";
export default function JoinroomComponent({
  joinRoom,
  setroomInput,
  roomInput,
}) {
  return (
    <>
      <Row className="align-content-center  justify-content-center">
        <input
          className="m-2 p-2"
          type="number"
          value={roomInput}
          placeholder="join room"
          style={{ width: "50%" }}
          onChange={(e) => setroomInput(e.target.value)}
        ></input>
      </Row>
      <Row className="align-content-center  justify-content-center">
        <Button
          className="m-2 p-2"
          type="submit"
          variant="warning"
          style={{ width: "50%" }}
          onClick={() => {
            joinRoom({ room: parseInt(roomInput), create: false });
          }}
        >
          Join
        </Button>
      </Row>
    </>
  );
}
