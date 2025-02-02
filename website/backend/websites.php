<?php
function websites(){
    $rawbody = file_get_contents("php://input");
    $decoded = json_decode($rawbody, true);
    require_once __DIR__ . "/conn.php";
    $conn = connect();
    $sql = "SELECT websites.title, websites.description,stages.stage, stages.code,stages.websiteID
            from websites,stages 
            where websites.id = stages.websiteID
            limit 10";
    $result = $conn->query($sql);
    $highest = 0;
    $highestElem = [];
    if ($result->num_rows > 0){
        $data = $result->fetch_all(MYSQLI_ASSOC);
        foreach ($data as $rowkey => $row) {
            foreach ($row as $key => $value) {
                if ($key == "stage"){
                    if ($value == 1){
                        $data[$rowkey]["code"] = html_entity_decode($data[$rowkey]["code"]);
                        $highestElem[] =  $data[$rowkey];
                    }
                }
            }
        }

        echo json_encode($highestElem);
        
        
    }
    else{
        echo json_encode(["error"=>"xd"]);
    }


}


?>