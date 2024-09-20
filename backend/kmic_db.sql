-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2024 at 11:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kmic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `bannerName` varchar(30) NOT NULL,
  `imageBanner` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `uuid`, `bannerName`, `imageBanner`, `createdAt`, `updatedAt`) VALUES
(2, 'aa38b861-7dbc-45f0-81f8-f4eb88c27dd2', 'Welcome', '1721308917720-153470796.png', '2024-07-12 05:45:44', '2024-07-18 13:21:57'),
(8, 'a94420e0-9e7d-4ea9-afe3-605b60cc88aa', 'KMIC', '1721308939172-660805111.png', '2024-07-14 13:15:36', '2024-07-18 13:22:19'),
(9, 'b0986009-5ad7-47c9-9de7-ce14b25b2635', 'Cabang Olahraga KMIC', '1721308950845-568533674.png', '2024-07-18 05:34:19', '2024-07-18 13:22:30'),
(10, '1da8fa76-1c54-4598-a597-86161cea78dc', 'Coming Soon KayuManisRun2024', '1721308961175-665812680.png', '2024-07-18 05:34:44', '2024-07-18 13:22:41');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `lombaId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `uuid`, `categoryName`, `lombaId`, `createdAt`, `updatedAt`) VALUES
(22, 'f71f0e25-5498-45c5-a927-ae84337cc008', 'Remaja', 22, '2024-07-14 07:04:12', '2024-07-14 07:04:12'),
(23, '73d86b12-9481-4560-a12b-692e389c13ac', 'Dewasa', 22, '2024-07-14 07:04:29', '2024-07-14 07:04:29'),
(24, '495ac952-c139-4245-8994-cc3f483e2907', 'Ganda Putra', 23, '2024-07-14 11:09:25', '2024-07-14 11:09:25'),
(25, '94167c19-b18f-47e1-9008-df9b3daf0408', 'Single Putra', 23, '2024-07-14 11:09:41', '2024-07-14 11:09:41'),
(26, 'f03ba85b-06e5-4fe9-9b16-5a58d2019e11', 'Putra', 24, '2024-07-15 07:47:05', '2024-07-20 08:54:29'),
(27, '585806f5-c709-4862-9cf7-b19cf324b944', 'Putri', 24, '2024-07-15 07:48:14', '2024-07-20 08:54:37'),
(28, 'adf806ee-45a3-4e63-b4aa-74ab6dd05ca7', 'Ganda Putri', 23, '2024-07-20 09:08:49', '2024-07-20 09:09:52');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard`
--

CREATE TABLE `dashboard` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `lombaId` int(11) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `categoryId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`categoryId`)),
  `aturanLomba` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard`
--

INSERT INTO `dashboard` (`id`, `uuid`, `lombaId`, `imageUrl`, `categoryId`, `aturanLomba`, `createdAt`, `updatedAt`) VALUES
(1, 'a1feb7b5-7c59-46e2-8cff-0cc8ec3c421e', 22, '1720951989694-437120370.jpg', '[22,23]', '<ol><li>Tim harus hadir di lokasi pertandingan minimal 15 menit sebelum kick-off. Keterlambatan lebih dari 5 menit dapat mengakibatkan tim dianggap gugur</li><li>Pertandingan berlangsung selama 40 menit, dibagi menjadi dua babak, masing-masing babak berdurasi 20 menit.</li><li>Pelanggaran diberi hukuman tendangan bebas langsung atau tidak langsung, tergantung pada beratnya pelanggaran. Tendangan bebas langsung dapat dilakukan segera dan menghasilkan gol. Tendangan bebas tidak langsung harus dilakukan oleh pemain lain sebelum dapat dicetak.</li><li>Pergantian dapat dilakukan kapan saja selama pertandingan, tetapi pemain yang memasuki permainan harus menyentuh garis tengah sebelum aktif.</li></ol>', '2024-07-14 10:13:09', '2024-07-20 09:03:37'),
(2, 'a4efbe3d-7285-4a5d-b3be-20dac9b03300', 24, '1721111935186-879191918.jpg', '[26,27]', '<ol><li class=\"ql-align-justify\">Tim harus hadir di lokasi pertandingan minimal 15 menit sebelum kick-off. Keterlambatan lebih dari 5 menit dapat mengakibatkan tim dianggap gugur</li><li>Pergantian pemain dapat dilakukan kapan saja selama pertandingan, tetapi pemain pengganti tidak dapat kembali bermain pada set yang sama.</li><li>Setiap tim memiliki hak untuk meminta time-out dua kali per set. Time-out berlangsung selama 30 detik.</li><li>Wasit bertanggung jawab untuk menegakkan peraturan dan memastikan kelancaran pertandingan. Keputusan wasit bersifat final.</li></ol>', '2024-07-14 11:10:15', '2024-07-20 09:06:28'),
(3, '3ee3d072-bc21-4e14-b0a7-42e1e267459f', 23, '1720955598592-849067722.jpg', '[28,25,24]', '<ol><li class=\"ql-align-justify\">Tim harus hadir di lokasi pertandingan minimal 15 menit sebelum kick-off. Keterlambatan lebih dari 5 menit dapat mengakibatkan tim dianggap gugur</li><li>Pergantian pemain hanya dapat dilakukan pada awal set dan dengan persetujuan wasit.</li><li>Pemain berhak atas istirahat selama 60 detik di antara set pertama dan kedua, serta di antara set kedua dan ketiga.</li><li>Wasit bertanggung jawab untuk menegakkan peraturan dan memastikan kelancaran pertandingan. Keputusan wasit bersifat final.</li></ol>', '2024-07-14 11:13:18', '2024-07-20 09:09:09');

