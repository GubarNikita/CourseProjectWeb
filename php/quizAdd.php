<?php
require_once("db.php");

// Проверяем, что запрос поступил методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Читаем данные из тела запроса
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    // Проверяем наличие необходимых данных в JSON
    if ($data && isset($data['title'], $data['description'], $data['time'], $data['questions'])) {
        $title = mysqli_real_escape_string($conn, $data['title']);
        $description = mysqli_real_escape_string($conn, $data['description']);
        $time = (int) $data['time']; // Преобразуем время в целое число
        $questions = $data['questions'];

        // Вставляем тест в таблицу `tests`
        $sqlTest = "INSERT INTO tests (title, description, time) VALUES ('$title', '$description', '$time')";
        if (mysqli_query($conn, $sqlTest)) {
            $testId = mysqli_insert_id($conn); // Получаем ID добавленного теста

            foreach ($questions as $question) {
                $questionText = mysqli_real_escape_string($conn, $question['text']);
                $answers = $question['answers'];

                // Вставляем вопрос в таблицу `questions`
                $sqlQuestion = "INSERT INTO questions (test_id, question_text) VALUES ('$testId', '$questionText')";
                if (mysqli_query($conn, $sqlQuestion)) {
                    $questionId = mysqli_insert_id($conn); // Получаем ID добавленного вопроса

                    foreach ($answers as $answer) {
                        $answerText = mysqli_real_escape_string($conn, $answer['text']);
                        $isCorrect = $answer['isCorrect'] ? 1 : 0;

                        // Вставляем ответ в таблицу `answers`
                        $sqlAnswer = "INSERT INTO answers (question_id, answer_text, is_correct) 
                                      VALUES ('$questionId', '$answerText', '$isCorrect')";
                        if (!mysqli_query($conn, $sqlAnswer)) {
                            http_response_code(500);
                            echo json_encode(["error" => "Ошибка при добавлении ответа: " . mysqli_error($conn)]);
                            exit();
                        }
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Ошибка при добавлении вопроса: " . mysqli_error($conn)]);
                    exit();
                }
            }

            // Успешное добавление данных
            http_response_code(200);
            echo json_encode(["message" => "Тест успешно добавлен"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Ошибка при добавлении теста: " . mysqli_error($conn)]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Некорректный JSON или отсутствуют необходимые данные"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Метод не поддерживается"]);
}

mysqli_close($conn);
?>