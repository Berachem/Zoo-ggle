<?php
session_start();
session_destroy();
header("location: index.php?deconnected=true");