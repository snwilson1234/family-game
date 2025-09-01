import { Canvas } from '@react-three/fiber';
import LetterDie from './letterdie/letterdie';
import { useGameContext } from '@/app/providers/GameProvider';
import { GameState } from '@/app/states/gamestate';
import PButton from '@/app/components/PButton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const CategorySelection = () => {

  const { roundCategories,
          roundLetter,
          setGameState,
          setRoundCategories,
          setRoundLetter } = useGameContext();

  const categoryMap = roundCategories.map((c) => ({name: c}));
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <div className="flex flex-row items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
          <h1 className="text-3xl font-medium h-1/7">Press the button for categories!</h1>
          <DataTable value={categoryMap} tableStyle={{ minWidth: '20rem' }}>
            <Column field="name" header="Name" />
          </DataTable>
          <PButton label={'Generate Categories'} onClick={setRoundCategories} />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
          <h1 className="text-3xl font-medium h-1/7">Roll for your letter!</h1>
          <div className="h-6/7">
            <Canvas id="numbers">
              <ambientLight intensity={Math.PI / 2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <LetterDie sendRoundLetter={setRoundLetter} />
            </Canvas>
          </div>
        </div>
      </div>
      <PButton 
        label={'Continue'}
        onClick={() => {
          setGameState(GameState.Active);
        }}
        disabled={roundCategories.length === 0 || roundLetter === ""}
      />
    </div>
  );
}

export default CategorySelection;