import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatBlock } from '../components/game/chat';
import { Game, WordsInfo, PlayerInfos, FFAPlayersInfos, EagleModeStats, InGameStats, Grid } from '../components/game/game';
import { Statistics, LeaderBoard, StatisticsContent } from "../components/game/statistics";

// export interface Grid {
//     size: number
//     content: string
// }

// export interface WordsInfo { word: string, score: number, isAnimal: boolean }
// export interface PlayerInfos { score: number, words: WordsInfo[] }
// export interface FFAPlayersInfos {
//     [pseudo: string]: PlayerInfos
// }

// export interface EagleModeStats {
//     playersInfo: FFAPlayersInfos
// }

// export type InGameStats = PlayerInfos | EagleModeStats

// interface GameProps{
//     grid:Grid
//     game_stats:InGameStats
//     propose_word:(word:string)=>void
//     countdown:number
// }




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
        lang: "",
        numberPlayer: 0,
        gameMode: "",
    });

    const [leaderBoard, setLeaderBoard] = useState<LeaderBoard>({ "Lucas": 5, "Jo": 8, "Nidal": 15 })

    const [gridState, setGridState] = useState<Grid>({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })




    const fetchData = async () => {
        // setIsFetching(true);
        // /:id use params to get the id of the user

        // if (id === undefined) {
        //   const idUser = await getId();

        //   if (idUser === -1) {
        //     setUserFound(false);
        //     setIsFetching(false);
        //     return;
        //   }
        //   setOwnProfile(true);
        //   id = idUser;
        // }

        const response = await fetch("http://localhost/backend/api/game/gameInfos.php?idPartie=254&idJoueur=8");
        const data = await response.json();
        console.log(data);
        var mode: number = data.gameInfos.Mode;
        if (mode == 0) {
            const stats: InGameStats = { playersInfo: data.foundedWords };
            setInGameStats({ score: data.gameInfos.Score, words: data.foundedWords });
        } else if (mode == 1) {
            const stats: InGameStats = { playersInfo: data.foundedWords };
            setInGameStats(stats);
        }
        const grid: Grid = { size: data.gameInfos.TailleGrille, content: data.gameInfos.Grille }
        setGridState(grid)
        var diff = Math.abs(new Date(data.gameInfos.DateFinPartie).getTime() - new Date(data.gameInfos.DateDebutPartie).getTime());
        setCountDown(diff)


        const tmpLeaderBoard: LeaderBoard = {};
        data.leaderboard.forEach((player: any) => {
            tmpLeaderBoard[player.Pseudo] = player.Score
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

        setStats(tmpStatistics)

        // const userProfileData = {
        //   pseudo: data.profileInfos[0].Pseudo,
        //   description: data.profileInfos[0].Description,
        //   gamesWon: parseInt(data.profileInfos[0].gamesWon),
        //   gamesPlayed: parseInt(data.profileInfos[0].gamesPlayed),
        //   gamesLost: parseInt(data.profileInfos[0].gamesLost),
        //   wordsFound: isNaN(parseInt(data.profileInfos[0].wordsFound))
        //     ? 0
        //     : parseInt(data.profileInfos[0].wordsFound),
        //   longestWord: "",
        //   averageWordsPerGame: 0,
        //   isPublic: parseInt(data.profileInfos[0].ProfilPublic) === 1,
        //   inscriptionDate: new Date(
        //     data.profileInfos[0].DateCreationCompte
        //   ).toLocaleDateString(),
        //   lastConnectionDate: new Date(
        //     data.profileInfos[0].DateDerniereConnexion
        //   ).toLocaleDateString(),
        //   email: data.profileInfos[0].Mail,
        //   games: data.allGamesDetails.map((game: any) => {
        //     return {
        //       id: game.IdPartie,
        //       name: game.NomPartie,
        //       score: game.Score,
        //       lang: game.LangueDico,
        //       grid: game.Grille,
        //       startDate: new Date(game.DateDebutPartie).toLocaleDateString(),
        //       endDate: new Date(game.DateFinPartie).toLocaleDateString(),
        //       size: game.TailleGrille,
        //       mode: game.Mode,
        //       isPublic: game.EstPublic,
        //       maxPlayers: game.NombreJoueursMax,
        //       leaderboard: game.leaderboard.map((player: any) => {
        //         return {
        //           pseudo: player.Pseudo,
        //           score: player.Score,
        //           id: player.IdJoueur,
        //         };
        //       }),
        //       numberWordsFound: game.validWordsNumber,
        //       numberWordsProposed: game.wordProposedNumber,
        //       // round
        //       percentageWordsFound: Math.round(game.validWordPercentage),
        //     };
        //   }),
        // };
        // setProfileData(userProfileData);

        // setIsFetching(false);
    };
    fetchData();

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-evenly",
                width: "100vw"
            }}>

                <Game grid={gridState} game_stats={inGameStats} propose_word={() => { }} countdown={countDown} />
                <Statistics leaderBoard={leaderBoard} stats={statistics} />
            </div>
        </>
    );


}