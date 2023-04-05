export default function Connexion(){

    return(
        <form action="" method="POST" style={{border:"1px black solid"}}>
            <span>Pseudo</span><br />
            <input type="text" placeholder="votre pseudo"/><br />
            <span>Mot de passe</span><br />
            <input type="text" placeholder="votre mot de passe"/><br />
            <input type="submit"/>
        </form>
    )

}