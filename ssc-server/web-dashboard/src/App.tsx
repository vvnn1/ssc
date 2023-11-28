import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import ProfilePage from "./page/ProfilePage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/workspace/:workspaceId/namespace/:namespaceId">
                <Route
                    path="*"
                    element={<MainPage />}
                />
            </Route>
            <Route path="/profile">
                <Route
                    path="*"
                    element={<ProfilePage />}
                />
            </Route>
        </Routes>
    );
};

export default App;
