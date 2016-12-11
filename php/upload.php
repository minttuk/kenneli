<?php
session_start();
include("connect.php");
if (!$_SESSION['id']) {
    header('Location: login.html');
}


$target_dir = "../img/uploads/";
$target_file = $target_dir . basename($_FILES["picture"]["name"]);
echo $target_file;
$extension = end(explode(".", $_FILES["picture"]["name"]));
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["picture"]["tmp_name"]);
    if($check !== false) {
        //echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
/*if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}*/
// Check file size
if ($_FILES["picture"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
}

else {
    if (move_uploaded_file($_FILES["picture"]["tmp_name"], $target_dir . $_POST["dogIdToImage"] . "." . $extension)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        $update = "UPDATE dog SET image = '" . mysqli_real_escape_string($db,$_POST["dogIdToImage"]) . "." . $extension . "' WHERE id='" . mysqli_real_escape_string($db, $_POST["dogIdToImage"]) . "' LIMIT 1";
        mysqli_query($db,$update);
        header('Location: ../dog.html?dog=' . $_POST["dogIdToImage"]);
    }
    else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
