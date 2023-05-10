import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameCard from "../components/Zooggle/GameCard";
import GameCardInfo from "../components/Zooggle/GameCardInfo";
import Title from "../components/Zooggle/Title";
import { Input, Button, Typography} from "@material-tailwind/react";
import GameForm from "../components/Zooggle/GameForm";
import {useEffect, useRef, useState} from "react";
import CardList from "../components/Zooggle/CardList";


async function getGames(search : string){
    const formData = new FormData();

    const res = await fetch('http://localhost/backend/api/searchGame.php?q='+search, {
        method: 'POST',
        body: formData
    }).then(res => res.json());

    if (res.success) {
        return JSON.stringify(res.result);
    } else {
        return "problème de connexion"
    }
}




export default function Jouer() {
    const SEARCH_GAME_API = "http://localhost/backendapi/searchGame.php?q="; // TODO : Joshua, finir
    const recentsGameData = [
        {
          title: "Test",
          lang: "francais",
          maker: "Beraaaa",
          players: "oui - non - Beraaa - Lucas123 - JoOOOOO",
        },
        {
          title: "Ceci est un vrai titre oui",
          lang: "francais",
          maker: "Beraaaa",
          players: "oui - non - Beraaa - Lucas123 - JoOOOOO",
        },
        {
          title: "Ceci est un vrai titre oui",
          lang: "francais",
          maker: "Beraaaa",
          players: "oui - non - Beraaa - Lucas123 - JoOOOOO",
        },
        {
          title: "Ceci est un vrai titre oui",
          lang: "francais",
          maker: "Beraaaa",
          players: "oui - non - Beraaa - Lucas123 - JoOOOOO",
        },
        {
          title: "Ceci est un vrai titre oui",
          lang: "francais",
          maker: "Beraaaa",
          players: "oui - non - Beraaa - Lucas123 - JoOOOOO",
        }
      ];
    
    const [cards,setcards] = useState<string | null>(null)    //pour le changer le paramètre de la liste de carte
    const recherche = useRef<HTMLInputElement>(null)          //pour récupérer le contenu de l'input tailwind
    async function generateCard(){                            //appelle l'API et change le contenu de la liste de carte
        if(recherche.current !== null){
            const search = recherche.current.value
            let result = await getGames(search)
            setcards(result)
            }
    }

    const [recentGame,setRecentGame] = useState<string | null>(null) 
    useEffect( () => {                                               //useEffect permet d'attendre une fonction asynchrone avant de changer un etat
        const getRecentGame = async () =>{
            const res = await fetch('http://localhost/backend/api/getRecentGame.php').then(res => res.json())
            if (res.success) {
                setRecentGame(JSON.stringify(res.result))
            } else {
                setRecentGame("problème de connexion")
            }
        };
        getRecentGame();
    })
    
    

    return (
        <>
            <GameForm id="GameForm"/>
            <div style={{
                width:"min-content",
                margin:"auto",
                paddingTop:"10vh",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                }}>
                
                <ZooggleCard width="50vw">
                    <Button size="lg" color="orange" onClick={(event: React.MouseEvent<HTMLElement>) => {generateCard()}}>Creer une partie</Button>
                </ZooggleCard>

                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    flexWrap:"wrap",
                    width:"98vw",
                    justifyContent:"space-evenly"
                }}>
                    <ZooggleCard>
                        <Title variant="h4">Rechercher une partie</Title>
                        <div style={{display:"flex",
                                     flexDirection:"column",
                                     height:"80vh",
                                     overflowY:"scroll"
                                    }}>
                            <div className="relative  flex w-full max-w-[24rem]" style={{margin:"auto",backgroundColor:"#FFFFFF",borderRadius:"0.5rem"}}>
                                <Input type="text" label="Recherche" color="gray" inputRef={recherche}/>
                                <Button size="sm" color="orange" className="!absolute right-1 top-1 rounded" onClick={(event: React.MouseEvent<HTMLElement>) => {generateCard()}}>
                                    Envoyer
                                </Button>
                            </div>
                            <CardList object={cards}/>
                        </div>
                    </ZooggleCard>

                    <ZooggleCard width="">
                        <Title variant="h4">Parties Récentes</Title>
                        <div style={{display:"flex",
                                     flexDirection:"column",
                                     height:"80vh",
                                     overflowY:"scroll"
                                    }}>
                            <CardList object={recentGame}/>
                        </div>
                    </ZooggleCard>
                </div>
            </div>
            
        </>
        
       
    )

}