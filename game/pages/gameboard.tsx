'use client';
import { useState } from "react";
import Timer from "./../shared/timer";

const Gameboard = () => {

    // const categories = [
    //     "Animals",
    //     "Movie Titles",
    //     "Fictional Characters",
    //     "Countries",
    //     "Types of Candy",
    //     "Things Found in a Kitchen",
    //     "Book Titles",
    //     "Things That Are Cold",
    //     "Items in a Bedroom",
    //     "Superheroes & Villains",
    //     "TV Shows",
    //     "Things That Fly",
    //     "Types of Transportation",
    //     "Occupations",
    //     "Things at a Party",
    //     "Musical Instruments",
    //     "Things You Wear",
    //     "Words Associated with Space",
    //     "Types of Drinks",
    //     "Things in the Ocean",
    //     "Fast Food Chains",
    //     "Items in a Toolbox",
    //     "Things That Make Noise",
    //     "Board Games",
    //     "Things You Find at the Beach",
    //     "U.S. Cities",
    //     "Things That Are Sticky",
    //     "Things You Throw Away",
    //     "Famous Landmarks",
    //     "Cartoon Characters",
    //     "Things with Wheels",
    //     "School Subjects",
    //     "Things You Can Cook",
    //     "Types of Trees",
    //     "Things That Use Batteries",
    //     "Reasons to Call 911",
    //     "Things People Are Afraid Of",
    //     "Things in a Hospital",
    //     "Things You Do on Vacation",
    //     "Items You Take Camping",
    //     "Famous Athletes",
    //     "Video Game Titles",
    //     "Things That Smell Bad",
    //     "Things That Are Expensive",
    //     "Things in a Park",
    //     "Types of Weather",
    //     "Things with Stripes",
    //     "Types of Flowers",
    //     "Things in a Grocery Store",
    //     "Things That Glow in the Dark"
    // ];

    // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // const [randomLetter, setRandomLetter] = useState<string>("");
    // // const [gameState, setGameState] = useState<GameState>();

    // const generateRandomCategories = () => {
    //     const shuffled = [...categories].sort(() => 0.5 - Math.random());
    //     setSelectedCategories(shuffled.slice(0, 10));
    // };

    // const generateRandomLetter = () => {
    //     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //     const randomIndex = Math.floor(Math.random() * letters.length);
    //     setRandomLetter(letters[randomIndex]);
    // };


    return (
        <div>
            <div className="
                flex flex-col justify-between absolute
                text-white w-full gap-2 h-screen z-0
            ">
                <div className="
                    flex flex-row justify-between
                    w-full pt-2
                ">
                    <h1 className="
                        text-lg
                        text-left
                        pl-8 w-1/2
                    ">Player1</h1>
                    <h1 className="
                        text-lg
                        text-right
                        pr-8 w-1/2
                    ">Player2</h1>
                </div>
                
                <div className="
                    flex flex-row justify-between
                    w-full pb-3
                ">
                    <h1 className="
                        text-lg
                        text-left
                        pl-8 w-1/2
                    ">Player3</h1>
                    <h1 className="
                        text-lg
                        text-right
                        pr-8 w-1/2
                    ">Player4</h1>
                </div>

                
            </div>
            <div className=" 
                flex flex-row justify-center items-center
                w-full h-screen gap-5 z-10 absolute
                text-white
            ">
                <ul className="
                    flex flex-col items-center gap-1 py-5
                    bg-slate-600 w-1/4 h-3/5 rounded-md
                ">
                <li className="
                    bg-slate-500 text-white w-4/5
                    rounded-md p-2 h-1/10
                " >
                    placeholder
                </li>
                <li className="
                    bg-slate-500 text-white w-4/5
                    rounded-md p-2 h-1/10
                " >
                    placeholder
                </li>
                {/* {
                    selectedCategories.map(
                        (category, index) => (
                            <li className="
                                bg-slate-500 text-white w-100
                                rounded-md p-2 h-1/10
                            " key={index}>
                                {category}
                            </li>
                        )
                    )  
                } */}
            </ul>
            <Timer />
            </div>  
        </div>
    );
}

export default Gameboard;