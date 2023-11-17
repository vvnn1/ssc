import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/workspace/:workspaceId/namespace/:namespaceId/*"
                element={<MainPage />}
            />
        </Routes>
    );
};

export default App;
