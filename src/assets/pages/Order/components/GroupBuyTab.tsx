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

const GroupBuyTab = React.forwardRef((_, ref) => {
    const orders: Order[][] = [
        // 示例数据
        [
            {label: '商品名', children: '商品A'},
            {label: '金额', children: '100'},
            {label: '数量', children: '10'},
            {label: '下单时间', children: '2024-10-01'},
            {label: '顾客电话', children: '13800138000'},
            {label: '下单地址', children: '地址A'},
            {label: '下单站点', children: '站点A'},
            {label: '本单提成', children: '1.50'},
            {label: '描述', children: '描述A'},
        ],
        [
            {label: '商品名', children: '商品B'},
            {label: '金额', children: '10'},
            {label: '数量', children: '1'},
            {label: '下单时间', children: '2024-10-01'},
            {label: '顾客电话', children: '1111111111'},
            {label: '下单地址', children: '地址B'},
            {label: '下单站点', children: '站点B'},
            {label: '本单提成', children: '1.50'},
            {label: '描述', children: '描述B'},
        ],
        // 其他订单数据
    ];

    React.useImperativeHandle(ref, () => ({
        getOrders: () => orders,
    }));

    return (
        <div>
            <OrderDetails orders={orders} id="tab-1"/>
        </div>
    );
});

export default GroupBuyTab;
