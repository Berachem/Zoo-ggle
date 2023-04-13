
import { Input, Button, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard"
import GameGrid from "../components/Zooggle/GameGrid";
import Chat from "../components/game/chat";
import Words from "../components/game/words";
import GameColumn from "../components/game/gameColumn";
import GameSection from "../components/game/gameSection";
import LeftAndCenter from "../components/game/leftAndCenter";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
export default function Game() {

    const [showChat, setShowChat] = useState(false);
    const [showChatButton, setShowChatButton] = useState(true);

    const toggleChat = () => {
        setShowChat(!showChat);
    };





    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 900) {
                setShowChatButton(false);
                setShowChat(true);
            } else {
                setShowChatButton(true);
                setShowChat(false);
            }
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)

        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('load', handleResize);
    })

    return (
        <>

            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "100vh",
                        overflow: "hidden",
                    }}>
                    <GameSection>
                        <LeftAndCenter>
                            <GameColumn type="side">
                                <ZooggleCard width="100%" minHeight="45%">
                                    <Words>
                                    </Words>
                                </ZooggleCard>
                                <Typography variant="h4"> Score : 800 </Typography>
                                <ZooggleCard width="100%" minHeight="45%">
                                    <Typography variant="h4"> 2nd example window </Typography>
                                </ZooggleCard>
                            </GameColumn>

                            <GameColumn type="main">
                                <ZooggleCard width="100%">
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Typography variant="h4"> Partie de Berachem </Typography>
                                        <GameGrid width="big" grid="A A A A A A A A A A A A A A A A" />
                                        <Typography variant="h4"> 3:20 </Typography>
                                    </div>
                                </ZooggleCard>

                                <ZooggleCard width="80%">
                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "nowrap",
                                        justifyContent: "center"
                                    }}>

                                        <div className="relative  flex w-full max-w-[24rem]">
                                            <Input
                                                type="text"
                                                label="Message"
                                                color="light-green"
                                            />
                                            <Button
                                                size="sm"
                                                color={"green"}
                                                className="!absolute right-1 top-1 rounded"
                                            >
                                                Envoyer
                                            </Button>
                                        </div>
                                    </div>
                                </ZooggleCard>
                            </GameColumn>
                        </LeftAndCenter>

                        {showChat && (
                            <GameColumn type="chat">
                                <ZooggleCard width="100%" padding="0rem" minHeight="70%">
                                    <Chat>
                                    </Chat>
                                </ZooggleCard>
                            </GameColumn>
                        )}



                    </GameSection>

                    {showChatButton && (<div className="fixed bottom-5 left-5 z-50">
                        <button
                            className="flex items-center justify-center bg-red-700 text-white rounded-full w-16 h-16"
                            onClick={toggleChat}
                        >
                            <FontAwesomeIcon icon={faMessage} size='2x' className='text-white' />
                        </button>
                    </div>)}

                </div>
            </div>



        </>

    )
};
