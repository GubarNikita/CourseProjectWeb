<?php
require_once("db.php");
$username = $_POST["username"];
$surname = $_POST["surname"];
$login = $_POST["login"];
$pass = $_POST["pass"];
$repeatpass = $_POST["repeatpass"];
$email = $_POST["email"];


$sql = "INSERT INTO `users` (username, surname, login, pass, email) VALUES ('$username', '$surname','$login', '$pass', '$email')";
if($conn -> query($sql) === TRUE){
    echo "Вы успешно зарегистрировались!";
} else {
    echo "Ошибка: ". $conn->error;
}
?>