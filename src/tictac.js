import { useState } from "react";
import { socket } from "./socket";
import Gameboard from "./gameboard";
import Button from "react-bootstrap/Button";
export default function Tictac({ chat, move }) {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(null);
  const [roomInput, setroomInput] = useState(null);
  const [joinCreate, setJoinCreate] = useState(false);
  const [ox, setOx] = useState("");

  const sendMessage = () => {
    socket.emit("sentMessage", { room: room, message: message });
  };
  const joinRoom = (room) => {
    setRoom(room);
    socket.emit("joinRoom", room);
  };

  return (
    <>
      <div>
        <Button onClick={() => setJoinCreate("join")}>JOIN ROOM</Button>
        <Button
          onClick={() => {
            joinRoom(Math.floor(Math.random() * 1000));
            setOx("O");
            setJoinCreate("create");
          }}
        >
          Create Room
        </Button>
        {joinCreate === "create" ? (
          <div>
            <div>Your Room Number is : {room}</div>
            <Gameboard room={room} move={move} ox={ox} />
          </div>
        ) : joinCreate == "join" ? (
          <>
            <input
              type="number"
              value={roomInput}
              placeholder="join room"
              onChange={(e) => setroomInput(e.target.value)}
            ></input>
            <button
              type="submit"
              onClick={() => {
                joinRoom(parseInt(roomInput));
                setOx("X");
                setJoinCreate("create");
              }}
            >
              Join
            </button>
          </>
        ) : null}
      </div>

      <input
        value={message}
        placeholder="Send Message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button type="submit" onClick={sendMessage}>
        Send
      </button>

      {chat.length != 0
        ? chat.map((e) => {
            return <div>{e}</div>;
          })
        : null}
    </>
  );
}
