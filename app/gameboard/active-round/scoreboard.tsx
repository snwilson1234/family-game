import { Player } from "@/app/interfaces/player";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";


interface ScoreboardProps {
  players: Player[]
};

const Scoreboard = ({
  players
}: ScoreboardProps) => {

  return (
    <DataTable header="Scoreboard" value={players} className="w-1/3">
      <Column field="name" header="Name"></Column>
      <Column field="points" header="Score"></Column>
    </DataTable>
  );
}

export default Scoreboard;