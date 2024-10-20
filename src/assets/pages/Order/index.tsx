import React from 'react';
import {ConfigProvider, Tabs, TabsProps} from "antd";
import GroupBuyTab from "./components/GroupBuyTab.tsx";
import ProductTab from "./components/ProductTab.tsx";
import ServeTab from "./components/ServeTab.tsx";
import PreferredTab from "./components/PreferredTab.tsx";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: '团购',
        children: <GroupBuyTab/>,
    },
    {
        key: '2',
        label: '精选',
        children: <ProductTab/>,
    },
    {
        key: '3',
        label: '服务',
        children: <ServeTab/>,
    },
    {
        key: '4',
        label: '今日优选',
        children: <PreferredTab/>,
    },
];

const OrderPage: React.FC = () => {

    const customTheme = {
        token: {
            colorSplit: 'rgba(0, 0, 0, 0.1)',
        },
    };
    return (
        <>
            <ConfigProvider theme={customTheme}>
                <Tabs
                    defaultActiveKey="1"
                    centered
                    items={items}
                />
            </ConfigProvider>
        </>
    )
}

export default OrderPage;