import React, {useState} from 'react';
import {
    ConfigProvider,
    Table,
    Image,
    Tooltip,
    message,
    Modal,
    Space,
    Popconfirm,
    PopconfirmProps,
} from 'antd';
import type {TableColumnsType} from 'antd';
import "../../../style/table.scss";
import GroupSearch from "./components/GroupSearch.tsx";
import GroupAction from "./components/GroupAction.tsx";

interface DataType {
    key: React.Key;
    id: number;
    name: string;
    price: number;
    address: string;
    image: string;
    siteAddress: string;
    receiver: string;
    phone: number;
}


const GroupList: React.FC = () => {
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
            title: '订单号',
            dataIndex: 'id',
            width: 100,
            align: "center",
            render: (text: string) => (
                <Tooltip title="点击复制">
                    <a onClick={() => handleCopy(text.toString())}>{text}</a>
                </Tooltip>
            )
        },
        {
            title: '商品名',
            dataIndex: 'name',
            width: 100,
            align: "center"
        },
        {
            title: "价格",
            dataIndex: 'price',
            width: 100,
            align: "center"
        },
        {
            title: '图片',
            dataIndex: 'image',
            width: 200,
            render: (text: string) => (
                <Image
                    width={100}
                    className="product-img"
                    src={text || "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                />
            ),
            align: "center"
        },
        {
            title: "收货人",
            dataIndex: 'receiver',
            width: 100,
            align: "center",
        },
        {
            title: "收货人电话",
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
            title: "下单地址",
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
            title: "所属站点",
            dataIndex: 'siteAddress',
            width: 100,
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
                    {/*<a onClick={() => showModal('edit', record)}>修改</a>*/}
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
            name: 'iPhone16',
            price: 15000,
            address: '湖北咸宁',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            siteAddress: "南泰中央华府",
            receiver: "王五",
            phone: 1234567890,
        },
        {
            key: '2',
            id: 2,
            name: 'mate 60 Pro',
            price: 6199,
            address: '湖北武汉',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            siteAddress: "南泰中央华府",
            receiver: "张三",
            phone: 123456787,
        },
        {
            key: '3',
            id: 3,
            name: 'iPad Pro',
            price: 8999,
            address: '湖北武汉天河机场',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            siteAddress: "南泰中央华府",
            receiver: "李四",
            phone: 12345678,
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
                <GroupSearch/>
                {/*<Button*/}
                {/*    onClick={() => showModal('add')}*/}
                {/*    type="primary"*/}
                {/*    style={{marginBottom: '20px'}}*/}
                {/*>*/}
                {/*    新增*/}
                {/*</Button>*/}
            </div>
            <Table<DataType>
                style={{marginTop: 20}}
                columns={columns}
                dataSource={data}
                size="middle"
                className="tableShadow"
                scroll={{x: 'max-content'}}
            />
            <Modal
                title={currentAction === 'add' ? '添加商品' : '修改商品'}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <GroupAction
                    action={currentAction}
                    record={currentRecord}
                    onSubmit={handleFormSubmit}/>
            </Modal>
        </ConfigProvider>
    );
};

export default GroupList;
