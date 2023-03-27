import "../../css/GameGrid.css";

export default function GameGrid(props: any) {
    var gridClass = "grid "+`${props.width}`
    var pClass = "letter "+`${props.width}`

    return(
        <div className={gridClass}>
            {props.grid.split(" ").map(function(item: string){
                return(
                    <p className={pClass}>
                        {item}
                    </p>)
                })}
        </div>
        )
}