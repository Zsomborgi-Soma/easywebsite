<?php

function savePage(){
    require_once __DIR__ . "/conn.php";
    $rawbody = file_get_contents("php://input");
    $decoded = json_decode($rawbody, true);
    $websiteID = htmlentities($decoded["websiteID"]) ?? die("anyád");
    $stage = htmlentities($decoded["stage"]) ?? die("anyád");
    $code = htmlentities($decoded["code"]) ?? die("anyád");
    $conn = connect();
    $sql = "INSERT into stages(websiteID,stage,code)
            values ($websiteID, $stage , '$code')";
    if ($conn->query($sql)){
        echo json_encode(["Success" => "save was successfull!"]);
    }
    else{
        echo json_encode(["Error" => "something went wrong. Please try again!"]);
    }


}

?>