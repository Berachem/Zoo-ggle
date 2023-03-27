
import { Button, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard"
import GameGrid from "../components/Zooggle/GameGrid";
import Chat from "../components/game/chat";
export default function Game() {

    return (
        <>

            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        margin: "auto",

                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100vw",
                            margin: "auto",

                        }}>
                        <ZooggleCard width="20vw">

                        </ZooggleCard>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                minHeight: "60vh",
                                margin: "auto",

                            }}>

                            <ZooggleCard width="55vw">
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent:"center",
                                    alignItems:"center"
                                }}>
                                    <Typography variant="h4"> Partie de Berachem </Typography>
                                    <GameGrid width="big" grid="A A A A A A A A A A A A A A A A" />
                                    <Typography variant="h4"> 3:20 </Typography>
                                </div>
                            </ZooggleCard>

                            <ZooggleCard width="55vw">
                            </ZooggleCard>
                        </div>

                        <ZooggleCard width="20vw">
                            <Chat>

                            </Chat>
                        </ZooggleCard>

                    </div>
                </div>
            </div>



        </>

    )
};
