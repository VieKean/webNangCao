-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 24, 2024 lúc 09:18 AM
-- Phiên bản máy phục vụ: 8.3.0
-- Phiên bản PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `webnangcao_node`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sex` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','user','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_status` enum('hoạt động','tạm ngưng','bị khóa') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'hoạt động',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `address`, `sex`, `email`, `role`, `created_at`, `account_status`) VALUES
('USER001', 'VieKean', '123', 'Lê Vĩ Khang', 'Vĩnh Thuận, Kiên Giang', 'male', 'viekean101@gmail.com', 'user', '2024-10-24 05:01:16', 'hoạt động'),
('USER002', 'haphuong', '123', 'Đỗ Hà Phương', 'Vĩnh Thuận, Kiên Giang', '', 'viekeanmusssssic@gmail.com', 'user', '2024-10-24 05:01:16', 'hoạt động'),
('USER003', 'khang', '', 'Le Vi Khang 1', 'hem 51', 'male', 'sdfds@xn--sdxfdg-ita.com', 'user', '2024-10-24 05:01:16', 'hoạt động'),
('USER007', 'Super Admin', '$2b$10$dVvKycrMS8so4jGu5tBs5.Gt6/SP2v2jDnkOyNMEpU7.De7ld2RZu', 'Lê Vĩ Khang', 'Kiên Giang', 'male', 'superadmin@gmail.com', 'admin', '2024-10-24 05:01:16', 'hoạt động'),
('USER008', 'u7', '$2b$10$x53IEbSjTqGrs5fjvEdi4.VViqbZa75tzLOc3Dq5s4Wg9FVVgpk/u', 'Lê Vĩ Khang', 'hem 51', 'male', 'lvkhang0007@gmail.com', 'guest', '2024-10-24 12:11:08', 'hoạt động');

--
-- Bẫy `users`
--
DROP TRIGGER IF EXISTS `before_insert_user`;
DELIMITER $$
CREATE TRIGGER `before_insert_user` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
    DECLARE max_id INT;
    DECLARE new_id VARCHAR(7);

    -- Lấy phần số lớn nhất hiện tại từ cột id
    SELECT IFNULL(MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)), 0) INTO max_id FROM users;

    -- Tạo id mới với phần số tăng lên 1
    SET new_id = CONCAT('USER', LPAD(max_id + 1, 3, '0'));

    -- Gán id mới cho bản ghi
    SET NEW.id = new_id;
END
$$
DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
