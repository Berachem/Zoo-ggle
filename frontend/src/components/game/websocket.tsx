import React, { useEffect, useState } from "react"
import '../../css/webSockets.css'

export interface WaitingRoom {
    name: string
    attendeeNumber: number
    description: string
    grid_size: number
    duration: number
    image_realist: string
    image_cartoon: string
    color: string
}

export interface Message {
    sender: string
    content: string
}

export interface Player {
    pseudo: string
    id: number
}

export interface Grid {
    size: number
    content: string
}

export const WaitingRoomSelector = (props: { rooms: WaitingRoom[], onChosenRoom: (username: string, waitingRoom: string) => void }) => {
    const [username, setUsername] = React.useState("")
    const [selectedRoom, setSelectedRoom] = React.useState("")
    return <div className="wsWaintingRoomSelector">
        <div>Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /></div>
        <div>
            {props.rooms.map(room => <div key={room.name}>
                <input type="radio" name="room" value={room.name} checked={selectedRoom === room.name} onChange={() => setSelectedRoom(room.name)} />
                {room.name}:{room.attendeeNumber}player(s), {room.duration}s ({room.description})
            </div>)}
        </div>
        <button onClick={() => props.onChosenRoom(username, selectedRoom)} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Join the waiting room</button>
    </div>
}

export const RoomWaiter = (props: { roomName: string, startTimestamp: number, onLeaving: () => void, playersWaiting: Player[] }) => {
    const [currentTimestamp, setCurrentTimestamp] = React.useState(performance.now())
    React.useEffect(() => {
        const handle = setInterval(() => setCurrentTimestamp(performance.now()), 1000)
        return () => clearTimeout(handle)
    }, [])
    return <div className="wsRoomWaiter">
        <div>Waiting in room {props.roomName} for {Math.floor((currentTimestamp - props.startTimestamp) / 1000)} s.</div>
        <div><button onClick={() => props.onLeaving()}>Leave the waiting room</button></div>

        <p> Joueurs dans la room</p>
        {props.playersWaiting.map(function (player) {
            return (
                <p>
                    {player['pseudo']}
                </p>)
        })}
    </div>
}

export const ChatMessageDisplayer = (props: { message: Message }) => {
    return <div className="wsChatMessageDisplayer">
        <div>{props.message.sender}</div>
        <div style={{ flex: 1 }}>{props.message.content}</div>
    </div>
}

export const ChatMessagesDisplayer = (props: { messages: Message[] }) => {
    return <ol className="wsChatMessagesDisplayer">
        {props.messages.map((x, i) => <li key={i}><ChatMessageDisplayer message={x} /></li>)}
    </ol>
}

export const MessageSender = (props: { onMessageWritten: (content: string) => void }) => {
    const [content, setContent] = React.useState("")
    return <div className="wsMessageSender">
        <input type="text" value={content} style={{ flex: 1 }} onChange={event => setContent(event.target.value)} />
        <button onClick={() => { props.onMessageWritten(content); setContent('') }}>Send</button>
    </div>
}

export const ChatSession = (props: { messages: Message[], active: boolean, onMessageWritten: (content: string) => void, onLeaving: () => void }) => {
    return <div className="wsChatSession">
        <ChatMessagesDisplayer messages={props.messages} />
        {props.active && <MessageSender onMessageWritten={props.onMessageWritten} />}
        <div>
            <button onClick={() => props.onLeaving()} disabled={!props.active}>Leave the chat session</button>
        </div>
    </div>
}

export const Grid = (props: { grid: string }) => {
    return <div className="wsGrid">
        {
            props.grid.split(" ").map((letter: string, index: number) => {
                return <div key={index.toString()}>{letter}</div>
            })
        }
    </div>
}

