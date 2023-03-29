import "../../css/GameSection.css"
export default function GameSection(props: any) {

    return (
        <div className="gameSection">
            {props.children}
        </div>
    )
}