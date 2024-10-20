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
    DropboxOutlined,
    MoneyCollectOutlined
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
        getItem('商品', '/goods', <MoneyCollectOutlined/>, [
            getItem("商品管理", '/goods/manage'),
            // getItem('上架商品', '/goods/add'),
        ]),
        getItem('团购', '/groupbuy', <AccountBookOutlined/>, [
            getItem('团购订单', '/groupbuy/list'),
            getItem('团购分类管理', '/groupbuy/manage'),
            getItem("今日优选订单", '/groupbuy/preferred')
        ]),
        getItem('精选', '/product', <CarryOutOutlined/>, [
            getItem('精选订单', '/product/list'),
            getItem("精选管理", '/product/manage'),
        ]),
        getItem('服务', '/serve', <DashboardOutlined/>, [
            getItem('服务列表', '/serve/list'),
            getItem("服务管理", '/serve/manage'),
        ]),
        getItem('站点管理', '/site', <AliwangwangOutlined/>, [
            getItem('站点列表', '/site/list'),
            // getItem("当前站点收益", '55'),
        ]),
        getItem('售后', '/after-sale', <DropboxOutlined/>, [
            getItem('团购售后', '/after-sale/goods'),
            getItem("精选售后", '/after-sale/product'),
            getItem('今日优选售后', '/after-sale/preferred'),
            getItem("服务售后", '/after-sale/serve'),
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