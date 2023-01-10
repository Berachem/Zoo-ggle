<?php
// recupère le mot entré par l'utilisateur en POST et regarde s'il est dans le dictionnaire et si il est dans la grille
// si oui, on redirige vers la page index.php avec un paramètre GET "mot" qui contient le mot et "success" qui vaut true
session_start();

// récupère le mot entré par l'utilisateur
$mot = $_GET["mot"];
// récupère la grille
$grille = $_SESSION["grille"];

echo $mot;
echo "<br>";
print_r($grille);
echo '.\server\game_motor\sources\solve.exe server/data/listeMot.lex 2 4 4 ' . implode(" ", $grille);
$result = shell_exec('.\game_motor\sources\solve.exe server/data\listeMot.lex 2 4 4 '.implode(" ", $grille));
$result = explode(" ", $result);
print_r($result);

if (in_array($mot, $result)) {
    echo "mot trouvé";
    //header("Location: index.php?mot=$mot&success=true");
} else {
    echo "mot non trouvé";
    //header("Location: index.php?mot=$mot&success=false");
}

?>