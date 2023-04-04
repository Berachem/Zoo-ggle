export default function ZooggleCard(props: any) {
    
        return(
            <div style={{
                display:"inline-flex",
                flexDirection:"column",
                minHeight:`${props.minHeight}`,
                height:"min-content",
                width:`${props.width}`,
                border:"2px solid white",
                padding:`${props.padding || '1rem'}`,
                color:"white",
                backdropFilter:"blur(20px)",
                marginBottom:"1rem",
            }}>
                {props.children}
            </div>
            )
}