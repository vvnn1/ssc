import { Button, Popconfirm, Select } from "antd";
import { useState } from "react";
import { DownloadOutlined, FullscreenOutlined, SyncOutlined } from "../../../../../../Icon";
import "./index.sass";
import MonacoEditor from "../../../../../../MonacoEditor";

const LogLayout = () => {
    const [selectDisabled, setSelectDisabled] = useState<boolean>(true);

    const changeSelectDisabled = (disabled: boolean) => {
        return () => {
            setSelectDisabled(disabled);
        };
    };

    return (
        <div className="taskmanager-log-layout">
            <div className="log-level-container">
                <div>
                    <span>日志级别 :</span>
                    <Select className="level-select" size="small" disabled={selectDisabled} />
                    {
                        selectDisabled ? (
                            <Popconfirm
                                title="该日志后续将以修改后类型输出"
                                onConfirm={changeSelectDisabled(false)}
                                okText="确认"
                                cancelText="取消"
                                style={{ width: 250 }}
                                overlayClassName="ant-popover-rtl"
                            >
                                <Button type="link" size="small">编辑</Button>
                            </Popconfirm>
                        ) : (
                            <>
                                <Button type="link" onClick={changeSelectDisabled(true)} size="small">确定</Button>
                                <Button type="link" onClick={changeSelectDisabled(true)} size="small">取消</Button>
                            </>
                        )
                    }

                </div>
                <div className="actions">
                    <Button size="small"><SyncOutlined /></Button>
                    <Button size="small"><DownloadOutlined /></Button>
                    <Button size="small" icon={<FullscreenOutlined />} />
                </div>
            </div>
            <div className="log-preview">
                <MonacoEditor
                    options={{
                        minimap: {
                            enabled: false
                        },
                        selectOnLineNumbers: true,
                        lineNumbersMinChars: 5,
                        lineDecorationsWidth: 0,
                        wordWrap: "on",
                        readOnly: false,
                        scrollBeyondLastLine: false,
                    }}
                    value={
                        `2023-09-14 11:11:17,558 [main] INFO  org.apache.flink.runtime.taskexecutor.TaskManagerRunner      [] - --------------------------------------------------------------------------------
2023-09-14 11:11:17,564 [main] INFO  org.apache.flink.runtime.taskexecutor.TaskManagerRunner      [] -  Preconfiguration: 
2023-09-14 11:11:17,564 [main] INFO  org.apache.flink.runtime.taskexecutor.TaskManagerRunner      [] - 


RESOURCE_PARAMS extraction logs:
jvm_params: -Xmx3597035049 -Xms3597035049 -XX:MaxDirectMemorySize=880468305 -XX:MaxMetaspaceSize=268435456
dynamic_configs: -D taskmanager.memory.network.min=746250577b -D taskmanager.cpu.cores=1.0 -D taskmanager.memory.task.off-heap.size=0b -D taskmanager.memory.jvm-metaspace.size=268435456b -D external-resources=none -D taskmanager.memory.jvm-overhead.min=858993472b -D taskmanager.memory.framework.off-heap.size=134217728b -D taskmanager.memory.network.max=746250577b -D taskmanager.memory.framework.heap.size=134217728b -D taskmanager.memory.managed.size=2985002310b -D taskmanager.memory.task.heap.size=3462817321b -D taskmanager.numberOfTaskSlots=1 -D taskmanager.memory.jvm-overhead.max=858993472b
logs: INFO  [] - Loading configuration property: blob.server.port, 6124
INFO  [] - Loading configuration property: kubernetes.taskmanager.service-account, vvr-task-manager
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.port, 9999
INFO  [] - Loading configuration property: env.java.opts, -Djavax.net.ssl.keyStoreType=JKS -Djavax.net.ssl.trustStoreType=JKS -Dlog.file=/flink/log/flink.log -Dstdout.file=/flink/log/flink.out -Dlog4j.configurationFile=/flink/conf.template/log4j2.xml -Djdk.tls.ephemeralDHKeySize=2048 -Dalicloud.sts.credential.provider=sts.file -Dsts.provider.file.credential.root.path=/flink/sts-secrets/sts-credential -Dsts.provider.credential.expire.seconds=900 -Dfile.encoding=UTF-8 -Dkubernetes.max.concurrent.requests=1000
INFO  [] - Loading configuration property: high-availability.cluster-id, c3d0298e-8a85-48b1-a767-659b74d20d1a
INFO  [] - Loading configuration property: jmx.server.port, 10000,10001-10500
INFO  [] - Loading configuration property: jobmanager.rpc.address, sessioncluster-c3d0298e-8a85-48b1-a767-659b74d20d1a-jobmanager
INFO  [] - Loading configuration property: state.savepoints.dir, oss://ssc-b/flink-savepoints/namespaces/ssc-m-default/sessionclusters/debug-session
INFO  [] - Loading configuration property: fs.oss.impl, org.apache.hadoop.fs.aliyun.oss.AliyunOSSFileSystem
INFO  [] - Loading configuration property: kubernetes.cluster-id, session-c3d0298e-8a85-48b1-a767-659b74d20d1a
INFO  [] - Loading configuration property: high-availability.storageDir, oss://ssc-b/flink-sessionclusters/namespaces/ssc-m-default/sessionclusters/debug-session/ha
INFO  [] - Loading configuration property: kubernetes.namespace, vvp-workload
INFO  [] - Loading configuration property: metrics.reporters, promappmgr
INFO  [] - Loading configuration property: high-availability.jobmanager.port, 6123
INFO  [] - Loading configuration property: taskmanager.memory.process.size, 8192m
INFO  [] - Loading configuration property: security.delegation.token.provider.hbase.enabled, ******
INFO  [] - Loading configuration property: web.cancel.enable, false
INFO  [] - Loading configuration property: jobmanager.memory.process.size, 4096m
INFO  [] - Loading configuration property: jobmanager.rpc.port, 6123
INFO  [] - Loading configuration property: rest.port, 8081
INFO  [] - Loading configuration property: metrics.reporter.promappmgr.factory.class, org.apache.flink.metrics.prometheus.PrometheusReporterFactory
INFO  [] - Loading configuration property: state.backend.gemini.snapshot.close.file, true
INFO  [] - Loading configuration property: high-availability.respect-checkpoint-retention-on-shutdown, true
INFO  [] - Loading configuration property: high-availability, org.apache.flink.kubernetes.highavailability.KubernetesHaServicesFactory
INFO  [] - Loading configuration property: cluster.termination-message-path, /flink/log/termination.log
INFO  [] - Loading configuration property: fs.oss.endpoint, https://oss-cn-hangzhou-internal.aliyuncs.com
INFO  [] - Loading configuration property: restart-strategy, none
INFO  [] - Loading configuration property: state.backend, com.alibaba.flink.statebackend.GeminiStateBackendFactory`
                    }
                />
            </div>
        </div>
    );
};

export default LogLayout;