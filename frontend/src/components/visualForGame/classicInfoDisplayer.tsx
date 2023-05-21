import { divide } from "lodash"
import "../../css/classicInfoDisplayer.css"

interface WordsInfo { word: string, score: number, isAnimal: boolean }

interface ClassicInfoDisplayerProps{
    words : WordsInfo[]
    score : number
}


export const ClassicInfoDisplayer = (props : ClassicInfoDisplayerProps)=>{

    return (
        <div className="DisplayerContainer">
            <div className="Infos">Mots Trouvés :</div>
            <div className="Words">
                {
                    props.words.map((word : WordsInfo)=>(
                             <>
                                <div><b>{word.word} :</b> {word.score} {word.isAnimal && <span className="Animal">C'est un animal !</span>}</div><br/>
                             </> 
                        )
                    )
                }
            </div>
            <div className="Infos">Score : {props.score} </div>
        </div>
    )

}