import ReactDOM from "react-dom/client";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";
import {RouterProvider} from "react-router-dom";
import routers from '../src/assets/router';
import "./global.scss"
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染应用
root.render(
    <ConfigProvider locale={zhCN}>
        <RouterProvider router={routers}/>
    </ConfigProvider>
);