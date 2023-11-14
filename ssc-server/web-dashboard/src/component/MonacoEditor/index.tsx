import { useRef } from "react";
import ReactMonacoEditor, { EditorDidMount, EditorWillUnmount, MonacoEditorProps } from "react-monaco-editor";
import "./index.sass";

const MonacoEditor = (props: MonacoEditorProps) => {
    const editorContainer = useRef(null);
    const observerRef = useRef<ResizeObserver>();

    const editorDidMount: EditorDidMount = (editor, monaco) => {
        props.editorDidMount?.(editor,monaco);
        observerRef.current = new ResizeObserver(() => {
            window.requestAnimationFrame(() => {
                editor.layout();
            });
        });
        observerRef.current.observe(editorContainer.current!);
    };

    const editorWillUnmount:EditorWillUnmount = (editor, monaco) => {
        props.editorWillUnmount?.(editor, monaco);
        observerRef.current?.disconnect();
        observerRef.current = undefined;
    };


    return (
        <div className="resizable-editor-container" ref={editorContainer}>
            <ReactMonacoEditor
                {...props}
                editorDidMount={editorDidMount}
                editorWillUnmount={editorWillUnmount}
            />
        </div>

    );
};

export default MonacoEditor;