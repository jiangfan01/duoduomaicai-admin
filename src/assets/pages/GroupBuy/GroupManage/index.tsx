import React, {useState} from 'react';
import {Button, ConfigProvider, Input, message, Modal, Popconfirm, PopconfirmProps, Table} from 'antd';
import type {TableProps} from 'antd';

interface DataType {
    key: string;
    name: string;
}


const GroupManage: React.FC = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
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
                <Popconfirm
                    title="确认删除当前团购分类？"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <a>删除</a>
                </Popconfirm>
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
            <div className="top-search" style={{marginBottom: 24}}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>新增团购分类</Button>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Table columns={columns} dataSource={data} className="tableShadow"
                       scroll={{x: 'max-content'}}/>

                <Modal title="新增团购分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input/>
                </Modal>
            </ConfigProvider>
        </>
    );
}

export default GroupManage;