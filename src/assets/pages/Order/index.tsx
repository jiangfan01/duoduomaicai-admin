import React, {useEffect, useRef, useState} from 'react';
import {Button, ConfigProvider, DatePicker, Tabs, TabsProps} from 'antd';
import GroupBuyTab from './components/GroupBuyTab';
import ProductTab from './components/ProductTab';
import ServeTab from './components/ServeTab';
import PreferredTab from './components/PreferredTab';
import moment from 'moment';
import {RangePickerProps} from 'antd/es/date-picker';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
// @ts-ignore
import {saveAs} from 'file-saver';

const OrderPage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
    const [activeKey, setActiveKey] = useState<string>('1');
    const tableRef = useRef<HTMLDivElement>(null);
    const groupBuyRef = useRef<any>(null);
    const preferredRef = useRef<any>(null);
    const productRef = useRef<any>(null);
    const serveRef = useRef<any>(null);
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '团购',
            // @ts-ignore
            children: <GroupBuyTab id="tab-1" ref={groupBuyRef}/>,
        },
        {
            key: '2',
            label: '精选',
            // @ts-ignore
            children: <ProductTab id="tab-2" ref={productRef}/>,
        },
        {
            key: '3',
            label: '服务',
            // @ts-ignore
            children: <ServeTab id="tab-3" ref={serveRef}/>,
        },
        {
            key: '4',
            label: '今日优选',
            // @ts-ignore
            children: <PreferredTab id="tab-4" ref={preferredRef}/>,
        },
    ];

    const customTheme = {
        token: {
            colorSplit: 'rgba(0, 0, 0, 0.1)',
        },
    };

    // 禁用未来日期
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current > moment().endOf('day');
    };

    const onDateChange = (date: moment.Moment | null) => {
        setSelectedDate(date);
        if (date) {
            console.log('选择的日期是:', date.format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        if (tableRef.current) {
            // 这里可以添加一些逻辑来处理 activeKey 变化时的操作
        }
    }, [activeKey]);

    // 导出当前选中的 Tab 数据为 Excel
    const exportExcel = () => {
        const today = dayjs().format('YYYY-MM-DD');
        let orders = [];
        // 根据 activeKey 获取对应 Tab 的数据
        switch (activeKey) {
            case '1':
                orders = groupBuyRef.current.getOrders();
                console.log(orders, 111)
                break;
            case '2':
                orders = productRef.current.getOrders();
                break;
            case '3':
                orders = serveRef.current.getOrders();
                break;
            case '4':
                orders = preferredRef.current.getOrders();
                break;
            default:
                break;
        }

        // 将数据转换为表格形式
        const worksheetData = orders.map((orderRow: any[]) => orderRow.map(order => order.children));
        const worksheet = XLSX.utils.aoa_to_sheet([orders[0].map((order: {
            label: any;
        }) => order.label), ...worksheetData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const wbout = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const blob = new Blob([wbout], {type: 'application/octet-stream'});
        saveAs(blob, `order_${today}.xlsx`);
    };

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <DatePicker
                    picker="date"
                    disabledDate={disabledDate}
                    onChange={onDateChange}
                />
                <Button type="primary" onClick={exportExcel} style={{marginLeft: 8}}>导出Excel</Button>
            </div>

            <ConfigProvider theme={customTheme}>
                <div id="pdfContent" ref={tableRef}>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={items}
                        onChange={(key) => setActiveKey(key)}
                    />
                </div>
            </ConfigProvider>
        </>
    );
};

export default OrderPage;
