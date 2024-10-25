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

const PreferredTab = React.forwardRef((_, ref) => {
    const orders: Order[][] = [
        // 示例数据
        [
            {label: '商品名', children: '商品C'},
            {label: '金额', children: '200'},
            {label: '下单时间', children: '2024-10-03'},
            {label: '顾客电话', children: '13800138002'},
            {label: '下单地址', children: '地址C'},
            {label: '下单站点', children: '站点C'},
            {label: '本单提成', children: '2.50'},
            {label: '描述', children: '描述C'},
        ],
        // 其他订单数据
    ];
    console.log(ref, 999)
    React.useImperativeHandle(ref, () => ({
        getOrders: () => orders,
    }));

    return (
        <div>
            <OrderDetails orders={orders} id="tab-4"/>
        </div>
    );
});

export default PreferredTab;
