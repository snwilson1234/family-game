import AnswerCard from "./answer-card";
import { Player } from "@/app/interfaces/player";


interface CardGroupProps {
  players: Player[];
  currCatIdx: number;
  increasePointsBy10: (playerName: string) => void;
  decreasePointsBy10: (playerName: string) => void;
}

const CardGroup = ({
  players, 
  currCatIdx,
  increasePointsBy10,
  decreasePointsBy10
}: CardGroupProps) => {

  // split into rows if more than 3 players
  const numCards = players.length;
  const half = Math.ceil(numCards / 2);
  const rows = [players.slice(0, half), players.slice(half)];

  // row helper
  const renderRow = (row: typeof players, size: number) => (
    <div className="flex flex-row items-center justify-center w-full gap-8">
      {row.map((p, idx) => (
        <AnswerCard
          key={idx}
          size={size}
          playerName={p.name}
          answer={p.answers ? p.answers[currCatIdx] : "default"}
          playerPoints={p.points}
        />
      ))}
    </div>
  );

  return (
    <div
      className={`flex justify-center w-full gap-8 h-5/6 ${numCards <= 3 ? 'flex-row items-center' : 'flex-col'}`}
    >
      {numCards <= 3
        ? players.map((p, idx) => (
            <AnswerCard
              key={idx}
              size={numCards}
              playerName={p.name}
              answer={p.answers ? p.answers[currCatIdx] : "default"}
              playerPoints={p.points}
              increasePointsBy10={increasePointsBy10}
              decreasePointsBy10={decreasePointsBy10}
            />
          ))
        : rows.map((row, i) => <div key={i}>{renderRow(row, numCards)}</div>)}
    </div>
  );
};

export default CardGroup;
