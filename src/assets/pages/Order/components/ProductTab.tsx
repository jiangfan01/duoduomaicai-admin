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

const ProductTab = React.forwardRef((_, ref) => {
    const orders: Order[][] = [
        // 示例数据
        [
            {label: '商品名', children: '商品B'},
            {label: '金额', children: '150'},
            {label: '数量', children: '15'},
            {label: '下单时间', children: '2024-10-02'},
            {label: '顾客电话', children: '13800138001'},
            {label: '下单地址', children: '地址B'},
            {label: '描述', children: '描述B'},
        ],
        // 其他订单数据
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

export default ProductTab;
