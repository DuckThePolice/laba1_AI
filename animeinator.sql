-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 14 2024 г., 13:49
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `animeinator`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Entries`
--

CREATE TABLE `Entries` (
  `id` bigint NOT NULL,
  `yes_root` bigint DEFAULT NULL,
  `no_root` bigint DEFAULT NULL,
  `text` text NOT NULL,
  `final` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Entries`
--

INSERT INTO `Entries` (`id`, `yes_root`, `no_root`, `text`, `final`) VALUES
(1, 22, 3, 'Это сёнен?', 0),
(2, NULL, NULL, 'Наруто', 1),
(3, 28, 26, 'Это аниме основано на манге?', 0),
(4, NULL, NULL, 'Врата Штейна', 1),
(7, NULL, NULL, 'Сага о Винланде', 1),
(21, NULL, NULL, 'Гинтама', 1),
(22, 24, 32, 'Это чистая комедия?', 0),
(23, NULL, NULL, 'Мелочи жизни', 1),
(24, 23, 21, 'У этого аниме один сезон?', 0),
(25, NULL, NULL, 'Амогус', 1),
(26, 25, 30, 'Это аниме американское?', 0),
(27, NULL, NULL, 'Необъятный океан', 1),
(28, 36, 7, 'Это аниме комедия?', 0),
(29, NULL, NULL, 'Иная', 1),
(30, 29, 4, 'Это аниме основано на книге?', 0),
(31, NULL, NULL, 'Моя геройская академия', 1),
(32, 34, 2, 'Это аниме современное?', 0),
(33, NULL, NULL, 'Семья шпиона', 1),
(34, 33, 31, 'Это аниме про шпиона?', 0),
(35, NULL, NULL, 'Подземелье вкусностей', 1),
(36, 35, 27, 'Это аниме про еду?', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Entries`
--
ALTER TABLE `Entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `yes_root` (`yes_root`),
  ADD KEY `no_root` (`no_root`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Entries`
--
ALTER TABLE `Entries`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Entries`
--
ALTER TABLE `Entries`
  ADD CONSTRAINT `entries_ibfk_1` FOREIGN KEY (`yes_root`) REFERENCES `Entries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `entries_ibfk_2` FOREIGN KEY (`no_root`) REFERENCES `Entries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
