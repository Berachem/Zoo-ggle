export default function ZooggleCard(props: any) {
    
        return(
            <div style={{
                display:"inline-flex",
                flexDirection:"column",
                minHeight:`${props.minHeight}`,
                height:"min-content",
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