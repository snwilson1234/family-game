import { useEffect, useState } from "react";
import { useWebSocket } from "./socketContext";
import { Socket } from "socket.io-client";


const PlayerResponseForm = () => {

    const socket: Socket = useWebSocket();

    const [categories, setCategories] = useState([]);
    const [letter, setLetter] = useState("");
    const [answers, setAnswers] = useState<string[]>([]);

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
    };

    const handleInputChange = (index: number, value: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = value;
            return updatedAnswers;
        });
    };

    return (
        <div className="
            flex flex-col w-full h-screen items-center
        ">
            <h1 className="
                text-xl font-bold
            ">Enter your answers below, starting with: {letter}</h1>

            <form 
                onSubmit={submitAnswers}
                className="flex flex-col w-full h-screen items-center">
                {
                    categories.map(
                        (category, index) => (
                            <label key={index} className="mb-2">
                                <h1 className="text-bold text-lg">{category}: </h1>
                                <input
                                    onChange={(e) => handleInputChange(index, e.target.value)} 
                                    className="bg-slate-100 text-black"
                                    name={`query${index}`} 
                                />
                            </label>
                            )
                        )
                    }
                <button className="bg-slate-400 text-white font-bold rounded-md p-2" type="submit">Submit Answers</button>
            </form>
        </div>
    );
}
export default PlayerResponseForm;