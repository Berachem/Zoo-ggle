<?php
require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'sendAuthenToken.php';
require_once 'functions.php';

global $db;
$query = "SELECT DateCreationCompte FROM B_Joueur WHERE IdJoueur=:id";
$parameters = [[":id",$user]];
$dateConnec = new DateTime(($db->execQuery($query,$parameters))[0]->DateCreationCompte);
$interval = $dateConnec->diff(new DateTime());

return $interval->d > 3;
