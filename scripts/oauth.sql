

CREATE DATABASE IF NOT EXISTS `oauth`;
USE `oauth`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- !40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (7,'jai@gmail.com','jaikashyap','Jai Kashyap',NULL);

UNLOCK TABLES;


DROP TABLE IF EXISTS `oauth_clients`;

CREATE TABLE `oauth_clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) NOT NULL,
  `client_secret` varchar(100) NOT NULL,
  `redirect_url` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  `code` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `client_id_UNIQUE` (`client_id`),
  UNIQUE KEY `client_secret_UNIQUE` (`client_secret`),
  KEY `FK_auth_user_idx` (`id`,`user_id`),
  KEY `FK_auth_user_idx1` (`user_id`),
  CONSTRAINT `FK_auth_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;

INSERT INTO `oauth_clients` VALUES (3,'307b6d85f19060792e20d0bfa8a7ee05','3d6bfb0f28a6851fae81639cdb9586f954343cb2054269edce297e979f549f18','http://localhost:3000/auth/customOath/callback',7,'e786ba2a-6f12-4b55-b5ef-36d77bf504c6');

UNLOCK TABLES;



