import {
    Badge,
    Button,
    Checkbox,
    Divider,
    Dropdown,
    DropdownProps,
    Input,
    MenuProps,
    Modal,
    Select,
    SelectProps,
    Space,
    Tag,
} from "antd";
import { changeModalOpen, uuid } from "../../../../../util";
import DeployModal from "../DeployModal";
import { useState } from "react";
import "./index.sass";
import { useNavigate } from "react-router-dom";
import {
    FilterOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    RightOutlined,
    SearchOutlined,
    SwapOutlined,
} from "../../../../../component/Icon";
import moment from "moment";
import ConfigurationDrawer from "./ConfigurationDrawer";
import RecordTable, { Record } from "./RecordTable";
import JobTable, { Record as Job } from "./JobTable";

const FilterDropdown = (props: Pick<DropdownProps, "children">) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleMenuClick: MenuProps["onClick"] = e => {};

    const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
        if (info.source === "trigger" || nextOpen) {
            setOpen(nextOpen);
        }
    };

    return (
        <Dropdown
            trigger={["click", "hover"]}
            open={open}
            overlayClassName="batch-job-filter-dropdown"
            menu={{
                items: [
                    {
                        type: "group",
                        label: "Type",
                        children: [
                            {
                                key: "sql",
                                label: <Checkbox>SQL</Checkbox>,
                            },
                            {
                                key: "jar",
                                label: <Checkbox>JAR</Checkbox>,
                            },
                            {
                                key: "python",
                                label: <Checkbox>PYTHON</Checkbox>,
                            },
                        ],
                    },
                    {
                        type: "group",
                        label: "状态",
                        children: [
                            {
                                key: "launch",
                                label: <Checkbox>启动中</Checkbox>,
                            },
                            {
                                key: "running",
                                label: <Checkbox>运行中</Checkbox>,
                            },
                            {
                                key: "canceling",
                                label: <Checkbox>停止中</Checkbox>,
                            },
                            {
                                key: "cancelled",
                                label: <Checkbox>已停止</Checkbox>,
                            },
                            {
                                key: "finished",
                                label: <Checkbox>已完成</Checkbox>,
                            },
                            {
                                key: "failed",
                                label: <Checkbox>已失败</Checkbox>,
                            },
                        ],
                    },
                ],
                onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            dropdownRender={menu => {
                return (
                    <>
                        <ul className="ant-dropdown-menu">
                            <li className="checkbox-list">{menu}</li>
                            <li className="actions">
                                <Button type="link">重置</Button>
                            </li>
                        </ul>
                    </>
                );
            }}
        >
            {props.children}
        </Dropdown>
    );
};

interface BatchJobListLayoutProps {
    collapse?: boolean;
}

const BatchJobListLayout = (props: BatchJobListLayoutProps) => {
    const [deployModalOpen, setDeployModalOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [modal, modalContextHolder] = Modal.useModal();
    const [jobDataList, setJobDataList] = useState<Job[]>([
        {
            key: "0",
            name: "test_kkk",
            runningCount: 0,
            finishedCount: 0,
            failedCount: 1,
            cancelledCount: 0,
            launchCount: 0,
            editor: "wang",
            updateTime: "01-04 15:35 ",
            endTime: "01-04 17:42 ",
        },
    ]);

    const [recordDataList, setRecordDataList] = useState<Record[]>([
        {
            key: "7980f044-d5f7-4b11-ba8b-f13c2c769d62",
            id: "7980f044-d5f7-4b11-ba8b-f13c2c769d62",
            createTime: "01-04 15:45",
            status: "failed",
            editor: "1840755998634838",
            updateTime: "01-04 15:47",
            endTime: "01-04 15:47",
        },
    ]);
    const navigate = useNavigate();

    const onJobTypeSelect: SelectProps["onSelect"] = (_, { link }) => {
        navigate(link);
    };

    const onJobDeleteClick = (job: Job) => {
        modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: "删除作业",
            content: `确定删除选择的作业 ${job.name} 吗？`,
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            okButtonProps: {
                danger: true,
            },
            closable: true,
        });
    };

    const onJobLaunchClick = (job: Job) => {
        modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: "作业启动",
            content: `你确定要启动作业 ${job.name} 吗？`,
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            closable: true,
            onOk: () => {
                const uid = uuid();
                const jobRecord: Record = {
                    key: uid,
                    id: uid,
                    createTime: moment().format("MM-DD HH:mm"),
                    status: "launch",
                    editor: "1840755998634838",
                    updateTime: moment().format("MM-DD HH:mm"),
                    endTime: "-",
                };

                setJobDataList(batchJobData => {
                    return [
                        {
                            ...batchJobData[0],
                            launchCount: batchJobData[0].launchCount + 1,
                        },
                    ];
                });

                setRecordDataList(list => {
                    return [jobRecord, ...list];
                });

                const id = setInterval(() => {
                    jobRecord.status = "failed";
                    jobRecord.endTime = moment().format("MM-DD HH:mm");
                    jobRecord.updateTime = moment().format("MM-DD HH:mm");

                    setJobDataList(batchJobData => {
                        return [
                            {
                                ...batchJobData[0],
                                launchCount: batchJobData[0].launchCount - 1,
                                failedCount: batchJobData[0].failedCount + 1,
                            },
                        ];
                    });

                    setRecordDataList(batchRecordData => {
                        return [...batchRecordData];
                    });

                    clearInterval(id);
                }, 10000);
            },
        });
    };

    const onRecordCancelClick = (record: Record) => {
        modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: "停止作业",
            content: `确认要停止该作业吗？（创建于 ${record.createTime}）？`,
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            closable: true,
        });
    };

    const onRecordDeleteClick = (record: Record) => {
        modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: "删除作业",
            content: `确认要删除该作业吗？（创建于 ${record.createTime}）`,
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <OkBtn />
                    <CancelBtn />
                </>
            ),
            okButtonProps: {
                danger: true,
            },
            closable: true,
        });
    };

    return (
        <div className="batch-job-list-layout">
            <div className="header">
                <div className="title">作业运维</div>
                <div className="actions">
                    <Space>
                        <Button
                            type="primary"
                            onClick={changeModalOpen(true, setDeployModalOpen)}
                        >
                            {props.collapse ? <PlusOutlined /> : "部署作业"}
                        </Button>
                        <Select
                            defaultValue={"batch"}
                            options={[
                                {
                                    value: "stream",
                                    label: "流作业",
                                    link: "/workspace/:workspaceId/namespace/:namespaceId/operations/stream",
                                },
                                {
                                    value: "batch",
                                    label: "批作业",
                                    link: "/workspace/:workspaceId/namespace/:namespaceId/operations/batch",
                                },
                            ]}
                            onSelect={onJobTypeSelect}
                        />
                        {props.collapse ? (
                            <Input
                                suffix={<SearchOutlined />}
                                placeholder="搜索…"
                            />
                        ) : (
                            <>
                                <Space.Compact className="ant-input-group">
                                    <span className="ant-input-group-addon">
                                        <SwapOutlined />
                                    </span>
                                    <Select
                                        defaultValue="name_asc"
                                        options={[
                                            {
                                                label: "按名称升序",
                                                value: "name_asc",
                                            },
                                            {
                                                label: "按名称降序",
                                                value: "name_desc",
                                            },
                                            {
                                                label: "按修改时间升序",
                                                value: "edit_asc",
                                            },
                                            {
                                                label: "按修改时间降序",
                                                value: "edit_desc",
                                            },
                                        ]}
                                        style={{ width: 170 }}
                                    />
                                </Space.Compact>
                                <Space.Compact className="ant-input-group">
                                    <span className="ant-input-group-addon">
                                        <FilterDropdown>
                                            <Badge
                                                dot={true}
                                                color="#2281d4"
                                            >
                                                <FilterOutlined style={{ color: "#2281d4" }} />
                                            </Badge>
                                        </FilterDropdown>
                                    </span>
                                    <Space.Compact>
                                        <Input
                                            style={{ width: 140 }}
                                            placeholder="搜索…"
                                        />
                                        <Button type="primary">查询</Button>
                                    </Space.Compact>
                                </Space.Compact>
                                <Space.Compact>
                                    <Select
                                        suffixIcon={null}
                                        style={{ width: 185 }}
                                        placeholder="标签选择"
                                        dropdownRender={menu => (
                                            <>
                                                <div style={{ padding: "5px 12px", color: "#666" }}>标签名</div>
                                                <Divider style={{ margin: 0 }} />
                                                {menu}
                                            </>
                                        )}
                                    />
                                    <Button>重置</Button>
                                </Space.Compact>
                            </>
                        )}
                    </Space>
                </div>
            </div>
            <div className="content">
                <div className="screening">
                    {props.collapse ? null : (
                        <>
                            <Tag>所有作业</Tag>
                            <RightOutlined />
                        </>
                    )}

                    <Tag
                        className={props.collapse ? "collapsed-tag" : undefined}
                        closable
                    >
                        状态: 启动中,运行中,停止中,已停止,已完成,已失败
                    </Tag>
                    <Tag
                        className={props.collapse ? "collapsed-tag" : undefined}
                        closable
                    >
                        类型: SQLSCRIPT,JAR,PYTHON
                    </Tag>
                    <Button
                        size="small"
                        type="link"
                    >
                        清除
                    </Button>
                </div>
                <JobTable
                    collapse={props.collapse}
                    dataSource={jobDataList}
                    onJobDeleteClick={onJobDeleteClick}
                    onJobLaunchClick={onJobLaunchClick}
                    onJobDetailClick={changeModalOpen(true, setDrawerOpen)}
                    expandable={{
                        expandedRowRender: () => (
                            <RecordTable
                                collapse={props.collapse}
                                dataSource={recordDataList}
                                onRecordCancelClick={onRecordCancelClick}
                                onRecordDeleteClick={onRecordDeleteClick}
                            />
                        ),
                        rowExpandable: record => record.name !== "Not Expandable",
                        expandIcon: ({ expanded, onExpand, record }) => (
                            <RightOutlined
                                className={expanded ? "expanded" : undefined}
                                onClick={e => onExpand(record, e)}
                            />
                        ),
                        columnWidth: 32,
                        expandRowByClick: true,
                    }}
                />
            </div>
            <DeployModal
                open={deployModalOpen}
                onCancel={changeModalOpen(false, setDeployModalOpen)}
            />
            <ConfigurationDrawer
                open={drawerOpen}
                onClose={changeModalOpen(false, setDrawerOpen)}
            />
            {modalContextHolder}
        </div>
    );
};

export default BatchJobListLayout;
