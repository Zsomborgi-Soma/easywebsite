-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 02. 14:20
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `easywebsite`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stages`
--

CREATE TABLE `stages` (
  `id` int(11) NOT NULL,
  `websiteID` int(11) DEFAULT NULL,
  `stage` int(11) DEFAULT NULL,
  `code` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `stages`
--

INSERT INTO `stages` (`id`, `websiteID`, `stage`, `code`) VALUES
(1, 1, 1, ' '),
(2, 2, 1, '&lt;html lang=&quot;en&quot;&gt;\r\n\r\n&lt;head&gt;\r\n    &lt;meta charset=&quot;UTF-8&quot;&gt;\r\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;\r\n    &lt;title&gt;Restaurant Ordering Site&lt;/title&gt;\r\n    &lt;style&gt;\r\n        body {\r\n            font-family: Arial, sans-serif;\r\n            margin: 0;\r\n            padding: 0;\r\n            background-color: #f8f8f8;\r\n        }\r\n\r\n        header {\r\n            background-color: #333;\r\n            color: #fff;\r\n            padding: 15px;\r\n            text-align: center;\r\n        }\r\n\r\n        .container {\r\n            width: 80%;\r\n            margin: 0 auto;\r\n            overflow: hidden;\r\n        }\r\n\r\n        .menu {\r\n            display: flex;\r\n            flex-wrap: wrap;\r\n            justify-content: space-between;\r\n            margin: 20px 0;\r\n        }\r\n\r\n        .menu-item {\r\n            background-color: #fff;\r\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\r\n            flex-basis: 30%;\r\n            margin-bottom: 20px;\r\n            border-radius: 5px;\r\n            overflow: hidden;\r\n            text-align: center;\r\n        }\r\n\r\n        .menu-item img {\r\n            width: 100%;\r\n            height: 200px;\r\n            object-fit: cover;\r\n        }\r\n\r\n        .menu-item h3 {\r\n            color: #333;\r\n            margin: 15px 0;\r\n        }\r\n\r\n        .order-form {\r\n            background-color: #fff;\r\n            padding: 20px;\r\n            border-radius: 5px;\r\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\r\n        }\r\n\r\n        .order-form input,\r\n        .order-form select {\r\n            width: 100%;\r\n            padding: 10px;\r\n            margin: 10px 0;\r\n            border: 1px solid #ddd;\r\n            border-radius: 5px;\r\n        }\r\n\r\n        .order-form button {\r\n            background-color: #333;\r\n            color: #fff;\r\n            padding: 10px 20px;\r\n            border: none;\r\n            border-radius: 5px;\r\n            cursor: pointer;\r\n        }\r\n    &lt;/style&gt;\r\n&lt;/head&gt;\r\n\r\n&lt;body&gt;\r\n\r\n    &lt;header&gt;\r\n        &lt;h1&gt;Welcome to Our Restaurant&lt;/h1&gt;\r\n        &lt;p&gt;Order your favorite dishes online!&lt;/p&gt;\r\n    &lt;/header&gt;\r\n\r\n    &lt;div class=&quot;container&quot;&gt;\r\n        &lt;div class=&quot;menu&quot;&gt;\r\n            &lt;div class=&quot;menu-item&quot;&gt;\r\n                &lt;img src=&quot;https://via.placeholder.com/300&quot; alt=&quot;Dish 1&quot;&gt;\r\n                &lt;h3&gt;Dish 1&lt;/h3&gt;\r\n                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/p&gt;\r\n            &lt;/div&gt;\r\n            &lt;div class=&quot;menu-item&quot;&gt;\r\n                &lt;img src=&quot;https://via.placeholder.com/300&quot; alt=&quot;Dish 2&quot;&gt;\r\n                &lt;h3&gt;Dish 2&lt;/h3&gt;\r\n                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/p&gt;\r\n            &lt;/div&gt;\r\n            &lt;div class=&quot;menu-item&quot;&gt;\r\n                &lt;img src=&quot;https://via.placeholder.com/300&quot; alt=&quot;Dish 3&quot;&gt;\r\n                &lt;h3&gt;Dish 3&lt;/h3&gt;\r\n                &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/p&gt;\r\n            &lt;/div&gt;\r\n        &lt;/div&gt;\r\n\r\n        &lt;div class=&quot;order-form&quot;&gt;\r\n            &lt;h2&gt;Place Your Order&lt;/h2&gt;\r\n            &lt;form&gt;\r\n                &lt;input type=&quot;text&quot; name=&quot;name&quot; placeholder=&quot;Your Name&quot; required&gt;\r\n                &lt;input type=&quot;email&quot; name=&quot;email&quot; placeholder=&quot;Your Email&quot; required&gt;\r\n                &lt;select name=&quot;dish&quot;&gt;\r\n                    &lt;option value=&quot;dish1&quot;&gt;Dish 1&lt;/option&gt;\r\n                    &lt;option value=&quot;dish2&quot;&gt;Dish 2&lt;/option&gt;\r\n                    &lt;option value=&quot;dish3&quot;&gt;Dish 3&lt;/option&gt;\r\n                &lt;/select&gt;\r\n                &lt;input type=&quot;number&quot; name=&quot;quantity&quot; min=&quot;1&quot; placeholder=&quot;Quantity&quot; required&gt;\r\n                &lt;button type=&quot;submit&quot;&gt;Order Now&lt;/button&gt;\r\n            &lt;/form&gt;\r\n        &lt;/div&gt;\r\n    &lt;/div&gt;\r\n\r\n&lt;/body&gt;\r\n\r\n&lt;/html&gt;');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `username`, `password`) VALUES
(1, 'admin', 'adminpassword');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `websites`
--

CREATE TABLE `websites` (
  `ID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `websites`
--

INSERT INTO `websites` (`ID`, `userID`, `title`, `theme`, `description`) VALUES
(1, 1, 'f1', 'f1', 'creating test'),
(2, 1, 'restaurant ordering page', 'food', 'restaurant full ordering page without script and fully designed');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `stages`
--
ALTER TABLE `stages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `websiteID` (`websiteID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `stages`
--
ALTER TABLE `stages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `websites`
--
ALTER TABLE `websites`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `stages`
--
ALTER TABLE `stages`
  ADD CONSTRAINT `stages_ibfk_1` FOREIGN KEY (`websiteID`) REFERENCES `websites` (`ID`);

--
-- Megkötések a táblához `websites`
--
ALTER TABLE `websites`
  ADD CONSTRAINT `websites_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
