import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameCard from "../components/Zooggle/GameCard";
import GameCardInfo from "../components/Zooggle/GameCardInfo";
import Title from "../components/Zooggle/Title";
import { Input, Button, Typography} from "@material-tailwind/react";
import GameForm from "../components/Zooggle/GameForm";
import Pingouin from "../assets/images/PenguinFamilly.png"
import {useRef} from "react";


function popForm(id : string){
    document.getElementById(id)?.classList.toggle("displayForm")
}

async function getGames(search : string){
    const formData = new FormData();

    const res = await fetch('https://zoo-ggle.berachem.dev/V2/api/searchGame.php?q='+search, {
        method: 'POST',
        body: formData
    }).then(res => res.json());

    if (res.success) {
        return res.result;
    } else {
        return "problème de connexion"
    }
}




export default function Jouer() {
    const SEARCH_GAME_API = "https://zoo-ggle.berachem.dev/V2/api/searchGame.php?q="; // TODO : Joshua, finir
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

    const recherche = useRef(null)
    async function generateCard(){
        if(recherche.current !== null){
            const search = recherche.current.value
            let result = await getGames(search)

            let container = document.getElementById("result")
            if (container !==null){
                if(result === "problème de connexion"){
                    container.innerHTML='<Typography variant="h5">Problème de connexion</Typography>'
                }else{
                    container.innerHTML= result.map((game : Record<string,any>, index : number) => (
                        <GameCard key={index}>
                            <GameCardInfo
                                title={game.NomPartie}
                                lang={game.LangueDico}
                                //maker={game.maker}
                            />
                        </GameCard>))
                }
                
            }
        }
    } 
    

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
                    <Button size="lg" color="orange" onClick={(event: React.MouseEvent<HTMLElement>) => {popForm("GameForm")}}>Creer une partie</Button>
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
                            <div id="result">
                                <img src={Pingouin} style={{width:"calc(80vh - 2.5rem)",objectFit:"contain",margin:"auto"}}/>
                            </div>
                        </div>
                    </ZooggleCard>

                    <ZooggleCard width="">
                        <Title variant="h4">Parties Récentes</Title>
                        <div style={{display:"flex",
                                     flexDirection:"column",
                                     height:"80vh",
                                     overflowY:"scroll"
                        }}>
                            {recentsGameData.map((game, index) => (
                                <GameCard key={index}>
                                    <GameCardInfo
                                        title={game.title}
                                        lang={game.lang}
                                        maker={game.maker}
                                        players={game.players}
                                    />
                                </GameCard>
                            ))}
                        </div>
                    </ZooggleCard>
                </div>
            </div>
            
        </>
        
       
    )

}