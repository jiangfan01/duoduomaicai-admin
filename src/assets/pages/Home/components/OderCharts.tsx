import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OderCharts: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    // 定义饼图数据
    const seriesData = [
        { name: '商家数量', value: 120 },
        { name: '小程序用户数量', value: 200 },
        { name: '站点数量', value: 150 },
    ];

    // 初始化饼图数据
    const initChart = (data: { name: string, value: number }[]) => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'item', // 鼠标悬停时显示提示框
                formatter: '{a} <br/>{b}: {c} ({d}%)', // 自定义提示框内容
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data.map(item => item.name), // 显示系列名称
            },
            series: [
                {
                    name: '数量分布',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'], // 设置饼图的位置
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        };

        myChart.setOption(option);
    };

    useEffect(() => {
        initChart(seriesData);
    }, []);

    return (
        <div>
            <h1>统计图</h1>
            {/* 图表容器 */}
            <div ref={chartRef} style={{ width: '80%', height: '400px' }}></div>
        </div>
    );
};

export default OderCharts;
