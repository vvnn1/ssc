import { Skeleton } from "antd";
import "./index.sass";

const LoadingLayout = () => {
    return (
        <div className="session-detail-loading-layout">
            <div
                className="header"
                style={{
                    height: 72,
                    lineHeight: 72,
                    padding: "16px 24px",
                }}
            >
                <Skeleton.Input
                    active
                    size="large"
                    style={{ width: 250 }}
                />
            </div>
            <div
                className="content"
                style={{
                    padding: "0 24px",
                }}
            >
                <Skeleton.Button
                    active
                    style={{ width: 450 }}
                />

                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Button
                    active
                    style={{ width: 650, marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
                <Skeleton.Input
                    size="small"
                    active
                    block
                    style={{ marginTop: 10 }}
                />
            </div>
        </div>
    );
};

export default LoadingLayout;
