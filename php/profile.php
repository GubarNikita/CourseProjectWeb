<?php
// Подключение к базе данных
require_once("db.php");

// Проверяем, передан ли user_id
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

$user_id = intval($_GET['user_id']);

try {
    // Получение данных пользователя
    $stmtUser = "SELECT * FROM users WHERE id = $user_id";
    $resultUser = mysqli_query($conn, $stmtUser);

    if (mysqli_num_rows($resultUser) === 0) {
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    $user = mysqli_fetch_assoc($resultUser);

    // Получение результатов тестов
    $stmtResults = "SELECT * FROM quiz_results WHERE user_id = $user_id";
    $resultResults = mysqli_query($conn, $stmtResults);

    $quiz_results = [];
    while ($row = mysqli_fetch_assoc($resultResults)) {
        $quiz_results[] = $row;
    }

    // Формируем итоговый массив
    $response = [
        "user" => $user,
        "quiz_results" => $quiz_results
    ];

    // Отправляем JSON-ответ
    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>