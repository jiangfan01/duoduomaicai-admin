import React, {useState} from "react";
import {Menu, type MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    AccountBookOutlined,
    DashboardOutlined,
    PieChartOutlined,
    CarryOutOutlined,
    AliwangwangOutlined,
    DropboxOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const SiderBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const items: MenuItem[] = [
        getItem('首页', '/', <PieChartOutlined/>),
        getItem('团购', '2', <AccountBookOutlined/>, [
            getItem('团购列表', '21'),
            getItem("团购管理", '22'),
            getItem("今日优选", '23')
        ]),
        getItem('精选', '/123', <CarryOutOutlined/>, [
            getItem('精选列表', '24'),
            getItem("精选管理", '25'),
        ]),
        getItem('服务', '/222', <DashboardOutlined/>, [
            getItem('服务列表', '26'),
            getItem("服务管理", '28'),
        ]),
        getItem('站点管理', '/server', <AliwangwangOutlined/>, [
            getItem('站点列表', '123'),
            getItem("当前站点收益", '55'),
        ]),
        getItem('售后', '/user',<DropboxOutlined />, [
            getItem('团购售后', '567'),
            getItem("精选售后", '551'),
            getItem('今日优选售后', '111'),
            getItem("服务售后", '545'),
        ]),
    ];

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
        </>
    )
}
export default SiderBar