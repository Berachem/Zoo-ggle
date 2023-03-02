<?php
// Get the list of animals in French and English
require_once 'animalsData.php';

// Get the language parameter (default to FRA if not provided)
$language = isset($_GET['language']) ? $_GET['language'] : 'FRA';

// Choose the array to use based on the language parameter
$animals = $language === 'FRA' ? $animalsFRA : $animalsENG;

// Get the search query parameter (default to empty if not provided)
$query = isset($_GET['q']) ? $_GET['q'] : '';

// Filter the array based on the search query
$filteredAnimals = array_filter($animals, function($animal) use ($query) {
    return stripos($animal, $query) !== false;
});

// Return the result as JSON
header('Content-Type: application/json');
echo json_encode(array('animals' => array_values($filteredAnimals)), JSON_UNESCAPED_UNICODE);
?>
