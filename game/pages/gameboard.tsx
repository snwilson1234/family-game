'use client';
import { useEffect, useState } from "react";
import Timer from "./../shared/timer";
import { GameState } from "./gamestate/gamestate";
import { useWebSocket } from "./socketContext";


const Gameboard = () => {

    const socket = useWebSocket();

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
    const [gameState, setGameState] = useState<GameState>(GameState.CategorySelection);
    const [timeLeft, setTimeLeft] = useState(5); //TODO: update to 180 when done testing
    const [isRunning, setIsRunning] = useState(false);
    const [thisPlayer, setThisPlayer] = useState(null);

    const generateRandomCategories = () => {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        setSelectedCategories(shuffled.slice(0, 10));
    };

    const generateRandomLetter = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomIndex = Math.floor(Math.random() * letters.length);
        setRandomLetter(letters[randomIndex]);
    };

    useEffect(() => {
        if (socket != null) {
            socket.emit("whoami");
            // console.log("turned on WHOAMI event");
            // socket.emit("whoami");
        }

        socket.on("whoami", setThisPlayer);

        return () => {
            socket.off("whoami");
        }
    }, []);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // when the timer is up, select new category
    useEffect(() => {
        if (isRunning && timeLeft == 0) {
            setGameState(GameState.CategorySelection);
        }
    }, [timeLeft])
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };
    
    return (
        <div>
            {/* Category Page */}
            <div className={`
                ${gameState === GameState.CategorySelection ? 'visible' : 'invisible'}
                flex flex-col items-center align-center
                text-white w-full gap-2 h-screen
                absolute
            `}>
                <h1 className="
                    text-lg
                ">Category Selection</h1>
                {
                        <p>You are: {`${thisPlayer ? thisPlayer['playerId'] : ""}`}</p>
                    }

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
                    onClick={() => setGameState(GameState.Active)}
                    disabled={selectedCategories.length === 0 || randomLetter === ""}
                    className={`
                        bg-slate-500 p-2
                        rounded-md
                        ${selectedCategories.length === 0 || randomLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-slate-300"}
                        `}>
                    Continue
                </button>
            </div>
            {/* Gameboard */}
            <div className={`
                ${gameState === GameState.Active ? 'visible' : 'invisible'}
            `}>
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
                    {
                        selectedCategories.map(
                            (category, index) => (
                                <li className="
                                    bg-slate-500 text-white w-4/5
                                    rounded-md p-2 h-1/10
                                " key={index}>
                                    {category}
                                </li>
                            )
                        )  
                    }
                </ul>
                {/*Timer*/}
                <div className="
                    flex flex-col w-1/4 h-1/4 gap-2 p-4
                    text-center text-2xl font-bold
                    rounded-lg bg-slate-400
                ">
                    <div>{formatTime(timeLeft)}</div>
                    <div className="
                        flex flex-col items-center gap-2 w-full
                    ">
                        <button 
                        className="
                            bg-emerald-900 text-white rounded-md
                            w-1/2
                            hover:cursor-pointer
                            hover:text-slate-300
                        " 
                        onClick={() => setIsRunning(true)}
                        >
                        Start
                        </button>
                        <button 
                        className="
                            bg-red-900 text-white rounded-md
                            w-1/2
                            hover:cursor-pointer
                            hover:text-slate-300
                        " 
                        onClick={() => setIsRunning(false)}
                        >
                        Stop
                        </button>
                        <button 
                        className="
                            bg-blue-900 text-white rounded-md
                            w-1/2
                            hover:cursor-pointer
                            hover:text-slate-300
                        " 
                        onClick={() => {
                            setTimeLeft(5);
                            setIsRunning(false);
                        }}
                        >
                        Reset
                        </button>
                    </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Gameboard;