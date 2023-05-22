import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../css/ffaInfoDisplayer.css"
import { FFAPlayersInfos, PlayerInfos, WordsInfo } from "./game"
import { faUser } from "@fortawesome/free-solid-svg-icons"

interface FFAInfoDisplayerProps {
    info: FFAPlayersInfos
}

export const FFAInfoDisplayer = (props: FFAInfoDisplayerProps) => {

    return (
        <div className="ffaInfoDisplayer">
            {Object.keys(props.info).map(function (key) {
                        let playerStat = props.info[key];
                        return (
                            <>
                                <div className="User">
                                    <FontAwesomeIcon icon={faUser} color="#579A86" /> {" "}
                                    {key} : {playerStat.score} points
                                </div>
                                <div className="UserWords">
                                    {playerStat.words.map((word: WordsInfo) => (
                                        <>
                                            <div><b>{word.word} :</b> {word.score} {word.isAnimal && <span className="Animal">C'est un animal !</span>}</div>
                                        </>
                                    )
                                    )}
                                </div>
                            </>
                        )
                    }
                    )}
        </div>
    )

}