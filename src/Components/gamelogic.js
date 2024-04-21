export default function gameLogic(gb, setWinner, setGameState) {
  for (let i = 0; i < 3; i++) {
    let cnt = 1;
    for (let j = 1; j < 3; j++) {
      if (gb[i][j] != " " && gb[i][j] === gb[i][j - 1]) cnt++;
      else cnt = 1;
    }
    if (cnt == 3) {
      setGameState("won");
      setWinner(gb[i][0]);
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
      setGameState("won");
      setWinner(gb[0][i]);
      return () => {};
    }
  }
  if (gb[1][1] != " " && gb[0][0] === gb[1][1] && gb[1][1] === gb[2][2]) {
    setGameState("won");
    setWinner(gb[1][1]);
    return () => {};
  }
  if (gb[1][1] != " " && gb[0][2] === gb[1][1] && gb[1][1] === gb[2][0]) {
    setGameState("won");
    setWinner(gb[1][1]);
    return () => {};
  }
}
