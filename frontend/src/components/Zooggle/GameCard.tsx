import "../../css/GameCard.css"

export default function GameCard(props : any){
    return(
        <div className="card">
            {props.children}
        </div>
    )
}