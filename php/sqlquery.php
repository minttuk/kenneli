<?php
header("Access-Control-Allow-Origin: *");
//header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');
include("connect.php");

$q = $_REQUEST["q"];

if ($q == "getMsgs"){
    getMsgs();
}

if ($q == "login"){
    login();
}

if ($q == "getSession") {
    getSession();
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
    session_start();
    if ($result->num_rows > 0) {
        // output data of each row
        if ($row = $result->fetch_assoc()) {
            if ($row['password'] == $value['password']) {
                $_SESSION['id'] = $row['id'];
                echo json_encode(array('id'=>$_SESSION['id']));
                return; 
            }
        }
    }
    http_response_code(403);
    echo json_encode(array('error'=>'No user found'));
}

function getSession() {
    session_start();
    //$_SESSION['id'] = 2;
    echo json_encode($_SESSION['id']);
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

function updateUser() {
    $sql = "UPDATE user SET email='updatetest@test.com' WHERE id=2";
    if ($GLOBALS['db']->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $GLOBALS['db']->error;
    }
}


function getMsgs() {
    $query="select *  FROM message WHERE id=3";
    //$result = mysql_query($query);
    $result=$GLOBALS['db']->query($query);
    $msg = array();
    while($row=$result->fetch_assoc()){
      $title=$row["title"]; 
      $message=$row["message"];
    
      $msg[] = array("title"=> $title,"message"=> $message);
    }
    echo $jsonformat=json_encode($msg);
}


// some functions to be done (some might not be necessary)

// deleteUser()
// getUser()
// createDog()
// updateDog()
// getDog()
// getDogs()
// createMsg()
// getMsg()
// getMsgs()
// updateMsg()
// deleteMsg()

/*
$resource = getResource();
$request_method = getMethod();
$parameters = getParameters();

# Redirect to appropriate handlers.
if ($resource[0]=="staffapi") {
	if ($request_method=="POST" && $resource[1]=="person") {
    	postPerson($parameters);
	}
	else if ($request_method=="GET" && $resource[1]=="persons") {
		getPersons();
	} 
	else if ($request_method=="GET" && $resource[1]=="person") {
		getPerson($resource[2]);
	}
	else if ($request_method=="DELETE" && $resource[1]=="person") {
		deletePerson($resource[2]);
	}
	else {
		http_response_code(405); # Method not allowed
	}
}
else {
	http_response_code(405); # Method not allowed
}
*/
/*
createUser();
getUsers();
updateUser();
*/

//getMsgs();
//login();

$db->close();


?>