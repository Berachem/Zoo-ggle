import React , {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import "../../css/chat.css";

interface ChatBlockProps{
    messages: Message[], 
    onMessageWritten: (content: string) => void
}
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
                <button className="ButtonMessage" onClick={() => { props.onMessageWritten(content); setContent('') }}>Envoyer</button>
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

//ELEMENT MODIFIE (diplay none sur boutton + voile pour le mode tel)
export const ChatSession = (props: { messages: Message[], onMessageWritten: (content: string) => void}) => {
    return <><div className="ChatSession">
        <ChatMessagesDisplayer messages={props.messages} />
        <MessageSender onMessageWritten={props.onMessageWritten}/>
        
    </div>
    <div className="CacheFond"></div>
    </>
}

export const ChatBlock = (props:ChatBlockProps) => {
    //==pour le bouton en mode telephone==
    const [showChat, setShowChat] = useState(true);
    const [showChatButton, setShowChatButton] = useState(false);
    const toggleChat = () => {
        setShowChat(!showChat);
    };
    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1100) {
                setShowChatButton(false);
                setShowChat(true);
            } else {
                if (!showChatButton) {
                    setShowChat(false);
                }
                setShowChatButton(true);
            }
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('load', handleResize);
    })
    //====================================

    return (
        <>

            {(showChat) && (<ChatSession messages={props.messages} onMessageWritten={props.onMessageWritten}/>)}
            {showChatButton && 
                (
                    <div className="fixed bottom-5 left-5 z-50">
                        <button className="flex items-center justify-center bg-orange-700 text-white rounded-full w-12 h-12" onClick={toggleChat}>
                            <FontAwesomeIcon icon={faMessage} size='1x' className='text-white' />
                        </button>
                    </div>
                )
            }
        </>
    );
}