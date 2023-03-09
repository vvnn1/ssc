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
-- Records of ssc_app
-- ----------------------------
INSERT INTO `ssc_app` VALUES ('4506193A000741868623D17827A247AE', 'F9ECCD78DF0048EC9950ACA0883EE63A', 'batch_app', '', '2022-06-01 21:17:24', 'JAR');
INSERT INTO `ssc_app` VALUES ('A4A724231AB44B318DD93739823DF0E1', 'F9ECCD78DF0048EC9950ACA0883EE63A', 'nc_stream_app', '', '2022-06-12 18:06:26', 'JAR');
INSERT INTO `ssc_app` VALUES ('AF4EE0635B294DD687636A2CEAAC39A9', 'D4B2A1D82E6B40D8AB698CFF26BA4209', 'stream_sql', 'CREATE TABLE sensor_source(\r\n                              id VARCHAR,\r\n                              dt BIGINT,\r\n                              temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE TABLE sensor_sink(\r\n                            id VARCHAR,\r\n                            dt BIGINT,\r\n                            temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE DEBUG debug_1 AS\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n', '2022-06-06 10:15:16', 'SQL');
INSERT INTO `ssc_app` VALUES ('CFB7C3C7EE4B4FCE913985E3F3B0D57D', 'F9ECCD78DF0048EC9950ACA0883EE63A', 'stream_app', NULL, '2022-06-01 21:17:33', 'JAR');
INSERT INTO `ssc_app` VALUES ('DA5BE2C221DB49BFB49D6742DF074DDE', '8517BBD2E0FF4E1B82B45D43E4944272', 'app20220927', 'CREATE TABLE sensor_source(\r\n    id VARCHAR,\r\n    dt BIGINT,\r\n    temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\n\r\nCREATE TABLE sensor_sink(\r\n    id VARCHAR,\r\n    dt BIGINT,\r\n    temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n#CREATE DEBUG debug_1 AS\r\n#SELECT id AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT id AS id, dt, temperature FROM sensor_source;\r\n', '2022-09-27 07:09:42', 'SQL');

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
INSERT INTO `ssc_configuration` VALUES ('1', '2022-09-29 09:40:46', 'configuration:\n  $internal.application.main: com.github.martvey.example.batch.BatchWordCount\n', 4, '4506193A000741868623D17827A247AE');
INSERT INTO `ssc_configuration` VALUES ('2', '2022-09-29 09:41:17', 'configuration:\n  $internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\n  $internal.application.program-args: --host 192.168.126.1 --port 8888', 4, 'CFB7C3C7EE4B4FCE913985E3F3B0D57D');
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
-- Records of ssc_function
-- ----------------------------
INSERT INTO `ssc_function` VALUES ('ECF7EF7DE3EE44A389DA0E3E5BB21958', 'martvey_pre', '2022-06-06 11:54:50', 'functions:\n- name: martvey_pre\n  from: class\n  class: com.github.martvey.example.function.PreUDF\n  constructor:\n  - type: VARCHAR\n    value: martvey_\n', 4, 'AF4EE0635B294DD687636A2CEAAC39A9');

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
-- Records of ssc_jar
-- ----------------------------
INSERT INTO `ssc_jar` VALUES ('003F655719D74F4EA896C40D626090D0', 'flink-sql-connector-kafka_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-sql-connector-kafka_2.11-1.12.0.jar', '2022-05-29 12:04:41', 0, '0');
INSERT INTO `ssc_jar` VALUES ('0108EA76A695445DBC7F232F63243B37', 'ssc-dist-1.0-SNAPSHOT.jar', '/ssc/metastore/libraries/SYSTEM/0/ssc-dist-1.0-SNAPSHOT.jar', '2022-05-29 12:06:46', 1, '0');
INSERT INTO `ssc_jar` VALUES ('0A1CCD5505C440DAB8BB168CF6437F53', 'ssc-debug-example-1.0-SNAPSHOT.jar', '/ssc/metastore/libraries/APPLICATION/AF4EE0635B294DD687636A2CEAAC39A9/ssc-debug-example-1.0-SNAPSHOT.jar', '2022-06-06 11:52:27', 4, 'AF4EE0635B294DD687636A2CEAAC39A9');
INSERT INTO `ssc_jar` VALUES ('150286AD5B4043C89B8FD2E1E4B5F642', 'flink-hadoop-fs-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-hadoop-fs-1.12.0.jar', '2022-05-29 12:03:57', 0, '0');
INSERT INTO `ssc_jar` VALUES ('2DFA147C5D7F4265B0D67D38AEFC6AF4', 'flink-dist_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-dist_2.11-1.12.0.jar', '2022-05-29 12:03:40', 0, '0');
INSERT INTO `ssc_jar` VALUES ('482D99AB8A354049BF51AF7A8B91140E', 'antlr-2.7.2.jar', '/ssc/metastore/libraries/APPLICATION/AF4EE0635B294DD687636A2CEAAC39A9/antlr-2.7.2.jar', '2023-01-13 13:57:32', 4, 'AF4EE0635B294DD687636A2CEAAC39A9');
INSERT INTO `ssc_jar` VALUES ('4FB1200B56494CBF964A48035C6D29FA', 'flink-sql-client_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-sql-client_2.11-1.12.0.jar', '2022-05-29 12:04:32', 0, '0');
INSERT INTO `ssc_jar` VALUES ('508E11500CF0458F9B553C1580A98D6F', 'flink-sql-connector-kafka_2.11-1.12.0.jar', '/ssc/metastore/libraries/APPLICATION/AF4EE0635B294DD687636A2CEAAC39A9/flink-sql-connector-kafka_2.11-1.12.0.jar', '2022-10-23 11:56:20', 4, 'AF4EE0635B294DD687636A2CEAAC39A9');
INSERT INTO `ssc_jar` VALUES ('55837FAD1F2E46FF824508F806DCD930', 'flink-csv-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-csv-1.12.0.jar', '2022-05-29 12:03:20', 0, '0');
INSERT INTO `ssc_jar` VALUES ('651CE9E9B44E42C1B64F0DD923F17A77', 'flink-sql-connector-kafka_2.11-1.12.0.jar', '/ssc/metastore/libraries/APPLICATION/DA5BE2C221DB49BFB49D6742DF074DDE/flink-sql-connector-kafka_2.11-1.12.0.jar', '2022-09-29 08:50:07', 4, 'DA5BE2C221DB49BFB49D6742DF074DDE');
INSERT INTO `ssc_jar` VALUES ('6B703A79CCD14CF6A6EF8F6A1A07B514', 'flink-json-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-json-1.12.0.jar', '2022-05-29 12:04:09', 0, '0');
INSERT INTO `ssc_jar` VALUES ('99FBF1F8C2934521AC34F58F01ACC629', 'flink-shaded-zookeeper-3.4.14.jar', '/ssc/metastore/libraries/FLINK/0/flink-shaded-zookeeper-3.4.14.jar', '2022-05-29 12:04:21', 0, '0');
INSERT INTO `ssc_jar` VALUES ('B4881AA2B52048669D020292916191DC', 'flink-table-blink_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-table-blink_2.11-1.12.0.jar', '2022-05-29 12:05:05', 0, '0');
INSERT INTO `ssc_jar` VALUES ('C2C59528EEEC48949B6ABBB6DEF65040', 'flink-yarn_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-yarn_2.11-1.12.0.jar', '2022-05-29 12:10:40', 0, '0');
INSERT INTO `ssc_jar` VALUES ('CD925D04A8164BDDA375E0E1F28F6E1E', 'flink-table_2.11-1.12.0.jar', '/ssc/metastore/libraries/FLINK/0/flink-table_2.11-1.12.0.jar', '2022-05-29 12:04:55', 0, '0');
INSERT INTO `ssc_jar` VALUES ('D552BDA298DE45F7B93CFBFA9C8742AB', 'ssc-debug-example-1.0-SNAPSHOT.jar', '/ssc/metastore/libraries/APPLICATION/A4A724231AB44B318DD93739823DF0E1/ssc-debug-example-1.0-SNAPSHOT.jar', '2022-06-12 19:10:08', 4, 'A4A724231AB44B318DD93739823DF0E1');
INSERT INTO `ssc_jar` VALUES ('E8D50B666D674BADA0978F52F6EB3189', 'ssc-debug-example-1.0-SNAPSHOT.jar', '/ssc/metastore/libraries/PROJECT/F9ECCD78DF0048EC9950ACA0883EE63A/ssc-debug-example-1.0-SNAPSHOT.jar', '2022-06-01 21:47:20', 3, 'F9ECCD78DF0048EC9950ACA0883EE63A');

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
-- Records of ssc_job
-- ----------------------------
INSERT INTO `ssc_job` VALUES ('4809BD96DBDA489D9DA3C6A84141E980', NULL, 'FAILED', '$internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://local199:9000/ssc/save-point/4809BD96DBDA489D9DA3C6A84141E980\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\n$internal.application.program-args: --host;192.168.126.1;--port;8888\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/F9ECCD78DF0048EC9950ACA0883EE63A/A4A724231AB44B318DD93739823DF0E1/1.0.0/nc_stream_app-1.0.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://local199:9000/ssc/check-point/4809BD96DBDA489D9DA3C6A84141E980', '$internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\r\ntaskmanager.memory.process.size: 1728m\r\ninternal.jobgraph-path: job.graph\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nhigh-availability.cluster-id: application_1657434872669_0004\r\njobmanager.rpc.address: local199\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://local199:9000/ssc/save-point/4809BD96DBDA489D9DA3C6A84141E980\r\njobmanager.rpc.port: 36220\r\nrest.port: 36220\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\ninternal.cluster.execution-mode: NORMAL\r\n$internal.application.program-args: --host;192.168.126.1;--port;8888\r\npipeline.jars: file:/tmp/ssc_job_9135483743189177264/nc_stream_app-1.0.0.jar;file:/tmp/1076798164_8067683365308369859lib_ssc-debug-example-1.0-SNAPSHOT.jar;file:/tmp/1375196006_7505976081846163388lib_ssc-dist-1.0-SNAPSHOT.jar\r\nyarn.application.id: application_1657434872669_0004\r\nparallelism.default: 1\r\nrest.address: local199\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://local199:9000/ssc/check-point/4809BD96DBDA489D9DA3C6A84141E980', '2022-07-13 09:01:50', 'c9e39c9d74dfe2a202a8ea70096c8dc4', 'nc_stream_job', 'C070C83602E244DC9F3A4BD79584F087', 'PER_JOB', '{\"jid\":\"8360a9085b41e04af58bf8cc11da80ca\",\"name\":\"stream word count job\",\"nodes\":[{\"id\":\"dc2290bb6f8f5cd2bd425368843494fe\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Keyed Aggregation -> Sink: Print to Std. Out\",\"inputs\":[{\"num\":0,\"id\":\"90bea66de1c231edf33913ecd54406c1\",\"ship_strategy\":\"HASH\",\"exchange\":\"pipelined_bounded\"}],\"optimizer_properties\":{}},{\"id\":\"90bea66de1c231edf33913ecd54406c1\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Filter -> Map\",\"inputs\":[{\"num\":0,\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"ship_strategy\":\"FORWARD\",\"exchange\":\"pipelined_bounded\"}],\"optimizer_properties\":{}},{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: Socket Stream -> Flat Map\",\"optimizer_properties\":{}}]}', 'http://local199:36220');
INSERT INTO `ssc_job` VALUES ('55CE8FAC22D648B0A631B7E54BA5E47F', NULL, 'INIT', '$internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://local199:9000/ssc/save-point/55CE8FAC22D648B0A631B7E54BA5E47F\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\n$internal.application.program-args: --host;192.168.126.1;--port;8888\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/F9ECCD78DF0048EC9950ACA0883EE63A/A4A724231AB44B318DD93739823DF0E1/1.0.0/nc_stream_app-1.0.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://local199:9000/ssc/check-point/55CE8FAC22D648B0A631B7E54BA5E47F', NULL, '2022-07-10 10:56:34', NULL, 'test_123', 'C070C83602E244DC9F3A4BD79584F087', 'PER_JOB', '{\"jid\":\"f905b24141cf6659d99515aaea9fa183\",\"name\":\"stream word count job\",\"nodes\":[{\"id\":\"dc2290bb6f8f5cd2bd425368843494fe\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Keyed Aggregation -> Sink: Print to Std. Out\",\"inputs\":[{\"num\":0,\"id\":\"90bea66de1c231edf33913ecd54406c1\",\"ship_strategy\":\"HASH\",\"exchange\":\"pipelined_bounded\"}],\"optimizer_properties\":{}},{\"id\":\"90bea66de1c231edf33913ecd54406c1\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Filter -> Map\",\"inputs\":[{\"num\":0,\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"ship_strategy\":\"FORWARD\",\"exchange\":\"pipelined_bounded\"}],\"optimizer_properties\":{}},{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: Socket Stream -> Flat Map\",\"optimizer_properties\":{}}]}', NULL);
INSERT INTO `ssc_job` VALUES ('A9B849DC27C74A10AFDF4310CE1A99BC', NULL, 'FAILED', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/A9B849DC27C74A10AFDF4310CE1A99BC\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/2C22E7047C19427B8ED4C0C9947E8EE5/8517BBD2E0FF4E1B82B45D43E4944272/DA5BE2C221DB49BFB49D6742DF074DDE/1.0.0/app20220927-1.0.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/A9B849DC27C74A10AFDF4310CE1A99BC', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/A9B849DC27C74A10AFDF4310CE1A99BC\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: file:/tmp/ssc_job_5812366033913184817/app20220927-1.0.0.jar;file:/tmp/647584365_2238661062825825019lib_flink-sql-connector-kafka_2.11-1.12.0.jar;file:/tmp/554802560_3196673020396045550lib_ssc-dist-1.0-SNAPSHOT.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/A9B849DC27C74A10AFDF4310CE1A99BC', '2022-09-29 09:20:44', NULL, 'test_job', '44E0ACA63FBA4D05BC5BAE16EEC19EAC', 'PER_JOB', '{\"jid\":\"f62fc939e6517004009c2770be0ee702\",\"name\":\"_tmp_job_1875599967\",\"nodes\":[{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: KafkaTableSource(id, dt, temperature) -> SourceConversion(table=[default_catalog.default_database.sensor_source, source: [KafkaTableSource(id, dt, temperature)]], fields=[id, dt, temperature]) -> SinkConversionToRow -> Sink: KafkaTableSink(id, dt, temperature)\",\"optimizer_properties\":{}}]}', NULL);
INSERT INTO `ssc_job` VALUES ('B9ACD077769645AAB18D1BD3CC207F45', NULL, 'FAILED', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/B9ACD077769645AAB18D1BD3CC207F45\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20221025-v1/stream_sql-20221025-v1.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/B9ACD077769645AAB18D1BD3CC207F45', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\ninternal.jobgraph-path: job.graph\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nhigh-availability.cluster-id: application_1666520019281_0007\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/B9ACD077769645AAB18D1BD3CC207F45\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\ninternal.cluster.execution-mode: NORMAL\r\npipeline.jars: file:/tmp/ssc_job_2677548884526464052/stream_sql-20221025-v1.jar;file:/tmp/1537094528_4516551862111806203lib_flink-sql-connector-kafka_2.11-1.12.0.jar;file:/tmp/1242700872_7240527888902297427lib_ssc-debug-example-1.0-SNAPSHOT.jar;file:/tmp/1971277278_4518886427787871588lib_ssc-dist-1.0-SNAPSHOT.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/B9ACD077769645AAB18D1BD3CC207F45', '2022-10-25 13:11:51', NULL, 'test_221025', '9FDCADB4987946ACA539E84BA9F1D38F', 'PER_JOB', '{\"jid\":\"b9456e0998b113e97c011f2a818f8c2e\",\"name\":\"_tmp_job_1439440081\",\"nodes\":[{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: KafkaTableSource(id, dt, temperature) -> SourceConversion(table=[default_catalog.default_database.sensor_source, source: [KafkaTableSource(id, dt, temperature)]], fields=[id, dt, temperature]) -> Calc(select=[martvey_pre(id) AS id, dt, temperature]) -> SinkConversionToRow -> Sink: KafkaTableSink(id, dt, temperature)\",\"optimizer_properties\":{}}]}', NULL);
INSERT INTO `ssc_job` VALUES ('CA92CD9678114907B9882BA239F7372F', NULL, 'INIT', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://local199:9000/ssc/save-point/CA92CD9678114907B9882BA239F7372F\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20.0/stream_sql-20.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://local199:9000/ssc/check-point/CA92CD9678114907B9882BA239F7372F', NULL, '2022-07-12 15:42:55', NULL, 'stream_sql_job', 'A475F4D8590345EBA49BA0335EC05344', 'PER_JOB', '{\"jid\":\"084887af7afdf6bf383f69f5694eed37\",\"name\":\"_tmp_job_423799973\",\"nodes\":[{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: KafkaTableSource(id, dt, temperature) -> SourceConversion(table=[default_catalog.default_database.sensor_source, source: [KafkaTableSource(id, dt, temperature)]], fields=[id, dt, temperature]) -> Calc(select=[martvey_pre(id) AS id, dt, temperature]) -> SinkConversionToRow -> Sink: KafkaTableSink(id, dt, temperature)\",\"optimizer_properties\":{}}]}', NULL);
INSERT INTO `ssc_job` VALUES ('FB0FBBD24B854813B9447016C05EEB7D', NULL, 'FAILED', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/FB0FBBD24B854813B9447016C05EEB7D\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20221023-v1/stream_sql-20221023-v1.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/FB0FBBD24B854813B9447016C05EEB7D', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\nexecution.target: yarn-per-job\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: hdfs://localhost:9000/ssc/save-point/FB0FBBD24B854813B9447016C05EEB7D\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: file:/tmp/ssc_job_1324233280697678649/stream_sql-20221023-v1.jar;file:/tmp/1597274997_1158518556286108887lib_flink-sql-connector-kafka_2.11-1.12.0.jar;file:/tmp/1838453567_926442666438454773lib_ssc-debug-example-1.0-SNAPSHOT.jar;file:/tmp/727474490_2386272404726792089lib_ssc-dist-1.0-SNAPSHOT.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: hdfs://localhost:9000/ssc/check-point/FB0FBBD24B854813B9447016C05EEB7D', '2022-10-23 12:51:25', NULL, '221023_test', 'C040836382824A7F84975B54B4FB74B0', 'PER_JOB', '{\"jid\":\"2624f47165f5ce566e77fbfcc6a7ee9f\",\"name\":\"_tmp_job_1439440081\",\"nodes\":[{\"id\":\"cbc357ccb763df2852fee8c4fc7d55f2\",\"parallelism\":1,\"operator\":\"\",\"operator_strategy\":\"\",\"description\":\"Source: KafkaTableSource(id, dt, temperature) -> SourceConversion(table=[default_catalog.default_database.sensor_source, source: [KafkaTableSource(id, dt, temperature)]], fields=[id, dt, temperature]) -> Calc(select=[martvey_pre(id) AS id, dt, temperature]) -> SinkConversionToRow -> Sink: KafkaTableSink(id, dt, temperature)\",\"optimizer_properties\":{}}]}', NULL);

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
-- Records of ssc_project
-- ----------------------------
INSERT INTO `ssc_project` VALUES ('8517BBD2E0FF4E1B82B45D43E4944272', 'project20220927', '2C22E7047C19427B8ED4C0C9947E8EE5', '2022-09-27 07:03:44');
INSERT INTO `ssc_project` VALUES ('D4B2A1D82E6B40D8AB698CFF26BA4209', 'sql_project', 'AB8C42FCA1304E6CA1652DC16782B6B3', '2022-06-06 10:11:48');
INSERT INTO `ssc_project` VALUES ('F9ECCD78DF0048EC9950ACA0883EE63A', 'jar_project', 'AB8C42FCA1304E6CA1652DC16782B6B3', '2022-06-01 21:15:37');

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
-- Records of ssc_space
-- ----------------------------
INSERT INTO `ssc_space` VALUES ('2C22E7047C19427B8ED4C0C9947E8EE5', 'space20220927', '2022-09-27 07:01:22');
INSERT INTO `ssc_space` VALUES ('AB8C42FCA1304E6CA1652DC16782B6B3', 'test_space', '2022-06-01 21:15:20');

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
INSERT INTO `ssc_user` VALUES (1, 'wangml', 'IT李老师', '$2a$10$GjYZSF4teeErCTgD/P7W2.Z4tjeMfcqVgIaDOwo10axvlh9qeSSbi', '0', '123@qq.com', '13012345678', '0', 'a', '1', 1, '2022-08-20 18:52:41', 1, '2022-08-21 18:52:49', 0);

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

-- ----------------------------
-- Records of ssc_version
-- ----------------------------
INSERT INTO `ssc_version` VALUES ('44E0ACA63FBA4D05BC5BAE16EEC19EAC', 'DA5BE2C221DB49BFB49D6742DF074DDE', 'app20220927', 'CREATE TABLE sensor_source(\r\n    id VARCHAR,\r\n    dt BIGINT,\r\n    temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\n\r\nCREATE TABLE sensor_sink(\r\n    id VARCHAR,\r\n    dt BIGINT,\r\n    temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\nCREATE DEBUG debug_1 AS\r\nSELECT id AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT id AS id, dt, temperature FROM sensor_source;\r\n', 'tables: []\n\nfunctions: []\n\ncatalogs: []\n\nmodules: []\n\nexecution:\n  planner: blink\n  type: streaming\n  time-characteristic: event-time\n  periodic-watermarks-interval: 200\n  result-mode: streaming\n  max-table-result-rows: 1000000\n  parallelism: 1\n  max-parallelism: 128\n  min-idle-state-retention: 0\n  max-idle-state-retention: 0\n  current-catalog: default_catalog\n  current-database: default_database\n  restart-strategy:\n    type: fallback\n\nconfiguration:\n  $internal.application.main: com.github.martvey.core.SscCoreClient\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://localhost:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n\ndeployment:\n  sql: classpath:app-content\n', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: /ssc/save-point\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/2C22E7047C19427B8ED4C0C9947E8EE5/8517BBD2E0FF4E1B82B45D43E4944272/DA5BE2C221DB49BFB49D6742DF074DDE/1.0.0/app20220927-1.0.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: /ssc/check-point', '2022-09-29 09:19:36', '1.0.0');
INSERT INTO `ssc_version` VALUES ('9FDCADB4987946ACA539E84BA9F1D38F', 'AF4EE0635B294DD687636A2CEAAC39A9', 'stream_sql', 'CREATE TABLE sensor_source(\r\n                              id VARCHAR,\r\n                              dt BIGINT,\r\n                              temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE TABLE sensor_sink(\r\n                            id VARCHAR,\r\n                            dt BIGINT,\r\n                            temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE DEBUG debug_1 AS\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n', 'tables: []\n\nfunctions:\n- name: martvey_pre\n  from: class\n  class: com.github.martvey.example.function.PreUDF\n  constructor:\n  - type: VARCHAR\n    value: martvey_\n\ncatalogs: []\n\nmodules: []\n\nexecution:\n  planner: blink\n  type: streaming\n  time-characteristic: event-time\n  periodic-watermarks-interval: 200\n  result-mode: streaming\n  max-table-result-rows: 1000000\n  parallelism: 1\n  max-parallelism: 128\n  min-idle-state-retention: 0\n  max-idle-state-retention: 0\n  current-catalog: default_catalog\n  current-database: default_database\n  restart-strategy:\n    type: fallback\n\nconfiguration:\n  $internal.application.main: com.github.martvey.core.SscCoreClient\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://localhost:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n\ndeployment:\n  sql: classpath:app-content\n', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: /ssc/save-point\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20221025-v1/stream_sql-20221025-v1.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: /ssc/check-point', '2022-10-25 13:10:20', '20221025-v1');
INSERT INTO `ssc_version` VALUES ('A475F4D8590345EBA49BA0335EC05344', 'AF4EE0635B294DD687636A2CEAAC39A9', 'stream_sql', 'CREATE TABLE sensor_source(\r\n                              id VARCHAR,\r\n                              dt BIGINT,\r\n                              temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'local199:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'local199:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE TABLE sensor_sink(\r\n                            id VARCHAR,\r\n                            dt BIGINT,\r\n                            temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'local199:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'local199:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE DEBUG debug_1 AS\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n', 'tables: []\n\nfunctions:\n- name: martvey_pre\n  from: class\n  class: com.github.martvey.example.function.PreUDF\n  constructor:\n  - type: VARCHAR\n    value: martvey_\n\ncatalogs: []\n\nmodules: []\n\nexecution:\n  planner: blink\n  type: streaming\n  time-characteristic: event-time\n  periodic-watermarks-interval: 200\n  result-mode: streaming\n  max-table-result-rows: 1000000\n  parallelism: 1\n  max-parallelism: 128\n  min-idle-state-retention: 0\n  max-idle-state-retention: 0\n  current-catalog: default_catalog\n  current-database: default_database\n  restart-strategy:\n    type: fallback\n\nconfiguration:\n  $internal.application.main: com.github.martvey.core.SscCoreClient\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://local199:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n\ndeployment:\n  sql: classpath:app-content\n', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: /ssc/save-point\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20.0/stream_sql-20.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: /ssc/check-point', '2022-06-06 19:16:18', '20.0');
INSERT INTO `ssc_version` VALUES ('C040836382824A7F84975B54B4FB74B0', 'AF4EE0635B294DD687636A2CEAAC39A9', 'stream_sql', 'CREATE TABLE sensor_source(\r\n                              id VARCHAR,\r\n                              dt BIGINT,\r\n                              temperature DOUBLE\r\n) WITH (\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_source\',\r\n    \'connector.startup-mode\'=\'latest-offset\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE TABLE sensor_sink(\r\n                            id VARCHAR,\r\n                            dt BIGINT,\r\n                            temperature DOUBLE\r\n)WITH(\r\n    \'connector.type\'=\'kafka\',\r\n    \'connector.version\'=\'universal\',\r\n    \'connector.topic\'=\'sensor_sink\',\r\n    \'connector.properties.zookeeper.connect\'=\'localhost:2181\',\r\n    \'connector.properties.bootstrap.servers\'=\'localhost:9092\',\r\n    \'format.type\'=\'csv\'\r\n);\r\n\r\nCREATE DEBUG debug_1 AS\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n\r\nINSERT INTO sensor_sink\r\nSELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;\r\n', 'tables: []\n\nfunctions:\n- name: martvey_pre\n  from: class\n  class: com.github.martvey.example.function.PreUDF\n  constructor:\n  - type: VARCHAR\n    value: martvey_\n\ncatalogs: []\n\nmodules: []\n\nexecution:\n  planner: blink\n  type: streaming\n  time-characteristic: event-time\n  periodic-watermarks-interval: 200\n  result-mode: streaming\n  max-table-result-rows: 1000000\n  parallelism: 1\n  max-parallelism: 128\n  min-idle-state-retention: 0\n  max-idle-state-retention: 0\n  current-catalog: default_catalog\n  current-database: default_database\n  restart-strategy:\n    type: fallback\n\nconfiguration:\n  $internal.application.main: com.github.martvey.core.SscCoreClient\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://localhost:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n\ndeployment:\n  sql: classpath:app-content\n', '$internal.application.main: com.github.martvey.core.SscCoreClient\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://localhost:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: /ssc/save-point\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/SYSTEM/0;/ssc/metastore/libraries/FLINK/0\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/D4B2A1D82E6B40D8AB698CFF26BA4209/AF4EE0635B294DD687636A2CEAAC39A9/20221023-v1/stream_sql-20221023-v1.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: /ssc/check-point', '2022-10-23 12:40:21', '20221023-v1');
INSERT INTO `ssc_version` VALUES ('C070C83602E244DC9F3A4BD79584F087', 'A4A724231AB44B318DD93739823DF0E1', 'nc_stream_app', NULL, 'tables: []\n\nfunctions: []\n\ncatalogs: []\n\nmodules: []\n\nexecution:\n  planner: blink\n  type: streaming\n  time-characteristic: event-time\n  periodic-watermarks-interval: 200\n  result-mode: streaming\n  max-table-result-rows: 1000000\n  parallelism: 1\n  max-parallelism: 128\n  min-idle-state-retention: 0\n  max-idle-state-retention: 0\n  current-catalog: default_catalog\n  current-database: default_database\n  restart-strategy:\n    type: fallback\n\nconfiguration:\n  $internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\n  jobmanager.memory.process.size: 1600m\n  taskmanager.memory.process.size: 1728m\n  taskmanager.numberOfTaskSlots: 1\n  execution.attached: true\n  parallelism.default: 1\n  jobmanager.execution.failover-strategy: region\n  fs.default-scheme: hdfs://local199:9000\n  yarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\n  state.savepoints.dir: /ssc/save-point\n  state.checkpoints.dir: /ssc/check-point\n  state.backend: filesystem\n  classloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\n  $internal.application.program-args: --host 192.168.126.1 --port 8888\n\ndeployment:\n  sql: classpath:app-content\n', '$internal.application.main: com.github.martvey.example.stream.NcStreamWordCount\r\ntaskmanager.memory.process.size: 1728m\r\nfs.default-scheme: hdfs://local199:9000\r\njobmanager.execution.failover-strategy: region\r\nclassloader.parent-first-patterns.default: com.github.martvey.core.;com.github.martvey.debug.;org.apache.flink.;java.;scala.;com.esotericsoftware.kryo;org.apache.hadoop.;javax.annotation.;org.slf4j;org.apache.log4j;org.apache.logging;org.apache.commons.logging;ch.qos.logback;org.xml;javax.xml;org.apache.xerces;org.w3c\r\njobmanager.memory.process.size: 1600m\r\nstate.savepoints.dir: /ssc/save-point\r\ntaskmanager.numberoftaskslots: 1\r\nexecution.attached: true\r\nyarn.provided.lib.dirs: /ssc/metastore/libraries/FLINK/0\r\n$internal.application.program-args: --host;192.168.126.1;--port;8888\r\npipeline.jars: /ssc/repository/AB8C42FCA1304E6CA1652DC16782B6B3/F9ECCD78DF0048EC9950ACA0883EE63A/A4A724231AB44B318DD93739823DF0E1/1.0.0/nc_stream_app-1.0.0.jar\r\nparallelism.default: 1\r\nstate.backend: filesystem\r\nstate.checkpoints.dir: /ssc/check-point', '2022-06-12 19:26:16', '1.0.0');

SET FOREIGN_KEY_CHECKS = 1;
