import React from 'react';
import {Button, Form, Input, Select} from "antd";


const siteAddress = [
    {value: '1', label: '南泰中央华府'},
    {value: '2', label: '安达小区'},
];

const GroupCategory = [
    {value: '1', label: '手机'},
    {value: '2', label: '水果'},
    {value: '3', label: '生鲜'},
    {value: '4', label: '小家电'},
    {value: '5', label: '其他'},
]
const GroupSearch: React.FC = () => {
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
                <Form.Item label="站点" style={{width: 220}}>
                    <Select placeholder="请选站点">
                        {siteAddress.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="分类" style={{width: 220}}>
                    <Select placeholder="请选择分类">
                        {GroupCategory.map((item) => (
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
export default GroupSearch