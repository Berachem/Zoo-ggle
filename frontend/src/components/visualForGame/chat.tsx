import React from "react"
import "../../css/chat.css"

//PLUS DE TIMESTAMP
export interface Message {
    sender: string
    content: string
}

//ELEMENT MODIFIE (ajout class input et bouton + enlever style flex )
export const MessageSender = (props: { onMessageWritten: (content: string) => void }) => {
    const [content, setContent] = React.useState("")
    return  <div className="MessageSender">
                <input className="InputMessage" type="text" value={content} onChange={event => setContent(event.target.value)} />
                <button className="ButtonMessage" onClick={() => { props.onMessageWritten(content); setContent('') }}>Send</button>
            </div>
}

//PAS DE MODIF
export const ChatMessagesDisplayer = (props: { messages: Message[] }) => {
    return <ol className="ChatMessagesDisplayer">
        {props.messages.map((x, i) => <li key={i}><ChatMessageDisplayer message={x} /></li>)}
    </ol>
}

//ELEMENT MODIFIE (ajout classname, balise span au lieu de div et plus de dive "message" )
export const ChatMessageDisplayer = (props: { message: Message }) => {
    //const date = React.useMemo(() => new Date(props.message.timestamp).toLocaleTimeString(), [props.message.timestamp])
    //la div Date à été viré de l'html si jamais
    return  <div className="ChatMessageDisplayer">
                <span className="Sender">{props.message.sender}</span>
                {props.message.content}
            </div>
}

//ELEMENT MODIFIE (diplay none sur boutton)
export const ChatSession = (props: { messages: Message[], active: boolean, onMessageWritten: (content: string) => void, onLeaving: () => void }) => {
    return <div className="ChatSession">
        <ChatMessagesDisplayer messages={props.messages} />
        {props.active && <MessageSender onMessageWritten={props.onMessageWritten} />}
        <div style={{display:"none"}}>
            <button onClick={() => props.onLeaving()} disabled={!props.active}>Leave the chat session</button>
        </div>
    </div>
}
