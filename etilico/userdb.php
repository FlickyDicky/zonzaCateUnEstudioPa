<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization");

$servername = "localhost";
$username = "etiel";
$password = "";
$dbname = "etilico_user";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$columns = array(
    'name', 'surname', 'dni', 'date_of_birth',
    'postal_code', 'email', 'phone', 'mobile',
    'iban', 'card_number', 'password', 'password2'
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode($_POST["user"], true); // Decode as associative array
    // Create the SQL query
    $sql = "INSERT INTO users (" . implode(', ', $columns) . ") VALUES ('" . implode("', '", $data) . "')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT 
    " . implode(', ', $columns) . "
    FROM 
    users where dni = '" . $_GET['q'] . "'";

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
            echo json_encode($data);
        }
    } else {
        "Error: " . $stmt->error;
    }
}


// Close the connection
$conn->close();
