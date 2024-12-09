import React, {useState} from "react";
import {
    // Button,
    ConfigProvider,
    Image, Modal,
    // Popconfirm,
    // PopconfirmProps,
    Space,
    // Switch,
    Table,
    TableColumnsType, Tag,
} from "antd";
import "../../../style/table.scss";
import GoodsAction from "./components/GoodsAction.tsx";
// @ts-ignore
import GoodsSearch from "./components/GoodsSearch.tsx";


interface DataType {
    key: React.Key;
    name: string;
    price: number;
    prePrice: number;
    image: string;
    menuCategory: string;
    serveCategory: string;
    describe: string;
    amount: number;
    commission: number;
    remark: string;
    profit: number;
}

const GoodsManage: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading] = useState(false);
    const [currentAction, setCurrentAction] = useState<'profit' | 'commission'>('profit');
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);


    // const confirm: PopconfirmProps['onConfirm'] = (e) => {
    //     console.log(e);
    // };
    //
    // const cancel: PopconfirmProps['onCancel'] = (e) => {
    //     console.log(e);
    // };

    const tagColors = (text: string) => {
        switch (text) {
            case "团购":
                return "#2F54EB"
            case "精选":
                return "#EB2F96"
            case "服务":
                return "#13C2C2"
            default:
                return "#ff4d4f"
        }
    }

    const showModal = (action: 'profit' | 'commission', record?: DataType) => {
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
            title: "现价",
            dataIndex: 'price',
            width: 100,
            align: "center"
        },
        {
            title: "优惠之前",
            dataIndex: 'prePrice',
            width: 100,
            align: "center"
        },
        {
            title: "库存",
            dataIndex: 'amount',
            width: 100,
            align: "center"
        },
        {
            title: "每单利润/元",
            dataIndex: 'profit',
            width: 100,
            align: "center"
        },
        {
            title: "每单提成/元",
            dataIndex: 'commission',
            width: 100,
            align: "center"
        },
        {
            title: "菜单分类",
            dataIndex: 'menuCategory',
            width: 100,
            align: "center"
        },
        {
            title: "服务分类",
            dataIndex: 'serveCategory',
            width: 100,
            align: "center",
            render: (text: string) => (
                <Tag bordered={false} color={tagColors(text)}>{text}</Tag>
            )
        },
        {
            title: "商品描述",
            dataIndex: 'describe',
            width: 100,
            align: "center"
        },
        {
            title: "商品备注",
            dataIndex: 'remark',
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
        // {
        //     title: "上架/下架",
        //     width: 100,
        //     render: () => (
        //         <Space direction="vertical">
        //             <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked/>
        //         </Space>
        //     )
        // },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showModal('profit', record)}>设置提成/利润</a>
                    {/*<a onClick={() => showModal('commission', record)}>设置站点提成</a>*/}
                    {/*<Popconfirm*/}
                    {/*    title="确认删除？"*/}
                    {/*    onConfirm={confirm}*/}
                    {/*    onCancel={cancel}*/}
                    {/*    okText="确认"*/}
                    {/*    cancelText="取消"*/}
                    {/*>*/}
                    {/*    <a>删除</a>*/}
                    {/*</Popconfirm>*/}
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'iPhone16',
            price: 15000,
            prePrice: 18000,
            amount: 20,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            menuCategory: "水果",
            serveCategory: "团购",
            describe: "极品",
            remark: "备注",
            commission: 19,
            profit: 100
        },
        {
            key: '2',
            name: '家政',
            price: 6199,
            prePrice: 18000,
            amount: 20,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            menuCategory: "生鲜",
            serveCategory: "服务",
            describe: "极品",
            remark: "备注",
            commission: 19,
            profit: 100
        },
        {
            key: '3',
            name: 'iPad Pro',
            price: 8999,
            prePrice: 18000,
            amount: 20,
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            menuCategory: "肉类",
            serveCategory: "今日优选",
            describe: "极品",
            remark: "备注",
            commission: 29,
            profit: 100
        },
    ];

    return (
        <>
            <div className="top-search">
                <GoodsSearch></GoodsSearch>
                {/*<Button type="primary" onClick={() => showModal('add')}>*/}
                {/*    新增商品*/}
                {/*</Button>*/}
                {/*<Button type="primary" onClick={() => showModal('addTomorrowGoods')}>*/}
                {/*    新增明日优选商品*/}
                {/*</Button>*/}
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
                    title="设置"
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