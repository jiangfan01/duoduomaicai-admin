import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;

const OderCharts: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);

    // 初始化图表数据
    const initChart = (xData: string[], seriesData: number[][]) => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);

        // 使用指定的系列名称
        const seriesNames = ['团购', '精选', '服务', '今日优选'];

        const series = seriesData.map((data, index) => ({
            name: seriesNames[index], // 每个系列的名称
            data: data,
            type: 'line',
            stack: '总量', // 堆叠配置
            smooth: true, // 曲线平滑
        }));

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis', // 鼠标悬停在某个点时显示
                formatter: (params) => {
                    const date = params[0].name; // 获取日期
                    const values = params.map(param => `${param.seriesName}: ¥${param.value}`).join('<br/>');
                    return `${date}<br/>${values}`; // 自定义提示内容
                }
            },
            legend: {
                data: seriesNames.slice(0, seriesData.length), // 显示系列名称
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: series,
        };

        myChart.setOption(option);
    };

    // 模拟更新数据
    const updateChart = () => {
        let xData: string[] = [];
        let seriesData: number[][] = [];

        const numSeries = 4; // 团购、精选、服务、今日优选
        if (dateRange) {
            // 根据选择的日期范围生成数据
            const startDate = dateRange[0].startOf('day').toDate();
            const endDate = dateRange[1].endOf('day').toDate();
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                xData.push(moment(currentDate).format('YYYY-MM-DD'));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // 为每个系列生成随机数据
            for (let i = 0; i < numSeries; i++) {
                const data: number[] = [];
                for (let j = 0; j < xData.length; j++) {
                    data.push(Math.floor(Math.random() * 100)); // 随机数，范围 0-100
                }
                seriesData.push(data);
            }
        } else {
            // 默认数据：最近七天
            const today = moment().endOf('day');
            const sevenDaysAgo = moment().subtract(6, 'days').startOf('day');

            let currentDate = moment(sevenDaysAgo);
            while (currentDate <= today) {
                xData.push(currentDate.format('YYYY-MM-DD'));
                currentDate = currentDate.add(1, 'day');
            }

            // 为每个系列生成随机数据
            for (let i = 0; i < numSeries; i++) {
                const data: number[] = [];
                for (let j = 0; j < xData.length; j++) {
                    data.push(Math.floor(Math.random() * 100)); // 随机数，范围 0-100
                }
                seriesData.push(data);
            }
        }

        initChart(xData, seriesData);
    };

    useEffect(() => {
        updateChart();
    }, [dateRange]);

    // 日期选择回调
    const onDateChange: RangePickerProps['onChange'] = (dates) => {
        if (dates) {
            // @ts-ignore
            setDateRange([dates[0], dates[1]]);
        } else {
            setDateRange(null);
        }
    };

    // 禁用未来日期
    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current > moment().endOf('day');
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div><h1>订单统计</h1></div>
                {/* 日期选择 */}
                <RangePicker
                    style={{ width: '300px' }}
                    placeholder={['开始日期', '结束日期']}
                    onChange={onDateChange}
                    value={dateRange}
                    disabledDate={disabledDate}
                />
            </div>
            {/* 图表容器 */}
            <div ref={chartRef} style={{ width: '80%', height: '400px' }}></div>
        </div>
    );
};

export default OderCharts;
