import React from 'react';
import {Card, StatisticProps} from 'antd';
import {Col, Row, Statistic} from 'antd';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator=","/>
);

const UserCount: React.FC = () => (
    <Row style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        gap: "40px",
        marginBottom: "40px"
    }}>
        <Col>
            <Card bordered={false}>
                <Statistic
                    title="小程序用户"
                    value={1128}
                    precision={0}
                    valueStyle={{color: '#3f8600'}}
                    suffix="位"
                    formatter={formatter}
                />
            </Card>
        </Col>
        <Col>
            <Card bordered={false}>
                <Statistic
                    title="站点数"
                    value={30}
                    precision={0}
                    valueStyle={{color: '#3f8600'}}
                    suffix="个"
                    formatter={formatter}
                />
            </Card>
        </Col>
    </Row>
);

export default UserCount;