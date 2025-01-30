<?php
function websites(){
    $rawbody = file_get_contents("php://input");
    $decoded = json_decode($rawbody, true);
    require_once __DIR__ . "/conn.php";
    $conn = connect();
    $sql = "SELECT websites.title, websites.description, stages.code 
            from websites,stages 
            where websites.id = stages.websiteID
            limit 10";
    $result = $conn->query($sql);
    if ($result->num_rows > 0){
        $data = $result->fetch_all(MYSQLI_ASSOC);
        foreach ($data as $rowkey => $row) {
            foreach ($row as $key => $value) {
                if ($key == "code"){
                    $data[$rowkey][$key] = html_entity_decode($value);
                    
                }
            }
        }
        echo json_encode($data);
    }
    else{
        echo json_encode(["error"=>"xd"]);
    }


}


?>