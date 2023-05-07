<?php
// GET a word and return its definition by executing java code

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');

if (isset($_GET['word']) && !empty($_GET['word'])){
    $word = $_GET['word'];
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('java -cp "..\server\java\Dictionaries.jar" fr.uge.jdict.DictionarySearcher "..\server\java\dico\dico" yaml:'.$word , $output);
    } else {
        exec('java -cp "../server/java/Dictionaries.jar" fr.uge.jdict.DictionarySearcher "../server/java/dico/dico" yaml:'.$word , $output);
    }
    $resultCLI = implode("<br>", $output);
    if(empty($resultCLI)){
        $response = array(
            "success" => false,
        );
        echo json_encode($response);
    }else{
        $response = array(
            "success" => true,
            "word" => $word,
            "definition" => $resultCLI
        );
        echo json_encode($response);
    }

}else{
    $response = array(
        "success" => false,
    );
    echo json_encode($response);
}
?>
