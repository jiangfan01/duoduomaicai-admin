import React, {useState} from "react";
import {
    ConfigProvider,
    Image,
    message,
    Modal,
    Popconfirm,
    PopconfirmProps,
    Space,
    Table,
    TableColumnsType, Tag,
    Tooltip,
} from "antd";
import "../../../style/table.scss";
import ServeAfterSaleAction from "./components/ServeAfterSaleAction.tsx";
import ServeAfterSaleSearch from "./components/ServeAfterSaleSearch.tsx";


interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string;
    address: string;
    phone: number;
    reason: string;
    state: string;
}

const ServeAfterSale: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState<'add' | 'edit' | 'check' | 'addTomorrowGoods'>('add');
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);


    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };


    const showModal = (action: 'add' | 'edit' | 'check' | 'addTomorrowGoods', record?: DataType) => {
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

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('复制成功')
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };


    const columns: TableColumnsType<DataType> = [
        {
            title: '服务名',
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
            title: "用户手机号",
            dataIndex: "phone",
            width: 100,
            align: "center",
            render: (text: string) => (
                <Tooltip title="点击复制">
                    <a onClick={() => handleCopy(text.toString())}>{text}</a>
                </Tooltip>
            )
        },
        {
            title: "地址",
            dataIndex: 'address',
            width: 100,
            align: "center",
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
            title: "售后原因",
            dataIndex: 'reason',
            width: 100,
            align: "center",
        },
        {
            title: "状态",
            dataIndex: 'state',
            width: 100,
            align: "center",
            render: (text: string) => (
                <Tag color={text === "已处理" ? "green" : "red"}>{text}</Tag>
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
            name: '家教',
            price: 15000,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            reason: "商品太贵",
            state: "已处理",
            address: "测试",
        },
        {
            key: '2',
            name: '洗车',
            price: 6199,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            reason: "不想要了",
            state: "未处理",
            address: "测试",
        },
        {
            key: '3',
            name: '辅导',
            price: 8999,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            reason: "666",
            state: "未处理",
            address: "测试",
        },
    ];


    return (
        <>
            <div className="top-search">
                <ServeAfterSaleSearch/>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Table<DataType>
                    style={{marginTop: 20}}
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    className="tableShadow"
                    scroll={{x: 'max-content'}}
                />
                <Modal
                    title={
                        currentAction === 'add' ? '添加' : "编辑售后状态"
                    }
                    open={open}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <ServeAfterSaleAction action={currentAction}
                                          record={currentRecord}
                                          onSubmit={handleFormSubmit}/>
                </Modal>
            </ConfigProvider>
        </>
    )
}
export default ServeAfterSale