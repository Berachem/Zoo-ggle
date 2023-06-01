import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faMessage } from '@fortawesome/free-solid-svg-icons';
import "../../css/statistics.css"

export interface LeaderBoard {
    [pseudo: string]: number
}

export interface StatisticsContent {
    foundableWords:number
    proposedWords:number
    foundedWords:number
    completion:number
    lang:string
    numberPlayer:number
    gameMode:string
}

interface StatisticsProps {
    leaderBoard: LeaderBoard
    stats: StatisticsContent
}

export const Statistics = (props: StatisticsProps) => {
    //==pour le bouton en mode telephone==
    const [showStats, setShowStats] = useState(true);
    const [showStatsButton, setShowStatsButton] = useState(false);
    const toggleChat = () => {
        setShowStats(!showStats);
    };
    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1100) {
                setShowStatsButton(false);
                setShowStats(true);
            } else {
                if (!showStatsButton) {
                    setShowStats(false);
                }
                setShowStatsButton(true);
            }
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('load', handleResize);
    })
    //====================================

    var place = 0;
    return (
        <>

            {(showStats) && (
                <>
                    <div className="StatsSession">
                        <div className="StatsTitle">Classements :</div>
                        <div className="StatsInfos">
                            {
                                Object.keys(props.leaderBoard).map(function (key) {
                                    place += 1
                                    return (
                                        <>
                                            <p>{place==1?"1er":place+"ème"} : <i>{key}</i> avec {props.leaderBoard[key]} pts</p>
                                        </>
                                    )
                                }
                                )}
                        </div>
                        <div className="StatsTitle">Statistiques :</div>
                        <div className="StatsInfos">
                            <p>Mots trouvables : {props.stats.foundableWords}</p>
                            <p>Mots proposés : {props.stats.proposedWords}</p>
                            <p> Mots trouvés : {props.stats.foundedWords}</p>
                            <p>Complétion : {props.stats.completion}% </p>
                        </div>



                        <div className="StatsTitle">Informations :</div>
                        <div className="StatsInfos">
                            <p>Langue : {props.stats.lang}</p>
                            <p>Nombre de joueurs : {props.stats.numberPlayer}</p>
                            <p>Mode de jeu : {props.stats.gameMode}</p>
                        </div>

                    </div>
                    <div className="CacheFond"></div>
                </>
            )}
            {showStatsButton &&
                (
                    <div className="fixed bottom-5 left-5 z-50">
                        <button className="flex items-center justify-center bg-orange-700 text-white rounded-full w-12 h-12" onClick={toggleChat}>
                            <FontAwesomeIcon icon={faChartSimple} size='1x' className='text-white' />
                        </button>
                    </div>
                )
            }
        </>
    );
}