-- --------------------------------------------------------

--
-- Table structure for table `dokumentasi`
--

CREATE TABLE `dokumentasi` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `kegiatanName` varchar(30) NOT NULL,
  `imageKegiatan` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokumentasi`
--

INSERT INTO `dokumentasi` (`id`, `uuid`, `kegiatanName`, `imageKegiatan`, `createdAt`, `updatedAt`) VALUES
(1, '92223f36-7b5b-4500-ae84-2324025f8eee', 'Katar Internal Cup 2022', '1721315092930-224229098.jpg', '2024-07-12 05:42:30', '2024-07-18 15:04:52'),
(5, 'f38e3f02-369d-4a09-b093-e8b2782140de', 'Katar Internal Cup 2022', '1721315135676-935467633.jpg', '2024-07-15 01:05:52', '2024-07-18 15:05:35'),
(7, '11ada373-58ea-443f-8aed-c29dde9dc54d', 'Katar Internal Cup 2022', '1721315064227-577649314.jpg', '2024-07-18 15:04:24', '2024-07-18 15:04:24'),
(8, '4220d47c-a197-4bc6-b10a-59e14371b548', 'Katar Internal Cup 2022', '1721315160526-19240597.jpg', '2024-07-18 15:06:00', '2024-07-18 15:06:00'),
(9, '04eefc2c-e8c1-4c1f-8af0-48dc0564a483', 'Katar Internal Cup 2023', '1721315191188-396586484.JPG', '2024-07-18 15:06:31', '2024-07-18 15:06:31'),
(10, '48533421-edf2-468d-8910-a2252e7f1322', 'Katar Internal Cup 2023', '1721315219420-220559758.JPG', '2024-07-18 15:06:59', '2024-07-18 15:06:59'),
(11, '8727982c-087c-4252-8e58-8172d40b2a7c', 'Kayu Manis Run 2023', '1721316400135-960805018.jpeg', '2024-07-18 15:26:40', '2024-07-18 15:26:40'),
(12, '9e940df0-a89a-4e53-a86d-36f1ca0b22ec', 'Kayu Manis Run 2023', '1721316430555-949691563.jpeg', '2024-07-18 15:27:10', '2024-07-18 15:27:10'),
(13, '7fe2e34a-1f33-4aeb-99bf-a4ff54392ea3', 'Kayu Manis Run 2023', '1721316515696-886465894.jpeg', '2024-07-18 15:28:35', '2024-07-18 15:28:35');

-- --------------------------------------------------------

--
-- Table structure for table `lomba`
--

CREATE TABLE `lomba` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `lombaName` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lomba`
--

