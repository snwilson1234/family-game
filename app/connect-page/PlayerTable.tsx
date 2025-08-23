import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Loader2, Check } from 'lucide-react';
import { Player } from '../interfaces/player';

interface PlayerTableProps {
  players: (Player | undefined)[];
  numPlayers: number;
}

export default function PlayerTable({ players, numPlayers }: PlayerTableProps) {
  // create a fixed-length array of players (with undefined for waiting slots)
  const paddedPlayers = Array.from({ length: numPlayers }).map((_, i) => players[i]);

  // template for status column
  // display a Check if player has conncted. Otherwise, display loader.
  const statusTemplate = (player: Player | undefined) => {
    if (player && player.type === "player") {
      return <Check className="text-black" />;
    }
    return <Loader2 className="animate-spin text-black" />;
  };

  // template for name column
  const nameTemplate = (player: Player | undefined) => {
    if (player && player.type === "player") {
      return player.name;
    }
    return "Waiting...";
  };

  return (
    <DataTable value={paddedPlayers} tableStyle={{ minWidth: '30rem' }}>
      <Column header="Status" body={statusTemplate} />
      <Column header="Name" body={nameTemplate} />
    </DataTable>
  );
}
