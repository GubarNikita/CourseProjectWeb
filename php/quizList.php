<?php
require_once("db.php");

// Проверяем, что запрос поступил методом GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Запрос всех тестов из таблицы tests
    $sql = "SELECT id, title, description FROM tests";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $tests = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $tests[] = $row; // Добавляем тест в массив
        }

        // Возвращаем список тестов в формате JSON
        http_response_code(200);
        echo json_encode($tests);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка получения данных: " . mysqli_error($conn)]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Метод не поддерживается"]);
}

mysqli_close($conn);
?>