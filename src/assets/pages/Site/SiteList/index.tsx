import React, {useState} from 'react';
import {
    ConfigProvider,
    Table,
    Tooltip,
    message,
    Modal,
    Space,
    Popconfirm,
    PopconfirmProps, Button,
} from 'antd';
import type {TableColumnsType} from 'antd';
import "../../../style/table.scss";
import SiteAction from "./components/SiteAction.tsx";
import SiteSearch from "./components/SiteSearch.tsx";


interface DataType {
    key: React.Key;
    id: number;
    name: string;
    address: string;
    receiver: string;
    phone: number;
    profit: number;
}


const SiteList: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState<'add' | 'edit' | 'check'>('add');
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

    const showModal = (action: 'add' | 'edit' | 'check', record?: DataType) => {
        setCurrentAction(action);
        setCurrentRecord(record || null);
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleFormSubmit = () => {
        setOpen(false);
    };
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('复制成功')
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };


    const columns: TableColumnsType<DataType> = [
        {
            title: '序号',
            dataIndex: 'id',
            width: 100,
            align: "center",
            render: (text: string) => (
                <a>{text}</a>
            )
        },
        {
            title: '站点名',
            dataIndex: 'name',
            width: 100,
            align: "center"
        },
        {
            title: "站点负责人",
            dataIndex: 'receiver',
            width: 100,
            align: "center",
        },
        {
            title: "站点收益",
            dataIndex: 'profit',
            width: 100,
            align: "center",
        },
        {
            title: "站长电话",
            dataIndex: 'phone',
            width: 100,
            align: "center",
            render: (text: number) => (
                <Tooltip title="点击复制">
                    <a onClick={() => handleCopy(text.toString())}>{text}</a>
                </Tooltip>
            )
        },
        {
            title: "站点地址",
            dataIndex: 'address',
            width: 200,
            align: "center",
            render: (text: string) => (
                <Tooltip title={text}>
                    <span style={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {text}
                    </span>
                </Tooltip>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 100,
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModal('edit', record)}>修改</a>
                    <a onClick={() => showModal('check', record)}>查看</a>
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
            id: 1,
            name: '安达站点',
            address: '湖北咸宁安达小区',
            receiver: "王五",
            phone: 1234567,
            profit: 1000,
        },
        {
            key: '2',
            id: 2,
            name: '南泰中央华府站点',
            address: '南山南泰中央华府',
            receiver: "张三",
            phone: 12319565,
            profit: 2000,
        },
        {
            key: '3',
            id: 3,
            name: '测试站点',
            address: '测试位置',
            receiver: "李四",
            phone: 123548976,
            profit: 3000,
        },
    ];


    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: '#fff',
                },
            }}
        >
            <div className="top-search">
                <SiteSearch/>
                <Button
                    onClick={() => showModal('add')}
                    type="primary"
                    style={{marginBottom: '20px'}}
                >
                    新增站点
                </Button>
            </div>
            <div style={{fontSize: 18, marginBottom: 20}}></div>
            <Table<DataType>
                style={{marginTop: 20}}
                columns={columns}
                dataSource={data}
                className="tableShadow"
                scroll={{x: 'max-content'}}
            />
            <Modal
                title={
                    currentAction === 'add' ? '添加商品' :
                        currentAction === 'edit' ? '修改商品' : '查看商品'

                }
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <SiteAction action={currentAction}
                            record={currentRecord}
                            onSubmit={handleFormSubmit}/>
            </Modal>
        </ConfigProvider>
    );
};

export default SiteList;
