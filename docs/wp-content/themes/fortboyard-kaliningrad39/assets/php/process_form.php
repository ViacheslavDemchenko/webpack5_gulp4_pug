<?php
// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);

    // Проверяем, что поля заполнены
    if (!empty($name) && !empty($phone)) {
        
        // Настраиваем параметры письма
        $to = "frontend-ninja@yandex.ru";  // Доменная почта
        $subject = "Новая заявка с сайта skovrov.ru";
        $message = "Имя: " . $name . "\nТелефон: " . $phone;
        $headers = "From: frontend-ninja@yandex.ru" . "\r\n" .
                   "Reply-To: frontend-ninja@yandex.ru" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();
        
        // Отправляем письмо
        if (mail($to, $subject, $message, $headers)) {
            // Если отправка успешна, возвращаем успешный ответ
            echo json_encode(["status" => "success", "message" => "Сообщение успешно отправлено"]);
        } else {
            // Если произошла ошибка при отправке
            echo json_encode(["status" => "error", "message" => "Ошибка при отправке сообщения"]);
        }
    } else {
        // Если поля не заполнены, возвращаем ошибку
        echo json_encode(["status" => "error", "message" => "Заполните все поля"]);
    }
} else {
    // Если форма не отправлена методом POST
    echo json_encode(["status" => "error", "message" => "Некорректный метод отправки"]);
}
?>
