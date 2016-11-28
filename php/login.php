<?php
    header("Access-Control-Allow-Origin: *");
    $value = json_decode(file_get_contents('php://input'), true);
    session_start();
    $_SESSION['id'] = 1;
    //var_dump($_SESSION);
    echo $_SESSION['id'];
?>