interface DisconnectedState { disconnected: true }
interface ConnectingState { connecting: true }
interface RoomSelectionState { roomSelection: true }
interface WaitingState { startTimestamp: number, waitingRoomName: string }
interface ChattingState { startTimestamp: number, messages: Message[], active: boolean }
type ChatState = DisconnectedState | ConnectingState | RoomSelectionState | WaitingState | ChattingState

interface WordsInfo { word: string, score: number, isAnimal: boolean }
interface PlayerInfos { score: number, validWords: WordsInfo[] }
interface AllPlayersInfos {
    [pseudo: string]: PlayerInfos
}

interface EagleModeStats {
    playersInfo: AllPlayersInfos
}

type InGameStats = PlayerInfos | EagleModeStats

export default function ChatManager(props: { socketUrl: string }) {
    const [chatState, setChatState] = React.useState<ChatState>({ disconnected: true })
    const [connected, setConnected] = React.useState(false)
    const [socket, setSocket] = React.useState<WebSocket | null>(null)
    const [error, setError] = React.useState<string>('')
    const [waitingRooms, setWaitingRooms] = React.useState<WaitingRoom[]>([])
    const [word, setWord] = React.useState("")

    const [inGameStats, setInGameStats] = React.useState<InGameStats>({ score: 0, validWords: [] })

    const [countDown, setCountDown] = React.useState(0);
    const [deadLine, setDeadline] = React.useState(0);

    const [gridState, setGridState] = React.useState<Grid>({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })
    const [playersWaiting, setPlayersWaiting] = React.useState<Player[]>([])



    const resetGameState = () => {
        setGridState({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })
        setWord("")
        setCountDown(0)
        setDeadline(0)
        setPlayersWaiting([])
        setInGameStats({ score: 0, validWords: [] })
    }

    const onNewSocketMessage = (kind: string, content: Record<string, any>) => {
        console.debug("Received message from websocket", content)
        const addChatMessage = (sender: string, content: string) => {
            let message: Message = { sender: sender, content: content }
            setChatState(oldState => {
                if ('messages' in oldState)
                    return { ...oldState, messages: [...oldState.messages, message] }
                else return oldState
            })
        }
        const readWaitingRooms = (c: Record<string, any>) => {
            let waitingRooms = []
            for (let [name, v] of Object.entries(c['waiting_rooms'])) {
                let value = v as any
                let room: WaitingRoom = { name: name, attendeeNumber: value.attendee_number, description: value.description, grid_size: value.grid_size, duration: value.duration, image_realist: value.image_realist, image_cartoon: value.image_cartoon, color: value.color }
                waitingRooms.push(room)
            }
            return waitingRooms
        }

        switch (kind) {
            case 'waiting_room_list':
                setWaitingRooms(readWaitingRooms(content))
                setChatState({ roomSelection: true })
                break

            case 'in_waiting_room':
                let name = content.waiting_room_name
                setChatState({ waitingRoomName: name, startTimestamp: performance.now() })
                break

            case 'waiting_room_left':
                setChatState({ roomSelection: true })
                break

            case 'player_waiting':
                let pseudos: Player[] = content.players
                setPlayersWaiting(pseudos)
                break

            case 'waiting_room_join_refused':
                setError(`Impossible de rejoindre la partie: ${content.reason}`)
                break

            case 'chat_session_started':
                resetGameState()
                setChatState({ startTimestamp: performance.now(), messages: [], active: true })
                addChatMessage('Partie', content.welcome_message)
                break

            case 'grid_reveal':
                setGridState({ size: gridState.size, content: content.grid })
                setDeadline(content.deadline * 1000)
                setCountDown((deadLine - new Date().getTime()))
                if (content.mode == 1) {
                    let infos: AllPlayersInfos = {}
                    for (const player of content.players) {
                        let words: WordsInfo[] = []
                        var currentPlayerInfo: PlayerInfos = { score: 0, validWords: words }
                        infos[player] = currentPlayerInfo
                    }
                    console.log("Clean state pour mode aigle")
                    console.log("SetIngameStats ligne223")
                    setInGameStats({ playersInfo: infos })
                } else {
                    console.log("Clean state pour mode classique")
                    console.log("SetIngameStats ligne228")
                    setInGameStats({ score: 0, validWords: [] })
                }
                break

            case 'word_found':
                if (content.mode == 0) {
                    console.log("SetIngameStats ligne233")
                    setInGameStats(oldState => ('score' in oldState) ? { score: oldState.score + content.score, validWords: [...oldState.validWords, { word: content.word, score: content.score, isAnimal: content.isAnimal }] } : oldState)
                } else if (content.mode == 1) {
                    setInGameStats(oldState => {
                        if ('playersInfo' in oldState) {
                            var oldPlayerStats: PlayerInfos = { ...oldState.playersInfo[content.player] }

                            var word: WordsInfo = { score: content.score, word: content.word, isAnimal: content.isAnimal }
                            var newPlayerStats: PlayerInfos = { ...oldPlayerStats, score: oldPlayerStats.score + content.score, validWords: [...oldPlayerStats.validWords, word] }
                            var player: string = content.player
                            var stats: AllPlayersInfos = { ...oldState.playersInfo }
                            stats[player] = newPlayerStats
                            return {playersInfo:stats}
                        }
                        else {
                            return oldState
                        }
                    })
                }
                break

            case 'chat_message_received':
                addChatMessage(content.sender, content.content)
                break

            case 'attendee_left':
                addChatMessage('Partie', `${content.attendee} a quitté la partie.`)
                break

            case 'chat_session_left':
                setChatState(oldState => ('messages' in oldState) ? { ...oldState, active: false } : oldState)
                break

            case 'chat_session_ended':
                setChatState(oldState => ('messages' in oldState) ? { ...oldState, active: false } : oldState)
                addChatMessage('Partie', "Fin de la partie, bien joué à tous !")
                addChatMessage('Partie', content.exit_message)
                setChatState({ roomSelection: true })
                break

            case 'server_shutdown':
                setError('Le serveur va se fermer. Essayer de vous reconnecter d\'ici peu.')
                break

            case 'already_found':
                setError('Dommage le mot' + content.word + 'a déja été trouvé par ' + content.player)
                break

            default:
                setError(`Received non understable message: kind=${kind} content=${JSON.stringify(content)}`)
        }
    }

    const sendToSocket = React.useCallback((kind: string, body: Record<string, any>) => {
        const to_send = { kind: kind, ...body }
        const stringified = JSON.stringify(to_send)
        console.debug(`Sending message on the websocket`, to_send)
        socket?.send(stringified)
    }, [socket])

    const connectToWaitingRoom = React.useCallback((username: string, waitingRoomName: string) => {
        sendToSocket('join_waiting_room', { 'token': username, 'waiting_room_name': waitingRoomName })
    }, [sendToSocket])
    const leaveWaitingRoom = React.useCallback(() => {
        sendToSocket('leave_waiting_room', {})
    }, [sendToSocket])
    const sendChatMessage = React.useCallback((content: string) => {
        sendToSocket('send_chat_message', { content: content })
    }, [sendToSocket])
    const proposeWord = React.useCallback((wordProposed: string) => {
        sendToSocket('word_proposed', { content: wordProposed })
    }, [sendToSocket])
    const leaveChatSession = React.useCallback(() => {
        sendToSocket('leave_chat_session', {})
        setChatState({ roomSelection: true })
        resetGameState()
    }, [sendToSocket])


    useEffect(() => {
        if ('connecting' in chatState) {
            setConnected(true)
        } else if ('disconnected' in chatState) {
            setChatState({ connecting: true })
            // setConnected(false)
        }
    }, [chatState])

    // create and configure a websocket
    useEffect(() => {
        if (connected) {
            console.log(`Opening the websocket with the URL ${props.socketUrl}`)
            const newSocket = new WebSocket(props.socketUrl)
            setSocket(newSocket)
            newSocket.addEventListener('open', (event) => {
                setChatState({ roomSelection: true })
            })
            newSocket.addEventListener('message', (event) => {
                const data = event.data
                if (typeof (data) === 'string') {
                    let json = null
                    let kind = null
                    try {
                        json = JSON.parse(data)
                        kind = json['kind']
                    } catch {
                        console.error("Received invalid JSON", data)
                    }
                    if (json !== null && kind !== null)
                        onNewSocketMessage(kind, json)
                }
            })
            newSocket.addEventListener('error', (event) => {
                console.error("WebSocket error", event)
                setError(`Websocket connection error: ${event}`)
                setChatState({ disconnected: true })
            })
            newSocket.addEventListener('close', (event) => {
                console.error("WebSocket closed", event)
                setChatState({ disconnected: true })
            })
            // close the socket
            return () => {
                newSocket.close()
                setWaitingRooms([])
                setSocket(null)
            }
        }
    }, [connected, props.socketUrl])

    useEffect(() => {
        var now = new Date().getTime()
        const interval = setInterval(() => {
            setCountDown((deadLine - (now)))
        }, 1000);
        return () => clearInterval(interval);
    }, [countDown]);

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


    return <div className="wsChatManager">
        {error !== '' &&
            <div className="wsError">Error: {error} <button onClick={() => setError('')}>OK</button></div>}


        {/* Connextion (ca dure 2ms) */}
        {'connecting' in chatState &&
            <div className="wsConnecting">
                <div>Connexion au serveur de jeu {props.socketUrl}</div>
                <div>Si la connexion prend trop de temps, essayez de rafraichir la page</div>
            </div>}

        {/* Choosing a room */}
        {'roomSelection' in chatState &&
            <WaitingRoomSelector rooms={waitingRooms} onChosenRoom={connectToWaitingRoom} />
        }

        {/* Waiting in a room */}
        {'waitingRoomName' in chatState &&
            <>
                <RoomWaiter roomName={chatState.waitingRoomName} startTimestamp={chatState.startTimestamp} onLeaving={leaveWaitingRoom} playersWaiting={playersWaiting} />
            </>}

        {/* In game  */}
        {'messages' in chatState &&
            <>
                <ChatSession messages={chatState.messages} active={chatState.active} onMessageWritten={sendChatMessage} onLeaving={leaveChatSession} />

                <Grid grid={gridState.content}></Grid>
                <div className="wsWordSender">
                    txt : {getReturnValues(countDown)}
                </div>


                <div className="wsWordSender">
                    <input type="text" value={word} style={{ flex: 1 }} onChange={event => setWord(event.target.value)} />
                    <button onClick={() => { proposeWord(word); setWord('') }}>Send</button>
                </div>
                <div>
                    {"score" in inGameStats &&
                        <>
                            <h1>
                                Score :
                            </h1>
                            <p>
                                {inGameStats.score}
                            </p>
                            <h1>
                                Mots Trouvés :
                            </h1>
                            {inGameStats.validWords.map(function (list) {
                                return (
                                    <p key={list.word}>
                                        {list.word} - {list.score} pts {list.isAnimal && <>C' est un animal</>}
                                    </p>)
                            })}
                        </>
                    }

                    {"playersInfo" in inGameStats &&
                        <>
                            <h1>EAGLE</h1>
                            {Object.keys(inGameStats.playersInfo).map(function (key) {
                                let playerStat = inGameStats.playersInfo[key];
                                return (
                                    <React.Fragment key={key}>
                                        <h1> {key} - {playerStat.score} pts </h1>
                                        {
                                            playerStat.validWords.map(function (word) {
                                                return (
                                                    <p key={word.word}>
                                                        {word.word} - {word.score} pts {word.isAnimal && <p>C' est un animal</p>}
                                                    </p>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                                )
                            }
                            )}
                        </>
                    }
                </div>
            </>

        }

    </div>
}