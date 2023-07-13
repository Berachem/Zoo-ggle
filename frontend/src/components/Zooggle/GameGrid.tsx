import "../../css/GameGrid.css";

function switchColor(id : string){
    document.getElementById(id)?.classList.toggle("selected")
}

export default function GameGrid(props: any) {
    var gridClass = "grid "+`${props.width}`
    var pClass = "letter "+`${props.width}`

    return(
        <div className={gridClass}>
            {
                props.grid.split(" ").map((letter : string, index : number) => {
                    return <div className={pClass} id={index.toString()} onClick={props.width == "small" ? (event: React.MouseEvent<HTMLElement>) => {} : (event: React.MouseEvent<HTMLElement>) => {switchColor(index.toString())}}>{letter}</div>
                })
            }
        </div>
        )
}