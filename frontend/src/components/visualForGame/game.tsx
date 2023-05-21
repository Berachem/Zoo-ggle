import React from "react"
import "../../css/game.css"
import {TestGrid} from "../game/TestGrid"
import { ClassicInfoDisplayer } from "./classicInfoDisplayer"

export interface Grid {
    size: number
    content: string
}

const wordData = [
        {"word":"beau","score":60,"isAnimal":false},
        {"word":"belle","score":70,"isAnimal":false},
        {"word":"gnou","score":100,"isAnimal":true},
        {"word":"patate","score":80,"isAnimal":false},
        {"word":"ananas","score":30,"isAnimal":false},
        {"word":"beau","score":60,"isAnimal":false},
        {"word":"belle","score":70,"isAnimal":false},
        {"word":"gnou","score":100,"isAnimal":true},
        {"word":"patate","score":80,"isAnimal":false},
        {"word":"ananas","score":30,"isAnimal":false},
        {"word":"beau","score":60,"isAnimal":false},
        {"word":"belle","score":70,"isAnimal":false},
        {"word":"gnou","score":100,"isAnimal":true},
        {"word":"patate","score":80,"isAnimal":false},
        {"word":"ananas","score":30,"isAnimal":false},
        {"word":"beau","score":60,"isAnimal":false},
        {"word":"belle","score":70,"isAnimal":false},
        {"word":"gnou","score":100,"isAnimal":true},
        {"word":"patate","score":80,"isAnimal":false},
        {"word":"ananas","score":30,"isAnimal":false}
    ]

const score = 340

export const Game = () =>{

    const [gridState, setGridState] = React.useState<Grid>({ size: 5, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? QU ? ? ? ? ? ? ? ? ? ?" })
    const [word, setWord] = React.useState("")
    const [socket, setSocket] = React.useState<WebSocket | null>(null)
    const [countDown, setCountDown] = React.useState(0);

    const sendToSocket = React.useCallback((kind: string, body: Record<string, any>) => {
        const to_send = { kind: kind, ...body }
        const stringified = JSON.stringify(to_send)
        console.debug(`Sending message on the websocket`, to_send)
        socket?.send(stringified)
    }, [socket])

    const proposeWord = React.useCallback((wordProposed: string) => {
        sendToSocket('word_proposed', { content: wordProposed })
    }, [sendToSocket])

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
    

    return (
        <div className="container">
            

            <div className="gridContainer">
                <div className="Timer">{getReturnValues(countDown)}</div>
                <TestGrid content={gridState.content} size={gridState.size}/>
                <div className="containerSender">
                    <input className="WordSender" type="text" value={word} onChange={event => setWord(event.target.value)} />
                    <button className="ButtonSender" onClick={() => { proposeWord(word); setWord('') }}>Proposer</button>
                </div>
            </div>

            <ClassicInfoDisplayer words={wordData} score={score}/>

        </div>
    )
}