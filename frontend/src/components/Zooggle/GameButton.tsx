import "../../css/GameButton.css"

export default function GameButton(props : any){
    return(
        <a href="lien vers la partie" className="button">{props.children}</a>
    )
}