INSERT INTO `lomba` (`id`, `uuid`, `lombaName`, `createdAt`, `updatedAt`) VALUES
(22, '90bbb250-945c-4495-b8cb-62dd60f2d760', 'Futsal', '2024-07-14 07:03:39', '2024-07-14 07:03:45'),
(23, '7384a67b-b166-41b0-a04d-9a62a695c18f', 'Badminton', '2024-07-14 07:03:52', '2024-07-14 07:03:52'),
(24, '25808258-0c84-40f2-93d5-be024e8321e9', 'Voli', '2024-07-15 07:46:10', '2024-07-18 05:42:02');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `name` varchar(30) NOT NULL,
  `rw` int(11) DEFAULT NULL,
  `lombaId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`id`, `uuid`, `name`, `rw`, `lombaId`, `categoryId`, `userId`, `createdAt`, `updatedAt`) VALUES
(26, 'f71a0e3e-6f52-4df2-a1a1-f304f0118779', 'tiara', 8, 23, 25, 3, '2024-07-14 12:17:41', '2024-07-19 04:52:00'),
(27, 'a7dd0b45-c783-4fb3-863b-255a8abb37c5', 'tiara admin updated 2', 8, 23, 24, 1, '2024-07-15 07:45:27', '2024-07-19 04:12:30'),
(28, 'e8d7e592-295c-4e20-8c4a-01edafc640b9', 'Hasbi', 7, 24, 26, 1, '2024-07-15 07:48:51', '2024-07-15 07:48:51'),
(30, 'c32f82ec-44b2-4e4a-9df6-59255976e328', 'naurah, sasya, zahra, sabrina', 2, 22, 23, 3, '2024-07-24 10:47:20', '2024-08-28 11:28:59');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-OHdZ-idAE8_BoUIRe0z9Fxz6V86ua17', '2024-08-29 10:09:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('-uTAIPb9hBpZGaVELgSM-ooDrkBwK71c', '2024-08-29 11:18:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:18:01', '2024-08-28 11:18:01'),
('-zBqDbM_UD5sw4Vv67qHmjSQBXAH2ygj', '2024-08-29 12:21:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:34', '2024-08-28 12:21:34'),
('-_K2n3uodgvNwP-swtr_hthwHuWqABGw', '2024-08-29 12:21:32', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('3yfJMVVixLuJW_WMjLzxEDwD9Kw4IxRt', '2024-08-29 12:57:17', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:57:17', '2024-08-28 12:57:17'),
('4EJfioDSLy98rfb8FKLi5trs7Ap3tcsQ', '2024-08-29 10:55:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:55:45', '2024-08-28 10:55:45'),
('5kFqsmCb1NvBl18uoLKNLVxKLeBSk9Aa', '2024-08-29 13:11:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"0dd08cca-5423-4c70-958f-6ee08426b20e\"}', '2024-08-28 12:21:34', '2024-08-28 13:11:55'),
('6d6h-Ys9vptprOqjPxAHrhayMP1lzRUY', '2024-08-29 11:38:17', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:17', '2024-08-28 11:38:17'),
('7hINVDOoUcTxE-MZjqV7Gz-X_sJqDRCt', '2024-08-29 13:08:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 13:08:18', '2024-08-28 13:08:18'),
('7KbbWQMmLGARMovSNmqC3fz1uHgTDOXB', '2024-08-29 10:09:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:43', '2024-08-28 10:09:43'),
('7VQtkeBhefhSXKeUqKV5L2JYGzesCniS', '2024-08-29 10:55:19', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:55:19', '2024-08-28 10:55:19'),
('8D8C66qECPnjXcMmQm5ISd5N_C70Z2Io', '2024-08-29 10:44:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:44:00', '2024-08-28 10:44:00'),
('8j9dMDpm74H_Ll12-PYDWu6mJ4rs9n_o', '2024-08-29 09:24:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:24:50', '2024-08-28 09:24:50'),
('9Ajx_O4XrDONizvsXlIruE_-958Aot9v', '2024-08-29 10:09:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('9dOb-ILoXYdLxCtWqt9JoDN4w-wuPJat', '2024-08-29 11:27:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:27:50', '2024-08-28 11:27:50'),
('aDaI2xBuDo38gOWXHzc7V9D1HABDsvzI', '2024-08-29 12:21:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('aqItBBKIYJxU3Sb_BEBLyiFurMiHaubs', '2024-08-29 10:57:29', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:57:29', '2024-08-28 10:57:29'),
('ArjTua2wlfSkhpivh4S8aPU9ff233s_u', '2024-08-29 10:30:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:30:12', '2024-08-28 10:30:12'),
('bAP9M9qVS7cxEgy9TLi_aiU7dkcFerTd', '2024-08-29 11:28:59', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:28:59', '2024-08-28 11:28:59'),
('BCgwbcvyglxqcGXUA_JDR6p-yprTLr7n', '2024-08-29 10:08:12', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:08:12', '2024-08-28 10:08:12'),
('bJaSvqN6_Fq4oWnWnrFSE8MP5ZTnlh0j', '2024-08-29 11:38:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:05', '2024-08-28 11:38:05'),
('cLUGz9SYjRUJB1mPICvFNJBAie1rFcSp', '2024-08-29 10:08:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:08:02', '2024-08-28 10:08:02'),
('CMJSDmofai67dToHNXci2WNV0oiK4ZZd', '2024-08-29 12:21:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:34', '2024-08-28 12:21:34'),
('d2zfjmY92LYQicQV9SSdnB-MxpOGwuQ3', '2024-08-29 10:37:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:37:02', '2024-08-28 10:37:02'),
('EEorcaKsoL42OkhW1caHjbNi2c4uxeII', '2024-08-29 11:10:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:10:33', '2024-08-28 11:10:33'),
('EIDqJQXEW9C8JrDkNMWCGv6DbEPIw92F', '2024-08-29 11:34:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:34:09', '2024-08-28 11:34:09'),
('EO_u0lQJtZLYKzh8NDnld6nrqrbLCDuS', '2024-08-29 13:01:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 13:01:38', '2024-08-28 13:01:38'),
('eVaO1VVfy7awQLj_Q9uiZiuvMQCfbic5', '2024-08-29 12:21:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('EveK5_io-BQ1idG5dYSacwyl_CEABtvY', '2024-08-29 11:38:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:24', '2024-08-28 11:38:24'),
('Exlhr7_y6vAzUV0WuBmtAqUHWPmfQY_Y', '2024-08-29 10:57:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:57:42', '2024-08-28 10:57:42'),
('F4w4_-ENbdREU4n-grzL_CZxDMq8hqU7', '2024-08-29 12:16:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:16:22', '2024-08-28 12:16:22'),
('Fb0dycWnfexEqo0Hi7kCqkWYepth4_9w', '2024-08-29 10:20:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:20:16', '2024-08-28 10:20:16'),
('FbT2soXQiTZ5zz-uDkUcuvgz-jhLE9Th', '2024-08-29 09:28:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:28:01', '2024-08-28 09:28:01'),
('fNJqIBr6HtoiEYuzsp7eL9fdSNzUkEs_', '2024-08-29 10:09:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('fo1U1saU7p8kX6ET92djSgVzwyjQBAvS', '2024-08-29 10:42:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:42:49', '2024-08-28 10:42:49'),
('Grd22wwmfYfHrFb5tcfB-WdxKQLwkfRM', '2024-08-29 10:13:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:13:26', '2024-08-28 10:13:26'),
('hTA5WMaSIHzLw137KM3KnSQXBNkYy3wD', '2024-08-29 12:21:32', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('hVzjKU9CrwvjavC_rnjdnEf2_eT4nGyz', '2024-08-29 09:26:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:26:14', '2024-08-28 09:26:14'),
('hwceY-wi65xlYCC-tdwbpR2f7OLpTRxq', '2024-08-29 12:21:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:34', '2024-08-28 12:21:34'),
('hwvXjrT3T3b-IrJmu84zh01ECZw9FqFL', '2024-08-29 12:36:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:36:10', '2024-08-28 12:36:10'),
('i4jJ0x92XlgtdtKuAdxSS3wRmJTht4Z9', '2024-08-29 10:56:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:56:16', '2024-08-28 10:56:16'),
('i9-ZAV6Q8cx6pJPg0K9AanRB43aoMP5e', '2024-08-29 10:18:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:18:04', '2024-08-28 10:18:04'),
('iA9QbZjhNbq34EtltAnAe_X3UqyODXZS', '2024-08-29 10:34:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:34:02', '2024-08-28 10:34:02'),
('ibzmqFPUsaUZFz5Ac7u2vIfX_G9mvaQN', '2024-08-29 10:10:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:10:03', '2024-08-28 10:10:03'),
('JaXoJg1EBvljcJGqwFpw9TjFrKdYH688', '2024-08-29 11:20:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:20:14', '2024-08-28 11:20:14'),
('jh-4qeaYW5OJul3Ac1lQsl8umiKL_jx2', '2024-08-29 11:28:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:28:52', '2024-08-28 11:28:52'),
('KmwDU3GFvxOL_mMlvo6sd4_MBSwBWkci', '2024-08-29 11:05:05', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:05:05', '2024-08-28 11:05:05'),
('kU_AiP7SrX0F1AS9eCyuoNhch5j7tq2L', '2024-08-29 10:09:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('MEKG3JlB7zF85hzWRYU9LAInZdJoXJCd', '2024-08-29 11:13:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:13:53', '2024-08-28 11:13:53'),
('NEh9zuLvzrr57bD-XkRGf1TSqFFkSmE_', '2024-08-29 11:18:54', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:18:54', '2024-08-28 11:18:54'),
('obkZfX_0h4GvB26CcuzY14A86DijvBTH', '2024-08-29 04:55:15', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 04:55:15', '2024-08-28 04:55:15'),
('ofk3i3qz1PFnmkZauL96d96fEWardfaq', '2024-08-29 10:28:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:28:03', '2024-08-28 10:28:03'),
('Oyuaz7XVCKlEMbX5kLSbthWC3GQYhD22', '2024-08-29 10:25:44', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:25:44', '2024-08-28 10:25:44'),
('pC_SkmbJtyKGrhrxM84Z1i4eBFge58nx', '2024-08-29 12:21:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:52', '2024-08-28 12:21:52'),
('PrOVy8Pp_vQlmed3uXA0-ll0TWLix-R5', '2024-08-29 11:31:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:31:08', '2024-08-28 11:31:08'),
('PtAUqN1KlQbCh744-NLdLjnuOlsxaYsx', '2024-08-29 10:09:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:43', '2024-08-28 10:09:43'),
('qGoYf3kt2XTrKEqJ6ZQoYI3iSB1Jvumc', '2024-08-29 11:38:27', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:27', '2024-08-28 11:38:27'),
('qp8AHSpkD-itaeDZuwMYmVjRIBWflntG', '2024-08-29 13:08:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 13:08:45', '2024-08-28 13:08:45'),
('r0JCIJ9-g-grKSWja56hnYzeRuxcxpDs', '2024-08-29 10:16:46', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:16:46', '2024-08-28 10:16:46'),
('r8iT27mHAqH5bP0o4u-g9AGZYJBUvyHD', '2024-08-29 11:38:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:22', '2024-08-28 11:38:22'),
('RcdQYm--laPNdQFMDgYNK9-wMjAoJ6nh', '2024-08-29 11:38:26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:38:26', '2024-08-28 11:38:26'),
('RcpJgnaPABz7gPbvsXjQvZQhdMzofAAp', '2024-08-29 11:13:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:13:00', '2024-08-28 11:13:00'),
('rGPdrlZ_lX44iP2wegc5uH7QdjZOLjaR', '2024-08-29 09:25:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:25:45', '2024-08-28 09:25:45'),
('RKv5BDRW8qB2zE148uCnpFlnEqB8SD12', '2024-08-29 10:19:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:19:22', '2024-08-28 10:19:22'),
('rqKrYwErS8CnOb_1jOe9pMmLE5j4h0_N', '2024-08-29 11:37:45', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 11:37:45', '2024-08-28 11:37:45'),
('rQzVcBZy1K8Meri4jf1nFnNvyJSPlk_R', '2024-08-29 10:20:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:43', '2024-08-28 10:20:09'),
('sEUqJoZ5NlK5Z3Uj8D3gOSAexiCQkcYs', '2024-08-29 09:23:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:23:10', '2024-08-28 09:23:10'),
('SynwV70r6CRHdzuyq1FXR_hCHW0boGWA', '2024-08-29 10:09:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:43', '2024-08-28 10:09:43'),
('SZVbKX3hFcv44zSLByX5bJp-Nb6YaHVD', '2024-08-29 10:11:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:11:14', '2024-08-28 10:11:14'),
('TRsyAlE_CSRca9uxWUayl0WVUvACUm3v', '2024-08-29 12:16:13', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:16:13', '2024-08-28 12:16:13'),
('TU1MYB5qP4uwfwxEdTEOQdNffJ6K9WiA', '2024-08-29 10:25:25', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:25:26', '2024-08-28 10:25:26'),
('u20jodOgtKshyFunJQl2LaKgGhai8dr7', '2024-08-29 10:25:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:25:38', '2024-08-28 10:25:38'),
('uC4MsM2TP-n11HnfOWfCpBnUoO8zLrgv', '2024-08-29 12:21:32', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('UPGw_P2KI8YLbDYpA8f1ymgPjBr3kQdp', '2024-08-29 10:09:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('vEMkOOxQJwRxUkUZhpENyw_QKfLcmKNR', '2024-08-29 10:09:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:09:42', '2024-08-28 10:09:42'),
('wNJh14jUpiXl3ZVNUGXp1-w4NnGOVOY1', '2024-08-29 13:05:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"0dd08cca-5423-4c70-958f-6ee08426b20e\"}', '2024-08-28 09:37:53', '2024-08-28 13:05:48'),
('XFBWTQDwJfoTDLtRw31kN9XZvoHAsSzz', '2024-08-29 09:26:09', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 09:26:09', '2024-08-28 09:26:09'),
('xnVeJ6DMf1Eozmn1MroSoGGIIYyVpZeg', '2024-08-29 10:40:16', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:40:16', '2024-08-28 10:40:16'),
('xTtExyfRaL3e9NLp4nYX6sGAcCcYNHNw', '2024-08-29 12:21:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 12:21:33', '2024-08-28 12:21:33'),
('xw7y44AwmoRK-9SHuBRvIuXpH5IVwkXZ', '2024-08-29 10:16:40', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:16:41', '2024-08-28 10:16:41'),
('ycXtsk6dvhV9OVzsiLofXSTIgfC1mwCN', '2024-08-29 10:23:28', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 10:23:28', '2024-08-28 10:23:28'),
('_vWG1T9XhOTzdk0PwnoYdbbuYgHfskhQ', '2024-08-29 13:01:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2024-08-28 13:01:55', '2024-08-28 13:01:55');

-- --------------------------------------------------------

--
-- Table structure for table `tentang_kegiatan`
--

CREATE TABLE `tentang_kegiatan` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `judulKegiatan` varchar(30) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `keterangan` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tentang_kegiatan`
--

