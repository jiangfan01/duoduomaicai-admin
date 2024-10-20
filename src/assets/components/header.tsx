import React from "react";
import {Avatar, Badge, Layout, message, Popconfirm, PopconfirmProps, Space} from "antd";
import "../style/header.scss"
import {
    UserOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {

    const {Header,} = Layout;
    const navigate = useNavigate()
    const confirm: PopconfirmProps['onConfirm'] = () => {
        navigate('/login')
        message.success("退出成功")
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    return (
        <>
            <Header style={{padding: 0, background: "#fff", marginBottom: 24}} className="header">
                <div className="user-info">
                    <Badge count={1} className="avatar" title="有新的订单">
                        <Avatar shape="square" icon={<UserOutlined/>} size={40} alt="头像"/>
                    </Badge>
                    <div className="user-meun">
                        <Space size="middle">
                            <Popconfirm
                                title="确认退出？"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a>退出登录</a>
                            </Popconfirm>
                        </Space>
                    </div>
                </div>

            </Header>

        </>
    )
}
export default Header