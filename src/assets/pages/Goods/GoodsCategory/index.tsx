import React, {useState} from 'react';
import {
    Button,
    ConfigProvider,
    Form,
    FormProps,
    Input,
    Modal,
    Select,
    Table
} from 'antd';
import type {TableProps} from 'antd';
import {useNavigate} from "react-router-dom";

interface DataType {
    key: string;
    name: string;
}

type FieldType = {
    category?: string;
    categoryChildren: string;
};

const GoodsCategory: React.FC = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 300,
            render: (text) => <a className="text-ellipsis">{text}</a>,
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div>
                    <a onClick={() => handleChildren(record)}>查看子分类</a>
                </div>
            ),
        },
    ];

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChildren = (record: DataType) => {
        // 传递分类的 id 或 name 到目标页面
        navigate(`/goods/category/children?category=${record.name}`);
    };
    const data: DataType[] = [
        {
            key: '1',
            name: '团购',
        },
        {
            key: '2',
            name: '精选',
        },
        {
            key: '3',
            name: '服务',
        },
        {
            key: '4',
            name: '今日优选',
        },
    ];

    const options: any[] = [
        {
            value: '1',
            label: '团购',
        },
        {
            value: '2',
            label: '精选',
        },
        {
            value: '3',
            label: '服务',
        },
        {
            value: '4',
            label: '今日优选',
        },
    ]


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        setIsModalOpen(false);  // 点击关闭按钮或ESC时关闭模态框
    };

    return (
        <>
            {/*<div className="top-search" style={{marginBottom: 24}}>*/}
            {/*    <Button type="primary" onClick={() => setIsModalOpen(true)}>新增子分类</Button>*/}
            {/*</div>*/}
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Table columns={columns} dataSource={data} className="tableShadow"
                       scroll={{x: 'max-content'}}/>

                <Modal
                    title="新增子分类"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    keyboard  // 支持 ESC 键关闭模态框
                >
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{maxWidth: '400px', margin: '0 auto'}} // 设置表单的最大宽度和居中
                    >
                        <Form.Item
                            label="分类"
                            name="category"
                            style={{marginBottom: '16px'}}
                        >
                            <Select
                                defaultValue="1"
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item
                            label="子分类"
                            name="categoryChildren"
                            style={{marginBottom: '16px'}}
                        >
                            <Input placeholder="请输入子分类名"/>
                        </Form.Item>

                        <Form.Item
                            style={{marginTop: '16px'}}
                            label={"操作"}
                        >
                            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                提交
                            </Button>
                            <Button type="default" onClick={handleCancel}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </>
    );
}

export default GoodsCategory;