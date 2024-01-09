import { Link, Route, Routes, generatePath, matchPath, useLocation, useParams } from "react-router-dom";
import StreamJobListLayout from "./StreamJobListLayout";
import "./index.sass";
import { Suspense, useState } from "react";
import JobDetailLayout from "./StreamJobDetailLayout";
import JobDetailLoadingLayout from "./JobDetailLoadingLayout";
import { LeftOutlined, RightOutlined } from "../../../../component/Icon";
import { Resizable, ResizableProps } from "react-resizable";
import BatchJobListLayout from "./BatchJobListLayout";
import qs from "querystring";

const OperationLayout = () => {
    const [leftWidth, setLeftWidth] = useState<number>(350);
    const { pathname, search } = useLocation();
    const { expandMode: noLeftScreen } = qs.parse(search ? search.slice(1) : "");
    const pathMatch = matchPath("/workspace/:workspaceId/namespace/:namespaceId/operations/:jobType/*", pathname);
    const noRightScreen = !!!pathMatch?.params["*"];
    const onResize: ResizableProps["onResize"] = (_, { size }) => {
        setLeftWidth(size.width);
    };

    return (
        <div className="operation-split-layout">
            <Resizable
                width={leftWidth}
                axis="x"
                minConstraints={[350, 0]}
                maxConstraints={[500, 0]}
                resizeHandles={["e"]}
                handle={
                    noRightScreen ? null : (
                        <div className="react-resizable-handle react-resizable-handle-e">
                            {noLeftScreen ? (
                                <Link
                                    className="navigator"
                                    to={`${pathname}`}
                                >
                                    <RightOutlined />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        className="navigator"
                                        to={`${pathname}?expandMode=true`}
                                    >
                                        <LeftOutlined />
                                    </Link>
                                    <Link
                                        className="navigator bottom"
                                        to={pathMatch.params.jobType ?? "stream"}
                                        relative="path"
                                    >
                                        <RightOutlined />
                                    </Link>
                                </>
                            )}
                        </div>
                    )
                }
                onResize={onResize}
            >
                <div
                    className={`left transition ${!noRightScreen && noLeftScreen ? "collapsed" : ""}`}
                    style={noRightScreen ? undefined : { flexBasis: noLeftScreen ? 26 : leftWidth + "px", width: 0 }}
                >
                    {noRightScreen || !noLeftScreen ? (
                        <Routes>
                            <Route
                                path="stream/*"
                                element={<StreamJobListLayout collapse={!noRightScreen} />}
                            />
                            <Route
                                path="batch/*"
                                element={<BatchJobListLayout collapse={!noRightScreen} />}
                            />
                        </Routes>
                    ) : null}
                </div>
            </Resizable>

            {noRightScreen ? null : (
                <div className="right">
                    <Routes>
                        <Route path="stream">
                            <Route path=":jobId">
                                <Route
                                    path="*"
                                    element={
                                        <Suspense fallback={<JobDetailLoadingLayout />}>
                                            <JobDetailLayout />
                                        </Suspense>
                                    }
                                />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default OperationLayout;
