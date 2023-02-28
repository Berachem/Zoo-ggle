<?php
// GET a word and return its definition by executing java code

header('Content-Type: application/json');

if (isset($_GET['word']) && !empty($_GET['word'])){
    $word = $_GET['word'];
    
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('java -Dfile.encoding=UTF-8 -classpath "..\server\java\dico\target\classes" fr.uge.jdict.DictionarySearcher "..\server\java\dico\dico" '.$word, $output);
    } else {
        exec('java -Dfile.encoding=UTF-8 -classpath "../server/java/dico/target/classes" fr.uge.jdict.DictionarySearcher "../server/java/dico/dico" '.$word, $output);
    }
    $resultCLI = implode("\n", $output);

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
