 
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


if (isset($_POST["user"])) {

    $obj = json_decode($_POST["user"], false);
    $myJSON = json_encode($obj);
    echo ($myJSON);
} else {
    $myObj = new stdClass;
    $myObj->name = "Pepe";
    $myObj->surname = "Archivo Php";
    $myObj->dni = "12345678X";
    $myObj->date = "22/09/2000";
    $myObj->cp = 35500;
    $myObj->mail = "pepe@gmail.com";
    $myObj->phone = "928666666";
    $myObj->mobile = "666999666";
    $myObj->iban = "ES7921000813610123456789";
    $myObj->card = "4539955085883327";
    $myObj->password = "hola1234567@";
    $myObj->password2 = "hola1234567@";
    $myJSON = json_encode($myObj);
    echo $myJSON;
}
