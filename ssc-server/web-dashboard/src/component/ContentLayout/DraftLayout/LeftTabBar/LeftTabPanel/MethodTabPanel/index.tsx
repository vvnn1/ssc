import { Button, Input } from "antd"
import { AimOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "../../../../../Icon"
import './index.sass'
export default () => {
    return (
        <div className="method-tab-panel tab-panel">
            <div className="panel-bar header panel panel-ltr panel-border-bottom">
                <span className="title">函数</span>
                <div className="actions">
                    <Button
                        className="ant-btn-icon-only"
                        type='text'
                        size="small"
                    >
                        <AimOutlined />
                    </Button>
                    <Button
                        className="ant-btn-icon-only"
                        type='text'
                        size="small"
                    >
                        <DeleteOutlined />
                    </Button>
                    <Button
                        className="ant-btn-icon-only"
                        type='text'
                        size="small"
                    >
                        <ReloadOutlined />
                    </Button>
                </div>
            </div>
            <div className="panel-bar searchbar panel panel-ltr panel-border-bottom">
                <Input suffix={<SearchOutlined />} placeholder="搜索 UDFs / 函数…" />
            </div>
            <div className="panel tree panel-ttb panel-border-bottom">


            </div>
            <div className="panel expand-panel panel-ttb">
                <div className="title">
                    <span>没有项目被选中</span>
                </div>
                <div className="detail">

                </div>
            </div>
        </div>
    )
}