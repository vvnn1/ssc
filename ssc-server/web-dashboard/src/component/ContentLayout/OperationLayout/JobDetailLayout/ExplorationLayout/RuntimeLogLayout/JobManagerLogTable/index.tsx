import { Table, Tooltip } from "antd";
import './index.sass'
import MyLink from "../../../../../../MyLink";

const JobManagerLogTable = () => {
    return (
        <div className="job-detail-exploration-jm-logs">
            <Table
                size="small"
                pagination={false}
                columns={[
                    {
                        title: '日志名称',
                        width: '50%',
                        dataIndex: 'name',
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        render: (value) => (
                            <MyLink to={value}>
                                <Tooltip title="oss://ssc-b/logs/ssc-m-default/9ddc3745-7453-4d4b-96ee-965d8b2d5f05/0e4eb4ec-61d8-4ae9-bf0e-dcaee4b7db5f/jobmanager-548ffb9547-zmtjn/20230927_095224-0" placement="right">
                                    {value}
                                </Tooltip>
                            </MyLink>
                        )
                    },
                    {
                        title: '大小 (KB)',
                        width: '50%',
                        dataIndex: 'size',
                        sorter: (a, b) => a.size.localeCompare(b.size),
                    }
                ]}
                dataSource={[
                    {
                        key: '1',
                        name: '20230927_095224-0',
                        size: '131.4'
                    },
                    {
                        key: '2',
                        name: '20230927_095236-1',
                        size: '4.41'
                    },
                    {
                        key: '3',
                        name: '20230927_095238-2',
                        size: '0.21'
                    }
                ]}
            />
        </div>
    )
};

export default JobManagerLogTable;