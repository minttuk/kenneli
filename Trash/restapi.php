<?php
/*
mb_language('uni');
mb_internal_encoding('UTF-8');
include("connect.php");



# Main
# ----

$resource = getResource();
$request_method = getMethod();
$parameters = getParameters();

# Redirect to appropriate handlers.
if ($resource[0]=="kennelsome") {
	if ($request_method=="POST" && $resource[1]=="getMsgs") {
    	getMsgs();
	}
	else if ($request_method=="GET" && $resource[1]=="getFrontSideMsgs") {
		getFrontSideMsgs();
	} 
	else if ($request_method=="POST" && $resource[1]=="createMsg") {
		createMsg();
	}
	else if ($request_method=="POST" && $resource[1]=="login") {
	    login();
	}
	else if ($request_method=="GET" && $resource[1]=="getSession") {
		getSession();
	}
	else if ($request_method=="POST" && $resource[1]=="getDog") {
		getDog();
	}	
	else if ($request_method=="POST" && $resource[1]=="updateDog") {
		updateDog();
	}
	else if ($request_method=="GET" && $resource[1]=="getDogs") {
		getDogs();
	}
	else if ($request_method=="POST" && $resource[1]=="getUser") {
		getUser();
	}	
	else if ($request_method=="GET" && $resource[1]=="logout") {
		sessionDestroy();
	}
	else if ($request_method=="POST" && $resource[1]=="register") {
		register();
	}
	else if ($request_method=="POST" && $resource[1]=="updateUser") {
		updateUser();
	}
	else if ($request_method=="POST" && $resource[1]=="getDogByOwner") {    
		getDogByOwner();
	}

	else {
		http_response_code(405); # Method not allowed
	}
}
else {
	http_response_code(405); # Method not allowed
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


*/
?>