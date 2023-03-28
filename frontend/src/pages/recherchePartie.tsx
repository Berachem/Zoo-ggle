import ZooggleCard from "../components/Zooggle/ZooggleCard"
import GameGrid from "../components/Zooggle/GameGrid"
import GameCard from "../components/Zooggle/GameCard"
import GameCardInfo from "../components/Zooggle/GameCardInfo"

export default function RecherchePartie() {
    return (

        <div style={{
            width:"min-content",
            margin:"auto",
            paddingTop:"10vh"
            }}>


            <ZooggleCard width="98vw">

                <GameCard>
                    <GameGrid width="small" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>
                    <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                </GameCard>
                <GameCard>
                    <GameGrid width="small" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>
                    <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                </GameCard>
                <GameCard>
                    <GameGrid width="small" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>
                    <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                </GameCard>
                <GameCard>
                    <GameGrid width="small" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>
                    <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                </GameCard>
                <GameCard>
                    <GameGrid width="small" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>
                    <GameCardInfo title="Ceci est un vrai titre oui" lang="francais" maker="Beraaaa" players="oui - non - Beraaa - Lucas123 - JoOOOOO"/>
                </GameCard>
                

            </ZooggleCard>


        </div>
       
    )

}