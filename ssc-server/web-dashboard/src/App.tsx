import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/workspace/:workspaceId/namespace/:namespaceId/*"
                element={<MainPage />}
            />
            <Route
                path="/profile/*"
                element={<ProfilePage />}
            />
        </Routes>
    );
};

export default App;
