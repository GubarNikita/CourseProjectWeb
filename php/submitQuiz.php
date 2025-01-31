<?php 
require_once("db.php");

// Получаем JSON-данные из тела запроса
$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["userId"];
$title = $data["title"];
$correctAnswers = $data["correctAnswers"];
$questionsQuantity = $data["questionsQuantity"];
$datePassed = $data["datePassed"];
$timeTaken = $data["timeTaken"];
$specifiedTime = $data["specifiedTime"];

$sql = "INSERT INTO quiz_results (user_id, title, correct_answers, questions_quantity, date_passed, time_taken, specified_time) 
        VALUES ('$userId', '$title', '$correctAnswers', '$questionsQuantity', '$datePassed', '$timeTaken', '$specifiedTime')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Результат успешно сохранён!"]);
} else {
    echo json_encode(["error" => "Ошибка: " . $conn->error]);
}
?>