

const PlayerResponseForm = () => {

    return (
        <div className="
            flex flex-col w-full h-screen items-center
        ">
            <h1 className="
                text-xl font-bold
            ">Enter your answers below</h1>

            <form className="flex flex-col w-full h-screen items-center">
                {Array.from({ length: 10 }).map((_, index) => (
                    <label key={index} className="mb-2">
                        <h1 className="text-bold text-lg">Label {index + 1}: </h1>
                        <input 
                            className="bg-slate-100 text-black"
                            name={`query${index}`} 
                            value={`test ${index + 1}`} 
                        />
                    </label>
                ))}
                <button type="submit">Submit Answers</button>
            </form>
        </div>
    );
}
export default PlayerResponseForm;