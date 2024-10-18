import React, {useState} from "react";
import {Menu, type MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    AccountBookOutlined,
    DashboardOutlined,
    PieChartOutlined,
    CarryOutOutlined,
    AliwangwangOutlined,
    TeamOutlined,
    DropboxOutlined
} from "@ant-design/icons";
import {To, useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const onClick = (e: { key: To; }) => {
        navigate(e.key);
    };
    const items: MenuItem[] = [
        getItem('首页', '/home', <PieChartOutlined/>),
        getItem('团购', '/groupbuy', <AccountBookOutlined/>, [
            getItem("团购管理", '/groupbuy/manage'),
            getItem('团购列表', '/groupbuy/list'),
            getItem("今日优选", '/groupbuy/preferred')
        ]),
        getItem('精选', '/product', <CarryOutOutlined/>, [
            getItem('精选列表', '/product/list'),
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
        getItem('售后', '/shouhou', <DropboxOutlined/>, [
            getItem('团购售后', '567'),
            getItem("精选售后", '551'),
            getItem('今日优选售后', '111'),
            getItem("服务售后", '545'),
        ]),
        getItem('用户设置', '/user', <TeamOutlined/>, [
            getItem('用户列表', '/user/list'),
            getItem("站长列表", '/user/manage'),
            getItem("管理员设置", '/user/admin'),
        ]),
    ];

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick}/>
            </Sider>
        </>
    )
}
export default SiderBar