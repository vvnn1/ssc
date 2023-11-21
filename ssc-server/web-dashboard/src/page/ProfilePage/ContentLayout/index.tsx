import { Navigate, Route, Routes } from "react-router-dom";
import NameSpaceLayout from "./NameSpaceLayout";
import TimeZoneLayout from "./TimeZoneLayout";
import CodeEditorLayout from "./CodeEditorLayout";

const ContentLayout = () => {
    return (
        <Routes>
            <Route
                path="namespaces"
                element={<NameSpaceLayout />}
            />
            <Route
                path="timezone"
                element={<TimeZoneLayout />}
            />
            <Route
                path="code-editor"
                element={<CodeEditorLayout />}
            />
            <Route
                path="*"
                element={<Navigate to="namespaces" />}
            />
        </Routes>
    );
};

export default ContentLayout;
