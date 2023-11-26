import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import LoadingPage from "./page/LoadingPage";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <HashRouter>
            <ConfigProvider
                locale={zhCN}
                wave={{ disabled: true }}
            >
                <Suspense fallback={<LoadingPage />}>
                    <App />
                </Suspense>
            </ConfigProvider>
        </HashRouter>
    </React.StrictMode>
);

// window.addEventListener("load", () => {
//     ReactDOM.render(
//         <React.StrictMode>
//             <HashRouter>
//                 <ConfigProvider locale={zhCN} wave={{ disabled: true }}>
//                     <App />
//                 </ConfigProvider>
//             </HashRouter>
//         </React.StrictMode>
//         ,
//         document.getElementById("root"));
// });

reportWebVitals();
