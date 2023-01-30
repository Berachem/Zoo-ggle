


<?php

function sendTokenByMail($emailTarget, $randomTokenSHA256, $debug = false) {
    $name = getPseudoById($_SESSION['waitingUser']);
    $link= "https://etudiant.u-pem.fr/~berachem.markria/zoo-bera/php/verifyToken.php?token=$randomTokenSHA256";

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://api.courier.com/send",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS =>"{\n    \"message\": {\n      \"to\": {\"email\" : \"$emailTarget\"},\n      \"template\": \"FHNS0S4DSJ429VQZF6DD2YBZFQ7T\",\n      \"data\": {\"nom\" : \"$name\",  \"lien\":\"$link\"}\n    }\n}",
      CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer pk_prod_7JZT2XRJTPMXG2KPQ4QKYFJCXP8A"
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    if ($debug) echo $response;

}




?>
