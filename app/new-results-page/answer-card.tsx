import { Card } from "primereact/card";
import PButton from "../components/PButton";
import { Button } from "primereact/button";
import './answerCard.css';

interface AnswerCardProps {
  playerName: string;
  playerPoints: number;
  answer: string;
  size: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

const AnswerCard = ({
  playerName="Default",
  playerPoints=0,
  answer="Default answer",
  size=2
}: AnswerCardProps) => {

  const sizeClassMap: Record<number, string> = {
    2: "w-100 h-80", //text-5xl
    3: "w-80 h-70", //text-4xl
    4: "w-80 h-60", //text-4xl
    5: "w-80 h-60",
    6: "w-80 h-60",
    7: "w-70 h-60",
    8: "w-70 h-60",
    // 4: "w-40 h-40",
    // 5: "w-50 h-50",
    // 6: "w-60 h-60",
    // 7: "w-70 h-70",
    // 8: "w-80 h-80",
    // 9: "w-90 h-90",
  };

  const header = (
    <div className={`flex flex-row px-4 items-center justify-between`}>
      <Button severity="danger" label={"-"} />
      <p className="text-3xl">{playerPoints}</p>
      <Button severity="success" label={"+"} />
    </div>
  );

  const footer = (
    <div className="flex flex-row items-center">
      <p className="text-3xl">{playerName}</p>
    </div>
  );

  return (
    <Card
      className={`${sizeClassMap[size]} flex flex-col py-4`}
      header={header}
      footer={footer}
      >
      <p className="text-center text-4xl overflow-hidden text-ellipsis">{answer}</p>
    </Card>  
  )
};

export default AnswerCard;