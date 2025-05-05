'use client';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import LetterDie from './components/letterDie';


type CategorySelectionProps = {
  selectedCategories   : string[],
  randomLetter         : string,
  onGenerateCategories : () => void,
  onGenerateLetter     : (letter: string) => void,
  onContinue           : () => void,
};

const CategorySelection = ({ 
  selectedCategories,
  randomLetter,
  onGenerateCategories,
  onGenerateLetter,
  onContinue,
} : CategorySelectionProps) => {
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-row items-center justify-center w-full h-8/10">
        <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
        <h1 className="text-3xl font-medium">Press the button for categories!</h1>
        <ul className="flex flex-col items-center w-3/4 h-4/5 gap-1 py-5 bg-indigo-600 rounded-md text-xl shadow-lg">
        {
          selectedCategories.map(
            (category, index) => (
              <li className="
                bg-indigo-500 w-1/2
                rounded-md p-2 h-1/10
                shadow-lg
              " key={index}>
                {category}
              </li>
            )
          )
        }
        </ul>
        </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-full gap-4">
        <h1 className="text-3xl font-medium">Roll for your letter!</h1>
        <div className="h-4/5">
          <Canvas id="numbers">
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <LetterDie sendRandomLetter={onGenerateLetter} />
          </Canvas>
        </div>
      </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full h-2/10 px-40">
        <button 
          onClick={() => onGenerateCategories()}
          className="btn btn-primary text-3xl w-2/5">
          Generate Categories
        </button>
      </div>
      <div className="flex flex-col align-center items-center h-1/10">
      <button 
        onClick={onContinue}
        disabled={selectedCategories.length === 0 || randomLetter === ""}
        className={`btn btn-primary text-xl
          ${selectedCategories.length === 0 || randomLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-indigo-300"}
          `}>
        Continue
      </button>
      </div>
    </div>
  );
}

export default CategorySelection;