import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './page/MainPage';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/workspace/:workspace/namespace/:namespace/*" element={<MainPage />} />
    </Routes>
  )
}

export default App;
