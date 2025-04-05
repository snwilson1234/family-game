'use client';


type CategorySelectionProps = {
  selectedCategories   : string[],
  randomLetter         : string,
  onGenerateCategories : () => void,
  onGenerateLetter     : () => void,
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
        <h1 className="text-3xl font-medium">Your categories are...</h1>
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
        <h1 className="text-3xl font-medium">Your letter is...</h1>
        <div className="text-9xl font-bold h-4/5">
          <h1>{randomLetter ? randomLetter : "_"}</h1>
        </div>
      </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full h-2/10 px-40">
        <button 
          onClick={() => onGenerateCategories()}
          className="btn btn-primary text-3xl w-2/5">
          Generate Categories
        </button>
        <button 
          onClick={onGenerateLetter}
          className="btn btn-primary text-3xl w-2/5">
          Generate Letter
        </button>
      </div>
      <div className="flex flex-col align-center items-center h-1/10">
      <button 
        onClick={onContinue}
        disabled={selectedCategories.length === 0 || randomLetter === ""}
        className={`btn btn-primary text-xl
          ${selectedCategories.length === 0 || randomLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-indigo-300"}
          `}>
        ontinue
      </button>
      </div>
    </div>
  );
}

export default CategorySelection;