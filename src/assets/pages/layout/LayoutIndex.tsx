import React from 'react';
import {Layout, theme} from 'antd';
import SiderBar from "./components/SiderBar";
import {Outlet} from "react-router-dom";

const {Header, Content, Footer} = Layout;


const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/*左侧导航*/}
            <SiderBar/>

            <Layout>
                <Header style={{padding: 0, background: colorBgContainer, marginBottom: 24}}/>
                <Content style={{margin: '0 16px'}}>
                    <div style={{
                        background: colorBgContainer,
                        padding: 24,
                        minHeight: 540,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                    }}>
                        {/*路由出口*/}
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;