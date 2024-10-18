import React, {useState} from 'react';
import {ConfigProvider, Input, message, Modal, Space, Table} from 'antd';
import type {TableProps} from 'antd';

interface DataType {
    key: string;
    name: string;
}


const GroupManage: React.FC = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCategoryName = () => {
        // const value = e.target.value;
        message.success("修改成功");
    }


    const columns: TableProps<DataType>['columns'] = [
        {
            title: '团购分类名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 300,
            render: () => <Input style={{textAlign: "center"}}
                                 onChange={() => {
                                     handleCategoryName()
                                 }}></Input>,
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: () => (
                <Space size="middle">
                    <a onClick={showModal}>新增分类</a>
                    <a>删除分类</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: '水果',
        },
        {
            key: '2',
            name: '手机',
        },
        {
            key: '3',
            name: '电脑',
        },
    ];
    return (
        <>
            <div></div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Table columns={columns} dataSource={data} className="tableShadow"
                       scroll={{x: 'max-content'}}/>

                <Modal title="新增分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input/>
                </Modal>
            </ConfigProvider>
        </>
    );
}

export default GroupManage;