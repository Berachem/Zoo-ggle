function sendMessage(){
    let input = document.getElementById("message");
    if(input.value.trim() != ""){
        $.ajax({
            type: "POST",
            url: "php/updateChat.php",
            data: {
                message: input.value
            },
            datatype: "json",
            success: function(response){
                console.log(response);
            }
        })
    }
}

document.addEventListener("DOMContentLoaded",updateChat);

function updateChat(){
    $.ajax({
        type: "POST",
        url: "php/updateChat.php",
        data: {
            ping: "update required"
        },
        datatype: "json",
        success: function(response){
            console.log(response);
            let contenant = document.getElementById("chat")
            contenant.innerHTML = "";

            let obj = JSON.parse(response);
            obj.requette.forEach((ligne) => {
                    contenant.innerHTML+=ligne.Contenu+"<br>";
                })
        }
    })
    setInterval(updateChat, 3000);
}

function updateMP(){
    $.ajax({
        type: "POST",
        url: "php/updateChat.php",
        data: {
            ping: "update MP required"
        },
        datatype: "json",
        success: function(response){
            console.log(response);
            let contenant = document.getElementById("chat")
            contenant.innerHTML = "";

            let obj = JSON.parse(response);

            let messagesRecu = obj.messageRecu;
            let messageEnvoye = obj.messagemessageEnvoye

            let indexEnvoye = 0;
            let indexRecu = 0;
            let maxRecu = messagesRecu.length;
            let maxEnvoye = messageEnvoye.length;

            while (indexEnvoye<maxEnvoye && indexRecu<maxRecu){
                if(messageEnvoye[indexEnvoye].IdMessagePrive < messagesRecu[indexRecu].IdMessagePrive){
                    //inserer le message envoye
                    indexEnvoye++;
                }
                else{
                    //inserer le message recu
                    indexRecu++;
                }
            }
            if(indexEnvoye==maxEnvoye-1){
                for (let i=indexRecu;i<maxRecu;i++){
                    //inssertions des messages restant
                    //messagesRecu[indexRecu].Contenu
                }
            }else{
                for (let i=indexEnvoye;i<maxEnvoye;i++){
                    //inssertions des messages restant
                    //messagesEnvoye[indexEnvoye].Contenu
                }
            }

        }
    })
}