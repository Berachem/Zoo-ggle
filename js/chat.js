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