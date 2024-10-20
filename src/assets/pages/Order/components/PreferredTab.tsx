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
                    }))} title={`今日优选订单：`} column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
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

const PreferredTab: React.FC = () => {
    const orders: Order[][] = [[]]

    return (
        <div>
            <OrderDetails orders={orders}/>
        </div>
    );
};

export default PreferredTab;
