<?php
session_start();
$_SESSION['id'] = 10;
?>
<html>
    <body>
        <?php
            echo $_SESSION['id'];
        ?>
    </body>
</html>