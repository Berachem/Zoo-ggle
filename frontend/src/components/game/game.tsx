import React from "react"
import "../../css/game.css"
import {TestGrid} from "../game/TestGrid"
import { ClassicInfoDisplayer } from "./classicInfoDisplayer"
import { FFAInfoDisplayer } from "./ffaInfoDisplayer"

export interface Grid {
    size: number
    content: string
}

export interface WordsInfo { word: string, score: number, isAnimal: boolean }
export interface PlayerInfos { score: number, words: WordsInfo[] }
export interface FFAPlayersInfos {
    [pseudo: string]: PlayerInfos
}

export interface EagleModeStats {
    playersInfo: FFAPlayersInfos
}

export type InGameStats = PlayerInfos | EagleModeStats

interface GameProps{
    grid:Grid
    game_stats:InGameStats
    propose_word:(word:string)=>void
    countdown:number
}


export const Game = (props:GameProps) =>{
    const [word, setWord] = React.useState("")

    const getReturnValues = (countDown: number) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return minutes + "min" + seconds + "s";
    };
    
    function getLetter(letter : string){
        console.log(letter)
        setWord(word+letter)   
    }

    return (
        <div className="container">
            

            <div className="gridContainer">
                <div className="Timer">{getReturnValues(props.countdown)}</div>
                <TestGrid content={props.grid.content} size={props.grid.size} getLetter={getLetter}/>
                <div className="containerSender">
                    <input id="input" className="WordSender" type="text" value={word} onChange={event => setWord(event.target.value)} />
                    <button className="ButtonSender" onClick={() => { props.propose_word(word); setWord('') }}>Proposer</button>
                </div>
            </div>

            {"score" in props.game_stats && <ClassicInfoDisplayer words={props.game_stats.words} score={props.game_stats.score}/>}
            {"playersInfo" in props.game_stats && <FFAInfoDisplayer info={props.game_stats.playersInfo}/>}

            

        </div>
    )
}