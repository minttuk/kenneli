<?php
    session_start();
    header("Access-Control-Allow-Origin: *");
    //$_SESSION['id'] = 2;
    echo json_encode($_SESSION['id'] + " session");
?>