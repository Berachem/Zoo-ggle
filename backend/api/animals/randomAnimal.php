<?php
// Get the list of animals in French and English
require_once 'animalsData.php';



// Get the language parameter (default to FRA if not provided)
$language = isset($_GET['language']) ? $_GET['language'] : 'FRA';

// Choose the array to use based on the language parameter
$animals = $language === 'FRA' ? $animalsFRA : $animalsENG;

// Choose a random animal from the array
$randomAnimal = $animals[array_rand($animals)];

// Return the result as JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
echo json_encode(array('success'=>true, 'animal' => $randomAnimal), JSON_UNESCAPED_UNICODE );
?>
