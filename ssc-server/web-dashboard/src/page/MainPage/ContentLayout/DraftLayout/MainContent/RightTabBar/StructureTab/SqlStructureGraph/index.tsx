import { FlowAnalysisGraph, FlowAnalysisGraphConfig } from "@ant-design/graphs";
import "./index.sass";
import { useEffect, useRef, useState } from "react";

const titleColor = (title: string) => {
    switch (title) {
        case "SOURCE":
        case "SOURCE_DB":
            return { fill: "#52c41a" };
        case "SINK":
        case "SINK_DB":
            return { fill: "#fa541c" };
        case "DIM":
            return { fill: "#faad14" };
        case "UDTF":
            return { fill: "#eb2f96" };
        case "VIEW":
            return { fill: "#fa8c16" };
        case "JOIN":
        case "CORRELATE":
        case "INTERSECT":
        case "EXCEPT":
        case "UNION":
            return { fill: "#2f54eb" };
        default:
            return { fill: "#0070cc" };
    }
};

const labelColor = (title: string) => {
    switch (title) {
        case "SOURCE":
        case "SOURCE_DB":
            return { fill: "#52c41a1a" };
        case "SINK":
        case "SINK_DB":
            return { fill: "#fa541c1a" };
        case "DIM":
            return { fill: "#faad141a" };
        case "UDTF":
            return { fill: "#eb2f961a" };
        case "VIEW":
            return { fill: "#fa8c161a" };
        case "JOIN":
        case "CORRELATE":
        case "INTERSECT":
        case "EXCEPT":
        case "UNION":
            return { fill: "#2f54eb1a" };
        default:
            return { fill: "#0070cc1a" };
    }
};

const data: FlowAnalysisGraphConfig["data"] = {
    nodes: [
        {
            id: "-2",
            value: {
                title: "SOURCE",
                items: [
                    {
                        text: "order_table",
                    },
                ],
            },
        },
        {
            id: "-1",
            value: {
                title: "JOIN",
            },
        },
        {
            id: "0",
            value: {
                title: "SELECT",
                items: [
                    {
                        text: "select t1.order_id as orde…",
                    },
                ],
            },
        },

        {
            id: "2",
            value: {
                title: "SOURCE",
                items: [
                    {
                        text: "price_dim_table FOR SYSTEM_T…",
                    },
                ],
            },
        },
        {
            id: "5",
            value: {
                title: "SINK",
                items: [
                    {
                        text: "insert into print_sink selec…",
                    },
                ],
            },
        },
        {
            id: "6",
            value: {
                title: "DIM",
                items: [
                    {
                        text: "price_dim_table FOR SYSTEM_T…",
                    },
                ],
            },
        },
    ],
    edges: [
        {
            source: "-2",
            target: "0",
        },
        {
            source: "-1",
            target: "0",
        },

        {
            source: "6",
            target: "-1",
        },

        {
            source: "0",
            target: "5",
        },
        {
            source: "2",
            target: "6",
        },
    ],
};

const config: FlowAnalysisGraphConfig = {
    data,
    //@ts-ignore
    layout: {
        rankdir: "TB",
        ranksepFunc: () => 15,
        nodesepFunc: () => 5,
    },
    nodeCfg: {
        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],

        title: {
            containerStyle: (node: any) => {
                const fill = titleColor(node.value.title);
                return {
                    ...fill,
                };
            },
            autoEllipsis: true,
        },
        label: {
            style: {
                fontSize: 12,
            },
        },
        size: [200, 20],
        style: (node: any) => {
            const fill = labelColor(node.value.title);
            return {
                ...fill,
                stroke: "#0064c8",
                lineWidth: 2,
                strokeOpacity: 0.5,
            };
        },
        nodeStateStyles: {
            hover: {
                strokeOpacity: 1,
            },
        },
        padding: 8,
    },
    edgeCfg: {
        type: "cubic-vertical",
        endArrow: {
            show: true,
            type: "triangle",
            stroke: "transparent",
            fill: "#72bced",
            fillOpacity: 0.5,
            d: -1,
        },
        style: () => {
            return {
                stroke: "#0064c8",
                lineWidth: 2,
                strokeOpacity: 0.5,
            };
        },
        edgeStateStyles: {
            hover: {
                strokeOpacity: 1,
                lineDash: [10, 5],
            },
        },
    },
    behaviors: ["drag-canvas", "zoom-canvas"],
};

const SqlStructureGraph = () => {
    const graphContainer = useRef<HTMLDivElement>(null);
    const observerRef = useRef<ResizeObserver>();
    const [graphConfig, setGraphConfig] = useState<FlowAnalysisGraphConfig>(config);

    useEffect(() => {
        observerRef.current = new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
                setGraphConfig(config => {
                    return {
                        ...config,
                        height: graphContainer.current!.clientHeight,
                        width: graphContainer.current?.clientWidth,
                    };
                });
            });
        });
        observerRef.current.observe(graphContainer.current!);
        return () => {
            observerRef.current?.disconnect();
            observerRef.current = undefined;
        };
    }, []);

    return (
        <div
            className="resizable-graph-container"
            ref={graphContainer}
        >
            <FlowAnalysisGraph {...graphConfig} />
        </div>
    );
};

export default SqlStructureGraph;
