import { Alert } from "antd";
import "./index.sass";

const TwigAlert = () => {
    return (
        <Alert
            className="twig-alert"
            type="info"
            message="可用的 Twig 变量："
            description={
                <ul style={{ marginLeft: 24 }}>
                    <li>
                        <code>namespace</code>:作业所属的项目空间
                    </li>
                    <li>
                        <code>sessionClusterId</code>:Session 集群 ID
                    </li>
                    <li>
                        <code>sessionClusterName</code>:Session 集群名称
                    </li>
                    <li>
                        <code>rootLoggerLogLevel</code>:root logger 的日志级别
                    </li>
                    <li>
                        <code>userConfiguredLoggers</code>:用户配置的日志级别的键值映射（键:记录器，值:日志级别）
                    </li>
                </ul>
            }
        />
    );
};

export default TwigAlert;
