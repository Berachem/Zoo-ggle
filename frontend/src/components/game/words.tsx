import { Typography } from "@material-tailwind/react";
import { Direction } from "react-toastify/dist/utils";
export default function words(props: any) {

    const proposedWords = [
        "Chats", "Chat", "Ciseaux", "Bateau", "Voitures", "Porte", "Vélo", "Extreme", "Vaisseau", "Chocolat", "Orange", "Bleu", "Jungle", "Jeu", "Clavier", "Montre", "Chaise", "Rails", "Train", "Batiments",
        "Chateau", "Koala", "Perroquet", "Loup", "Lion", "Kiwi", "Poire", "Rocher", "Papier", "Haltere", "Clef", "Cloche", "Telephone", "Foret", "Balise", "Valeur", "Dictionnaire", "Livre", "Feuille"
    ];

    const validWords = [
        "Chats", "Chat", "Ciseaux", "Bateau", "Voitures", "Porte", "Vélo", "Extreme", "Vaisseau", "Chocolat", "Orange", "Bleu", "Jungle", "Jeu", "Clavier", "Montre", "Chaise", "Rails", "Train", "Batiments",
        "Chateau", "Koala", "Perroquet", "Loup", "Lion"
    ];

    const falseWords = [
        "Kiwi", "Poire", "Rocher", "Papier", "Haltere", "Clef", "Cloche", "Telephone", "Foret", "Balise", "Valeur", "Dictionnaire", "Livre", "Feuille"
    ];

    return (
        <div style={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
        }}>
            {/* <Typography variant="h4"> Mots Proposés</Typography>
            <div style={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "repeat(3,1fr)",

            }}>
                {proposedWords.map(function (word) {
                    return (
                        <p>
                            {word}
                        </p>)
                })}
            </div> */}




            <Typography variant="h4"> Mots Trouvés (X/Y)</Typography>
            <div style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",

            }}>
                {validWords.map(function (word) {
                    return (
                        <p>
                            {word}
                        </p>)
                })}

            </div>

            <Typography variant="h4"> Mots non trouvés</Typography>
            <div style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",

            }}>

                {falseWords.map(function (word) {
                    return (
                        <p>
                            {word}
                        </p>)
                })}
            </div>



        </div>

    )
}