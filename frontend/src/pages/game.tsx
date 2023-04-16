
import { Input, Button, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard"
import GameGrid from "../components/Zooggle/GameGrid";
import Chat from "../components/game/chat";
import Words from "../components/game/words";
import GameColumn from "../components/game/gameColumn";
import GameSection from "../components/game/gameSection";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
export default function Game() {

    const [inGame, setInGame] = useState(true);
    const [inWaitingRoom, setInWaitingRoom] = useState(false);
    const [inHistory, setInHistory] = useState(false);
    const [showChat, setShowChat] = useState(true);
    const [showChatButton, setShowChatButton] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    const joinWaitingRoom = () => {
        setInWaitingRoom(true);
        setInGame(false);
        setInHistory(false);
    };

    const joinGame = () => {
        setInWaitingRoom(false);
        setInGame(true);
        setInHistory(false);
    };

    const joinHistory = () => {
        setInWaitingRoom(false);
        setInGame(false);
        setInHistory(true);
    };

    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 900) {
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

    return (
        <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100%",
                        overflow: "hidden",
                    }}>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            top: "0",
                            left: "0",
                        }}>
                        <Button size="sm" color="blue" className="rounded" disabled={inWaitingRoom} onClick={(event: React.MouseEvent<HTMLElement>) => { joinWaitingRoom() }}>
                            Waiting Room
                        </Button>
                        <Button size="sm" color="green" className="rounded" disabled={inGame} onClick={(event: React.MouseEvent<HTMLElement>) => { joinGame() }}>
                            Game
                        </Button>
                        <Button size="sm" color="red" className="rounded" disabled={inHistory} onClick={(event: React.MouseEvent<HTMLElement>) => { joinHistory() }}>
                            Historique
                        </Button>
                    </div>
                    <GameSection>
                        <GameColumn type="side">
                            <ZooggleCard width="100%" minHeight="45%">
                                {(inHistory || inGame) &&
                                    (<Words inGame={inGame} inHistory={inHistory}>
                                    </Words>)
                                }

                                {(inWaitingRoom) &&
                                    (<Typography variant="h4"> 1st example window </Typography>)
                                }
                            </ZooggleCard>

                            <Typography variant="h4"> Score : 800 </Typography>

                            <ZooggleCard width="100%" marginBottom="0">
                                {(inHistory || inWaitingRoom) &&
                                    (
                                        <Typography variant="h4"> 2nd example window </Typography>
                                    )}
                                {(inGame) &&
                                    (
                                        <>
                                            <Typography variant="h4"> Aide :</Typography>
                                            <Typography > Il semblerait qu'il y ai le mot "bouteille" dans cette grille</Typography>
                                        </>

                                    )}
                            </ZooggleCard>
                        </GameColumn>

                        <GameColumn type="main">
                            <ZooggleCard width="100%" minHeight="70%">
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Typography variant="h4"> Partie de Berachem </Typography>
                                    {(inGame || inHistory) && (<GameGrid width="big" grid="A A A A A A A A A A A A A A A A" />)}
                                    {inWaitingRoom && (<GameGrid width="big" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?" />)}
                                    <Typography variant="h4"> 3:20 </Typography>
                                </div>
                            </ZooggleCard>

                            <ZooggleCard width="80%">
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>

                                    <div className="relative  flex w-full max-w-[24rem]" style={{ margin: "auto", backgroundColor: "#FFFFFF", borderRadius: "0.5rem" }}>
                                        <Input type="text" label="Mot" color={"green"} disabled={!inGame} />
                                        <Button size="sm" color={!inGame ? "gray" : "green"} className="!absolute right-1 top-1 rounded" disabled={!inGame}>
                                            Proposer
                                        </Button>
                                    </div>
                                    {inWaitingRoom && (<Typography>En attente du chef de partie ...</Typography>)}
                                    {inHistory && (<Typography>Bien joué à vous !</Typography>)}

                                </div>
                            </ZooggleCard>
                        </GameColumn>

                        {showChat && (
                            <GameColumn type="chat">
                                <ZooggleCard width="100%" padding="0rem" minHeight="100%">
                                    <Chat activated={inGame || inWaitingRoom}>
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



        </>

    )
};
