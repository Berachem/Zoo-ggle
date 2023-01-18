<?php
// disconnect.php

session_start();
session_destroy();
header("Location: ../index.php?disconnected=true");


?>