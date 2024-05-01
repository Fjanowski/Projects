-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2024 at 02:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collections`
--

-- --------------------------------------------------------

--
-- Table structure for table `collection1`
--

CREATE TABLE `collection1` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `date_released` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection1`
--

INSERT INTO `collection1` (`id`, `name`, `date_received`, `date_released`) VALUES
(3, 'korn on the cob', '2024-04-22', '2024-05-01'),
(4, 'the pick of destiny', '2024-04-08', '2006-11-22'),
(5, 'Cool guy', '2024-04-29', '2002-06-07'),
(6, 'abbey road', '2024-04-23', '2024-04-01'),
(7, 'graggle simpson', '0000-00-00', '0000-00-00'),
(10, 'lkjasdff', '0000-00-00', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collection1`
--
ALTER TABLE `collection1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collection1`
--
ALTER TABLE `collection1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
