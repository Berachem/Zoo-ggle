import Fond from "../../assets/images/Fond.jpg";

export default function Background(){
    return(<div
        style={{
        backgroundImage: `url(${Fond})`,
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


