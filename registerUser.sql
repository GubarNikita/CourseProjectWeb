-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 01 2025 г., 02:50
-- Версия сервера: 8.0.30
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `registerUser`
--

-- --------------------------------------------------------

--
-- Структура таблицы `answers`
--

CREATE TABLE `answers` (
  `id` int UNSIGNED NOT NULL,
  `question_id` int UNSIGNED NOT NULL,
  `answer_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_correct` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `is_correct`) VALUES
(25, 12, 'Амазонка', 0),
(26, 12, 'Нил', 1),
(27, 12, 'Миссисипи', 0),
(28, 12, 'Янцзы', 0),
(29, 13, 'Южная Корея', 0),
(30, 13, 'Китай', 0),
(31, 13, 'Япония', 1),
(32, 13, 'Тайвань', 0),
(33, 14, 'Швеция', 1),
(34, 14, 'Индонезия', 0),
(35, 14, 'Филиппины', 0),
(36, 14, 'Канадa', 0),
(37, 15, 'Атлантический', 0),
(38, 15, 'Индийский', 0),
(39, 15, 'Тихий', 1),
(40, 15, 'Северный Ледовитый', 0),
(41, 16, 'Лондон', 0),
(42, 16, 'Рим', 0),
(43, 16, 'Париж', 1),
(44, 16, 'Берлин', 0),
(45, 17, 'Австралия', 0),
(46, 17, 'Канада', 1),
(47, 17, 'США', 0),
(48, 17, 'Россия', 0),
(49, 18, 'Австралия', 0),
(50, 18, 'Антарктида', 1),
(51, 18, 'Южная Америка', 0),
(52, 18, 'Африка', 0),
(53, 19, '1914', 0),
(54, 19, '1939', 1),
(55, 19, '1941', 0),
(56, 19, '1945', 0),
(57, 20, 'Томас Джефферсон', 0),
(58, 20, 'Авраам Линкольн', 0),
(59, 20, 'Джордж Вашингтон', 1),
(60, 20, 'Теодор Рузвельт', 0),
(61, 21, 'США', 0),
(62, 21, 'Россия', 1),
(63, 21, 'Китай', 0),
(64, 21, 'Германия', 0),
(65, 22, 'Леонид Брежнев', 0),
(66, 22, 'Михаил Горбачев', 1),
(67, 22, 'Иосиф Сталин', 0),
(68, 22, 'Никита Хрущев', 0),
(69, 23, 'Рим', 0),
(70, 23, 'Помпеи', 1),
(71, 23, 'Афины', 0),
(72, 23, 'Карфаген', 0),
(73, 24, 'Рамсес II', 0),
(74, 24, 'Тутанхамон', 0),
(75, 24, 'Хеопс', 1),
(76, 24, 'Нефертити', 0),
(77, 25, '1918', 0),
(78, 25, '1919', 1),
(79, 25, '1921', 0),
(80, 25, '1923', 0),
(81, 26, 'answer1', 0),
(82, 26, 'answer2', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE `questions` (
  `id` int UNSIGNED NOT NULL,
  `test_id` int UNSIGNED NOT NULL,
  `question_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `questions`
--

INSERT INTO `questions` (`id`, `test_id`, `question_text`) VALUES
(12, 9, 'Какая река самая длинная в мире?'),
(13, 9, 'Столицей какой страны является Токио?'),
(14, 9, 'Какая страна имеет наибольшее количество островов?'),
(15, 9, 'Какой океан самый крупный?'),
(16, 9, 'В каком городе находится знаменитая Эйфелева башня?'),
(17, 9, 'Какая страна имеет самую длинную береговую линию?'),
(18, 9, 'Какой континент находится на самой южной точке Земли?'),
(19, 10, 'В каком году началась Вторая мировая война?'),
(20, 10, 'Кто был первым президентом США?'),
(21, 10, 'Какое государство первым отправило человека в космос?'),
(22, 10, 'Кто был главой Советского Союза в 1980-х годах?'),
(23, 10, 'Какой древний город был разрушен в 79 году н.э. извержением вулкана?'),
(24, 10, 'Кто был фараоном Египта в период строительства пирамид?'),
(25, 10, 'В каком году был подписан мирный договор, завершивший Первую мировую войну?'),
(26, 11, 'quest1');

-- --------------------------------------------------------

--
-- Структура таблицы `quiz_results`
--

CREATE TABLE `quiz_results` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correct_answers` int NOT NULL,
  `questions_quantity` int NOT NULL,
  `date_passed` date NOT NULL,
  `time_taken` int NOT NULL,
  `specified_time` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `quiz_results`
--

INSERT INTO `quiz_results` (`id`, `user_id`, `title`, `correct_answers`, `questions_quantity`, `date_passed`, `time_taken`, `specified_time`) VALUES
(12, 1, 'География', 7, 7, '2025-01-31', 1, 15),
(13, 1, 'География', 1, 7, '2025-01-31', 1, 15),
(14, 1, 'География', 7, 7, '2025-01-31', 1, 15),
(15, 1, 'География', 0, 7, '2025-01-31', 1, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `tests`
--

CREATE TABLE `tests` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `time` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `tests`
--

INSERT INTO `tests` (`id`, `title`, `description`, `time`) VALUES
(9, 'География', 'Тест на знание географии.', 15),
(10, 'История', 'Тест на общие исторические знания.', 15),
(11, 'test1', 'test1', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `login` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pass` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `surname`, `login`, `pass`, `email`, `role`) VALUES
(1, 'Никита', 'Губарь', 'admin', 'admin', 'GubarNikita@yandex.ru', 'admin');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_question_id` (`question_id`);

--
-- Индексы таблицы `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_test_id` (`test_id`);

--
-- Индексы таблицы `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT для таблицы `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD CONSTRAINT `quiz_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
