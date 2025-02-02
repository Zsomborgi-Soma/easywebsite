<?php
####################  Set up the headers  ####################
header("Content-Type: Application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Access-Control-Allow-Credentials: true");

####################  Looking for the option connection (Axios only)  ####################
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit();
}

####################  Split up the url and checks the last part of it and return a json  ####################
$requestmethod = $_SERVER["REQUEST_METHOD"];
$uri = parse_url( $_SERVER["REQUEST_URI"],PHP_URL_PATH);
$uri = explode("/", trim($uri,"/"));

if ($uri[count($uri)-1] == "websites"){
    require_once "websites.php";
    websites();
}
elseif ($uri[count($uri)-1] == "saveStage") {
    require_once "saveStage.php";
    savePage();
}
else{
    echo json_encode(["error"=> "Endpoint not found!"]);
}



?>