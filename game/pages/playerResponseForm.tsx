import { useEffect, useState } from "react";
import { useWebSocket } from "./socketContext";
import { Socket } from "socket.io-client";
import { PlayerFormState } from "./types/formstate";

// need to work on state changes in game and form

const PlayerResponseForm = () => {

    const socket: Socket = useWebSocket();

    const [categories, setCategories] = useState([]);
    const [letter, setLetter] = useState("");
    const [answers, setAnswers] = useState<string[]>([]);
    const [formState, setFormState] = useState<PlayerFormState>(PlayerFormState.Active);

    useEffect(() => {
        if (socket != null) {
            socket.on("updateCategories", setCategories);
            socket.on("updateLetter", setLetter);
            socket.emit("getCategories");
        }

        return () => {
            if (socket != null) {
                socket.off("updateCategories");
                socket.off("updateLetter");
            }
        }
    },[]);

    const submitAnswers = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("player answers:", answers);

        if (socket) {
            socket.emit("submitAnswers", answers);
        }

        setFormState(PlayerFormState.Submitted);
    };

    const handleInputChange = (index: number, value: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = value;
            return updatedAnswers;
        });
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className={`
                ${formState === PlayerFormState.Submitted ? 'visible' : 'invisible' }  absolute  
            `}>
                Waiting for timer to run out...
            </div>
            <div className={`
                flex flex-col w-full h-full p-2 items-center absolute
                ${formState === PlayerFormState.Active ? 'visible' : 'invisible' }   
            `}>
                <h1 className="
                    text-xl font-bold
                ">Your letter is: {letter}</h1>

                <form 
                    onSubmit={submitAnswers}
                    className="flex flex-col items-center w-full h-screen bg-indigo-800 rounded-md p-4">
                    {
                        categories.map(
                            (category, index) => (
                                <label key={index} className="mb-2">
                                    <h1 className="text-bold text-md">{category}: </h1>
                                    <input
                                        onChange={(e) => handleInputChange(index, e.target.value)} 
                                        className="bg-indigo-50 text-indigo-900 capitalize rounded-sm pt-1 px-2 border-b-4 border-indigo-500 focus:outline-2 focus:outline-indigo-500"
                                        name={`query${index}`} 
                                    />
                                </label>
                                )
                            )
                        }
                    <button className="bg-indigo-400 text-white font-bold rounded-md p-2" type="submit">Submit Answers</button>
                </form>
            </div>
        </div>
    );
}
export default PlayerResponseForm;