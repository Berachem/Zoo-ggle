import React, { useEffect } from "react"

import './Components.css'

export interface WaitingRoom {
    name: string
    attendeeNumber: number
    description: string
}

export interface Message {
    sender: string
    timestamp: number
    content: string
}

export const WaitingRoomSelector = (props: {rooms: WaitingRoom[], onChosenRoom: (username: string, waitingRoom: string) => void}) => {
    const [username, setUsername] = React.useState("")
    const [selectedRoom, setSelectedRoom] = React.useState("")
    return <div className="WaintingRoomSelector">
        <div>Username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /></div>
        <div>
            {props.rooms.map(room => <div key={room.name}>
                <input type="radio" name="room" value={room.name} checked={selectedRoom === room.name} onChange={() => setSelectedRoom(room.name)} />
                {room.name}@{room.attendeeNumber} ({room.description})
            </div>)}
        </div>
        <button onClick={() => props.onChosenRoom(username, selectedRoom)} disabled={username === "" || selectedRoom === "" || props.rooms.findIndex(x => x.name === selectedRoom) === -1}>Join the waiting room</button>
    </div>
}

export const RoomWaiter = (props: {roomName: string, startTimestamp: number, onLeaving: () => void}) => {
    const [currentTimestamp, setCurrentTimestamp] = React.useState(performance.now())
    React.useEffect(() => {
        const handle = setInterval(() => setCurrentTimestamp(performance.now()), 1000)
        return () => clearTimeout(handle)
    }, [])
    return <div className="RoomWaiter">
        <div>Waiting in room {props.roomName} for {Math.floor((currentTimestamp - props.startTimestamp) / 1000)} s.</div>
        <div><button onClick={() => props.onLeaving() }>Leave the waiting room</button></div>
    </div>
}

export const ChatMessageDisplayer = (props: {message: Message}) => {
    const date = React.useMemo(() => new Date(props.message.timestamp).toLocaleTimeString(), [props.message.timestamp])
    return <div className="ChatMessageDisplayer">
        <div>{date}</div>
        <div>{props.message.sender}</div>
        <div style={{flex: 1}}>{props.message.content}</div>
    </div>
}

export const ChatMessagesDisplayer = (props: {messages: Message[]}) => {
    return <ol className="ChatMessagesDisplayer">
        {props.messages.map((x, i) => <li key={i}><ChatMessageDisplayer message={x} /></li>)}
    </ol>
}

export const MessageSender = (props: {onMessageWritten: (content: string) => void}) => {
    const [content, setContent] = React.useState("")
    return <div className="MessageSender">
        <input type="text" value={content} style={{flex: 1}} onChange={event => setContent(event.target.value)} />
        <button onClick={() => {props.onMessageWritten(content); setContent('')}}>Send</button>
    </div>
}

export const ChatSession = (props: {messages: Message[], active: boolean, onMessageWritten: (content: string) => void, onLeaving: () => void, onClosing: () => void}) => {
    return <div className="ChatSession">
        <ChatMessagesDisplayer messages={props.messages} />
        {props.active && <MessageSender onMessageWritten={props.onMessageWritten} />}
        <div>
            <button onClick={() => props.onLeaving()} disabled={!props.active}>Leave the chat session</button>
            <button onClick={() => props.onClosing()} disabled={props.active}>Close</button>
        </div>
    </div>
}

