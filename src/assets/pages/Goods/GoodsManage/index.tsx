import React, {useState} from "react";
import {
    ConfigProvider,
    Image, Modal,
    Popconfirm,
    PopconfirmProps,
    Space,
    Table,
    TableColumnsType,
} from "antd";
import "../../../style/table.scss";
import GoodsAction from "./components/GoodsAction.tsx";
// @ts-ignore
import GoodsSearch from "./components/GoodsSearch.tsx";


interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string;
    category: string;
    describe: string
}

const GoodsManage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState<'add' | 'edit' | 'check'>('add');
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);


    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };


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

    const columns: TableColumnsType<DataType> = [
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
            title: "所属分类",
            dataIndex: 'category',
            width: 100,
            align: "center"
        },
        {
            title: "商品描述",
            dataIndex: 'describe',
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
            name: 'iPhone16',
            price: 15000,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            category: "团购",
            describe: "极品"
        },
        {
            key: '2',
            name: 'mate 60 Pro',
            price: 6199,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            category: "精选",
            describe: "极品"
        },
        {
            key: '3',
            name: 'iPad Pro',
            price: 8999,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            category: "服务",
            describe: "极品"
        },
    ];

    return (
        <>
            <GoodsSearch></GoodsSearch>
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
                    title={currentAction === 'add' ? '添加商品' : '修改商品'}
                    open={open}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <GoodsAction
                        action={currentAction}
                        record={currentRecord}
                        onSubmit={handleFormSubmit}/>
                </Modal>
            </ConfigProvider>
        </>
    )
}
export default GoodsManage