INSERT INTO `tentang_kegiatan` (`id`, `uuid`, `judulKegiatan`, `image`, `tanggal`, `keterangan`, `createdAt`, `updatedAt`) VALUES
(3, '2ad5b843-b6a4-46b9-8a2b-7dc9c1ad637b', 'Kayu Manis Internal Cup 2024', '1721140114721-703379531.png', '2024-12-22 00:00:00', '<p><span style=\"color: rgb(16, 55, 84);\">Katar Internal Cup (KIC) pada dua tahun sebelumnya kini berevolusi menjadi </span><strong style=\"color: rgb(16, 55, 84);\">Kayu Manis Internal Cup (KMIC)</strong><span style=\"color: rgb(16, 55, 84);\"> dengan semangat memberikan wadah persaudaraan dan perkembangan melalui perlombaan olahraga dan orkestrasi pagelaran seni. Kegiatan ini diharapkan dapat menjadi festival tahunan dari Kelurahan Kayu Manis yang memberikan banyak manfaat bagi Kelurahan Kayu Manis.</span></p>', '2024-07-16 04:33:40', '2024-07-18 05:54:14'),
(4, '0121640c-f314-4343-9a57-f7802b103ba3', 'Kayu Manis Run ', '1721308431972-517776822.png', '2024-10-30 00:00:00', '<p>Kayu Manis Run merupakan lomba marathon, kegiatan tahunan karang taruna kelurahan Kayu Manis memperingati hari sumpah pemuda</p>', '2024-07-16 04:56:25', '2024-07-18 15:34:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(50) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(12) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '0dd08cca-5423-4c70-958f-6ee08426b20e', 'Tiaranisarsd', 'tiaranisars@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$07OLDOIeYbq85omqct4yKA$sOucDpEiKTIdr6vU4XfPgc8CEnjpFvTs5OX+ipvF98M', 'admin', '2024-08-28 13:05:06', '2024-08-28 13:08:46'),
(3, '6c083998-a717-4f0b-b67d-58964ef2d288', 'Naurah', 'naurah@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$qIKYrV9f1McPdjeyeMrfIg$WuLs1a2ukmzhjgsRBBNIEzcWG2fhGRT5ESAKorw+dGk', 'user', '2024-08-28 13:05:14', '2024-08-28 13:05:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lombaId` (`lombaId`);

--
-- Indexes for table `dashboard`
--
ALTER TABLE `dashboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lombaId` (`lombaId`);

--
-- Indexes for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lomba`
--
ALTER TABLE `lomba`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lombaId` (`lombaId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `tentang_kegiatan`
--
ALTER TABLE `tentang_kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lomba`
--
ALTER TABLE `lomba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tentang_kegiatan`
--
ALTER TABLE `tentang_kegiatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`lombaId`) REFERENCES `lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dashboard`
--
ALTER TABLE `dashboard`
  ADD CONSTRAINT `dashboard_ibfk_1` FOREIGN KEY (`lombaId`) REFERENCES `lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_12` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftaran_ibfk_13` FOREIGN KEY (`lombaId`) REFERENCES `lomba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftaran_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
