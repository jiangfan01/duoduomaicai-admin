import React from "react";
import {Button, Form, Input, Select} from "antd";


const ProductSearch: React.FC = () => {
    return (
        <>
            <Form
                layout="inline"
            >
                <Form.Item label="订单号" style={{width: 240}}>
                    <Input placeholder={'请输入订单号'}/>
                </Form.Item>
                <Form.Item label="商品名" style={{width: 240}}>
                    <Input placeholder={'请输入商品名'}/>
                </Form.Item>
                <Form.Item label="电话" style={{width: 240}}>
                    <Input placeholder={'请输入收货电话'}/>
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