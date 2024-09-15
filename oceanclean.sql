-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: oceanclean
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `idCamp` int NOT NULL AUTO_INCREMENT,
  `nameCamp` varchar(80) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `addressCamp` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `provinceCamp` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `dateCamp` date NOT NULL,
  `hourCamp` time NOT NULL,
  `descCamp` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `imageCamp` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `idOrgFK` int NOT NULL,
  `softDel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idCamp`),
  KEY `idOrgFK` (`idOrgFK`),
  CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`idOrgFK`) REFERENCES `organizations` (`idOrg`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES (15,'Prueba Greenpeace','Calle salina','Cádiz','2025-07-25','12:45:00','Prueba','https://www.barcelo.com/guia-turismo/wp-content/uploads/2019/06/playa-de-la-malvarrosa.jpg',1,0),(16,'Prueba Greenpeace 2','Calle mar','Huelva','2025-05-25','20:30:00','Testing',' ',1,0),(17,'Prueba FriendsOfEarth','Calle salina','Málaga','2025-05-25','12:15:00','Testing','https://www.barcelo.com/guia-turismo/wp-content/uploads/2020/09/playa-de-la-malvarrosa.jpg',2,0),(18,'Prueba FriendsOfEarth2','Calle mar','Almería','2025-05-25','21:00:00','Testing',' ',2,0);
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `idOrg` int NOT NULL AUTO_INCREMENT,
  `nameOrg` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `imageOrg` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `descOrg` varchar(500) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idOrg`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'Greenpeace','https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png','Greenpeace es una organización global sin fines de lucro que trabaja en la protección del medio ambiente y la promoción de soluciones sostenibles. Con presencia en más de 55 países, Greenpeace se dedica a la defensa de los océanos, la protección de la biodiversidad y la lucha contra el cambio climático. A través de campañas y acciones directas, Greenpeace busca generar conciencia y promover un futuro más limpio y saludable para nuestro planeta.'),(2,'Friends of the Earth','https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg','Friends of the Earth es una organización internacional comprometida con la protección del medio ambiente y la promoción de la sostenibilidad. Trabajamos en la conservación de la biodiversidad, la lucha contra el cambio climático y la promoción de prácticas respetuosas con el planeta. Nuestro objetivo es generar conciencia y promover acciones positivas para preservar nuestro entorno natural.');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participate`
--

DROP TABLE IF EXISTS `participate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participate` (
  `idParticipate` int NOT NULL AUTO_INCREMENT,
  `idUserFK` int NOT NULL,
  `idCampFK` int NOT NULL,
  PRIMARY KEY (`idParticipate`),
  KEY `idUserFK` (`idUserFK`),
  KEY `idCampFK` (`idCampFK`),
  CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`idUserFK`) REFERENCES `users` (`idUser`),
  CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`idCampFK`) REFERENCES `campaigns` (`idCamp`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participate`
--

LOCK TABLES `participate` WRITE;
/*!40000 ALTER TABLE `participate` DISABLE KEYS */;
INSERT INTO `participate` VALUES (36,1,17),(41,1,16);
/*!40000 ALTER TABLE `participate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `userNameUser` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `passUser` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `birthDateUser` date NOT NULL,
  `nameUser` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `surnameUser` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `secondSurnameUser` varchar(45) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `emailUser` varchar(60) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `phoneUser` varchar(9) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `addressUser` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `photoUser` varchar(255) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `roleUser` int DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'TESTING','MTIzNDU2Nzg=','1996-02-17','Andrés','Márquez','Rubio','andres@gmail.com','123456789','Calle Mar, n7, 3A','2',1),(16,'AdminGreenpeace','YWRtaW4=','2001-01-01','Greenpeace','Greenpeace',' ','greenpeace@gmail.com','123456789','Calle','https://1000marcas.net/wp-content/uploads/2020/01/logo-Greenpeace-500x281.png',0),(17,'AdminFriendsOfEarth','YWRtaW4=','2001-01-01','Friends of the Earth','Friends of the Earth',' ','Friend oftheEarth@gmail.com','123456789','Calle','https://upload.wikimedia.org/wikipedia/en/b/b9/Friends_of_the_Earth_%28logo%29.svg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-19 15:42:26
