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

const PreferredTab: React.FC = () => {
    const orders: Order[][] = [
        [
            {label: '商品名', children: '苹果'},
            {label: '价格', children: '200'},
            {label: '下单时间', children: '2024-10-10'},
            {label: '顾客电话', children: '17771513712'},
            {label: '下单地址', children: '万达1111111111111111111'},
            {label: '下单站点', children: '南泰中央华府'},
            {label: '本单提成', children: '2.99'},
        ],
        [
            {label: '商品名', children: '香蕉'},
            {label: '价格', children: '150'},
            {label: '下单时间', children: '2024-10-11'},
            {label: '顾客电话', children: '18888888888'},
            {label: '下单地址', children: '王府井1111111111111111111'},
            {label: '下单站点', children: '王府井中央华府'},
            {label: '本单提成', children: '3.50'},
        ],
        [
            {label: '商品名', children: '橙子'},
            {label: '价格', children: '180'},
            {label: '下单时间', children: '2024-10-12'},
            {label: '顾客电话', children: '19999999999'},
            {label: '下单地址', children: '国贸1111111111111111111'},
            {label: '下单站点', children: '国贸中央华府'},
            {label: '本单提成', children: '4.00'},
        ]
    ];

    return (
        <div>
            <OrderDetails orders={orders} id="tab-2"/>
        </div>
    );
};

export default PreferredTab;
