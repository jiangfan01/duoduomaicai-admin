import React from "react";
import {Descriptions, Divider, Empty} from "antd";

interface Order {
    label: string;
    children: string;
}

interface Props {
    orders: Order[][];
}

const OrderDetails: React.FC<Props> = ({orders}) => {
    if (orders.length === 0 || orders.every(order => order.length === 0)) {
        return <Empty description="无数据"/>;
    }

    return (
        <div>
            {orders.map((orderGroup, groupIndex) => (
                <React.Fragment key={groupIndex}>
                    <Descriptions bordered items={orderGroup.map(order => ({
                        label: order.label,
                        children: order.children,
                        span: 1,
                    }))} title={`服务订单：`} column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                        {orderGroup.map((_, index) => (
                            <React.Fragment key={index}>
                                {index !== 0 && <Divider style={{margin: '16px 0'}}/>}
                            </React.Fragment>
                        ))}
                    </Descriptions>
                    {groupIndex !== orders.length - 1 && <Divider style={{margin: '32px 0'}}/>}
                </React.Fragment>
            ))}
        </div>
    );
};

const ServeTab: React.FC = () => {
    const orders: Order[][] = [
        [
            {
                label: '服务',
                children: '家教',
            },
            {
                label: '价格',
                children: '200',
            },
            {
                label: '下单时间',
                children: '2024-10-10',
            },
            {
                label: '顾客电话',
                children: '17771513712',
            },
            {
                label: '下单地址',
                children: '万达1111111111111111111',
            },
        ],
        [
            {
                label: '服务',
                children: '洗车',
            },
            {
                label: '价格',
                children: '150',
            },
            {
                label: '下单时间',
                children: '2024-10-11',
            },
            {
                label: '顾客电话',
                children: '18888888888',
            },
            {
                label: '下单地址',
                children: '王府井1111111111111111111',
            },
        ],
        [
            {
                label: '服务',
                children: '家政',
            },
            {
                label: '价格',
                children: '180',
            },
            {
                label: '下单时间',
                children: '2024-10-12',
            },
            {
                label: '顾客电话',
                children: '19999999999',
            },
            {
                label: '下单地址',
                children: '国贸1111111111111111111',
            },
        ]
    ];

    return (
        <div>
            <OrderDetails orders={orders}/>
        </div>
    );
};

export default ServeTab;
