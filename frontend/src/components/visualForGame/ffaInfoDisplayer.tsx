import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../css/ffaInfoDisplayer.css"
import { faUser } from "@fortawesome/free-solid-svg-icons"

interface WordsInfo { word: string, score: number, isAnimal: boolean }

interface UserInfo { player: string, words: WordsInfo[], score:number}

interface FFAInfoDisplayerProps{
    info : UserInfo[]
}

export const FFAInfoDisplayer = (props : FFAInfoDisplayerProps) =>{

    return(
        <div className="ffaInfoDisplayer">
            {props.info.map(user => (
                <>
                <div className="User">
                    <FontAwesomeIcon icon={faUser} color="#579A86" /> {" "}
                    {user.player} : {user.score} points</div>
                <div className="UserWords">
                  {user.words.map((word : WordsInfo)=>(
                        <>
                            <div><b>{word.word} :</b> {word.score} {word.isAnimal && <span className="Animal">C'est un animal !</span>}</div>
                        </> 
                       )
                   )}
                </div>
                </>
            ))}
        </div>
    )

}