import { Card } from "primereact/card";
import { Button } from "primereact/button";

export type UnderlineColor = "red" | "green";


interface AnswerCardProps {
  playerName: string;
  playerPoints: number;
  answer: string;
  size: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  underlineColor: UnderlineColor;
  increasePointsBy10: (playerName: string) => void;
  decreasePointsBy10: (playerName: string) => void;
};

const AnswerCard = ({
  playerName,
  playerPoints,
  answer,
  size=2,
  underlineColor,
  increasePointsBy10,
  decreasePointsBy10
}: AnswerCardProps) => {
  // console.log("ANSWER:", answer);

  const sizeClassMap: Record<number, string> = {
    2: "w-[540px]",
    3: "w-[450px]",
    4: "w-[450px]",
    5: "w-[360px]",
    6: "w-[360px]",
    7: "w-[270px]",
    8: "w-[270px]"
  };

  const textClassMap: Record<number, string> = {
    2: "text-5xl h-16",
    3: "text-5xl h-16",
    4: "text-4xl h-12",
    5: "text-4xl h-12",
    6: "text-4xl h-12",
    7: "text-3xl h-10",
    8: "text-3xl h-10",
  };

  const getUnderlineClass = (underlineColor: UnderlineColor) => {
    if (underlineColor === "red") {
      return "decoration-red-400";
    }
    else if (underlineColor === "green") {
      return "decoration-green-400";
    }
    else {
      return "";
    }
  }

  const header = (
    <div className={`flex flex-row px-4 items-center justify-between`}>
      <Button severity="danger" label={"-"} onClick={() => decreasePointsBy10(playerName)} />
      <p className="text-3xl">{playerPoints}</p>
      <Button severity="success" label={"+"} onClick={() => increasePointsBy10(playerName)} />
    </div>
  );

  const footer = (
    <div className="flex flex-row items-center justify-center">
      <p className="text-4xl font-bold">{playerName}</p>
    </div>
  );

  return (
    <Card
      className={`${sizeClassMap[size]} flex flex-col py-2`}
      header={header}
      footer={footer}
    >
      <p className={`underline ${getUnderlineClass(underlineColor)} text-center overflow-hidden text-ellipsis whitespace-nowrap h-10 w-full ${textClassMap[size]}`}>{answer}</p>
    </Card>  
  )
};

export default AnswerCard;