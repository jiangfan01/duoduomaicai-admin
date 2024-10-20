import React from 'react';
import {ConfigProvider, Layout, theme, App} from 'antd';
import SiderBar from "./components/SiderBar";
import {Outlet} from "react-router-dom";
import Header from "../../components/header.tsx";

const {Content, Footer} = Layout;


const LayoutIndex: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    const customTheme = {
        token: {
            colorPrimary: '#1890ff',
            colorBgContainer: '#f0f2f5',
            colorText: '#333',
        },
    };

    return (
        <App>
            <ConfigProvider theme={customTheme}>
                <Layout style={{minHeight: '100vh'}}>
                    {/*左侧导航*/}
                    <SiderBar/>

                    <Layout>
                        <Header/>
                        <Content style={{margin: '0 16px',}}>
                            <div style={{
                                background: colorBgContainer,
                                padding: 24,
                                minHeight: 750,
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
            </ConfigProvider>
        </App>
    );
};

export default LayoutIndex;