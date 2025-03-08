import { GetServerSideProps, NextPage } from "next";
import { Loader2 } from "lucide-react"; 

interface ConnectPageProps {
    numPlayers?: number;
}

const ConnectPage: NextPage<ConnectPageProps> = ({ numPlayers }) => {
    return (
        <div className="
                flex flex-col gap-20 p-8
            ">
                <div className="
                    flex flex-col items-center 
                    ">
                        <h1 className="
                            text-5xl font-medium inline-block
                            ">Choose Players</h1>
                </div>
                
                <div className="
                    flex flex-col items-center
                    bg-slate-700 rounded-md
                    h-100
                ">
                    <div className="
                        flex flex-col items-center h-10
                        justify-center
                    ">
                        <p className="">Connections</p>
                    </div>
                    <div className="
                        flex flex-col items-center h-85
                        bg-slate-800 w-2xl py-6 gap-2
                        rounded-md shadow-lg
                    ">
                        {
                            Array.from({ length: numPlayers! }).map((_, index) => (
                                <div key={index} className="
                                    flex flex-row items-center
                                    px-6 gap-2
                                    h-10 w-xl
                                    rounded-md
                                    bg-slate-500
                                ">
                                    <Loader2 className="
                                        h-5 w-5 animate-spin text-white
                                    " />
                                    <p>Waiting...</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            <div>Number of players: {numPlayers ?? "Not provided"}</div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ConnectPageProps> = async ({ query }) => {
    const numPlayers = Array.isArray(query.numPlayers) ? query.numPlayers[0] : query.numPlayers;
    
    return {
        props: {
            numPlayers: numPlayers ? Number(numPlayers) : undefined, // Convert to number safely
        },
    };
};

export default ConnectPage;
