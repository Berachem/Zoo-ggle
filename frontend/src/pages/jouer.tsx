import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameCard from "../components/Zooggle/GameCard";
import GameCardInfo from "../components/Zooggle/GameCardInfo";
import Title from "../components/Zooggle/Title";
import { Input, Button} from "@material-tailwind/react";

export default function Jouer() {
    return (

        <div style={{
            width:"min-content",
            margin:"auto",
            paddingTop:"10vh",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            }}>
            
            <ZooggleCard width="30vw">
                <Button size="lg" color="orange">Creer une partie</Button>
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
                    <div className="relative  flex w-full max-w-[24rem]" style={{margin:"auto",backgroundColor:"#FFFFFF",borderRadius:"0.5rem"}}>
                        <Input type="text" label="Recherche" color="gray"/>
                        <Button size="sm" color="orange" className="!absolute right-1 top-1 rounded">
                            Envoyer
                        </Button>
                    </div>
                </ZooggleCard>

                <ZooggleCard width="">
                    <Title variant="h4">Partie Récentes</Title>
                    <GameCard>
                        <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                    </GameCard>
                    <GameCard>
                        <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                    </GameCard>
                    <GameCard>
                        <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                    </GameCard>
                    <GameCard>
                        <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                    </GameCard>
                    <GameCard>
                        <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                    </GameCard>
                </ZooggleCard>
            </div>


        </div>
       
    )

}