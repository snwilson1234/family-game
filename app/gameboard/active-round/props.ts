
type ActiveRoundProps = {
  players            : Player[],
  randomLetter       : string,
  timeLeft           : number,
  onTimerStart       : () => void,
  onTimerStop        : () => void,
  onTimerReset       : () => void,
};
