import React from "react";
// import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";



// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );


// root.render(
//   <React.StrictMode>
//     <HashRouter>
//       <ConfigProvider locale={zhCN} wave={{ disabled: true }}>
//         <App />
//       </ConfigProvider>
//     </HashRouter>
//   </React.StrictMode>
// );



window.addEventListener("load", () => {
    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <ConfigProvider locale={zhCN} wave={{ disabled: true }}>
                    <App />
                </ConfigProvider>
            </HashRouter>
        </React.StrictMode>,
        document.getElementById("root"));
});

reportWebVitals();
