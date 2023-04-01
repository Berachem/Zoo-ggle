import "../../css/Title.css"
import { Typography } from "@material-tailwind/react";

export default function Title(props : any){
    return(
        <div className="Title">
            <Typography variant={props.variant}>
                {props.children}
            </Typography>
        </div>
    )
}