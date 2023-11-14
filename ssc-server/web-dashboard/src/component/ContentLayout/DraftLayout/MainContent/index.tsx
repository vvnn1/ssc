import { useRef, useState } from "react";
import MonacoEditor from "../../../MonacoEditor";
import RightTabBar from "./RightTabBar";
import "./index.sass";
import BottomTabBar from "./BottomTabBar";
import Resizable from "../../../Resizable";
import ToolBar from "../ToolBar";
import NavTab, { Draft } from "../NavTab";
import { EditorDidMount } from "react-monaco-editor";

const MainContent = () => {
    const [rightPanel, setRightPanel] = useState<React.ReactNode>();
    const [bottomPanel, setBottomPanel] = useState<React.ReactNode>();
    const [curDraft, setCurDraft] = useState<Draft>();

    const monacoEditor = useRef<Parameters<EditorDidMount>[0]>();
    const openedDraft = useRef<Map<string, any>>(new Map());
    
    const onDraftChange = (draft: Draft | undefined) => {
        openedDraft.current.set(curDraft?.id ?? "", monacoEditor.current?.saveViewState());
        setCurDraft(draft);
        const state = openedDraft.current.get(draft?.id??"");
        monacoEditor.current?.restoreViewState(state);
        monacoEditor.current?.focus();
    };

    const editorDidMount: EditorDidMount = (editor) => {
        monacoEditor.current = editor;
    };

    return (
        <>
            <div className="panel-bar panel panel-ltr panel-border-bottom">
                <ToolBar isOpenFile={true} onPanelChange={setBottomPanel}/>
            </div>
            <div className="panel-bar navigation-bar panel panel-ltr panel-border-bottom">
                <NavTab onDraftChange={onDraftChange}/>
            </div>
            <div className="editor-main-content panel panel-ttb">
                <div className="panel main-top-panel panel-ltr">
                    <div className="panel panel-ltr">
                        <div className="panel main-top-editor-panel panel-ltr panel-border-right">
                            <MonacoEditor
                                language="javascript"
                                options={{
                                    selectOnLineNumbers: true,
                                }}
                                value={curDraft?.content}
                                editorDidMount={editorDidMount}
                            />
                        </div>
                        {
                            rightPanel ? (
                                <Resizable
                                    size={500}
                                    axis='x'
                                    className='resizable-panel panel panel-rtl panel-border-right'
                                    resizeHandle='w'
                                >
                                    {rightPanel}
                                </Resizable>
                            ) : null
                        }

                        <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-right panel panel-ttb">
                            <RightTabBar onPanelChange={setRightPanel} />
                        </div>
                    </div>
                </div>

                {
                    bottomPanel ? (
                        <Resizable
                            className='resizable-panel panel panel-border-top'
                            axis='y'
                            resizeHandle='n'
                            size={280}
                        >
                            {bottomPanel}
                        </Resizable>
                    ) : null
                }

                <div className="panel-tabs-bar panel-tabs-bar-small panel-tabs-bar-bottom panel panel-ltr panel-border-top">
                    <BottomTabBar onPanelChange={setBottomPanel} />
                </div>
            </div>

        </>
    );
};

export default MainContent;