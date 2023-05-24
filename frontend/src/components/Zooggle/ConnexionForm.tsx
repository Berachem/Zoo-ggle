import "../../css/Connexion.css"
import { ToastContainer,toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import ConnexionProps from "../../pages/connexion"


async function checkAll(event : React.SyntheticEvent){
    event.preventDefault()

    let login = document.getElementById("login") as HTMLInputElement
    let psw = document.getElementById("psw") as HTMLInputElement

    if(login!=null && psw!=null){
        let formData = new FormData()
        formData.append('login',login.value)
        formData.append('psw',psw.value)

        const res = await fetch('http://localhost/backend/api/connectUser.php',{method:'POST', body:formData,credentials: 'include'}).then(res=>res.json())
        
        if(res.success == true){
            localStorage.setItem("connected","true")
            localStorage.setItem("token",res.token)
        }
        window.location.assign(res.redirect)

    
    }

}

export default function ConnexionForm(props : ConnexionProps){

    const location = useLocation()
    const params = new URLSearchParams(location.search);
    if(params.has("connected") && params.get("connected")=="false"){
        toast.error("Echec de la connexion (mauvais login/mot de passe?)", {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }

    return(
        <>
        <ToastContainer/>

        <form id="connexion" action="" method="POST" className="connecForm" onSubmit={checkAll}>
            <span className="titleTel">Connexion</span>
            <span className="connecLabel">Pseudo</span>
            <input type="text" className="connecInput" id="login" required/>
            <span className="connecLabel">Mot de passe</span>
            <input type="password" className="connecInput" id="psw" required/>
            <input type="submit" className="connecSubmit" value="se connecter"/>
            <span className="telSwitch" onClick={props.switchSide}>Appuyez ici pour s'inscrire</span>
        </form>
        </>
    )

}