export default function gameLogic(
  gb,
  setWinner,
  setGameState,
  setGameboardColor,
  gameboardColor
) {
  let win = 0;
  for (let i = 0; i < 3; i++) {
    let cnt = 1;
    for (let j = 1; j < 3; j++) {
      if (gb[i][j] != " " && gb[i][j] === gb[i][j - 1]) {
        cnt++;
      } else cnt = 1;
    }
    if (cnt == 3) {
      win = 1;
      setGameState("won");
      setWinner(gb[i][0]);
      setGameboardColor((gameboardColor) =>
        gameboardColor.map((ele, index) => {
          if (index == i) return ele.map((e) => "R");
          else return ele;
        })
      );
      return () => {};
    }
  }
  for (let i = 0; i < 3; i++) {
    let cnt = 1;
    for (let j = 1; j < 3; j++) {
      if (gb[j][i] != " " && gb[j][i] === gb[j - 1][i]) cnt++;
      else cnt = 1;
    }
    if (cnt == 3) {
      win = 1;
      setGameState("won");
      setWinner(gb[0][i]);
      setGameboardColor((gameboardColor) =>
        gameboardColor.map((ele) => {
          return ele.map((e, ind) => {
            if (ind === i) return "R";
            return e;
          });
        })
      );
      return () => {};
    }
  }
  if (gb[1][1] != " " && gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
    win = 1;
    setGameState("won");
    setWinner(gb[1][1]);
    setGameboardColor((gameboardColor) =>
      gameboardColor.map((ele, index) => {
        return ele.map((e, ind) => {
          if (index === ind) return "R";
          return e;
        });
      })
    );
    return () => {};
  }
  if (gb[1][1] != " " && gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
    win = 1;
    setGameState("won");
    setWinner(gb[1][1]);
    setGameboardColor((gameboardColor) =>
      gameboardColor.map((ele, index) => {
        return ele.map((e, ind) => {
          if (index + ind === 2) return "R";
          return e;
        });
      })
    );

    return () => {};
  }
  if (win === 0) {
    let cnt = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gb[i][j] == " ") cnt++;
      }
    }
    if (cnt === 0 && win === 0) {
      setGameState("Tied");
    }
  }
}
