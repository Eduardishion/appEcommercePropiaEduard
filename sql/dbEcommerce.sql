-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.5.15 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para db_ecommerce
DROP DATABASE IF EXISTS `db_ecommerce`;
CREATE DATABASE IF NOT EXISTS `db_ecommerce` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_ecommerce`;

-- Volcando estructura para tabla db_ecommerce.imagesproducts
DROP TABLE IF EXISTS `imagesproducts`;
CREATE TABLE IF NOT EXISTS `imagesproducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageSec` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_ecommerce.imagesproducts: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `imagesproducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagesproducts` ENABLE KEYS */;

-- Volcando estructura para tabla db_ecommerce.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discountRate` int(11) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` int(11) NOT NULL,
  `features` text NOT NULL,
  `registrationDate` datetime NOT NULL,
  `checkInTime` date NOT NULL,
  `userWhoRegistered` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_ecommerce.products: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Volcando estructura para tabla db_ecommerce.sequelizemeta
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla db_ecommerce.sequelizemeta: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20210817202428-create-images-products.js'),
	('20210817202830-create-users.js'),
	('20210817205905-create-products.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Volcando estructura para tabla db_ecommerce.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `registrationDate` datetime NOT NULL,
  `checkInTime` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla db_ecommerce.users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
