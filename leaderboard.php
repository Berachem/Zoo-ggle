<?php

require 'php/lib/parse.env.php';
require 'php/Connexion.php';
require 'php/functions.php';

session_start();

include("includes/header.inc.php");

?>

<?php

if (!isset($_SESSION["user"])) {
    header("Location: index.php?notConnected=true");
}

$playersData = getLeaderBoardLastGameOfUser($_SESSION["user"]);
echo "<center>";
echo "<h1>Leaderboard</h1>";
// affiche les données sous forme de tableau
echo "<table>";
echo "<tr>";
echo "<th>Classement</th>";
echo "<th>Nom</th>";
echo "<th>Score</th>";
echo "</tr>";
$i = 1;
foreach ($playersData as $playerData) {
    echo "<tr>";
    echo "<td>" . $i. "</td>";
    echo "<td> <img src='" . $playerData->Avatar . "' alt='Avatar' class='avatar' width='20' height='20'> " . $playerData->Pseudo . "</td>";
    echo "<td>" . $playerData->Score . "</td>";
    echo "</tr>";
}
echo "</table>";

?>
<br>
<br>
<a class="btn btn-primary" href="index.php" role="button">Retour à l'accueil</a>
</center>
<?php



include("includes/footer.inc.php");

?>



