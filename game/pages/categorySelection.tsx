'use client';
import { useState } from "react";

//just  write whole game here and refactor later
const CategorySelectionPage = () => {

    const categories = [
        "Animals",
        "Movie Titles",
        "Fictional Characters",
        "Countries",
        "Types of Candy",
        "Things Found in a Kitchen",
        "Book Titles",
        "Things That Are Cold",
        "Items in a Bedroom",
        "Superheroes & Villains",
        "TV Shows",
        "Things That Fly",
        "Types of Transportation",
        "Occupations",
        "Things at a Party",
        "Musical Instruments",
        "Things You Wear",
        "Words Associated with Space",
        "Types of Drinks",
        "Things in the Ocean",
        "Fast Food Chains",
        "Items in a Toolbox",
        "Things That Make Noise",
        "Board Games",
        "Things You Find at the Beach",
        "U.S. Cities",
        "Things That Are Sticky",
        "Things You Throw Away",
        "Famous Landmarks",
        "Cartoon Characters",
        "Things with Wheels",
        "School Subjects",
        "Things You Can Cook",
        "Types of Trees",
        "Things That Use Batteries",
        "Reasons to Call 911",
        "Things People Are Afraid Of",
        "Things in a Hospital",
        "Things You Do on Vacation",
        "Items You Take Camping",
        "Famous Athletes",
        "Video Game Titles",
        "Things That Smell Bad",
        "Things That Are Expensive",
        "Things in a Park",
        "Types of Weather",
        "Things with Stripes",
        "Types of Flowers",
        "Things in a Grocery Store",
        "Things That Glow in the Dark"
    ];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [randomLetter, setRandomLetter] = useState<string>("");

    const generateRandomCategories = () => {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        setSelectedCategories(shuffled.slice(0, 10));
    };

    const generateRandomLetter = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomIndex = Math.floor(Math.random() * letters.length);
        setRandomLetter(letters[randomIndex]);
    };

    return (
        <div className="
            flex flex-col items-center align-center
            text-white w-full gap-2 h-screen
        ">
            <h1 className="
                text-lg
            ">Category Selection</h1>

            <button 
                onClick={generateRandomCategories}
                className="
                    bg-slate-500 p-2
                    rounded-md
                    hover:cursor-pointer
                    hover:text-slate-300
                ">
                Generate Categories
            </button>
            <ul className="
                flex flex-col items-center gap-1 py-5
                bg-slate-600 w-3/5 h-3/5 rounded-md
            ">
                {
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
                }
            </ul>
            <button 
                onClick={generateRandomLetter}
                className="
                    bg-slate-500 p-2
                    rounded-md
                    hover:cursor-pointer
                    hover:text-slate-300
                ">
                Generate Letter
            </button>
            <div>
                <p>{randomLetter}</p>
            </div>

            <button 
                onClick={generateRandomLetter}
                disabled={selectedCategories.length === 0 || randomLetter === ""}
                className={`
                    bg-slate-500 p-2
                    rounded-md
                    ${selectedCategories.length === 0 || randomLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-slate-300"}
                    `}>
                Continue
            </button>
        </div>
    );
}

export default CategorySelectionPage;