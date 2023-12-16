
## 一、简介
ssc系统是基于[Apache Flink](https://flink.apache.org) 、YARN封装的一个命令行客户端系统，用户只需在客户端中进行sql配置就能完成流计算任务。
目的是快速开发，管理流计算任务。

### 1、主要功能

* **[1] 项目空间，项目，SQL，JAR包，自定义函数的管理**
* **[2] 支持yarn-per-job模式、yarn-session模式、yarn-application模式。**
* **[3] 支持SQL的校验及错误信息汉化、SQL的调试。**
* **[4] 支持自定义udf、连接器等,完全兼容官方SQL。**
* **[5] 支持任务的管理，容器的管理，支持版本管理配置。**


## 二、项目演示
打包服务端ssc-server及ssc-cli

### 1、编译运行
* 通过 mvn install 命令安装 `ssc-dist` `ssc-flink-custom` 模块到本地
* 参照hadoop官方`core-site.xml`,`hdfs-site.xml`,`yarn-site.xml`于项目 resource/hadoop 目录下配置
* 其他可在IDE正常编译运行，打包指令 mvn package -P sit
* `ssc-server`包含项目后端+前端(暂未对接)，`ssc-cli`为项目命令行客户端
### 2、网页客户端功能介绍([在线演示](https://vvnn1.github.io/ssc/index.html#/workspace/:workspace/namespace/:namespace/dashboard))
运行`ssc-server`后，可通过
[本地地址](http://localhost:9704/web/123123/zh#/workspace/:workspaceId/namespace/:namespace/dashboard)
访问前端页面。  
注意：前后端暂未进行对接，页面上的功能仅作为将来功能实现的参考。
![演示图片](https://img-blog.csdnimg.cn/971265bcbd10456983f0dbc51508d071.jpeg)
### 3、命令行客户端功能介绍
运行ssc-cli，并运行help可查看客户端所支持的所有命令

| 命令组    | 命令                                                                                                                        | 命令组    | 命令                                                                                                                                                                           |
|--------|---------------------------------------------------------------------------------------------------------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| JAR包命令 | drop-jar: 删除jar包<br/>list-jar: 查询jar包<br/>upload-jar: 添加jar包                                                              | SQL命令  | cat-sql: 预览SQL<br/>create-sql: 创建SQL<br/>debug-sql: 调试SQL<br/>export-sql: 导出SQL<br/>list-sql: 查询SQL列表<br/>rename-sql: 重命名SQL<br/>update-sql: 更新SQL<br/>valid-sql: 校验SQL<br/> |
| 任务命令   | create-job: 创建job<br/>drop-job: 删除job<br/>list-job: 查询job<br/>rerun-job: 重新运行<br/>run-job: 运行job<br/>stop-job: 暂停job<br/> | 项目命令   | create-project: 创建工程<br/>drop-project: 删除工程<br/>list-project: 工程列表<br/>rename-project: 重命名工程<br/>                                                                            |
| 版本命令   | create-version: 创建版本<br/>drop-version: 删除版本<br/>list-version: 查询版本列表<br/>                                                 | 项目空间命令 | create-space: 创建空间<br/>drop-space: 删除空间<br/>list-space: 查询空间列表<br/>rename-space: 重命名空间<br/>                                                                                  |
| 集群命令   | cancel-cluster: 关闭集群<br/>create-cluster: 创建集群<br/>drop-cluster: 删除集群<br/>run-cluster: 运行集群<br/>                           | 其他命令   | show used: 查询当前指定信息<br/>use-project: 指定工程<br/>use-space: 指定空间<br/>login: 用户登录<br/>                                                                                           |
| 函数命令   | create-function: 添加函数<br/>drop-function: 删除函数<br/>list-function: 查询函数<br/> |        |                                                                                                                                                                              |

TAB键可以自动补全及提示

![命令提示](https://img-blog.csdnimg.cn/368c700d51f84e82aa8e9aa411993dce.png)

![参数提示](https://img-blog.csdnimg.cn/9fccddae8810451db731d40b139ecf81.png)
### 2 项目空间

创建空间

![创建项目空间](https://img-blog.csdnimg.cn/fced993917ee4b0e9e520893d75c35b8.png)

查询空间

![查询项目空间](https://img-blog.csdnimg.cn/ca4ce5ff1e78467a9bd39010527250c9.png)

重命名空间

![重命名空间](https://img-blog.csdnimg.cn/e34dbc231b9b48478e551e38f7debb2c.png)

![重命名空间查](https://img-blog.csdnimg.cn/e429dad60cf84adc9d8f312515eb12c3.png)

删除空间

![删除空间](https://img-blog.csdnimg.cn/73dd3b0ffd1b46748f27906cd73e7468.png)

### 3 项目
通过use-space 选择需要操作的空间

![指定空间](https://img-blog.csdnimg.cn/463b40de1e214f9994fdabbaa5e25b63.png)

创建项目

![创建项目](https://img-blog.csdnimg.cn/f7b059c1957547e4a2efaf23137fdd52.png)

查询项目１

![查询项目](https://img-blog.csdnimg.cn/7b1068c60d78410db7f3a18be725171d.png)

删除项目

![删除项目](https://img-blog.csdnimg.cn/752ac919105e47c8808792838e2341cb.png)

### 4 JAR包

上传一个kafka连接器jar包，范围是PROJECT（工程范围）。系统支持工程范围（PROJECT）、系统范围（SYSTEM）

![添加jar](https://img-blog.csdnimg.cn/d1cca2ea8d5241cf948a4eb96b9c3cc0.png)

查询jar包

![查询jar](https://img-blog.csdnimg.cn/80df3713a0ab4b4da0bc8c1f41186ef9.png)

删除jar包

![删除jar](https://img-blog.csdnimg.cn/efd37def43514bcfbc4e5ace6322878b.png)

### 5 函数

以下代码打包成 martvey_function-1.0-SNAPSHOT.jar 并上传系统，功能为为数据加一个前缀

```java
public class PreUDF extends ScalarFunction {
    private String pre;

    public PreUDF(String pre) {
        this.pre = pre;
    }

    public String eval(String str){
        return pre + str;
    }
}
```

创建一个 martvey_pre.yaml 配置文件，以下内容复制至文件中
```yaml
functions:
  - name: martvey_pre                               # 函数名称
    from: class                                     # 从哪里构造函数
    class: com.github.martvey.ssc.function.PreUDF   # 函数class
    constructor:                                    # 函数的构造函数
      - type: varchar                               # 构造函数类型
        value: martvey_                             # 构造函数参数
```

添加函数

![添加函数](https://img-blog.csdnimg.cn/0345755f86fd4275b1a35a1e5d111ab9.png)

查询函数

![查询函数](https://img-blog.csdnimg.cn/43b7e57b37c146bbbe7f87d76df8172b.png)

删除函数

![删除函数](https://img-blog.csdnimg.cn/4b7fec0805844e548f683cda68d8d797.png)

### 6 SQL
创建一个 martvey_test.sql 文件，将以下内容放入
```sql
CREATE TABLE sensor_source(
    id VARCHAR,
    dt BIGINT,
    temperature DOUBLE
) WITH (
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_source',
    'connector.startup-mode'='latest-offset',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

CREATE TABLE sensor_sink(
    id VARCHAR,
    dt BIGINT,
    temperature DOUBLE
)WITH(
    'connector.type'='kafka',
    'connector.version'='universal',
    'connector.topic'='sensor_sink',
    'connector.properties.zookeeper.connect'='local199:2181',
    'connector.properties.bootstrap.servers'='local199:9092',
    'format.type'='csv'
);

CREATE DEBUG debug_1 AS 
SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;

INSERT INTO sensor_sink
SELECT martvey_pre(id) AS id, dt, temperature FROM sensor_source;
```

创建SQL

![创建SQL](https://img-blog.csdnimg.cn/f9c73a782dd14e8ab5045e9f88966748.png)

浏览SQL

![浏览SQL](https://img-blog.csdnimg.cn/bf6024024ece44fb93d05edb656b2b1f.png)

更新SQL

![更新SQL](https://img-blog.csdnimg.cn/6d07fe58da0b4ee0b71c4609330c1ba6.png)

校验SQL

将其中一个dt改为不存在的dt2进行校验

![校验SQL](https://img-blog.csdnimg.cn/8d91a6d5ad5044fb99ac985a5fb74abc.png)


导出SQL

![导出SQL](https://img-blog.csdnimg.cn/02d634fa189941c1b7448a7d45d0f03a.png)

调试SQL

调试专用语句CREATE DEBUG ... AS ...，可以在客户端打印出调试内容，可以看到客户端和kafka接受的内容，id已经成功加上前缀。ctrl+c提前终止

![客户端运行](https://img-blog.csdnimg.cn/direct/fc332c45ecdc4d33b5ec761d94405062.gif)

![kafka发送](https://img-blog.csdnimg.cn/037f14c6780e4f45ae647f514e983b0a.png)

![kafka接受](https://img-blog.csdnimg.cn/a6a3bc290aa64b84960506723d4b9f49.png)

### 6 版本控制

版本创建

![创建版本](https://img-blog.csdnimg.cn/1dfd0c0ba54448b5acb6206af8a30a97.png)

查询版本

![查询版本](https://img-blog.csdnimg.cn/41be91c7983c4f63b90085c8c97f5d65.png)

删除版本

![删除版本](https://img-blog.csdnimg.cn/13007dca8cfa46dca38711085c79b9a1.png)

### 7 任务
创建任务

![创建任务](https://img-blog.csdnimg.cn/e0fe61ada0fb4bafa9a8abdde56faaf8.png)

运行任务

![运行任务](https://img-blog.csdnimg.cn/6994cae58e32419a8095e83e5104c04f.png)

查询任务

![查询任务](https://img-blog.csdnimg.cn/a967f368527f470dab963ccb9e1ce200.png)

暂停任务

![暂停任务](https://img-blog.csdnimg.cn/ada484f6c33640bfb52f1ddb96cc23a7.png)

![暂停任务2](https://img-blog.csdnimg.cn/3bb4d13a26e24097bd82eff94e23016b.png)

重新运行任务

![重新运行任务](https://img-blog.csdnimg.cn/2252443f54ab4cae8b8dbf7828565d93.png)

![重新运行任务2](https://img-blog.csdnimg.cn/ef011ace8c6f4b40868bdfc4ca0fd0fe.png)