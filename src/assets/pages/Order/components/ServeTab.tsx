import React from "react";
import '../../../style/table.scss';

interface Order {
    label: string;
    children: string;
}

interface OrderDetailsProps {
    orders: Order[][];
    id?: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({orders, id}) => {
    // @ts-ignore
    return (
        <div id={id} className="table-container">
            <table className="table">
                <thead>
                <tr>
                    {orders[0].map((order) => (
                        <th key={order.label}>{order.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {orders.map((orderRow, rowIndex) => (
                    <tr key={rowIndex}>
                        {orderRow.map((order, colIndex) => (
                            <td key={colIndex}>{order.children}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
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
