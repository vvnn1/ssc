import { Breadcrumb, Button, Input, Tabs } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined, NewTabOutlined, SearchOutlined } from "../Icon";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import "./index.sass";
import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import React from "react";
import { Resizable, ResizeCallbackData } from "react-resizable";

interface DocumentProps {
    open?: boolean;
    onCancel?: () => void;
}

interface DocumentWindow {
    width: number;
    height: number;
    x: number;
    y: number;
}

const DocumentLayout: React.FC<DocumentProps> = ({ open, onCancel }) => {
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);
    const [documentWindow, setDocumentWindow] = useState<DocumentWindow>({
        width: 420,
        height: 680,
        x: window.document.documentElement.clientWidth - 465,
        y: window.document.documentElement.clientHeight - 745,
    });

    const onStart = (_: DraggableEvent, uiData: DraggableData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const onMouseEnter = () => {
        if (disabled) {
            setDisabled(false);
        }
    };

    const onMouseLeave = () => {
        if (!disabled) {
            setDisabled(true);
        }
    };

    const onResize = (_: any, { size, handle }: ResizeCallbackData) => {
        if (handle === "n" || handle === "w" || handle === "nw" || handle === "sw" || handle === "ne") {
            setDocumentWindow(dcWindow => {
                const w = size.width - dcWindow.width;
                const h = size.height - dcWindow.height;
                return {
                    width: size.width,
                    height: size.height,
                    x: handle === "ne" ? dcWindow.x : dcWindow.x - w,
                    y: handle === "sw" ? dcWindow.y : dcWindow.y - h,
                };
            });
        } else {
            setDocumentWindow(dcWindow => ({
                ...dcWindow,
                width: size.width,
                height: size.height,
            }));
        }
    };

    const onDrag = (_: DraggableEvent, data: DraggableData) => {
        setDocumentWindow(dcWindow => ({
            ...dcWindow,
            x: data.x,
            y: data.y,
        }));
    };

    return ReactDOM.createPortal(
        <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={onStart}
            position={{
                x: documentWindow.x,
                y: documentWindow.y,
            }}
            onDrag={onDrag}
        >
            <Resizable
                width={documentWindow.width}
                height={documentWindow.height}
                axis="both"
                resizeHandles={["e", "s", "w", "n", "sw", "nw", "se", "ne"]}
                minConstraints={[240, 400]}
                onResize={onResize}
            >
                <div
                    className="sub-screen-container"
                    ref={draggleRef}
                    style={{
                        visibility: open ? "visible" : "hidden",
                        width: documentWindow.width,
                        height: documentWindow.height,
                    }}
                >
                    <div className="sub-screen">
                        <div className="browser-tool-bar">
                            <div
                                className="blank"
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                            ></div>
                            <div className="tool">
                                <CloseOutlined onClick={onCancel} />
                            </div>
                        </div>
                        <div className="browser-content">
                            <Tabs
                                hideAdd
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                type="editable-card"
                                items={[
                                    {
                                        key: "1",
                                        label: "帮助文档",
                                        closable: true,
                                    },
                                ]}
                            />
                            <div className="content">
                                <div className="header">
                                    <Button
                                        size="small"
                                        type="link"
                                    >
                                        <ArrowLeftOutlined />
                                    </Button>
                                    <Button
                                        size="small"
                                        type="link"
                                    >
                                        <ArrowRightOutlined />
                                    </Button>
                                    <Input
                                        prefix={<SearchOutlined />}
                                        placeholder="搜索，也可以输入文档地址直接打开"
                                    />
                                </div>
                                <Breadcrumb
                                    items={[
                                        {
                                            title: "实时计算 Flink 版",
                                        },
                                        {
                                            title: "云原生数据仓库AnalyticDB MySQL版（ADB）3.0",
                                        },
                                    ]}
                                />
                                <div className="document-container">
                                    <div className="document">
                                        <div className="sc-dPWrhe haxPzc">
                                            <div className="sc-h2trro-0 sc-h2trro-2 dDZsbk ikwVWX J_console_base_body_for_feedback">
                                                <header className="sc-ezOQGI kxjtjj">
                                                    <h1 className="sc-fEXmlR gokncu">
                                                        云原生数据仓库AnalyticDB MySQL版（ADB）3.0
                                                    </h1>
                                                    <time>更新时间：2023年10月30日 18:31:00</time>
                                                </header>
                                                <div className="sc-gYbzsP heHuVN">
                                                    <article className="sc-69ecu8-0 sc-bYMpWt lgEDzt jdJPqc">
                                                        <main>
                                                            <p>
                                                                本文为您介绍如何使用云原生数据仓库AnalyticDB
                                                                MySQL版3.0连接器。
                                                            </p>
                                                            <div>
                                                                <section
                                                                    id="section-boo-btx-sbo"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-thu-qlk-evh">背景信息</h2>
                                                                    <p>
                                                                        <a href="//help.aliyun.com/document_detail/93776.html#concept-n4h-2rr-vy">
                                                                            云原生数据仓库AnalyticDB MySQL版3.0
                                                                        </a>
                                                                        是融合数据库、大数据技术于一体的云原生企业级数据仓库服务。AnalyticDB
                                                                        MySQL版支持高吞吐的数据实时增删改、低延时的实时分析和复杂ETL，兼容上下游生态工具，可用于构建企业级报表系统、数据仓库和数据服务引擎。
                                                                    </p>
                                                                    <div>
                                                                        <p>ADB MySQL 3.0连接器支持的信息如下。</p>
                                                                        <div data-console-base-html-table-wrap="">
                                                                            <button data-console-base-html-button-zoom="table">
                                                                                <svg
                                                                                    width="12"
                                                                                    height="12"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                </svg>
                                                                                放大查看
                                                                            </button>
                                                                            <div data-console-base-html-table-wrap-inner=""></div>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                                <section
                                                                    id="section-rit-7mt-ux6"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-0mq-b47-l7d">前提条件</h2>
                                                                    <ul>
                                                                        <li>
                                                                            <p>
                                                                                已创建AnalyticDB
                                                                                MySQL集群并创建表，详情请参见
                                                                                <a href="//help.aliyun.com/document_detail/122234.html#task1307">
                                                                                    创建集群
                                                                                </a>
                                                                                和
                                                                                <a href="//help.aliyun.com/document_detail/123333.html#concept-2138836">
                                                                                    CREATE TABLE
                                                                                </a>
                                                                                。
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p>
                                                                                已设置白名单，详情请参见
                                                                                <a href="//help.aliyun.com/document_detail/122244.html#task-2195045">
                                                                                    设置白名单
                                                                                </a>
                                                                                。
                                                                            </p>
                                                                        </li>
                                                                    </ul>
                                                                </section>
                                                                <section
                                                                    id="section-q5v-8od-8ec"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-xc6-j5t-v3r">使用限制</h2>
                                                                    <ul>
                                                                        <li>
                                                                            <p>
                                                                                仅支持作为维表和结果表，不支持作为源表。
                                                                            </p>
                                                                        </li>
                                                                        <li>
                                                                            <p>
                                                                                仅Flink计算引擎VVR
                                                                                3.x及以上版本支持云原生数据仓库AnalyticDB
                                                                                MySQL版3.0连接器。
                                                                            </p>
                                                                        </li>
                                                                    </ul>
                                                                </section>
                                                                <section
                                                                    id="section-x85-lw6-thz"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-dl9-kjm-aa9">语法结构</h2>
                                                                    <div data-console-base-html-pre-wrap="">
                                                                        <button data-console-base-html-button-zoom="code">
                                                                            <svg
                                                                                width="12"
                                                                                height="12"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                            </svg>
                                                                            放大查看
                                                                        </button>
                                                                        <button data-console-base-html-button-copy="copy">
                                                                            <svg
                                                                                width="12"
                                                                                height="12"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path d="M9.6 2.4H12V12H2.4V9.6H0V0h9.6v2.4Zm0 .8v6.4H3.2v1.6h8v-8H9.6ZM.8.8v8h8v-8h-8Z"></path>
                                                                            </svg>
                                                                            复制代码
                                                                        </button>
                                                                        <pre>
                                                                            CREATE TEMPORARY TABLE adb_table ( `id` INT,
                                                                            `num` BIGINT, PRIMARY KEY (`id`) NOT
                                                                            ENFORCED ) WITH ( &#39;connector&#39; =
                                                                            &#39;adb3.0&#39;, &#39;url&#39; =
                                                                            &#39;&lt;yourUrl&gt;&#39;,
                                                                            &#39;userName&#39; =
                                                                            &#39;&lt;yourUsername&gt;&#39;,
                                                                            &#39;password&#39; =
                                                                            &#39;&lt;yourPassword&gt;&#39;,
                                                                            &#39;tableName&#39; =
                                                                            &#39;&lt;yourTablename&gt;&#39; );
                                                                        </pre>
                                                                    </div>
                                                                    <div data-console-base-html-note="help">
                                                                        <strong>重要 </strong>
                                                                        <p>
                                                                            <b>
                                                                                Flink DDL中定义的主键必须和AnalyticDB
                                                                                MySQL数据库物理表中的主键保持一致，主键一致包括是否存在主键和主键名称一致。如果不一致，会影响数据正确性。
                                                                            </b>
                                                                        </p>
                                                                    </div>
                                                                </section>
                                                                <section
                                                                    id="section-hjq-h6j-vub"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-x9s-qwc-ely">WITH参数</h2>
                                                                    <ul>
                                                                        <li>
                                                                            <p>通用</p>
                                                                            <div data-console-base-html-table-wrap="">
                                                                                <button data-console-base-html-button-zoom="table">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                    </svg>
                                                                                    放大查看
                                                                                </button>
                                                                                <div data-console-base-html-table-wrap-inner=""></div>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <p>结果表独有</p>
                                                                            <div data-console-base-html-table-wrap="">
                                                                                <button data-console-base-html-button-zoom="table">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                    </svg>
                                                                                    放大查看
                                                                                </button>
                                                                                <div data-console-base-html-table-wrap-inner=""></div>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <p>维表独有</p>
                                                                            <div data-console-base-html-table-wrap="">
                                                                                <button data-console-base-html-button-zoom="table">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                    </svg>
                                                                                    放大查看
                                                                                </button>
                                                                                <div data-console-base-html-table-wrap-inner=""></div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </section>
                                                                <section
                                                                    id="section-j28-p23-q82"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-ml4-sr1-4kl">类型映射</h2>
                                                                    <div data-console-base-html-table-wrap="">
                                                                        <button data-console-base-html-button-zoom="table">
                                                                            <svg
                                                                                width="12"
                                                                                height="12"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                            </svg>
                                                                            放大查看
                                                                        </button>
                                                                        <div data-console-base-html-table-wrap-inner=""></div>
                                                                    </div>
                                                                </section>
                                                                <section
                                                                    id="section-y4r-al8-h4n"
                                                                    data-type="section"
                                                                >
                                                                    <h2 id="title-so3-tp5-8ej">使用示例</h2>
                                                                    <ul>
                                                                        <li>
                                                                            <p>结果表</p>
                                                                            <div data-console-base-html-pre-wrap="">
                                                                                <button data-console-base-html-button-zoom="code">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                    </svg>
                                                                                    放大查看
                                                                                </button>
                                                                                <button data-console-base-html-button-copy="copy">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M9.6 2.4H12V12H2.4V9.6H0V0h9.6v2.4Zm0 .8v6.4H3.2v1.6h8v-8H9.6ZM.8.8v8h8v-8h-8Z"></path>
                                                                                    </svg>
                                                                                    复制代码
                                                                                </button>
                                                                                <pre>
                                                                                    CREATE TEMPORARY TABLE
                                                                                    datagen_source ( `name` VARCHAR,
                                                                                    `age` INT ) WITH (
                                                                                    &#39;connector&#39; =
                                                                                    &#39;datagen&#39; ); CREATE
                                                                                    TEMPORARY TABLE adb_sink ( `name`
                                                                                    VARCHAR, `age` INT ) WITH (
                                                                                    &#39;connector&#39; =
                                                                                    &#39;adb3.0&#39;, &#39;url&#39; =
                                                                                    &#39;&lt;yourUrl&gt;&#39;,
                                                                                    &#39;userName&#39; =
                                                                                    &#39;&lt;yourUsername&gt;&#39;,
                                                                                    &#39;password&#39; =
                                                                                    &#39;&lt;yourPassword&gt;&#39;,
                                                                                    &#39;tableName&#39; =
                                                                                    &#39;&lt;yourTablename&gt;&#39; );
                                                                                    INSERT INTO adb_sink SELECT * FROM
                                                                                    datagen_source;
                                                                                </pre>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <p>维表</p>
                                                                            <div data-console-base-html-pre-wrap="">
                                                                                <button data-console-base-html-button-zoom="code">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M7.445 7.09c.864-.922 1.367-2.145 1.367-3.34C8.812 1.368 7.069 0 4.687 0 2.306 0 0 1.93 0 4.312c0 2.382 1.321 4.312 3.937 4.312 1.188 0 2.22-.427 3.029-1.091l3.861 4.466c.037.037 1.209-1.088 1.172-1.125L7.445 7.09Zm-2.758.41C3.03 7.5.75 6.374.75 3.75.75 2.093 2.468.562 4.312.562c2.438 0 3.75 1.906 3.75 3.563 0 2.406-1.718 3.374-3.375 3.374Zm2.25-3.75c-.07-.14-.097-.188-.187-.188l-2.086.216.023-2.09c0-.093-.073-.165-.187-.188-.002 0-.117.007-.188.187L4.125 3.75l-2.086.166a.165.165 0 0 0-.164.167v.25l2.25-.02-.2 2.27c0 .092.074.167.164.167l.41-.167c.118-.06.188-.117.188-.208V4.312l2.273.021c.164 0 .227-.052.164-.167l-.187-.416Z"></path>
                                                                                    </svg>
                                                                                    放大查看
                                                                                </button>
                                                                                <button data-console-base-html-button-copy="copy">
                                                                                    <svg
                                                                                        width="12"
                                                                                        height="12"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M9.6 2.4H12V12H2.4V9.6H0V0h9.6v2.4Zm0 .8v6.4H3.2v1.6h8v-8H9.6ZM.8.8v8h8v-8h-8Z"></path>
                                                                                    </svg>
                                                                                    复制代码
                                                                                </button>
                                                                                <pre>
                                                                                    CREATE TEMPORARY TABLE
                                                                                    datagen_source( `a` INT, `b`
                                                                                    VARCHAR, `c` STRING, `proctime` AS
                                                                                    PROCTIME() ) WITH (
                                                                                    &#39;connector&#39; =
                                                                                    &#39;datagen&#39; ); CREATE
                                                                                    TEMPORARY TABLE adb_dim ( `a` INT,
                                                                                    `b` VARCHAR, `c` VARCHAR ) WITH (
                                                                                    &#39;connector&#39; =
                                                                                    &#39;adb3.0&#39;, &#39;url&#39; =
                                                                                    &#39;&lt;yourUrl&gt;&#39;,
                                                                                    &#39;userName&#39; =
                                                                                    &#39;&lt;yourUsername&gt;&#39;,
                                                                                    &#39;password&#39; =
                                                                                    &#39;&lt;yourPassword&gt;&#39;,
                                                                                    &#39;tableName&#39; =
                                                                                    &#39;&lt;yourTablename&gt;&#39; );
                                                                                    CREATE TEMPORARY TABLE
                                                                                    blackhole_sink( `a` INT, `b` VARCHAR
                                                                                    ) WITH ( &#39;connector&#39; =
                                                                                    &#39;blackhole&#39; ); INSERT INTO
                                                                                    blackhole_sink SELECT T.a,H.b FROM
                                                                                    datagen_source AS T JOIN adb_dim FOR
                                                                                    SYSTEM_TIME AS OF T.proctime AS H ON
                                                                                    T.a = H.a;
                                                                                </pre>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </section>
                                                            </div>
                                                        </main>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <Button type="link">
                                        文档中心打开 <NewTabOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Resizable>
        </Draggable>,
        document.getElementById("document")!
    );
};

export default DocumentLayout;
