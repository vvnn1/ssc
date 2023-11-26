import { Skeleton } from "antd";

const LoadingLayout = () => {
    return (
        <div className="job-detail-loading-layout">
            <div
                className="header"
                style={{
                    height: 55,
                    overflow: "hidden",
                    padding: "10px 10px",
                }}
            >
                <Skeleton.Input
                    size="large"
                    active
                />
            </div>
            <div
                className="content"
                style={{ padding: "0 10px" }}
            >
                <Skeleton
                    paragraph={{ rows: 10 }}
                    active
                />
            </div>
        </div>
    );
};

export default LoadingLayout;
