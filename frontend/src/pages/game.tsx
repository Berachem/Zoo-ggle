
import { Input, Button, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard"
import GameGrid from "../components/Zooggle/GameGrid";
import Chat from "../components/game/chat";
import GameColumn from "../components/game/gameColumn";
import GameSection from "../components/game/gameSection";
import LeftAndCenter from "../components/game/leftAndCenter";
export default function Game() {

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
                                    <Typography variant="h4"> 1st example window </Typography>
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

                                <ZooggleCard width="100%">
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


                        <GameColumn type="side">
                            <ZooggleCard width="100%" padding="0rem" minHeight="70%">
                                <Chat>
                                </Chat>
                            </ZooggleCard>
                        </GameColumn>



                    </GameSection>
                </div>
            </div>



        </>

    )
};
