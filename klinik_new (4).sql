-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2025 at 06:30 AM
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
-- Database: `klinik_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `nomor_telepon` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `jadwal_id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `polis_id` int(11) NOT NULL,
  `status` enum('cansel','konfirmasi','pending') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `user_id`, `nama`, `tanggal_lahir`, `nomor_telepon`, `email`, `created_at`, `jadwal_id`, `dokter_id`, `polis_id`, `status`) VALUES
(4, 1, 'Dyah', '2024-12-03', '1232', 'love@1', '2024-12-15 08:45:19', 1, 1, 1, 'pending'),
(7, 1, 'Dyah', '2006-01-15', '089876352', 'Junseong@1', '2024-12-15 09:22:59', 1, 1, 1, 'pending'),
(8, 1, 'Dyah', '2024-12-09', '1234567', 'Seongho@1', '2024-12-15 09:46:41', 1, 1, 1, 'pending'),
(21, 16, 'Vino', '2025-01-13', '21313', 'vino@gmail.com', '2025-01-13 03:43:32', 3, 3, 3, 'pending'),
(22, 16, 'Dyah', '2025-01-12', '0890877', 'dyah@1', '2025-01-13 13:35:25', 1, 1, 1, 'pending'),
(23, 16, 'Vika', '2025-01-06', '069586956', 'vi@1', '2025-01-13 13:47:26', 1, 1, 1, 'pending'),
(25, 16, 'Dyah', '2025-01-17', '978768', 'd@1', '2025-01-16 17:54:29', 2, 2, 2, 'pending'),
(26, 16, 'Dyah', '2025-01-19', '9897879', 'dy@1gmail.com', '2025-01-19 03:41:48', 1, 1, 1, 'pending'),
(27, 16, 'Purwa', '2025-01-20', '87897767', 'pu@1gmail.com', '2025-01-20 03:20:49', 2, 2, 2, 'pending'),
(28, 16, 'Dyah', '2025-01-20', '90897977', 'dyah@1gmail.com', '2025-01-20 04:40:50', 2, 2, 2, 'pending'),
(29, 16, 'Dyah', '2019-06-20', '087877676', 'dyah@gmail.com', '2025-01-20 05:02:49', 2, 2, 2, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `dokter_id` int(11) NOT NULL,
  `polis_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`dokter_id`, `polis_id`, `nama`, `image`, `created_at`) VALUES
(1, 1, 'Dokter Dyah', '/img/dyah.png', '2024-12-14 10:21:21'),
(2, 2, 'Dokter Garin', '/img/garin.jpg', '2024-12-31 05:27:30'),
(3, 3, 'Dokter Claudea', '/img/claudea.jpg', '2024-12-31 05:28:03');

-- --------------------------------------------------------

--
-- Table structure for table `jadwals`
--

CREATE TABLE `jadwals` (
  `jadwal_id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jadwals`
--

INSERT INTO `jadwals` (`jadwal_id`, `dokter_id`, `user_id`, `tanggal`, `jam`) VALUES
(1, 1, 0, '2024-12-30', '14:00:00'),
(2, 2, 0, '2025-12-23', '15:00:00'),
(3, 3, 0, '2025-12-18', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `polis`
--

CREATE TABLE `polis` (
  `polis_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `polis`
--

INSERT INTO `polis` (`polis_id`, `nama`, `image`, `created_at`) VALUES
(1, 'Poli Umum', '/img/gambar_dokter.png', '2024-12-14 08:45:44'),
(2, 'THT', '/img/gambar_THT.png', '2024-12-31 05:24:10'),
(3, 'Gigi', '/img/gambar_gigi.png', '2024-12-31 05:24:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'Dyah', '$2b$10$m82VOz2qxBoXUdCuBYyVCeaGbuw7/1Ykrr5.zaRyFZVRIKjxr4UGy', 'user', '2024-12-14 08:40:02'),
(16, 'Vino', '$2a$10$.T3gw1KgvSzQcDFsmX21/e1ff7ldps.jfwLffm2SvC2NUgcN0e8.a', 'user', '2025-01-09 07:02:43'),
(19, 'dea', '$2a$10$lpG5wpd5Kpdty5RAsRuTluIqaYPGqCmQyaI5kNkw8sdqPJ5d3wd/G', 'admin', '2025-01-12 07:34:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id_profil` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `nomor_telepon` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id_profil`, `user_id`, `nama`, `tanggal_lahir`, `nomor_telepon`, `email`, `alamat`, `created_at`) VALUES
(1, 16, 'Purwa', '2025-01-13', '08787676', 'dyah@1', 'Bendosari', '2025-01-17 02:27:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `dokter_id` (`dokter_id`),
  ADD KEY `jadwal_id` (`jadwal_id`),
  ADD KEY `polis_id` (`polis_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`dokter_id`),
  ADD KEY `poli_id` (`polis_id`);

--
-- Indexes for table `jadwals`
--
ALTER TABLE `jadwals`
  ADD PRIMARY KEY (`jadwal_id`),
  ADD KEY `dokter_id` (`dokter_id`);

--
-- Indexes for table `polis`
--
ALTER TABLE `polis`
  ADD PRIMARY KEY (`polis_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id_profil`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `dokter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jadwals`
--
ALTER TABLE `jadwals`
  MODIFY `jadwal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `polis`
--
ALTER TABLE `polis`
  MODIFY `polis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id_profil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`dokter_id`) REFERENCES `doctors` (`dokter_id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwals` (`jadwal_id`),
  ADD CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`polis_id`) REFERENCES `polis` (`polis_id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`polis_id`) REFERENCES `polis` (`polis_id`);

--
-- Constraints for table `jadwals`
--
ALTER TABLE `jadwals`
  ADD CONSTRAINT `jadwals_ibfk_1` FOREIGN KEY (`dokter_id`) REFERENCES `doctors` (`dokter_id`);

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
