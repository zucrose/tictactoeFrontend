import { useState } from "react";
import PlayerWonLoss from "./playerWonLoss";

export default function PlayerComponent({
  roomStatus,
  roomOwner,
  playername,
  pid,
}) {
  const [show, setShow] = useState(true);
  return (
    <div
      className="h-100"
      style={{ backgroundColor: "beige", border: "solid", borderRadius: "5px" }}
    >
      <h2 className=" d-flex justify-content-center align-items-center  w-100 p-3">
        Waiting for Room Owner to start the game.....
      </h2>
      {roomStatus.roomState === "end" ? (
        <PlayerWonLoss
          roomStatus={roomStatus}
          show={show}
          setShow={setShow}
          pid={pid}
        />
      ) : null}
    </div>
  );
}
