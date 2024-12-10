import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Modal, Popconfirm, PopconfirmProps, Space, Table} from 'antd';
import type {TableProps} from 'antd';
import ChildrenAction from "./components/ChildrenAction.tsx";
import "../../../../style/table.scss";
import {useLocation} from "react-router-dom";

interface DataType {
    key: string;
    parentName: string | null;
    name: string;
}


const GoodsCategoryChildren: React.FC = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<'add' | 'edit'>('add')
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
    const location = useLocation();
    const [category, setCategory] = useState<string | null>(null);


    const showModal = (action: 'add' | 'edit', record?: DataType) => {
        setCurrentAction(action);
        setCurrentRecord(record || null);
        console.log(currentRecord, 'currentRecord')
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const confirm: PopconfirmProps['onConfirm'] = () => {
        //     当前分类下还有商品提示无法删除
        Modal.confirm({
            title: '当前分类下还有商品，无法删除',
            content: '请前往小程序去删除',
            okText: '确认',
            cancelText: '取消',
        });

    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };


    const handleFormSubmit = () => {
        setIsModalOpen(false);
    };
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '父分类名',
            dataIndex: 'parentName',
            key: 'parentName',
            align: 'center',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '子分类名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModal('edit', record)}>编辑</a>
                    <Popconfirm
                        title="确认删除？"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            parentName: category,
            name: '生鲜',
        },
        {
            key: '2',
            parentName: category,
            name: '水果',
        },
        {
            key: '3',
            parentName: category,
            name: '手机',
        },
    ];

    // 从 URL 中提取查询参数
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryName = params.get('category');
        setCategory(categoryName);
    }, [location]);

    return (
        <>
            <div className="top-search" style={{marginBottom: 24}}>
                <Button type="primary" onClick={() => showModal('add')}>添加子分类</Button>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Table<DataType> columns={columns} dataSource={data}/>;

                <Modal title="操作" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <ChildrenAction action={currentAction} record={currentRecord} onSubmit={handleFormSubmit}/>
                </Modal>
            </ConfigProvider>
        </>
    )
}

export default GoodsCategoryChildren;