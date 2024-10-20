import React, {useState} from "react";
import {
    ConfigProvider,
    Image,
    message,
    Modal,
    Table,
    TableColumnsType,
    Tooltip,
} from "antd";
import "../../../style/table.scss";
import MiniListSearch from "./components/MiniListSearch.tsx";


interface DataType {
    key: React.Key;
    name: string;
    image: string;
    address: string;
    phone: number;
}

const MiniProgramList: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading] = useState(false);
    const [currentAction] = useState<'add' | 'edit' | 'check' | 'addTomorrowGoods'>('add');

    const handleCancel = () => {
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
            title: '用户名',
            dataIndex: 'name',
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
            width: 200,
            align: "center",
        },
        {
            title: '头像',
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
        //     title: '操作',
        //     key: 'action',
        //     width: 100,
        //     align: "center",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a onClick={() => showModal('edit', record)}>修改</a>
        //             <Popconfirm
        //                 title="确认删除？"
        //                 onConfirm={confirm}
        //                 onCancel={cancel}
        //                 okText="确认"
        //                 cancelText="取消"
        //             >
        //                 <a>删除</a>
        //             </Popconfirm>
        //         </Space>
        //     ),
        // },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'jf',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            address: "测试",
        },
        {
            key: '2',
            name: '王五',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            address: "测试",
        },
        {
            key: '3',
            name: '张三',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            phone: 123576678,
            address: "测试",
        },
    ];


    return (
        <>
            <div className="top-search">
                <MiniListSearch/>
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

                </Modal>
            </ConfigProvider>
        </>
    )
}
export default MiniProgramList