import { Input, Button, Textarea } from "@material-tailwind/react";
export default function chat(props: any) {
    var activated = props.activated || false;

    const chatData = [
        {
            pseudo: "Lucas",
            message: "Bonjour"
        },
        {
            pseudo: "Berachem",
            message: "Salut tout le monde :D"
        },
        {
            pseudo: "Nidal",
            message: "Quoicoubebou"
        },
        {
            pseudo: "Joshua",
            message: ":("
        },
    ];

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <div style={{
                margin: "1rem"
            }}>
                {chatData.map(function (chat) {
                    return (
                        <p>
                            {chat.pseudo} : {chat.message}
                        </p>)
                })}
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
            }}>
                <div className="relative  flex w-full max-w-[24rem]" style={{ margin: "auto", backgroundColor: "#FFFFFF", borderRadius: "0.5rem" }}>
                    <Input type="text" label="Message" color="green" disabled={!activated} />
                    <Button size="sm" color={!activated ? "gray" : "green"} className="!absolute right-1 top-1 rounded" disabled={!activated}>
                        Envoyer
                    </Button>
                </div>
            </div>
        </div>
    )
}