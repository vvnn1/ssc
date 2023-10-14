import { Button, Input, Tooltip } from "antd"
import { AimOutlined, DeleteOutlined, ReloadOutlined, SearchOutlined } from "../../../../../Icon"
import './index.sass'
import MetaTree from "./MetaTree"
import TableDescriptionPanel from "./TableDescriptionPanel"
import Resizable from "../../../../../Resizable"
import { useEffect, useState } from "react"

export default () => {
    const [fieldPanel, setFieldPanel] = useState<React.ReactNode>();
    const changeFieldPanel = (open: boolean) => {
        return () => {
            setFieldPanel(open ? <TableDescriptionPanel onCancel={changeFieldPanel(false)} /> : undefined);
        }
    }

    useEffect(() => {
        changeFieldPanel(true)();
    }, []);

    return (
        <div className="mata-tab-panel tab-panel">
            <div className="panel-bar header panel panel-ltr panel-border-bottom">
                <span className="title">元数据</span>
                <div className="actions">
                    <Tooltip
                        title="刷新所有元数据信息"
                    >
                        <Button
                            className="ant-btn-icon-only"
                            type='text'
                            size="small"
                        >
                            <ReloadOutlined />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="panel-bar searchbar panel panel-ltr panel-border-bottom">
                <Input suffix={<SearchOutlined />} placeholder="搜索名称…" />
            </div>
            <div className="panel meta-list panel-ttb">
                <MetaTree />
            </div>
            {
                fieldPanel
                    ? (
                        <Resizable
                            className="panel panel-ttb panel-border-top resizable-panel"
                            size={200}
                            resizeHandle="n"
                            axis={"y"}
                        >
                            {fieldPanel}
                        </Resizable>
                    ) : (
                        null
                    )

            }
        </div>
    )
}