export default function ZooggleCard(props: any) {
    
        return(
            <div style={{
                display:"flex",
                flexDirection:"column",
                width:`${props.width}`,
                border:"2px solid white",
                padding:"1rem",
                color:"white",
                backdropFilter:"blur(5px)",
                margin:"1rem"
            }}>
                {props.children}
            </div>
            )
}