export const Grid = (props: {grid: string}) => {
    return <div className="Grid">
        {
                props.grid.split(" ").map((letter : string, index : number) => {
                    return <div id={index.toString()}>{letter}</div>
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
interface InGameStats {score: number, validWords:String[], falseWords:String[]}

export const ChatManager = (props: {socketUrl: string}) => {
    const [chatState, setChatState] = React.useState<ChatState>({disconnected: true})
    const [connected, setConnected] = React.useState(false)
    const [socket, setSocket] = React.useState<WebSocket|null>(null)
    const [error, setError] = React.useState<string>('')
    const [waitingRooms, setWaitingRooms] = React.useState<WaitingRoom[]>([])
    const [word, setWord] = React.useState("")
    const [inGameStats, setInGameStats] = React.useState<InGameStats>({score:0, validWords:[], falseWords:[]})
    
    const [gridState, setGridState] = React.useState("? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?")

    const onNewSocketMessage = (kind: string, content: Record<string, any>) => {
        console.debug("Received message from websocket", content)
        const addChatMessage = (sender: string, content: string) => {
            let message: Message = {sender: sender, timestamp: Date.now(), content: content}
            setChatState(oldState => {
                if ('messages' in oldState)
                    return {...oldState, messages: [...oldState.messages, message]}
                else return oldState
            })
        }
        const readWaitingRooms = (c: Record<string, any>) => {
            let waitingRooms = []
            for (let [name, v] of Object.entries(c['waiting_rooms'])) {
                let value = v as any
                let room: WaitingRoom = {name: name, attendeeNumber: value.attendee_number, description: value.description}
                waitingRooms.push(room)
            }
            return waitingRooms
        }

        switch(kind) {
            case 'waiting_room_list':
                setWaitingRooms(readWaitingRooms(content))
                setChatState({roomSelection: true})
                break
            
            case 'in_waiting_room':
                let name = content.waiting_room_name
                setChatState({waitingRoomName: name, startTimestamp: performance.now()})
                break

            case 'waiting_room_left':
                setChatState({roomSelection: true})
                break

            case 'waiting_room_join_refused':
                setError(`Cannot join the room: ${content.reason}`)
                break

            case 'chat_session_started':
                setChatState({startTimestamp: performance.now(), messages: [], active: true})
                addChatMessage('admin', content.welcome_message)
                break

            case 'grid_reveal':
                setGridState(content.grid)
                break

            case 'current_ingame_stats':
                setInGameStats({score : content.score, validWords:content.validWords, falseWords:content.falseWords})
                break

            case 'chat_message_received':
                addChatMessage(content.sender, content.content)
                break

            case 'attendee_left':
                addChatMessage('admin', `Attendee ${content.attendee} left the chat session.`)
                break

            case 'chat_session_left':
                setChatState(oldState => ('messages' in oldState)?{...oldState, active: false}:oldState)
                break

            case 'chat_session_ended':
                setChatState(oldState => ('messages' in oldState)?{...oldState, active: false}:oldState)
                addChatMessage('admin', "End of the chat session due to time limit.")
                addChatMessage('admin', content.exit_message)
                break

            case 'server_shutdown':
                setError('Server will shutdown now! Please reconnect later.')
                break
            
            default:
                setError(`Received non understable message: kind=${kind} content=${JSON.stringify(content)}`)
        }
    }

    const sendToSocket = React.useCallback((kind: string, body: Record<string, any>) => {
        const to_send = {kind: kind, ...body}
        const stringified = JSON.stringify(to_send)
        console.debug(`Sending message on the websocket`, to_send)
        socket?.send(stringified)
    }, [socket])

    const connectToWaitingRoom = React.useCallback((username: string, waitingRoomName: string) => {
        sendToSocket('join_waiting_room', {'token': username, 'waiting_room_name': waitingRoomName})
    }, [sendToSocket])
    const leaveWaitingRoom = React.useCallback(() => {
        sendToSocket('leave_waiting_room', {})
    }, [sendToSocket])
    const sendChatMessage = React.useCallback((content: string) => {
        sendToSocket('send_chat_message', {content: content})
    }, [sendToSocket])

    const proposeWord = React.useCallback((wordProposed:string) => {
        sendToSocket('word_proposed', {content: wordProposed})
    }, [sendToSocket])
    const leaveChatSession = React.useCallback(() => {
        sendToSocket('leave_chat_session', {})
    }, [sendToSocket])
    const closeChatSession = React.useCallback(() => {
        setChatState({roomSelection: true})
        setGridState("? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?")
    }, [])


    useEffect(() => {
        if ('connecting' in chatState) {
            setConnected(true)
        } else if ('disconnected' in chatState) {
            setConnected(false)
        }
    }, [chatState])

    // create and configure a websocket
    useEffect(() => {
        if (connected) {
            console.debug(`Opening the websocket with the URL ${props.socketUrl}`)
            const newSocket = new WebSocket(props.socketUrl)
            setSocket(newSocket)
            newSocket.addEventListener('open', (event) => {
                setChatState({roomSelection: true})
            })
            newSocket.addEventListener('message', (event) => {
                const data = event.data
                if (typeof(data) === 'string') {
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
                setChatState({disconnected: true})
                setError(`Websocket connection error: ${event}`)
            })
            newSocket.addEventListener('close', (event) => {
                console.error("WebSocket closed", event)
                setChatState({disconnected: true})
            })
            // close the socket
            return () => {
                newSocket.close()
                setWaitingRooms([])
                setSocket(null)
            }
        }
    }, [connected, props.socketUrl])

    return <div className="ChatManager">
        {error !== '' && 
            <div className="Error">Error: {error} <button onClick={() => setError('')}>OK</button></div>}
        {'disconnected' in chatState && 
            <div className="Disconnected">
                <div>Disconnected</div>
                <button onClick={() => setChatState({connecting: true})}>Connect now</button></div>}
        {'connecting' in chatState &&
            <div className="Connecting">
                <div>Connecting to server {props.socketUrl}</div>
            </div>}
        {'roomSelection' in chatState && 
            <WaitingRoomSelector rooms={waitingRooms} onChosenRoom={connectToWaitingRoom} />}
        {'waitingRoomName' in chatState &&
            <RoomWaiter roomName={chatState.waitingRoomName} startTimestamp={chatState.startTimestamp} onLeaving={leaveWaitingRoom} />}
        {'messages' in chatState && 
            <ChatSession messages={chatState.messages} active={chatState.active} onMessageWritten={sendChatMessage} onLeaving={leaveChatSession} onClosing={closeChatSession} />
        }
        <Grid grid={gridState}></Grid>

        
        <div className="WordSender">
            <input type="text" value={word} style={{flex: 1}} onChange={event => setWord(event.target.value)} />
            <button onClick={() => {proposeWord(word); setWord('')}}>Send</button>
        </div>
        <div>
            <h1>
            Score : 
            </h1>
            <p>
                {inGameStats.score}
                </p>
            <h1>
                Valides : 
            </h1>
            {inGameStats.validWords.map(function (word) {
                        return (
                            <p>
                                {word}
                            </p>)
                    })}
            <h1>
                Faux :
            </h1>
            {inGameStats.falseWords.map(function (word) {
                        return (
                            <p>
                                {word}
                            </p>)
                    })}
        </div>
        
    </div>
}