<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    //$_SESSION['id'] = 2;
    echo json_encode($_SESSION['id']);
?>