import { Skeleton } from "antd";

const LoadingLayout = () => {
    return (
        <div
            className="session-create-loading-layout"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <div
                className="header"
                style={{
                    height: 72,
                    lineHeight: 72,
                    padding: "16px 24px",
                    overflow: "hidden",
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
                style={{ padding: "0 24px", flex: "1", overflow: "hidden" }}
            >
                <Skeleton.Input
                    size="small"
                    active
                />
                <Skeleton
                    paragraph={{
                        rows: 10,
                    }}
                    active
                />
                <Skeleton.Input
                    size="small"
                    style={{ width: 25 }}
                    active
                />
                <Skeleton
                    paragraph={{
                        rows: 6,
                    }}
                    active
                />
            </div>
        </div>
    );
};

export default LoadingLayout;
