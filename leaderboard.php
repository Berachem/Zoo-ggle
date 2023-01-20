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
echo "<br>";
echo "<br>";
echo "<center>";
echo "<h1>Leaderboard</h1>";

// affiche les données sous forme de tableau
echo "<table class='table-leader'>";
echo "<tr>";
echo "<th>Classement</th>";
echo "<th>Nom</th>";
echo "<th>Score</th>";
echo "</tr>";
$i = 1;
foreach ($playersData as $playerData) {
    echo "<tr>";
    echo "<td>" . $i. "</td>";
    echo "<td> <img src='" . getLogoPathById($playerData->IdJoueur) . "' alt='Avatar' class='avatar' width='20' height='20'> " . $playerData->Pseudo . "</td>";
    echo "<td>" . $playerData->Score . "</td>";
    echo "</tr>";
    $i++;
}
echo "</table>";

?>
<br>
<br>
<a class="btn btn-primary" href="index.php" role="button">Retour à l'accueil</a>
</center>

<style>

    .table-leader {
        border-collapse: collapse;
        width: 50%;
        border: 1px solid #ddd;
        font-size: 18px;
    }

    .table-leader th, .table-leader td {
        text-align: left;
        padding: 16px;
    }

    .table-leader tr {
        border-bottom: 1px solid #ddd;
    }

    .table-leader tr.header, .table-leader tr:hover {
        background-color: #f1f1f1;
    }

    .avatar {
        vertical-align: middle;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

</style>


<?php
include("includes/footer.inc.php");

?>



