<?php

// Create connection
function connect(){
    $conn = new mysqli("localhost", "root", "", "easywebsite");
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

?>