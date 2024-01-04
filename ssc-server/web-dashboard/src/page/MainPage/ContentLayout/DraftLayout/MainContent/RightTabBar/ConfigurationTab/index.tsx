import { Form, Select, Space, Tag, Tooltip, Upload } from "antd";
import { CheckOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from "../../../../../../../component/Icon";
import "./index.sass";
import FileSelect from "../../../../../../../component/Select/FileSelect";
import EngineSelect from "../../../../../../../component/Select/EngineSelect";

const { Option } = Select;

const ConfigurationTab = () => {
    return (
        <div className="draft-configuration">
            <div className="title">
                <span>更多配置</span>
            </div>

            <div className="content-wrapper">
                <Form
                    size="small"
                    layout="vertical"
                >
                    <Form.Item label="引擎版本">
                        <EngineSelect />
                    </Form.Item>
                    <Form.Item label="附加依赖文件">
                        <FileSelect />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ConfigurationTab;
