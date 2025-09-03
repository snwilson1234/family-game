import AnswerCard from "./answer-card";

interface CardGroupProps {
  numCards: number;
}

const CardGroup = ({ numCards }: CardGroupProps) => {

  // sample data
  const players = Array.from({ length: numCards }, (_, i) => ({
    playerName: i % 2 === 0 ? "Alice" : "Bob",
    answer: `test response ${i + 1}`,
  }));

  // split into rows if more than 3 players
  const half = Math.ceil(numCards / 2);
  const rows = [players.slice(0, half), players.slice(half)];

  // row helper
  const renderRow = (row: typeof players, size: number) => (
    <div className="flex flex-row items-center justify-center w-full gap-8 h-1/2">
      {row.map((p, idx) => (
        <AnswerCard
          key={idx}
          size={size}
          playerName={p.playerName}
          answer={p.answer}
        />
      ))}
    </div>
  );

  return (
    <div
      className={
        numCards <= 3
          ? "flex flex-row items-center justify-center w-full gap-8 h-1/2"
          : "flex flex-col gap-8 h-3/5"
      }
    >
      {numCards <= 3
        ? players.map((p, idx) => (
            <AnswerCard
              key={idx}
              size={numCards}
              playerName={p.playerName}
              answer={p.answer}
            />
          ))
        : rows.map((row, i) => <div key={i}>{renderRow(row, numCards)}</div>)}
    </div>
  );
};

export default CardGroup;
