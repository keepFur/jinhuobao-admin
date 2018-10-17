-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: keepfur_blog
-- ------------------------------------------------------
-- Server version	5.7.10

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `keepfur_blog`.`keepfur_blog_blog`
--

DROP TABLE IF EXISTS `keepfur_blog`.`keepfur_blog_blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keepfur_blog`.`keepfur_blog_blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '数据状态\n1是启用\n0是禁用',
  `created_date` datetime NOT NULL,
  `content` varchar(45) COLLATE utf8_bin NOT NULL,
  `media` varchar(255)  DEFAULT '无' COMMENT '媒体元素',
  `group_id` int(2) NOT NULL DEFAULT '1' COMMENT '博客分组id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keepfur_blog`.`keepfur_blog_blog`
--

LOCK TABLES `keepfur_blog`.`keepfur_blog_blog` WRITE;
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_blog` DISABLE KEYS */;
INSERT INTO `keepfur_blog`.`keepfur_blog_blog` VALUES (1,'First Keepfur Blog',1,'2018-09-19 10:52:36','hello world','无',1);
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_blog` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `keepfur_blog`.`keepfur_blog_todo`
--

DROP TABLE IF EXISTS `keepfur_blog`.`keepfur_blog_todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keepfur_blog`.`keepfur_blog_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '数据状态\n1是启用\n0是禁用',
  `created_date` datetime NOT NULL,
  `content` varchar(45) COLLATE utf8_bin NOT NULL,
  `group_id` int(2) NOT NULL DEFAULT '1' COMMENT '日程分组id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keepfur_blog`.`keepfur_blog_todo`
--

LOCK TABLES `keepfur_blog`.`keepfur_blog_todo` WRITE;
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_todo` DISABLE KEYS */;
INSERT INTO `keepfur_blog`.`keepfur_blog_todo` VALUES (1,'First Keepfur todo',1,'2018-09-19 10:52:36','hello world todo',1);
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keepfur_blog`.`keepfur_blog_group`
--

DROP TABLE IF EXISTS `keepfur_blog`.`keepfur_blog_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keepfur_blog`.`keepfur_blog_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '名称',
  `type` int(2)  NOT NULL DEFAULT '1' COMMENT '分组类型 \n1是博客分组 \2是日程分组 \3是素材分组',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态 \n1是启用 \n0是禁用',
  `created_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='分组表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keepfur_blog`.`keepfur_blog_plant`
--

LOCK TABLES `keepfur_blog`.`keepfur_blog_group` WRITE;
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_plant` DISABLE KEYS */;
INSERT INTO `keepfur_blog`.`keepfur_blog_group` VALUES (1,'生活',1,1,'2018-07-07 23:03:24','2018-07-08 07:49:29'),(2,'工作',1,1,'2018-07-08 07:09:16','2018-07-08 07:49:41');
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_plant` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `keepfur_blog`.`keepfur_blog_material`
--

DROP TABLE IF EXISTS `keepfur_blog`.`keepfur_blog_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keepfur_blog`.`keepfur_blog_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '1' COMMENT '名称',
  `path` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT 'N/A' COMMENT '素材路径',
  `type` int(2)  NOT NULL DEFAULT '1' COMMENT '素材类型 \n1是图片 \n2是音乐 \n3是视频',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态 \n1是启用 \n0是禁用',
  `created_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='素材表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keepfur_blog`.`keepfur_blog_material`
--

LOCK TABLES `keepfur_blog`.`keepfur_blog_material` WRITE;
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_material` DISABLE KEYS */;
INSERT INTO `keepfur_blog`.`keepfur_blog_material` VALUES (1,'生活','/imgs/',1,1,'2018-07-07 23:03:24','2018-07-08 07:49:29'),(2,'工作','/mp3/',2,1,'2018-07-08 07:09:16','2018-07-08 07:49:41');
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keepfur_blog`.`keepfur_blog_user`
--

DROP TABLE IF EXISTS `keepfur_blog`.`keepfur_blog_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keepfur_blog`.`keepfur_blog_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '数据状态\n1是启用\n0是禁用',
  `password` varchar(110) COLLATE utf8_bin NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `is_super` int(11) NOT NULL DEFAULT '0' COMMENT '是否是超级管理员\n1是\n0不是',
  `created_date` datetime DEFAULT NULL COMMENT '创建用户时间',
  `email` varchar(45) COLLATE utf8_bin DEFAULT 'N/A' COMMENT '用户邮箱',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `salt` varchar(110) COLLATE utf8_bin NOT NULL DEFAULT 'salt' COMMENT '用户密码加密盐',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keepfur_blog`.`keepfur_blog_user`
--

LOCK TABLES `keepfur_blog`.`keepfur_blog_user` WRITE;
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_user` DISABLE KEYS */;
INSERT INTO `keepfur_blog`.`keepfur_blog_user` VALUES (17,'surongzhizhang',1,'$2b$12$cZCOe/ZdmUynEG2fh9RJke2mfB0/lvmCG8D96odmeY/eTRgm2iZC.',1,'2018-07-14 12:48:10','',NULL,'$2b$12$cZCOe/ZdmUynEG2fh9RJke')
/*!40000 ALTER TABLE `keepfur_blog`.`keepfur_blog_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-17 15:53:08
