import { Button, Collapse, Divider, Drawer, DrawerProps, Form, Space } from "antd";
import { MouseEventHandler, useState } from "react";
import { stopPropagationClickWrapper } from "../../../../../../util";
import BasicConfiguration from "./BasicConfiguration";
import ResourceConfiguration from "./ResourceConfiguration";
import RuntimeConfiguration from "./RuntimeConfiguration";
import LogConfiguration from "./LogConfiguration";
import "./index.sass";

// {
//     "success" : true,
//     "httpCode" : 200,
//     "requestId" : "202401111500-5ZGJ71DGJS",
//     "errorCode" : "",
//     "errorMessage" : "",
//     "data" : {
//       "deploymentId" : "f4e935e6-4d28-4fc6-b1fb-3e3079e5f8d3",
//       "name" : "test_kk",
//       "executionMode" : "BATCH",
//       "batchResourceSetting" : {
//         "basicResourceSetting" : {
//           "parallelism" : 1,
//           "jobmanagerResourceSettingSpec" : {
//             "cpu" : 1.0,
//             "memory" : "1Gi"
//           },
//           "taskmanagerResourceSettingSpec" : {
//             "cpu" : 1.0,
//             "memory" : "2Gi"
//           }
//         }
//       },
//       "kerberosConfig" : {
//         "kerberosEnabled" : false
//       },
//       "labels" : {
//         "11" : "22",
//         "33" : "44"
//       },
//       "engineVersion" : "vvr-8.0.4-flink-1.17",
//       "description" : "aaaaaa",
//       "referencedDeploymentDraftId" : "",
//       "deploymentHasChanged" : false,
//       "taker" : " | vvp-0",
//       "priority" : 5,
//       "resourceTuning" : {
//         "mode" : "none",
//         "resourceTuningId" : "",
//         "resourceTuningName" : "",
//         "scheduledPlanIsCancelling" : false
//       },
//       "autopilot" : {
//         "mode" : "",
//         "recommendation" : "",
//         "ignoreRecommendation" : ""
//       },
//       "deploymentTarget" : {
//         "mode" : "PER_JOB",
//         "name" : "vvp-workload"
//       },
//       "artifact" : {
//         "kind" : "JAR",
//         "jarArtifact" : {
//           "jarUri" : "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/WordCount.jar",
//           "additionalDependencies" : [ "oss://ssc-bucket-v2/artifacts/namespaces/ssc-space-default/codicon.ttf" ]
//         }
//       },
//       "flinkConf" : { },
//       "logging" : {
//         "loggingProfile" : "default",
//         "log4jLoggers" : [ {
//           "loggerName" : "",
//           "loggerLevel" : "INFO"
//         } ],
//         "logReservePolicy" : {
//           "openHistory" : true,
//           "expirationDays" : 7
//         }
//       },
//       "jobSummary" : {
//         "starting" : 0,
//         "running" : 0,
//         "cancelling" : 0,
//         "cancelled" : 1,
//         "finished" : 0,
//         "failed" : 6
//       },
//       "workspace" : "eb5de29f3a624f",
//       "namespace" : "ssc-space-default",
//       "creator" : "1840755998634838",
//       "creatorName" : "1840755998634838",
//       "modifier" : "1840755998634838",
//       "modifierName" : "1840755998634838",
//       "createdAt" : 1704353736,
//       "modifiedAt" : 1704953936
//     },
//     "message" : "",
//     "reason" : ""
//   }

interface ExtraAction {
    onSaveClick: MouseEventHandler;
    onCancelClick: MouseEventHandler;
    onEditClick: MouseEventHandler;
}

const ConfigurationDrawer = (props: DrawerProps) => {
    const [editing, setEditing] = useState<number>(0);
    const [basicForm] = Form.useForm();
    const [resourceForm] = Form.useForm();
    const [runtimeForm] = Form.useForm();
    const [logForm] = Form.useForm();

    const ganerateAction = (onSaveClick: MouseEventHandler, index: number): ExtraAction => {
        return {
            onSaveClick: stopPropagationClickWrapper(onSaveClick),
            onCancelClick: stopPropagationClickWrapper(() => setEditing(editing => editing & ~(1 << index))),
            onEditClick: stopPropagationClickWrapper(() => setEditing(editing => editing | (1 << index))),
        };
    };

    const extraActions: ExtraAction[] = [
        ganerateAction(() => {
            setEditing(editing => editing & ~(1 << 0));
        }, 0),
        ganerateAction(() => {}, 1),
        ganerateAction(() => {}, 2),
        ganerateAction(() => {}, 3),
    ];

    const ganerateExtra = (index: number): React.ReactNode => {
        if (index > 3) {
            return undefined;
        }

        const actions = extraActions[index];

        if (editing & (1 << index)) {
            return (
                <Space
                    size={0}
                    split={<Divider type="vertical" />}
                >
                    <Button
                        size="small"
                        type="link"
                        onClick={actions.onSaveClick}
                    >
                        保存
                    </Button>
                    <Button
                        size="small"
                        type="link"
                        onClick={actions.onCancelClick}
                    >
                        取消
                    </Button>
                </Space>
            );
        } else {
            return (
                <Button
                    size="small"
                    type="link"
                    onClick={actions.onEditClick}
                >
                    编辑
                </Button>
            );
        }
    };

    return (
        <Drawer
            {...props}
            title="部署详情-test_kk"
            width={900}
            className="batch-configuration-drawer"
        >
            <Collapse
                size="small"
                expandIconPosition="end"
                items={[
                    {
                        key: "basic",
                        label: "基础配置",
                        extra: ganerateExtra(0),
                        children: (
                            <BasicConfiguration
                                editing={!!(editing & (1 << 0))}
                                form={basicForm}
                            />
                        ),
                    },
                    {
                        key: "resource",
                        label: "资源配置",
                        extra: ganerateExtra(1),
                        children: (
                            <ResourceConfiguration
                                editing={!!(editing & (1 << 1))}
                                form={resourceForm}
                            />
                        ),
                    },
                    {
                        key: "runtime",
                        label: "运行参数配置",
                        extra: ganerateExtra(2),
                        children: (
                            <RuntimeConfiguration
                                editing={!!(editing & (1 << 2))}
                                form={runtimeForm}
                            />
                        ),
                    },
                    {
                        key: "log",
                        label: "日志配置",
                        extra: ganerateExtra(3),
                        children: (
                            <LogConfiguration
                                editing={!!(editing & (1 << 3))}
                                form={logForm}
                            />
                        ),
                    },
                ]}
            />
        </Drawer>
    );
};

export default ConfigurationDrawer;
