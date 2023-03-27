import { Input, Button, Textarea } from "@material-tailwind/react";
import { Direction } from "react-toastify/dist/utils";
export default function chat(props: any) {

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
            height:"100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <div style={{
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
                height: "65px",
                background: "#ffffff",
            }}>

                <div className="relative  flex w-full max-w-[24rem] ">
                    <Input
                        type="text"
                        label="Message"
                        className="pr-20"
                        color="green"
                        containerProps={{
                            className: "min-w-0 ",
                        }}
                    />
                    <Button
                        size="sm"
                        color={"green"}
                        className="!absolute right-1 top-1 rounded"
                    >
                        Invite
                    </Button>
                </div>
            </div>
        </div>
    )
}