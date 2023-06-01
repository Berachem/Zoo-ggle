// return profile page
//

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icone victoire, joué, défaite, mots trouvés, mot le plus long, moyenne de mots par partie
import {
  faTrophy,
  faGamepad,
  faCalendar,
  faBook,
  faThumbsDown,
  faExclamationTriangle,
  faCrown,
  faUserLock,
  faUnlock,
  faSadTear,
  faCloud,
  faLink,
  faEdit,
  faCross,
  faCrosshairs,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { BounceLoader } from "react-spinners";
import Title from "../components/Zooggle/Title";
import GameGrid from "../components/Zooggle/GameGrid";
import GameCard from "../components/Zooggle/GameCard";
import GameCardInfo from "../components/Zooggle/GameCardInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/profile.css";

//fonction pour la modification du profil
var globalresult = false

function checkPseudo(){
  console.log("APPELE")
  let pseudo = document.getElementById("Inscriptionlogin") as HTMLInputElement;
  let error = document.getElementById("error");
  console.log("ELEMENT RECUP")
  if(pseudo!=null && error!=null){
      error.innerHTML = "";
      if(pseudo.value.trim() == ""){
          error.innerHTML = "Un pseudo est requis";
          error.style.color = 'red';
          error.style.fontSize = "small"
          return  false;
      }
      callBDDPseudo(pseudo.value);
      return true;
  }
  
}

async function callBDDPseudo(login : string){
  const res = await fetch('http://localhost/backend/api/checkPseudo.php?login='+login).then(res => res.json())

  if(res.retour!="ok"){
      let error = document.getElementById("error")
      if(error!=null){
          error.innerHTML = "pseudo déjà pris."
          error.style.color = 'red'
          error.style.fontSize = "small"
          globalresult = true
      }     
  }else{
      globalresult = false
  }
}

async function checkAll(event : React.SyntheticEvent){
  event.preventDefault()

  //pour que les 4 messages s'affichent d'un coup et non pas en 4 submit
  
  let pseudo = checkPseudo();
  if( pseudo && !globalresult){
      let pseudo = document.getElementById("Inscriptionlogin") as HTMLInputElement;
      let description = document.getElementById("descInscription") as HTMLInputElement;
      let pub = document.getElementById("public") as HTMLInputElement
      let pvalue=0
      if(pub.checked){
          pvalue=1
      }

      let formData = new FormData()
      formData.append('login',pseudo.value)
      formData.append('desc',description.value)
      formData.append('public',pvalue.toString())

      const res = await fetch('http://localhost/backend/api/modifUser.php',{method:'POST', body:formData,credentials: 'include'}).then(res=>res.json())
      switchForm()
      if(res.success){
        window.location.reload()
      }else{
        toast.warning("Erreur lors de la modification", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
  }
}

function switchForm(){
  document.getElementById("modifForm")?.classList.toggle("hidden")
}

//fonction pour la récupération des statistiques
async function getId() {
  const res = await fetch("http://localhost/backend/api/isConnected.php", {
    credentials: "include",
  }).then((res) => res.json());

  if (res.success) {
    return res.user;
  } else {
    return -1;
  }
}

//pages profile en elle même
const Profile = () => {
    // ============= All the states================
    const [ownProfile, setOwnProfile] = useState(false);
    const [userFound, setUserFound] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [pseudoSearch, setPseudoSearch] = useState("");
    const [profileId, setProfileId] = useState<undefined|number>(undefined);

  let { id } = useParams();

  const PROFILE_DATA_BASE_URL = // http://localhost/backend/api/
    "http://localhost/backend/api/player/getUserInfos.php?profileId=";  // https://zoo-ggle.berachem.dev/V2/api/
  const [profileData, setProfileData] = useState({
    pseudo: "",
    description: "",
    gamesWon: 0,
    gamesPlayed: 0,
    gamesLost: 0,
    wordsFound: 0,
    longestWord: "",
    averageWordsPerGame: 0,
    isPublic: false,
    inscriptionDate: "",
    lastConnectionDate: "",
    games: [],
  });




  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      // /:id use params to get the id of the user

      if (id === undefined) {
        const idUser = await getId();

        if (idUser === -1) {
          setUserFound(false);
          setIsFetching(false);
          return;
        }
        setOwnProfile(true);
        id = idUser;
        setProfileId(idUser)
      }else{
        setProfileId(parseInt(id))
      }

      const response = await fetch(PROFILE_DATA_BASE_URL + id);
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        setUserFound(false);
        setIsFetching(false);
        return;
      }
      const userProfileData = {
        pseudo: data.profileInfos[0].Pseudo,
        description: data.profileInfos[0].Description,
        gamesWon: parseInt(data.profileInfos[0].gamesWon),
        gamesPlayed: parseInt(data.profileInfos[0].gamesPlayed),
        gamesLost: parseInt(data.profileInfos[0].gamesLost),
        wordsFound: isNaN(parseInt(data.profileInfos[0].wordsFound))
          ? 0
          : parseInt(data.profileInfos[0].wordsFound),
        longestWord: "",
        averageWordsPerGame: 0,
        isPublic: parseInt(data.profileInfos[0].ProfilPublic) === 1,
        inscriptionDate: new Date(
          data.profileInfos[0].DateCreationCompte
        ).toLocaleDateString(),
        lastConnectionDate: new Date(
          data.profileInfos[0].DateDerniereConnexion
        ).toLocaleDateString(),
        email: data.profileInfos[0].Mail,
        games: data.allGamesDetails.map((game: any) => {
          return {
            id: game.IdPartie,
            name: game.NomPartie,
            score: game.Score,
            lang: game.LangueDico,
            grid: game.Grille,
            startDate: new Date(game.DateDebutPartie).toLocaleDateString(),
            endDate: new Date(game.DateFinPartie).toLocaleDateString(),
            size: game.TailleGrille,
            mode: game.Mode,
            isPublic: game.EstPublic,
            maxPlayers: game.NombreJoueursMax,
            leaderboard: game.leaderboard.map((player: any) => {
              return {
                pseudo: player.Pseudo,
                score: player.Score,
                id: player.IdJoueur,
              };
            }),
            numberWordsFound: game.validWordsNumber,
            numberWordsProposed: game.wordProposedNumber,
            // round
            percentageWordsFound: Math.round(game.validWordPercentage),
          };
        }),
      };
      setProfileData(userProfileData);

      setIsFetching(false);
    };
    fetchData();
  }, [id]);

  const handleClickSearchProfile = () => {
    // fonction qui permet de rechercher un profil (redirection vers la page de recherche de profil de l'utilisateur)
    // profile/:pseudo
    // redirect to /profile/:pseudo
    alert("Recherche du profil de " + pseudoSearch);
  };

  if (isFetching) {
    // bouncing loader
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color={"#E6EBF1"} loading={isFetching} size={150} />
      </div>
    );
  }

  if (!userFound) {
    // tailwind "utilisateur non trouvé" with a button to go back to the home page and icon in the middle of the screen in red
    // avec un bouton pour revenir à la page d'accueil et une icone au milieu de l'écran en rouge
    // centré verticalement et horizontalement sur une div bg-white bg-opacity-80 rounded-xl p-8
    return (
      <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
        <div
          className="bg-white bg-opacity-95 rounded-xl p-8 "
          style={{ width: "70%", marginTop: "50px" }}
        >
          <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
            <div className="text-center md:text-left">
              <div className="font-bold text-3xl mb-2">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  size="2x"
                  color="orange"
                />
                Utilisateur non trouvé
              </div>
              <div className="text-xl text-black mb-2">
                L'utilisateur que vous recherchez n'existe pas.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="/">
              <button
                className="text-white font-bold py-2 px-4 rounded-3xl"
                style={{ backgroundColor: "#579A86" }}
              >
                Retour à l'accueil
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-cover bg-center flex flex-col justify-center items-center">
        <div
          className="bg-opacity-80 rounded-xl p-8  border-2 border-gray-200 w-11/12 md:w-8/12"
          style={{
            marginTop: "50px",
            backdropFilter: "blur(20px)",
            backgroundColor: "white",
            opacity: "0.95",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center mb-8">
            {ownProfile && (
              <span className="bg-green-800 text-white font-bold py-1 px-2 rounded-full">
                <FontAwesomeIcon icon={faCrown} size="1x" color="orange" /> Vous
              </span>
            )}

            {profileData.isPublic && (
              <span className="bg-blue-800 text-white font-bold py-1 px-2 rounded-full ml-2">
                <FontAwesomeIcon icon={faUnlock} size="1x" /> Public
              </span>
            )}
            {!profileData.isPublic && (
              <span className="bg-red-800 text-white font-bold py-1 px-2 rounded-full ml-2">
                <FontAwesomeIcon icon={faUserLock} size="1x" /> Privé
              </span>
            )}
            <span className="bg-purple-800 text-white font-bold py-1 px-2 rounded-full ml-2">
              <FontAwesomeIcon
                size="1x"
                icon={faCloud}
                style={{ marginRight: "5px" }}
              />
              Dernière connexion le{" "}

              {profileData.lastConnectionDate}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-8 justify-center">

            <div className="AvatarProfilediv">
              <img
                className="AvatarProfile"
                src={
                  "https://ui-avatars.com/api/?background=random&name=" +
                  profileData.pseudo
                }
                alt="Avatar"
     
              />
            </div>
            <div className="text-center md:text-left">
              <div className="font-bold text-3xl mb-2">
                {profileData.pseudo}
              </div>
              <div className="text-xl text-grey mb-2">
                <div style={{maxWidth:"30vw",wordBreak:"break-all"}}>
                  {profileData.description}
                </div>
              </div>
              {/* button to copy url link */}
              <div className="flex justify-center md:justify-start">
                <button
                  className="text-white font-bold py-2 px-4 rounded-full"
                  style={{ backgroundColor: "#579A86" }}
                  onClick={async() => {
                    const id = await getId()
                    navigator.clipboard.writeText(window.location.href.replace("me",id));
                    /* toast notify */
                    toast.info("🎉 Lien copié !", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      progress: undefined,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ marginRight: "5px" }}
                  />
                  Copier
                </button>
                <ToastContainer />

                {/* button to edit profile */}
                {ownProfile && (
                    <button
                      className="text-white font-bold py-2 px-4 rounded-full ml-2"
                      style={{ backgroundColor: "#083628" }}
                      onClick={switchForm}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ marginRight: "5px" }}
                      />
                      Modifier
                    </button>
                )}
              </div>
            </div>
          </div>
          {(profileData.isPublic || ownProfile) && <>
          <Title variant="h4" style={{ color: "#579A86" }}>
            Informations
          </Title>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-center"
            style={{ color: "black" }}
          >
            <div className="rounded-md p-4 border-2 border-gray-200">
              <div className="text-center font-bold text-2xl mb-2 text-black">
                {profileData.gamesWon}
                <FontAwesomeIcon
                  icon={faTrophy}
                  style={{ marginLeft: "5px", color: "gold" }}
                />
              </div>
              <div className="text-center text-black">Parties gagnées</div>
            </div>
            <div className="rounded-md p-4 border-2 border-gray-200">
              <div className="text-center font-bold text-2xl mb-2 text-black">
                {profileData.gamesPlayed}
                <FontAwesomeIcon
                  icon={faGamepad}
                  style={{ marginLeft: "5px", color: "red" }}
                />
              </div>
              <div className="text-center text-black">Parties jouées</div>
            </div>
            <div className="rounded-md p-4 border-2 border-gray-200">
              <div className="text-center font-bold text-2xl mb-2 text-black">
                {profileData.games
                  .map((game: any) => game.numberWordsFound)
                  .reduce((a: any, b: any) => a + b, 0)}
                <FontAwesomeIcon
                  icon={faBook}
                  style={{ marginLeft: "5px", color: "blue" }}
                />
              </div>
              <div className="text-center text-black">Mots trouvés</div>
            </div>
            {/* age, date d'inscription, date de dernière partie, nombre de parties jouées */}
            <div className="rounded-md p-4 border-2 border-gray-200">
              <div className="text-center font-bold text-2xl mb-2 text-black">
                {profileData.gamesLost}
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  style={{ marginLeft: "5px", color: "purple" }}
                />
              </div>
              <div className="text-center text-black">Parties perdues</div>
            </div>
            <div className="rounded-md p-4 border-2 border-gray-200">
              <div className="text-center font-bold text-2xl mb-2 text-black">
                {profileData.inscriptionDate}
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginLeft: "5px", color: "green" }}
                />
              </div>
              <div className="text-center text-black">Date d'inscription</div>
            </div>

            {/* profil public ou non  */}
          </div>

          <br />

          <Title variant="h4" style={{ color: "white" }}>
            Historique des parties
          </Title>
          {profileData.games.length == 0 && (
            <>
              <div
                className="text-center text-black bg-white rounded-md p-4"
                style={{ color: "#579A86" }}
              >
                Aucune partie jouée...
                <FontAwesomeIcon
                  icon={faSadTear}
                  style={{ marginLeft: "5px" }}
                />
              </div>
            </>
          )}

          {profileData.games.map(
            (game: {
              id: any;
              name: any;
              language: any;
              score: any;
              leaderboard: any;
              grid: any;
              startDate: any;
              endDate: any;
              size: any;
              mode: any;
              isPublic: any;
              maxPlayers: any;
              numberWordsFound: any;
              numberWordsProposed: any;
              percentageWordsFound: any;
            }) => (
              <GameCard
                key={game.id}
                id={game.id}
                score={game.score}
                startDate={game.startDate}
                endDate={game.endDate}
                size={game.size}
                isPublic={game.isPublic}
                maxPlayers={game.maxPlayers}
                numberWordsFound={game.numberWordsFound}
                numberWordsProposed={game.numberWordsProposed}
                percentageWordsFound={game.percentageWordsFound}
              >
                <GameGrid grid={game.grid} width="small" />
                <GameCardInfo
                  title={game.name}
                  lang={game.language}
                  score={game.score}
                  leaderboard={game.leaderboard}
                  startDate={game.startDate}
                  // endDate={game.endDate}
                  // size={game.size}
                  // mode={game.mode}
                  isPublic={game.isPublic}
                  //  maxPlayers={game.maxPlayers}
                  numberWordsFound={game.numberWordsFound}
                  numberWordsProposed={game.numberWordsProposed}
                  percentageWordsFound={game.percentageWordsFound}
                  canJoin={false}
                  playerId={profileId}
                  gameId={game.id}
                />
              </GameCard>
            )
          )}

          <br />
          </> }
        </div>
      </div>

      {/* Formulaire de modification de profile */}
      <div className="back hiddenProfile" id="modifForm">
        <form onSubmit={checkAll} className="connecForm profile">
              <FontAwesomeIcon icon={faXmark} size="2x" color="black" onClick={switchForm}/>
              <span className="title">Modifier ses informations</span>
              <span className="connecLabel">Pseudo</span>
              <input type="text" className="connecInput" id="Inscriptionlogin" onKeyUp={checkPseudo}/>
              <span className="error" id="error"></span>

              <span className="connecLabel">Le type de compte</span>
              <div className="radioContainer">
                  <div><label htmlFor="non-public">Privé</label><input type="radio" name="privatisation" value="prive" id="non-public" checked/></div>
                  <div><label htmlFor="public">Public</label><input type="radio" name="privatisation" value="public" id="public"/></div>
              </div>

              <span className="connecLabel">Votre Description</span>
              <textarea id="descInscription" cols={30} rows={10} className="connecInput desc" maxLength={150}></textarea>

              <input type="submit" className="connecSubmit" value="Modifier son profil"/>
        </form>
      </div>
    </>
  );
};

export default Profile;