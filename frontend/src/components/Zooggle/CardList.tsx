import RealisteBackGround from "../../assets/images/backgrounds/realiste.jpg";
import IdealisteBackGround from "../../assets/images/backgrounds/idealiste.png";
import Pingouin from "../../assets/images/PenguinFamilly.png"
import GameCard from "./GameCard";
import GameCardInfo from "./GameCardInfo";

export default function CardList(props : any){

    function popForm(object : string | null){
        console.log(object)
        if(object == null){
            return <img src={Pingouin}/>
        }else if(object == "problème de connexion"){
            return <span>Problème de connexion</span>
        }else{
            let card = JSON.parse(object)
            return card.map((game : Record<string,any>, index : number) => (
                                <GameCard key={index}>
                                    <GameCardInfo
                                        title={game.NomPartie}
                                        lang={game.LangueDico}
                                        //maker={game.maker}
                                    />
                                </GameCard>
                            ))
        }
    }


    return(
        <div style={{width:"calc(80vh - 2.5rem)",margin:"auto",objectFit:"contain"}}>{popForm(props.object)}</div>
    )
}