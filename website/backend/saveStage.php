<?php

function savePage(){
    require_once __DIR__ . "/conn.php";
    $rawbody = file_get_contents("php://input");
    $decoded = json_decode($rawbody, true);
    $websiteID = "";
    if (!isset($decoded["websiteID"])){
        echo json_encode(["Fail" =>"name your page information first!"]);
        die();
    }
    else{
        $websiteID = htmlentities($decoded["websiteID"]);
    }
    $stage = "";
    if (!isset($decoded["stage"])){
        echo json_encode(["Fail" =>"stage required"]);
        die();
    }
    else{
        $stage =  htmlentities($decoded["stage"]);
    }
    $code = htmlentities($decoded["code"]) ?? die("anyád");
    $conn = connect();
    $sql = "INSERT into stages(websiteID,stage,code)
            values ($websiteID, $stage , '$code')";
    if ($conn->query($sql)){
        echo json_encode(["Success" => "save was successfull!"]);
        $conn->close();
    }
    else{
        echo json_encode(["Error" => "something went wrong. Please try again!"]);
        $conn->close();
    }


}

?>