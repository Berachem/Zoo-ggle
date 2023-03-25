export default function GameGrid(props: any) {
    return(
        <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: `${props.width}`,
        }}>
            {props.grid.split(" ").map(function(item: string){
                return(
                    <p style={{
                            width: "calc(("+`${props.width}`+"/ 4) - 2rem)",
                            height: "calc(("+`${props.width}`+"/ 4) - 2rem)",
                            textAlign: "center",
                            borderRadius:"2px",
                            margin:"1rem",
                            border:"2px white solid",
                            fontSize:"3rem",
                            lineHeight:"calc(("+`${props.width}`+"/ 4) - 2rem)",
                        }}>
                        {item}
                    </p>)
                })}
        </div>
        )
}