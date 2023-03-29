import "../../css/leftAndCenter.css"
export default function LeftAndCenter(props: any) {

    return (
        <div className="leftAndCenter">
            {props.children}
        </div>
    )
}