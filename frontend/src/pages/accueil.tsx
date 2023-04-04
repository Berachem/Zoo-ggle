
import { Button, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameGrid from "../components/Zooggle/GameGrid";
import  Title from "../components/Zooggle/Title";
//import Forest from "../assets/video/Forest.mp4"

export default function Jouer() {
    
    
    
    return (
        /*
        ----si un jour on trouve une video d'assez bonne qualité----
        <video autoPlay muted loop id="myVideo" style={{
            position: "fixed",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%",
            zIndex: "-1",
            objectFit: "cover"
        }}>
         <source src={Forest} type="video/mp4"/>
        </video>*/
        <>
            
            <div>
                <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    minHeight: "100vh",
                    margin: "auto",
                    
                }}>
                    <main className="flex flex-col items-center justify-center w-full flex-1  text-center text-gray-50">
                        <img src={Logo}/>
                        <a href="#regles"><Button variant="filled" color="white" className="m-2">Règles</Button></a>
                    </main>
                </div>

                <div id="regles" style={{
                    display: "flex",
                    flexDirection:"row",
                    flexWrap:"wrap",
                    margin:"auto",
                    padding:"2vh",
                    justifyContent:"space-evenly"
                }}>
                    <ZooggleCard width="50vw">
                        <Title variant="h4">Les règles du Boggle</Title>
                        <Typography>
                                Dans une limite de temps de 3 minutes, vous devez trouver un maximum de mots en formant des chaînes de  lettres contiguës. Plus le mot est long, plus les points qu'il vous rapporte sont importants.<br/><br/>
                                Vous pouvez passer d'une lettre à la suivante située directement à gauche, à droite, en haut, en bas, ou sur l'une des quatre cases diagonales.<br/><br/>
                                Regardez l'exemple de grille à coté:
                        </Typography>
                    </ZooggleCard>  
                    <ZooggleCard width="">
                        <GameGrid width="big" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>     
                    </ZooggleCard>
                </div>
            </div>

                
            
        </>
        
    )
};
