<?php  
session_start();  
if (!isset($_SESSION["listeMots"])){
    $listeMots = array();
    $_SESSION["listeMots"] = $listeMots;
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boggle</title>

    <style>
        table {
          margin: auto;
            border-collapse: collapse;
        }
        /* bordure de la table */
        table, th, td {
          border: 1px solid black;
          padding: 10px;
        }

        form {
          text-align: center;
        }

        h1 {
          text-align: center;
          font-size: 100px;
        }
      </style>
</head>
<body>
    
    <h1>Zoo-ggle</h1>
    <?php
       // récupère le retour de l'exécution du fichier C game_motor/sources/grid_build ../../data/frequences.txt 4 4
        $result = shell_exec('.\game_motor\sources\grid_build.exe data/frequences.txt 4 4');
        // split le résultat en tableau
        $result = explode(" ", $result);

        $_SESSION["grille"] = $result;

        
    ?>
    <table>
        <?php
        for ($i = 0; $i < 4; $i++) {
            echo "<tr>";
            for ($j = 0; $j < 4; $j++) {
                echo "<td>" . $result[$i * 4 + $j] . "</td>";
            }
            echo "</tr>";
        }
        ?>
      </table>
      <form action="checkWord.php" method="GET">
        <label for="mot">Entrez un mot :</label><br>
        <input type="text" id="mot" name="mot"><br>
        <input type="submit" value="Envoyer">
      </form> 
</body>
</html>