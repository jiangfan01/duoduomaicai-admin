import React from "react";
import {Button, Form, Input} from "antd";

const MiniListSearch: React.FC = () => {
    return (
        <>
            <Form
                layout="inline"
            >
                <Form.Item label="手机号" style={{width: 240}}>
                    <Input placeholder={'请输入手机号'}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                    >
                        搜索
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default MiniListSearch