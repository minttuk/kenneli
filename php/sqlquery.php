<?php
session_start();
header("Access-Control-Allow-Origin: *");
//header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');
include("connect.php");
mb_language('uni');
mb_internal_encoding('UTF-8');

$q = $_REQUEST["q"];

if ($q == "getMsgs"){
    getMsgs();
}

if ($q == "getFrontSideMsgs"){
    getFrontSideMsgs();
}

if ($q == "createMsg"){
    createMsg(); 
}

if ($q == "login"){
    login();
}

if ($q == "getSession") {
    getSession();
}

if ($q == "getDog") {
    getDog();
}

if ($q == "getDogs") {
    getDogs();
}

if ($q == "getUser") {
    getUser();
}

if ($q == "logout") {
    sessionDestroy();
}

if ($q == "register") {
    register();
}


function getResource() {
    # returns numerically indexed array of URI parts
    $resource_string = $_SERVER['REQUEST_URI'];
    if (strstr($resource_string, '?')) {
        $resource_string = substr($resource_string, 0, strpos($resource_string, '?'));
    }
    $resource = array();
    $resource = explode('/', $resource_string);
    array_shift($resource);   
    return $resource;
}

function getParameters() {
    # returns an associative array containing the parameters
    $resource = $_SERVER['REQUEST_URI'];
    $param_string = "";
    $param_array = array();
    if (strstr($resource, '?')) {
        # URI has parameters
        $param_string = substr($resource, strpos($resource, '?')+1);
        $parameters = explode('&', $param_string);                      
        foreach ($parameters as $single_parameter) {
            $param_name = substr($single_parameter, 0, strpos($single_parameter, '='));
            $param_value = substr($single_parameter, strpos($single_parameter, '=')+1);
            $param_array[$param_name] = $param_value;
        }
    }
    return $param_array;
}

function getMethod() {
    # returns a string containing the HTTP method
    $method = $_SERVER['REQUEST_METHOD'];
    return $method;
}

function login() {
    $value = json_decode(file_get_contents('php://input'), true);
    $sql = "SELECT * FROM user WHERE email='" . mysqli_real_escape_string($GLOBALS['db'], $value['email']) . "'";
    $result = $GLOBALS['db']->query($sql);
    //$resultnumber = $result->num_rows;
    if ($result->num_rows > 0) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            if (password_verify($value['password'], $row['password'])) {
                $_SESSION['id'] = $row['id'];
                echo json_encode(array('id'=>$_SESSION['id']));
                return; 
            }
        }
    }
    http_response_code(403);
    echo json_encode(array('error'=>'No user found'));

}

function register() {
    $value = json_decode(file_get_contents('php://input'), true);
    $sql = "SELECT * FROM user WHERE email='" . mysqli_real_escape_string($GLOBALS['db'], $value['email']) . "'";
    $result = $GLOBALS['db']->query($sql);
    if ($result->num_rows > 0) {
        http_response_code(403);
        echo json_encode(array('error'=>'A user with this email address already exists.'));
    }
    else {
        $sql = "INSERT INTO user (email, password, firstname, lastname) VALUES (
        '" . mysqli_real_escape_string($GLOBALS['db'], $value['email']) . "', 
        '" . mysqli_real_escape_string($GLOBALS['db'], password_hash($value['password'], PASSWORD_DEFAULT)) . "', 
        '" . mysqli_real_escape_string($GLOBALS['db'], $value['firstname']) . "', 
        '" . mysqli_real_escape_string($GLOBALS['db'], $value['lastname']) . "')";
        if ($GLOBALS['db']->query($sql) === TRUE) {
            $sql = "SELECT * FROM user WHERE email='" . mysqli_real_escape_string($GLOBALS['db'], $value['email']) . "'";
            $result = $GLOBALS['db']->query($sql);
            if ($result->num_rows > 0) {
                if ($row = $result->fetch_assoc()) {
                    $_SESSION['id'] = $row['id'];
                }
            }
            echo json_encode(array('id'=>$_SESSION['id']));
            return;
        } 
        else {
            http_response_code(403);
            echo json_encode(array('errorMsg'=>'There was a problem registering this user.'));
        }
    }
}

function sessionDestroy() {
    $_SESSION['id'] = null;
    session_destroy();
    echo json_encode(array('id'=>$_SESSION['id']));
}

/*function getMsgs() {
    $sql="select *  FROM message WHERE id=1";
    //$result = mysql_query($sql);
    $result=$GLOBALS['db']->query($sql);
    $msg = array();
    while($row=$result->fetch_assoc()){
      $title=$row["title"]; 
      $message=$row["message"];
      //$data += [$category => $question];
      $msg[] = array('title'=> $title,'message'=> $message);
    }
    //echo $jsonformat=json_encode($msg);
    echo json_encode($msg);
}*/

function getSession() {
    echo json_encode(array('id'=> $_SESSION['id']));
}

function createUser() {
    $sql = "INSERT INTO user (email, password)
    VALUES ('testi2@testi.fi', 'testi2salasana')";
    
    if ($GLOBALS['db']->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $GLOBALS['db']->error;
    }
}

function getUsers() {
    $sql = "SELECT id, email, password FROM user";
    $result = $GLOBALS['db']->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - email: " . $row["email"]. " - password: " . $row["password"]. "<br>";
        }
    } else {
        echo "0 results";
    }
}

