import { Input } from 'antd';
import './index.sass'
import { DownOutlined, UpOutlined } from '../Icon';
import { useState } from 'react';

const InputCron = () => {
    const [expand, setExpand] = useState<boolean>(false);

    const onExpandClick = () => {
        setExpand(expand => !expand);
    }

    const loadMore = () => {
        console.log("load more...")
    }

    return (
        <div className="ant-cron-expression-content">
            <div className="ant-input ant-cron-expression-input-group">
                <div className="ant-cron-expression-input">
                    <Input defaultValue="0" />
                </div>
                <div className="ant-cron-expression-input">
                    <Input defaultValue="0-23/1" />
                </div>
                <div className="ant-cron-expression-input">
                    <Input defaultValue="*" />
                </div>
                <div className="ant-cron-expression-input">
                    <Input defaultValue="*" />
                </div>
                <div className="ant-cron-expression-input">
                    <Input defaultValue="*" />
                </div>
            </div>
            <div className="ant-cron-expression-label-group ant-cron-expression-label-group-default">
                <div className="ant-cron-expression-label">
                    分钟
                </div>
                <div className="ant-cron-expression-label">
                    小时
                </div>
                <div className="ant-cron-expression-label">
                    日
                </div>
                <div className="ant-cron-expression-label">
                    月
                </div>
                <div className="ant-cron-expression-label">
                    周
                </div>
            </div>
            <div className="ant-collapse ant-collapse-borderless ant-cron-expression-preview">
                <div className={`ant-cron-expression-preview-dateTime ${expand ? 'ant-cron-expression-preview-dateTime-center' : null}`}>
                    2023-11-08 15:00:00
                </div>
                <div className="ant-cron-expression-preview-content">
                    <div className="ant-cron-expression-preview-content-date">
                        {
                            expand ? (
                                <ul className="ant-cron-expression-preview-list">
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li>2023-11-08 15:00:00</li>
                                    <li onClick={loadMore}>...</li>
                                </ul>
                            ) : null
                        }
                    </div>
                    <ul className="ant-cron-expression-preview-icon">
                        <li onClick={onExpandClick}>
                            {expand ? <UpOutlined /> : <DownOutlined />}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default InputCron;