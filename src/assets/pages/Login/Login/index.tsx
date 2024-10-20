import React, {useEffect, useRef} from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import gsap from 'gsap';  // 引入 gsap
import '../Login/login.scss';
import {useNavigate} from "react-router-dom";  // SCSS 样式文件

const LoginPage: React.FC = () => {
    // 使用 useRef 来获取 form-section 容器的引用
    const formSectionRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('登录成功');
        navigate('/home')
    };
    const rules = {
        username: [
            { required: true, message: '请输入您的手机号!' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' }
        ],
        password: [{required: true, message: '请输入您的密码!'}],
    };
    // 使用 useEffect 钩子来执行动画
    useEffect(() => {
        if (formSectionRef.current) {
            gsap.fromTo(
                formSectionRef.current,
                {opacity: 0, y: -100},  // 初始状态：透明度为 0，位置上移
                {opacity: 1, y: 0, duration: 1.5}  // 最终状态：透明度为 1，回到正常位置，动画持续时间 1 秒
            );
        }
    }, []);

    return (
        <div className="login-box">
            <div className="login-container">
                <div className="form-section" ref={formSectionRef}>
                    <h2 className="form-title">用户登录</h2>
                    <Form
                        name="login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={rules.username}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="手机号"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={rules.password}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            或 <a href="">注册新账户</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
