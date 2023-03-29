import "../../css/GameColumn.css"
export default function GameColumn(props: any) {
    var typeClass = "gameColumn "+`${props.type}`

    return (
        <div className={typeClass}>
            {props.children}
        </div>
    )
}