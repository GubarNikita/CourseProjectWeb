<?php
// Подключение к базе данных через db.php
require_once("db.php");

// Проверяем, был ли передан id теста
if (!isset($_GET['test_id']) || empty($_GET['test_id'])) {
    echo json_encode(["error" => "Test ID is required"]);
    exit;
}

$test_id = intval($_GET['test_id']);

// Запрос данных из базы
try {
    // Получение данных теста, включая время
    $stmtTest = "SELECT id, title, description, time FROM tests WHERE id = $test_id";
    $resultTest = mysqli_query($conn, $stmtTest);

    if (mysqli_num_rows($resultTest) === 0) {
        echo json_encode(["error" => "Test not found"]);
        exit;
    }

    $test = mysqli_fetch_assoc($resultTest);

    // Получение вопросов и ответов
    $stmtQuestions = "
        SELECT q.id AS question_id, q.question_text, a.id AS answer_id, a.answer_text, a.is_correct
        FROM questions q
        LEFT JOIN answers a ON q.id = a.question_id
        WHERE q.test_id = $test_id
        ORDER BY q.id, a.id
    ";
    $resultQuestions = mysqli_query($conn, $stmtQuestions);

    $questions = [];
    while ($row = mysqli_fetch_assoc($resultQuestions)) {
        $question_id = $row['question_id'];
        if (!isset($questions[$question_id])) {
            $questions[$question_id] = [
                "id" => $question_id,
                "question_text" => $row['question_text'],
                "answers" => []
            ];
        }
        $questions[$question_id]['answers'][] = [
            "id" => $row['answer_id'],
            "answer_text" => $row['answer_text'],
            "is_correct" => (bool)$row['is_correct']
        ];
    }

    // Перепакуем массив вопросов
    $test['questions'] = array_values($questions);

    // Отправляем JSON ответ
    echo json_encode($test);
} catch (Exception $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>