<?php
function createWebsite (){
    $rawbody = file_get_contents("php://input");
    $decoded = json_decode($rawbody, true);
    $title = $decoded["title"] ?? die("anyád");
    $theme = $decoded["theme"] ?? die("anyád");
    $description = $decoded["description"] ?? die("anyád");

    require_once __DIR__ . "/conn.php";
    $conn = connect();
    $sql = "INSERT into websites(userID,title,theme, description) 
            values (1,'$title', '$theme','$description')";
    
    if ($conn->query($sql)) {
        $sql = "SELECT websites.ID from websites where websites.title = '$title' and websites.theme = '$theme' and websites.description = '$description' ";
        if ($result =$conn->query($sql)){
            $data = $result->fetch_assoc();
            echo json_encode($data);
            $conn->close();
        }
        else{
            echo json_encode(["Error" => "sql was shit"]);
            $conn->close();
        }
    }
    else{
        echo json_encode(["Error" => "sql was shit"]);
        $conn->close();
    }
    
}