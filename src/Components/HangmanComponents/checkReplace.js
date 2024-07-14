export default function checkReplace(
  char,
  currentWord,
  word,
  setWord,
  lives,
  setLives,
  alphabets,
  setAlphabets
) {
  let str = word,
    cnt = 0;

  str = [...str].map((e, i) => {
    //console.log(currentWord[i], char);
    if (char == currentWord[i]) {
      //console.log(currentWord[i], char);
      cnt++;
      return char;
    }
    return e;
  });

  setWord(str);
  if (cnt == 0) setLives(lives - 1);
  setAlphabets(
    alphabets.map((e) => {
      if (e.char === char) e.used = true;
      return e;
    })
  );
}
