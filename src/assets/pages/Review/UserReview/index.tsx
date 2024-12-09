import React from "react";
import {Image, message, Popconfirm, PopconfirmProps, Space, Table, Tooltip} from 'antd';
import type {TableProps} from 'antd';

interface DataType {
    key: string;
    name: string;
    phone: number;
    address: string;
    image: string;
}

const UserReview: React.FC = () => {

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('复制成功')
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
    };

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
    };


    const columns: TableProps<DataType>['columns'] = [
        {
            title: '入驻名',
            dataIndex: 'name',
            key: 'name',
            align: "center",
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            align: "center",
            render: (text: string) => (
                <Tooltip title="点击复制">
                    <a onClick={() => handleCopy(text.toString())}>{text}</a>
                </Tooltip>
            )
        },
        {
            title: '店家图片',
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
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            align: "center",
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            render: (_,) => (
                <Space size="middle">
                    <Popconfirm
                        title="确认同意该商家入驻？"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a>同意入驻</a>
                    </Popconfirm>
                    <Popconfirm
                        title="确认否定该商家入驻？"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a>否定入驻</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    const data: DataType[] = [
        {
            key: '1',
            name: '中百超市',
            phone: 17771513712,
            address: '咸安区中百超市',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            key: '2',
            name: '南泰中央华府站点',
            phone: 17771513712,
            address: '南泰中央华府小区',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            key: '3',
            name: '蒋师傅',
            phone: 17771513712,
            address: '安达小区',
            image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ];

    return (
        <Table<DataType>
            style={{marginTop: 20}}
            columns={columns}
            dataSource={data}
            className="tableShadow"
            scroll={{x: 'max-content'}}
        />
    )
}
export default UserReview