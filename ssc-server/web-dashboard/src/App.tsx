import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./page/MainPage";


const App = (): React.ReactElement => {
    return (
        <Routes>
            <Route path="/home" element={<MainPage/>}/>
        </Routes>
    );
}

export default App;
