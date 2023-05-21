import { ChatSession } from "./chat";
import React , {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const chatData = [
    {
        sender: "Lucas",
        content: "Bonjour"
    },
    {
        sender: "Berachem",
        content: "Salut tout le monde :D"
    },
    {
        sender: "Nidal",
        content: "Quoicoubebou"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablalablablablablalablablablablalablablablablalablablablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },
    {
        sender: "Nidal",
        content: "Blablablablablabla.... AHAHAHHAHAAHAH blablablablabla"
    },
    {
        sender: "Lucas",
        content: "Bla bla bla bla ! Bla bla ..."
    },

];



export const PageTest = () => {
   
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

    //oui le chat ne fait rien je reprend juste le visuel
    return (
        <>
        {(showChat) && (<ChatSession messages={chatData} active={true} onMessageWritten={()=>{}} onLeaving={()=>{}}/>)}
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