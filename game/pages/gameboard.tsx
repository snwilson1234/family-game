'use client';
import { useEffect, useState } from "react";
import Timer from "./../shared/timer";
import { GameState } from "./gamestate/gamestate";
import { useWebSocket } from "./socketContext";
import { Player } from "./types/player";
import ResultsPage from "./resultsPage";



const Gameboard = () => {

    const socket: Socket = useWebSocket();

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
    const [timeLeft, setTimeLeft] = useState(20); //TODO: update to 180 when done testing
    const [isRunning, setIsRunning] = useState(false);
    const [thisPlayer, setThisPlayer] = useState<Player>();
    const [players, setPlayers] = useState<Player[]>([]);

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
            socket.on("updatePlayers", setPlayers);
            socket.on("whoami", setThisPlayer);
            socket.emit("getPlayers");
            socket.emit("whoami");
        }

        return () => {
            if (socket != null) {
                socket.off("whoami");
                socket.off("updatePlayers");
            }
        }
    }, []);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            socket.emit("setCategories", selectedCategories);
        }
    }, [selectedCategories]);

    useEffect(() => {
        if (randomLetter != "") {
            socket.emit("setLetter", randomLetter);
        }
    }, [randomLetter]);

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
            setGameState(GameState.Results);
            socket.emit("endRound");
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
                flex flex-col items-center justify-center
                w-full h-screen pt-10
                absolute
            `}>
                <div className="
                    flex flex-row w-full h-8/10 items-center justify-center
                ">
                    <div className="
                        flex flex-col items-center justify-center
                        w-1/2 gap-4 h-full
                    ">
                        <h1 className="
                            text-3xl font-medium
                        ">Your categories are...</h1>

                        <ul className="
                            flex flex-col items-center gap-1 py-5
                            bg-indigo-600 w-3/4 rounded-md text-xl
                            shadow-lg h-4/5
                        ">
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

                    <div className="
                        flex flex-col items-center justify-center
                        w-1/2 gap-4 h-full
                    ">
                        <h1 className="
                            text-3xl font-medium
                        ">Your letter is...</h1>
                        <div className="text-9xl font-bold h-4/5">
                            <h1>{randomLetter ? randomLetter : "_"}</h1>
                        </div>
                    </div>
                </div>
                <div className="
                    flex flex-row w-full h-2/10 items-center justify-between
                    px-40
                ">
                    <button 
                        onClick={() => generateRandomCategories()}
                        className="
                            btn btn-primary
                            text-3xl w-2/5
                        ">
                        Generate Categories
                    </button>
                    <button 
                        onClick={generateRandomLetter}
                        className="
                            btn btn-primary
                            text-3xl w-2/5
                        ">
                        Generate Letter
                    </button>
                </div>
                <div className="
                    flex flex-col align-center items-center h-1/10
                ">
                    <button 
                        onClick={() => setGameState(GameState.Active)}
                        disabled={selectedCategories.length === 0 || randomLetter === ""}
                        className={`
                            btn btn-primary text-xl
                            ${selectedCategories.length === 0 || randomLetter === "" ? "opacity-50 hover:cursor-default" : "hover:cursor-pointer hover:text-indigo-300"}
                            `}>
                        Continue
                    </button>
                </div>
            </div>
            {/* Gameboard */}
            <div className={`
                ${gameState === GameState.Active ? 'visible' : 'invisible'}
            `}>
                <div className="
                    flex flex-col justify-between absolute
                     w-full gap-2 h-screen z-0
                ">
                    <div className="
                        flex flex-row justify-between
                        w-full pt-2
                    ">
                        <h1 className="
                            text-lg
                            text-left
                            pl-8 w-1/2
                        ">{`
                            ${players.length >= 1 ? players[0]['name'] : ""}:
                            ${players.length >= 1 ? players[0]['points'] : ""}
                        `}</h1>
                        <h1 className="
                            text-lg
                            text-right
                            pr-8 w-1/2
                        ">{`
                            ${players.length >= 2 ? players[1]['name'] : ""}:
                            ${players.length >= 2 ? players[1]['points'] : ""}
                        `}</h1>
                    </div>
                    
                    <div className="
                        flex flex-row justify-between
                        w-full pb-3
                    ">
                        <h1 className="
                            text-lg
                            text-left
                            pl-8 w-1/2
                        ">{players.length >= 3 ? players[2]['name'] : ""}</h1>
                        <h1 className="
                            text-lg
                            text-right
                            pr-8 w-1/2
                        ">{players.length >= 4 ? players[3]['name'] : ""}</h1>
                    </div>
                </div>
                <div className=" 
                    flex flex-row justify-center items-center
                    w-full h-screen gap-5 z-10 absolute
                    
                ">
                    <ul className="
                        flex flex-col items-center gap-1 py-5
                        bg-indigo-600 w-1/4 h-3/5 rounded-md
                    ">
                    {
                        selectedCategories.map(
                            (category, index) => (
                                <li className="
                                    bg-indigo-500 w-4/5
                                    rounded-md p-2 h-1/10
                                    text-lg
                                " key={index}>
                                    {category}
                                </li>
                            )
                        )  
                    }
                    </ul>
                {/*Timer*/}
                <div className="flex flex-col w-1/4 h-full align-center justify-center">
                    <div className="h-1/4 text-center">
                        <p className="text-2xl">Your Letter is:</p>
                        <h1 className="text-9xl">{randomLetter}</h1>
                    </div>
                    <div className="
                        flex flex-col w-full h-1/3 align-center
                        text-center justify-center text-2xl font-bold
                        rounded-lg bg-indigo-400
                    ">
                        <div className="h-1/4 text-5xl">{formatTime(timeLeft)}</div>
                        <div className="
                            flex flex-col items-center gap-2 w-full
                        ">
                            <button 
                            className="
                                bg-emerald-900 rounded-md
                                w-1/2
                                hover:cursor-pointer
                                hover:text-indigo-300
                            " 
                            onClick={() => {
                                setIsRunning(true);
                                socket.emit("startRound");
                            }}
                            >
                            Start
                            </button>
                            <button 
                            className="
                                bg-red-900 rounded-md
                                w-1/2
                                hover:cursor-pointer
                                hover:text-indigo-300
                            " 
                            onClick={() => setIsRunning(false)}
                            >
                            Stop
                            </button>
                            <button 
                            className="
                                bg-blue-900 rounded-md
                                w-1/2
                                hover:cursor-pointer
                                hover:text-indigo-300
                            " 
                            onClick={() => {
                                setTimeLeft(20);
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
            <div className={`
                ${gameState === GameState.Results ? 'visible' : 'invisible'}`}
            >
                <ResultsPage initialFocusCategoryIdx={`${-1}`} />
                <div className="flex flex-col items-center">
                <button className="
                    bg-indigo-400 w-xs h-20
                    text-lg font-bold rounded-md
                    hover:cursor-pointer
                    hover:text-indigo-400
                " onClick={() => {
                    setGameState(GameState.CategorySelection);
                    setIsRunning(false);
                    setTimeLeft(20);
                }}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default Gameboard;