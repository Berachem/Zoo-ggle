import "../../css/TestGrid.css";

export interface TestGridInterface {
    size: number
    content: string
    width?: string
    height?: string
    getLetter : (letter : string) => void
}



export const TestGrid = (props: TestGridInterface) => {

    function switchColor(id : string){
        const letter = document.getElementById("case"+id)
        if(letter!=null){
            letter.classList.toggle("selected")
            if(letter.classList.contains("selected")){
                console.log("APPELE AVEC "+letter.innerHTML)
                props.getLetter(letter.innerHTML)
            }   
        }     
    }

    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            maxHeight:props.height||"",
            maxWidth:props.width||"",
            aspectRatio:"1",
            flexGrow:"1",
        }}>

            <div className="testGrid" style={{
                gridTemplateColumns: "repeat(" + props.size + ",1fr)",
            }}>

                {
                    props.content.split(" ").map((letter: string, index: number) => {
                        return <div onClick={(event: React.MouseEvent<HTMLElement>) => {switchColor(index.toString())}} className="testLetterCase" id={"case"+index.toString()} style={{
                            fontSize:8/props.size+"rem"
                        }}>
                            {letter}
                        </div>
                    })
                }
            </div>

        </div>

    )
}


// export default function GameGrid(props: any) {
//     var gridClass = "grid " + `${props.width}`
//     var pClass = "letter " + `${props.width}`

//     return (
//         <div className={gridClass}>
//             {
//                 props.grid.split(" ").map((letter: string, index: number) => {
//                     return <div className={pClass} id={index.toString()} onClick={props.width == "small" ? (event: React.MouseEvent<HTMLElement>) => { } : (event: React.MouseEvent<HTMLElement>) => { switchColor(index.toString()) }}>{letter}</div>
//                 })
//             }
//         </div>
//     )
// }