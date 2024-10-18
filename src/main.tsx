import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import routers from '../src/assets/router';
import 'antd/dist/reset.css';
import "./global.scss";
import 'moment/dist/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

import 'moment/locale/zh-cn';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染应用
root.render(
    <ConfigProvider locale={zhCN}>
        <RouterProvider router={routers} />
    </ConfigProvider>
);