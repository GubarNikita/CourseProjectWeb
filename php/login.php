<?php
require_once("db.php");
require_once('../vendor/autoload.php');
use \Firebase\JWT\JWT;

$login = $_POST["login"];
$pass = $_POST["pass"];

header('Content-Type: application/json');

if (empty($login) || empty($pass)) {
    echo json_encode([
        "status" => "error",
        "message" => "Заполните все поля"
    ]);
} else {
    $sql = "SELECT * FROM `users` WHERE login = '$login' AND pass = '$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Генерация JWT
        $secret_key = "your_secret_key";
        $issued_at = time();
        $payload = [
            "login" => $user['login'],
            "id" => $user['id'],
            "role" => $user['role'], // Добавляем роль (user/admin)
            "iat" => $issued_at,
        ];

        try {
            // Кодируем JWT с алгоритмом HS256
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            
            echo json_encode([
                "status" => "success",
                "message" => "Добро пожаловать",
                "token" => $jwt,
                "id" => $user['id'],
                "role" => $user['role'] // Отправляем роль в ответе
            ]);
        } catch (Exception $e) {
            echo json_encode([
                "status" => "error",
                "message" => "Ошибка при генерации токена: " . $e->getMessage()
            ]);
        }
        
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Нет такого пользователя"
        ]);
    }
}
?>