function getUser() {
    $value = json_decode(file_get_contents('php://input'), true);
    $sql = "SELECT * FROM user WHERE id='" . mysqli_real_escape_string($GLOBALS['db'], $value['id']) . "'";
    $result = $GLOBALS['db']->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            $user = array('id'=>$row['id'], 'firstname'=>$row['firstname'], 'lastname'=>$row['lastname'], 'email'=>$row['email']);
            echo $jsonformat=json_encode($user);
            return; 
        }
    }
    http_response_code(403);
    echo json_encode(array('error'=>'No user found!'));
}

function updateUser() {
    $sql = "UPDATE user SET email='updatetest@test.com' WHERE id=2";
    if ($GLOBALS['db']->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $GLOBALS['db']->error;
    }
}

function getMsgs() {
    //$query="select *  FROM message WHERE id=1";
    //$query="select * FROM message"; tällä sai haettua kaikki, tätä voi käyttää etusivulla
    $query = "select * FROM message WHERE dog_id=1"; //hakee kaikki koira1:n päivitykset. Tämän voi yhdistää dynaamisiin sivuihin ja käyttää funktion
                                                    // parametrina koiran id-numeroa??
    //$result = mysql_query($query);
    $result=$GLOBALS['db']->query($query);
    $msg = array();
    while($row=$result->fetch_assoc()){
      $title=$row["title"]; 
      $message=$row["message"];
      $time=$row["posttime"];
    
      $msg[] = array("title"=> $title,"message"=> $message, "time"=> $time);
    }
    echo $jsonformat=json_encode($msg);
}

function getFrontSideMsgs() {
    //$query="select *  FROM message WHERE id=1";
    $query="select * FROM message"; //tällä sai haettua kaikki, tätä voi käyttää etusivulla
    //$query = "select * FROM message WHERE dog_id=1"; //hakee kaikki koira1:n päivitykset. Tämän voi yhdistää dynaamisiin sivuihin ja käyttää funktion
                                                    // parametrina koiran id-numeroa??
    //$result = mysql_query($query);
    $result=$GLOBALS['db']->query($query);
    $msg = array();
    while($row=$result->fetch_assoc()){
      $title=$row["title"]; 
      $message=$row["message"];
      $time=$row["posttime"];
      $dog_id=$row["dog_id"];
    
      $msg[] = array("title"=> $title,"message"=> $message, "time"=> $time, "dog_id"=>$dog_id);
    }
    echo $jsonformat=json_encode($msg);
}

function createMsg() {
    //mysql_set_charset('utf8');
    $json = file_get_contents('php://input');
    console.log($json);
    $value = json_decode($json);
    $title = mysqli_real_escape_string($GLOBALS['db'], $value['title']);
    $message = mysqli_real_escape_string($GLOBALS['db'], $value['message']);
    $sql = "INSERT INTO message(title, message) VALUES ($title, $message)";
    //$result = mysql_query($sql);
    $result = $GLOBALS['db']->query($sql);
    if ($result->num_rows > 0) {
        echo json_encode(array('answer'=>'message successfully created'));
    }
    else {
        echo json_encode(array('answer'=>'Error in creating mysql message'));    
    }
    
    
    /*if ($_REQUEST['title']) {
        $title = $_REQUEST['title'];
        $message = $_REQUEST['message'];
        console.log($title);
        $sql = "INSERT INTO message(title, message) VALUES ('$title' '$message')";
        $result = $GLOBALS['db']->query($sql);
        //$query = mysqli_query($GLOBALS['db'], $sql);
        if($result){
            echo 'message inserted successfully';
        }
        else{
            echo 'Error in creating mysql message';
        }

    }*/

    
    /*if(isset($_POST['title'])){
        $title = mysql_real_escape_string($_POST['title']);
        console.log($title);
        $message = mysql_real_escape_string($_POST['message']);
        $result = mysql_query("insert into message(title, message) values ('$title', '$message')");
        //$row=mysql_fetch_array($result);
        //echo $row['title'];
        if ($result->num_rows > 0) {
            echo json_encode(array('answer'=>'message successfully created'));
        }
        else {
            echo json_encode(array('answer'=>'Error in creating mysql message'));    
        }
    }*/
    
}

function getDog() {
    $value = json_decode(file_get_contents('php://input'), true);
    $sql = "SELECT * FROM dog WHERE id='" . mysqli_real_escape_string($GLOBALS['db'], $value['dogID']) . "'";
    $result = $GLOBALS['db']->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            $dog = array('id'=>$row['id'], 'name'=>$row['name'], 'owner'=>$row['owner'], 'image'=>$row['image'], 'description'=>$row['description']);
            echo $jsonformat=json_encode($dog);
            return; 
        }
    }
    http_response_code(403);
    echo json_encode(array('error'=>'No dog found'));
}

function getDogs() {
    $sql = "SELECT * FROM dog";
    $result = $GLOBALS['db']->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        $dogs= array();
        while ($row = $result->fetch_assoc()) {
            $dogs[] = array('id'=>$row['id'], 'name'=>$row["name"], 'owner'=>$row["owner"], 'image'=>$row["image"], 'description'=>$row["description"]);
        }
        echo $jsonformat=json_encode($dogs);
        return;
    }
    http_response_code(403);
    echo json_encode(array('error'=>'No dog found'));
    
}
    
    



// some functions to be done (some might not be necessary)

// deleteUser()
// getUser()
// createDog()
// updateDog()
// getMsg()
// getMsgs()
// updateMsg()
// deleteMsg()


$db->close();


?>