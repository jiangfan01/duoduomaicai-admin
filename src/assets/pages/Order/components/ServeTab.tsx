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
const ServeTab = React.forwardRef((_, ref) => {
    const orders: Order[][] = [
        [
            {label: '服务名', children: '打扫卫生'},
            {label: '金额', children: '200'},
            {label: '下单时间', children: '2024-10-10'},
            {label: '顾客电话', children: '17771513712'},
            {label: '下单地址', children: '万达1111111111111111111'},
            {label: '预约时间', children: '2024-10-1'},
            {label: '描述', children: '22'},
        ],
        [
            {label: '服务名', children: '深度清洁'},
            {label: '金额', children: '200'},
            {label: '下单时间', children: '2024-10-10'},
            {label: '顾客电话', children: '17771513712'},
            {label: '下单地址', children: '万达1111111111111111111'},
            {label: '预约时间', children: '2024-10-1'},
            {label: '描述', children: '111'},
        ],
    ];
    React.useImperativeHandle(ref, () => ({
        getOrders: () => orders,
    }));

    return (
        <div>
            <OrderDetails orders={orders} id="tab-2"/>
        </div>
    );
});

export default ServeTab;
