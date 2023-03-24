
import { Button,Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";

export default function Jouer() {
    
    
    
    return (
        <div
            className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
            style={{
            backgroundImage: "url('https://img.freepik.com/vecteurs-libre/fond-jungle-detaille_23-2148949774.jpg?w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
        <div className="flex flex-col items-center justify-center h-screen">
            <main className="flex flex-col items-center justify-center w-full flex-1  text-center">
                <img src={Logo}/>
                <Button variant="filled" color="white" className="m-2">Règles</Button>
            </main>
        </div>
    </div>
    )
};
