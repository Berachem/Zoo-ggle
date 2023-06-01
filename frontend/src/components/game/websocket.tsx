import React, { useEffect, useState } from "react"
import WaitingRoom from './waitingRoom'
import GameSelector from './gameSelector'
import { ChatBlock, Message } from './chat'
import { Game, WordsInfo, PlayerInfos, FFAPlayersInfos, EagleModeStats, InGameStats, GridInterface } from "./game"
import "../../css/websocket.css";
import { ToastContainer,toast } from "react-toastify"

export interface WaitingRoomItem {
    name: string
    attendeeNumber: number
    description: string
    grid_size: number
    duration: number
    image_realist: string
    image_cartoon: string
    color: string
    rule: string
}

export interface Player {
    pseudo: string
    id: number
}

interface DisconnectedState { disconnected: true }
interface ConnectingState { connecting: true }
interface RoomSelectionState { roomSelection: true }
interface WaitingState { startTimestamp: number, waitingRoom: WaitingRoomItem }
interface ChattingState { startTimestamp: number, messages: Message[], active: boolean }
type ChatState = DisconnectedState | ConnectingState | RoomSelectionState | WaitingState | ChattingState

export default function ChatManager(props: { socketUrl: string }) {
    const [chatState, setChatState] = React.useState<ChatState>({ disconnected: true })
    const [connected, setConnected] = React.useState(false)
    const [socket, setSocket] = React.useState<WebSocket | null>(null)
    const [error, setError] = React.useState<string>('')
    const [waitingRooms, setWaitingRooms] = React.useState<WaitingRoomItem[]>([])
    const [word, setWord] = React.useState("")
    const [playerId, setPlayerId] = React.useState(-1);

    const [inGameStats, setInGameStats] = React.useState<InGameStats>({ score: 0, words: [] })

    const [countDown, setCountDown] = React.useState(0);
    const [deadLine, setDeadline] = React.useState(0);

    const [gridState, setGridState] = React.useState<GridInterface>({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })
    const [playersWaiting, setPlayersWaiting] = React.useState<Player[]>([])

    var goToHistorique = (gameId:number) => {
        console.log("gameId :"+gameId+" Player id :"+playerId)
        window.location.assign("/historique?idPartie="+gameId+"&idJoueur="+playerId+"&redirection=1")
    }

    const resetGameState = () => {
        setGridState({ size: 4, content: "? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" })
        setWord("")
        setCountDown(0)
        setDeadline(0)
        setPlayersWaiting([])
        setInGameStats({ score: 0, words: [] })
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
                let room: WaitingRoomItem = { name: name, attendeeNumber: value.attendee_number, description: value.description, grid_size: value.grid_size, duration: value.duration, image_realist: value.image_realistic, image_cartoon: value.image_cartoon, color: value.color, rule: value.rule }
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
                let room: WaitingRoomItem = { name: name, attendeeNumber: content.waiting_room.attendee_number, description: content.waiting_room.description, grid_size: content.waiting_room.grid_size, duration: content.waiting_room.duration, image_realist: content.waiting_room.image_realistic, image_cartoon: content.waiting_room.image_cartoon, color: content.waiting_room.color, rule: content.waiting_room.rule }
                setChatState({ waitingRoom: room, startTimestamp: performance.now() })
                setPlayerId(oldState => content.playerId)
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
                setGridState({ size: content.size, content: content.grid })
                setDeadline(content.deadline * 1000)
                setCountDown((deadLine - new Date().getTime()))
                if (content.mode == 1) {
                    let infos: FFAPlayersInfos = {}
                    for (const player of content.players) {
                        let words: WordsInfo[] = []
                        var currentPlayerInfo: PlayerInfos = { score: 0, words: words }
                        infos[player] = currentPlayerInfo
                    }
                    setInGameStats({ playersInfo: infos })
                } else {
                    setInGameStats({ score: 0, words: [] })
                }
                break

            case 'word_found':
                if (content.isAnimal){
                    toast.success("Bravo vous avez trouvé un animal !", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId:99
                      });
                }
                if (content.mode == 0) {
                    setInGameStats(oldState => ('score' in oldState) ? { score: oldState.score + content.score, words: [...oldState.words, { word: content.word, score: content.score, isAnimal: content.isAnimal }] } : oldState)
                } else if (content.mode == 1) {
                    setInGameStats(oldState => {
                        if ('playersInfo' in oldState) {
                            var oldPlayerStats: PlayerInfos = { ...oldState.playersInfo[content.player] }

                            var word: WordsInfo = { score: content.score, word: content.word, isAnimal: content.isAnimal }
                            var newPlayerStats: PlayerInfos = { ...oldPlayerStats, score: oldPlayerStats.score + content.score, words: [...oldPlayerStats.words, word] }
                            var player: string = content.player
                            var stats: FFAPlayersInfos = { ...oldState.playersInfo }
                            stats[player] = newPlayerStats
                            return { playersInfo: stats }
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
                // setChatState({ roomSelection: true })
                // console.log(content.gameId +"et"+content.playerId)
                goToHistorique(content.gameId)
                window.location.assign("/historique?idPartie="+content.gameId+"&idJoueur="+content.playerId+"&redirection=1")
                break

            case 'server_shutdown':
                setError('Le serveur va se fermer. Essayer de vous reconnecter d\'ici peu.')
                break

            case 'already_found':
                toast.warning('Trop tard ! Le mot ' + content.word + ' a déja été trouvé par ' + content.player, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId:98,
                    });
                // setError('Dommage le mot' + content.word + 'a déja été trouvé par ' + content.player)
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

    useEffect(() => {
        console.log("ID : "+playerId)
    }, [playerId])

    useEffect(() => {
        if (error != ""){
            toast.error(error, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId:400
              });
        }
    }, [error])

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

    useEffect(()=>{
        console.log(inGameStats)
    },[inGameStats])

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

    return <>
        <ToastContainer/>
        {/* {error !== '' &&
            <div className="wsError">Error: {error} <button onClick={() => setError('')}>OK</button></div>}
 */}

        {'connecting' in chatState &&
            <div className="wsConnecting">
                <div>Connexion au serveur de jeu {props.socketUrl}</div>
                <div>Si la connexion prend trop de temps, essayez de rafraichir la page</div>
            </div>}

        {/* Choosing a room */}
        {'roomSelection' in chatState &&
            <GameSelector rooms={waitingRooms} onChosenRoom={connectToWaitingRoom} />
        }

        {/* Waiting in a room */}
        {'waitingRoom' in chatState &&
            <>
                <WaitingRoom room={chatState.waitingRoom} onLeaving={leaveWaitingRoom} playersWaiting={playersWaiting} />
            </>}

        {/* In game  */}
        {'messages' in chatState &&
            <>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-evenly",
                    width: "100vw"
                }}>

                    <Game grid={gridState} game_stats={inGameStats} propose_word={proposeWord} countdown={countDown} in_game={true}/>
                    <ChatBlock messages={chatState.messages} onMessageWritten={sendChatMessage} />
                </div>
            </>

        }

    </>
}  