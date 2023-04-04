import "../../css/GameForm.css"
import Title from "./Title";
import { Button } from "@material-tailwind/react";

function popForm(id : string){
    document.getElementById(id)?.classList.toggle("displayForm")
}

export default function GameForm(props : any){
    return(
        <form className="gameForm displayForm" action="" method="POST" id={props.id}>
            <Title variant="h3">Créez votre partie</Title>
            <Button size="sm" color="red" className="!absolute right-1 top-1 rounded" onClick={(event: React.MouseEvent<HTMLElement>) => {popForm(props.id)}}>Fermer</Button>

            <span className="formInfo">Nom de la Partie</span>
            <input type="text" placeholder="le nom ici" className="inputText" required/>

            <span className="formInfo">Nombre de Joueurs</span>
            <input type="text" placeholder="le nombre ici" className="inputText" required/>

            <span className="formInfo">Dictionnaire</span>
            <select name="" id="" className="inputText">
                <option value="fr">Francais</option>
                <option value="en">Anglais</option>
            </select>
            <Button size="lg" color="orange" className="rounded" formAction="submit"><input type="submit"/></Button>
            <span className="rule">champs obligatoires</span>
        </form>
    )
}