import React from "react";
import {Button, Form, Input} from "antd";


const ProductSearch: React.FC = () => {
    return (
        <>
            <Form
                layout="inline"
            >
                <Form.Item label="站点名" style={{width: 240}}>
                    <Input placeholder={'请输入站点名'}/>
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
export default ProductSearch