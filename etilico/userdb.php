<?php
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etilico_user";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 
name, 
surname, 
dni, 
date_of_birth, 
postal_code, 
email, 
phone, 
mobile, 
iban, 
card_number, 
password, 
password2
FROM 
users where dni =". $_GET['q'];

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $myObj = new stdClass();
        $myObj->name = $row['name'];
        $myObj->surname = $row['surname'];
        $myObj->dni = $row['dni'];
        $myObj->date = $row['date_of_birth'];
        $myObj->cp = $row['postal_code'];
        $myObj->mail = $row['email'];
        $myObj->phone = $row['phone'];
        $myObj->mobile = $row['mobile'];
        $myObj->iban = $row['iban'];
        $myObj->card = $row['card_number'];
        $myObj->password = $row['password'];
        $myObj->password2 = $row['password2'];
        
        $data[] = $myObj; // Add the object to the array
        echo $data;
    }
} else {
    echo "0 results";
}
$conn->close();
