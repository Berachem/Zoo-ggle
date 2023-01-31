<?php
session_start();
include('includes/header.inc.php');

function implode_recursive(string $separator, array $array): string
{
    $string = '';
    foreach ($array as $i => $a) {
        if (is_array($a)) {
            $string .= implode_recursive($separator, $a);
        } else {
            $string .= $a;
            if ($i < count($array) - 1) {
                $string .= $separator;
            }
        }
    }

    return $string;
}

function create_list($data) {
    $list = "<ul>";
    foreach ($data as $key => $value) {
        $list .= "<li>" . $key;
        if (is_object($value) || is_array($value)) {
            $list .= create_list($value);
        } else {
            $list .= ": " . $value;
        }
        $list .= "</li>";
    }
    $list .= "</ul>";
    return $list;
}
?>
<br>
<br>
<br>
<br>
<br>


<h1 class="display-1 lh-1 mb-3" style="text-align: center;">Recherchez la définition d'un mot</h1>
    
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Tapez votre mot ici..." aria-label="Rechercher un mot" id ="search-input" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="searchWord(document.getElementById('search-input').value)">
                        Rechercher
                    </button>
                </div>
            </div>
        </div>
    </div>
    <?php

    

    if (isset($_GET['word']) && !empty($_GET['word'])){
        $word = $_GET['word'];
        
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            exec('java -Dfile.encoding=UTF-8 -classpath "server\java\dico\target\classes" fr.uge.jdict.DictionarySearcher "server\java\dico\dico" '.$word, $output);
        } else {
            exec('java -Dfile.encoding=UTF-8 -classpath "server/java/dico/target/classes" fr.uge.jdict.DictionarySearcher "server/java/dico/dico" '.$word, $output);
        }
        $resultCLI = implode("\n", $output);

        if(empty($resultCLI)){
            echo "LA COMMANDE N'A PAS MARCHE";
        }else{
            var_dump($resultCLI);
        }


        // keep only text between first { and last }
        $resultCLI = substr($resultCLI, strpos($resultCLI, "{"), strrpos($resultCLI, "}") - strpos($resultCLI, "{") + 1);
        $json = json_decode($resultCLI, true);
        echo '    <div class="container">
        <div class="card">
                <div class="card-body" id="card-result">
                    <h5 class="card-title">'.$json["title"].'</h5>
                    <p class="card-text">                  
                        '.create_list($json["definitions"])
                        .'
                    </p>
                </div>
        </div>';
    }

?>
<script>
    function searchWord(word) {
        window.location.href = "dictionnary.php?word=" + word;
    }
</script>

<?php
include('includes/footer.inc.php');
?>

 