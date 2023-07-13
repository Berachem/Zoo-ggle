import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Game,InGameStats, GridInterface } from '../components/game/game';
import { Statistics, LeaderBoard, StatisticsContent } from "../components/game/statistics";
import { useLocation } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify"

export default function Historique() {

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { idgame, idplayer } = useParams<{ idgame: string, idplayer: string }>();

    const [inGameStats, setInGameStats] = useState<InGameStats>({ score: 0, words: [] })

    const [countDown, setCountDown] = useState(0);


    const [statistics, setStats] = useState({
        foundableWords: 0,
        proposedWords: 0,
        foundedWords: 0,
        completion: 0,
        lang: "?",
        numberPlayer: 0,
        gameMode: "?",
    });

    const [leaderBoard, setLeaderBoard] = useState<LeaderBoard>({ "Joueur 1": {score:29,databaseId:-1}, "Joueur 2": {score:18,databaseId:-1}, "Joueur 3": {score:15,databaseId:-1} })
    const [gridState, setGridState] = useState<GridInterface>({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })

    const location = useLocation()
    const params = new URLSearchParams(location.search);
    if(params.has("redirection")){
        if(params.get("redirection")=="1"){
            toast.success("Vous êtes maintenant dans l'historique. Merci d'avoir joué !", {
                position: "top-right",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId:1
              });
        }
    }

    const fetchData = async () => {
        const response = await fetch("http://localhost/backend/api/game/gameInfos.php?idPartie="+params.get("idPartie")+"&idJoueur="+params.get("idJoueur"));
        const data = await response.json();
        
      if (data.success === false) {
        // setUserFound(false);
        // setIsFetching(false);
        return;
      }
        var mode: number = data.gameInfos.Mode;
        if (mode == 0) {
            setInGameStats({ score: data.score, words: data.foundedWords });
        } else if (mode == 1) {
            const stats: InGameStats = { playersInfo: data.foundedWords };
            setInGameStats(stats);
        }
        const grid: GridInterface = { size: data.gameInfos.TailleGrille, content: data.gameInfos.Grille }
        setGridState(grid)
        var diff = Math.abs(new Date(data.gameInfos.DateFinPartie).getTime() - new Date(data.gameInfos.DateDebutPartie).getTime());
        setCountDown(diff)


        const tmpLeaderBoard: LeaderBoard = {};
        data.leaderboard.forEach((player: any) => {
            tmpLeaderBoard[player.Pseudo] = {score : player.Score, databaseId:player.IdJoueur}
        });
        setLeaderBoard(tmpLeaderBoard)

        var foundedWordsNumber = data.foundedWordsCount
        var foundableWords =data.gameInfos.NombreMotsPossibles 
        var percentage:number = Math.round((foundedWordsNumber/foundableWords*100)*100)/100

        var tmpStatistics:StatisticsContent = {
            foundableWords: foundableWords,
            proposedWords: data.proposedWordsCount,
            foundedWords: foundedWordsNumber,
            completion: percentage,
            lang: data.gameInfos.LangueDico,
            numberPlayer: data.gameInfos.NombreJoueursMax,
            gameMode: data.gameInfos.Mode == 1 ? "Aigle" : "Classique",
        }
        // setIsFetching(false);
        setStats(tmpStatistics);

    };
    useEffect(()=>{
        fetchData();
    },[])
    

    return (
        <>
            <ToastContainer/>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
                width: "100vw"
            }}>

                <Game grid={gridState} game_stats={inGameStats} propose_word={() => { }} countdown={countDown} in_game={false}/>
                <Statistics leaderBoard={leaderBoard} stats={statistics} />
            </div>
        </>
    );


}