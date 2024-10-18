import React from "react";
import {Button, Form, Input, Select} from "antd";

const category = [
    {value: '1', label: '团购'},
    {value: '2', label: '精选'},
    {value: '3', label: '服务'},
];

const GoodsSearch: React.FC = () => {
    return (
        <>
            <Form
                layout="inline"
            >
                <Form.Item label="商品名" style={{width: 240}}>
                    <Input placeholder={'请输入商品名'}/>
                </Form.Item>
                <Form.Item label="分类" style={{width: 220}}>
                    <Select placeholder="选择分类">
                        {category.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
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
export default GoodsSearch