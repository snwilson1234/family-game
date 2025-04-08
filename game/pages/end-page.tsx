import { Player } from "./types/player";


type EndPageProps = {
    winner : Player,
    onPlayAgain : () => void,
};

const EndPage = ({
    winner, onPlayAgain
} : EndPageProps) => {

    
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center gap-15 p-8">
            <div className="w-1/5">
                <img 
                    src="https://media.giphy.com/media/1GTZA4flUzQI0/giphy.gif" 
                    alt="Winning gif" 
                    className="w-full h-auto"
                />
            </div>
            <h1 className="text-6xl font-semibold italic">Congratulations, {winner ? winner.name : "placeholder"}!</h1>
            <h1 className="text-4xl">You won!</h1>
            <button 
                className="btn btn-primary text-xl"
                onClick={onPlayAgain}
            >Play again?</button>
        </div>/* TODO: add option for "play again with same players vs. new game" */
    )


};

export default EndPage;