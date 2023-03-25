import RealisteBackGround from "../../assets/images/backgrounds/realiste.jpg";
import IdealisteBackGround from "../../assets/images/backgrounds/idealiste.png";

export default function Background(
    {backgroundMode}: {backgroundMode: boolean}
){

    return(<div
        style={{
        backgroundImage:  `url(${backgroundMode ? RealisteBackGround : IdealisteBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        right: "0",
        bottom: "0",
        minWidth: "100%",
        minHeight: "100%",
        zIndex: "-1"

    }}></div>)
}


