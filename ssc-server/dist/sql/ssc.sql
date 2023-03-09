/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : ssc

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 03/03/2023 14:56:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ssc_app
-- ----------------------------
DROP TABLE IF EXISTS `ssc_app`;
CREATE TABLE `ssc_app`  (
                            `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                            `project_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                            `app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                            `create_time` datetime(0) DEFAULT NULL,
                            `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_catalog
-- ----------------------------
DROP TABLE IF EXISTS `ssc_catalog`;
CREATE TABLE `ssc_catalog`  (
                                `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `create_time` datetime(0) DEFAULT NULL,
                                `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                `scope_type` int(0) DEFAULT NULL,
                                `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_cluster
-- ----------------------------
DROP TABLE IF EXISTS `ssc_cluster`;
CREATE TABLE `ssc_cluster`  (
                                `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `application_id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `cluster_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `source_flink_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                `flink_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                `create_time` datetime(0) DEFAULT NULL,
                                `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE,
                                UNIQUE INDEX `clustername_uniq_index`(`cluster_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_configuration
-- ----------------------------
DROP TABLE IF EXISTS `ssc_configuration`;
CREATE TABLE `ssc_configuration`  (
                                      `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                      `create_time` datetime(0) DEFAULT NULL,
                                      `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                      `scope_type` int(0) DEFAULT NULL,
                                      `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                      PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ssc_configuration
-- ----------------------------
INSERT INTO `ssc_configuration` VALUES ('E9154ABEA2B049D8865C7B3EC19FBA5E', '2021-04-02 16:25:13', 'configuration:\n  $internal.application.main: com.github.martvey.core.SscCoreClient\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://localhost:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n', 1, '0');

-- ----------------------------
-- Table structure for ssc_deployment
-- ----------------------------
DROP TABLE IF EXISTS `ssc_deployment`;
CREATE TABLE `ssc_deployment`  (
                                   `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                   `create_time` datetime(0) DEFAULT NULL,
                                   `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                   `scope_type` int(0) DEFAULT NULL,
                                   `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ssc_deployment
-- ----------------------------
INSERT INTO `ssc_deployment` VALUES ('921471EC015E46AAAA423211E4D0E7BB', '2021-04-02 16:20:11', 'deployment:\n  sql: classpath:app-content\n', 1, '0');

-- ----------------------------
-- Table structure for ssc_execution
-- ----------------------------
DROP TABLE IF EXISTS `ssc_execution`;
CREATE TABLE `ssc_execution`  (
                                  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                  `create_time` datetime(0) DEFAULT NULL,
                                  `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                  `scope_type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                  `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ssc_execution
-- ----------------------------
INSERT INTO `ssc_execution` VALUES ('3F2208339A264D6C89AD66B4EE5856E7', '2022-06-01 23:04:45', 'execution:\n  type: batch\n', '4', '4506193A000741868623D17827A247AE');
INSERT INTO `ssc_execution` VALUES ('5BE30DECDF384672AD7D1EBDEFB875A0', '2021-04-02 16:25:07', 'execution:\r\n  planner: blink\r\n  type: streaming\r\n  time-characteristic: event-time\r\n  periodic-watermarks-interval: 200\r\n  result-mode: streaming\r\n  max-table-result-rows: 1000000\r\n  parallelism: 1\r\n  max-parallelism: 128\r\n  min-idle-state-retention: 0\r\n  max-idle-state-retention: 0\r\n  current-catalog: default_catalog\r\n  current-database: default_database\r\n  restart-strategy:\r\n    type: fallback\n', '1', '0');
INSERT INTO `ssc_execution` VALUES ('B03D32716B5D441DAA8189313830978E', '2022-06-06 10:17:42', 'execution:\n  type: streaming\n', '4', 'AF4EE0635B294DD687636A2CEAAC39A9');

-- ----------------------------
-- Table structure for ssc_function
-- ----------------------------
DROP TABLE IF EXISTS `ssc_function`;
CREATE TABLE `ssc_function`  (
                                 `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                 `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                 `create_time` datetime(0) DEFAULT NULL,
                                 `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                                 `scope_type` int(0) DEFAULT NULL,
                                 `scope_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                 PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_jar
-- ----------------------------
DROP TABLE IF EXISTS `ssc_jar`;
CREATE TABLE `ssc_jar`  (
                            `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                            `jar_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `jar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `add_time` datetime(0) DEFAULT NULL,
                            `scope_type` int(0) DEFAULT NULL,
                            `scope_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_job
-- ----------------------------
DROP TABLE IF EXISTS `ssc_job`;
CREATE TABLE `ssc_job`  (
                            `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                            `cluster_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `job_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `source_flink_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                            `flink_config` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                            `create_time` datetime(0) DEFAULT NULL,
                            `job_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `job_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `version_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `execution_target` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            `job_plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                            `rest_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                            PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_module
-- ----------------------------
DROP TABLE IF EXISTS `ssc_module`;
CREATE TABLE `ssc_module`  (
                               `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                               `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                               `create_time` datetime(0) DEFAULT NULL,
                               `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                               `scope_type` int(0) DEFAULT NULL,
                               `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                               PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_project
-- ----------------------------
DROP TABLE IF EXISTS `ssc_project`;
CREATE TABLE `ssc_project`  (
                                `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `space_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `create_time` datetime(0) DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_space
-- ----------------------------
DROP TABLE IF EXISTS `ssc_space`;
CREATE TABLE `ssc_space`  (
                              `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                              `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                              `create_time` datetime(0) DEFAULT NULL,
                              PRIMARY KEY (`id`) USING BTREE,
                              UNIQUE INDEX `space_name_index`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_table
-- ----------------------------
DROP TABLE IF EXISTS `ssc_table`;
CREATE TABLE `ssc_table`  (
                              `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                              `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                              `create_time` datetime(0) DEFAULT NULL,
                              `define` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                              `scope_type` int(0) DEFAULT NULL,
                              `scope_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                              PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ssc_user
-- ----------------------------
DROP TABLE IF EXISTS `ssc_user`;
CREATE TABLE `ssc_user`  (
                             `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
                             `user_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '用户名',
                             `nick_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '昵称',
                             `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '密码',
                             `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
                             `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '邮箱',
                             `phone_number` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '手机号',
                             `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户性别（0男，1女，2未知）',
                             `avatar` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
                             `user_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '用户类型（0管理员，1普通用户）',
                             `create_by` bigint(0) DEFAULT NULL COMMENT '创建人的用户id',
                             `create_time` datetime(0) DEFAULT NULL COMMENT '创建时间',
                             `update_by` bigint(0) DEFAULT NULL COMMENT '更新人',
                             `update_time` datetime(0) DEFAULT NULL COMMENT '更新时间',
                             `del_flag` int(0) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ssc_user
-- ----------------------------
INSERT INTO `ssc_user` VALUES (1, 'wangml', 'Melon Wang', '$2a$10$GjYZSF4teeErCTgD/P7W2.Z4tjeMfcqVgIaDOwo10axvlh9qeSSbi', '0', '123@qq.com', '13012345678', '0', 'a', '1', 1, '2022-08-20 18:52:41', 1, '2022-08-21 18:52:49', 0);

-- ----------------------------
-- Table structure for ssc_version
-- ----------------------------
DROP TABLE IF EXISTS `ssc_version`;
CREATE TABLE `ssc_version`  (
                                `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                                `app_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `app_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `metastore_config` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `flink_config` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                `create_time` datetime(0) DEFAULT NULL,
                                `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                                PRIMARY KEY (`id`) USING BTREE,
                                UNIQUE INDEX `sqlid_version_uniq`(`app_id`, `version`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
