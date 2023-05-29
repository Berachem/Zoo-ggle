import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Historique(){
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { idgame, idplayer } = useParams<{ idgame: string, idplayer: string }>();

/*     useEffect(() => {
           
        
    }, []); */

    return (
        <div style={{textAlign: "center", marginTop: "10%", backgroundColor: "white", padding: "10px", width: "50%", marginLeft: "25%"}}>
            <h1>Historique</h1>
            <p>gameId : {idgame}</p>
            <p>playerId : {idplayer}</p>
        </div>
    );

        
}