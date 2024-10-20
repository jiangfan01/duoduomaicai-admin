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

const items: TabsProps['items'] = [
    {
        key: '1',
        label: '团购',
        // @ts-ignore
        children: <GroupBuyTab id="tab-1"/>, // 给每个 Tab 一个唯一的 id
    },
    {
        key: '2',
        label: '精选',
        // @ts-ignore
        children: <ProductTab id="tab-2"/>, // 给每个 Tab 一个唯一的 id
    },
    {
        key: '3',
        label: '服务',
        // @ts-ignore
        children: <ServeTab id="tab-3"/>, // 给每个 Tab 一个唯一的 id
    },
    {
        key: '4',
        label: '今日优选',
        // @ts-ignore
        children: <PreferredTab id="tab-4"/>, // 给每个 Tab 一个唯一的 id
    },
];

const OrderPage: React.FC = () => {
    const [setSelectedDate] = useState<moment.Moment | null>(null);
    const [activeKey, setActiveKey] = useState<string>('1');
    const tableRef = useRef<HTMLDivElement>(null);


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
        // @ts-ignore
        setSelectedDate(date);
        if (date) {
            console.log('选择的日期是:', date.format('YYYY-MM-DD'));
        }
    };

    useEffect(() => {
        if (tableRef.current) {
            console.log(`当前选中的 Tab 是: tab-${activeKey}`);
            console.log(tableRef.current);  // 检查表格内容是否正确
        }
    }, [activeKey]);

    // 导出当前选中的 Tab 数据为 Excel
    const exportExcel = () => {
        const today = dayjs().format('YYYY-MM-DD');

        if (tableRef.current) {
            const table = tableRef.current.querySelector('table');
            if (table) {
                const wb = XLSX.utils.table_to_book(table, {sheet: 'Sheet1'});
                const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
                const blob = new Blob([wbout], {type: 'application/octet-stream'});
                saveAs(blob, `order_${today}.xlsx`); // 保存为 Excel
            } else {
                console.error('没有找到表格元素');
            }
        } else {
            console.error('当前 Tab 没有找到对应的内容');
        }
    };

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <DatePicker
                    picker="date"

                    disabledDate={disabledDate}
                    onChange={onDateChange}
                />
                <Button type="primary" onClick={exportExcel}  style={{marginLeft: 8}}>导出Excel</Button>
            </div>

            <ConfigProvider theme={customTheme}>
                <div id="pdfContent" ref={tableRef}>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={items}
                        onChange={(key) => setActiveKey(key)} // 记录当前选中的 Tab
                    />
                </div>
            </ConfigProvider>
        </>
    );
};

export default OrderPage;
