import React, {useEffect, useState} from 'react';
import {Button, Cascader, CascaderProps, DatePicker, Form, Input, InputNumber, Select, Switch} from 'antd';
import UploadImg from "../../../../components/upload.tsx";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');


interface Option {
    value: string;
    label: string;
    children?: Option[];
}


interface DataType {
    key: React.Key;
    name: string;
    price: number;
    prePrice: number;
    image: string;
    menuCategory: string;
    serveCategory: string;
    describe: string;
    amount: number;
    commission: number;
}

interface EditFormProps {
    action: 'add' | 'edit' | 'check' | 'addTomorrowGoods';
    record: DataType | null;
    onSubmit: () => void;
}

const GoodsAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const [form] = Form.useForm();
    const [isCommissionDisabled, setIsCommissionDisabled] = useState(false);

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                name: record.name,
                price: record.price,
                image: record.image,
                prePrice: record.prePrice,
                menuCategory: record.menuCategory,
                serveCategory: record.serveCategory,
                describe: record.describe,
                amount: record.amount,
                commission: record.commission || 0, // 设置默认值
            });
            // 检查是否需要禁用提成输入框
            setIsCommissionDisabled(record.menuCategory === '服务');
        } else {
            form.resetFields();
        }
    }, [record, form]);

    const isCheckMode = action === 'check';

    const onChange: CascaderProps<Option>['onChange'] = (value) => {
        // 如果分类是服务，禁用提成输入框，否则启用
        if (value.includes('serve')) {
            setIsCommissionDisabled(true);
        } else {
            setIsCommissionDisabled(false);
        }
    };

    const options: Option[] = [
        {
            value: '1',
            label: '水果',

        },
        {
            value: 'shengxian',
            label: '生鲜',
        },
        {
            value: 'dianzi',
            label: '电子',
        },
        {
            value: 'roulei',
            label: '肉类',
        },

    ];


    const serveOptions: Option[] = [
        {
            value: '1',
            label: '团购',

        },
        {
            value: 'jingxuan',
            label: '精选',
        },
        {
            value: 'serve',
            label: '服务',
        },
    ];


    return (
        <Form
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            form={form}
            style={{maxWidth: 600}}
        >
            <Form.Item label="商品名" name="name">
                <Input placeholder="请输入商品名" disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="价格" name="price">
                <InputNumber placeholder="请输入价格" disabled={isCheckMode} style={{width: 275}}/>
            </Form.Item>
            <Form.Item label="优惠前价格" name="prePrice">
                <InputNumber placeholder="请输入优惠之前价格" disabled={isCheckMode} style={{width: 275}}/>
            </Form.Item>
            <Form.Item label="数量" name="amount">
                <InputNumber placeholder="请输入商品数量" disabled={isCheckMode} style={{width: 275}}/>
            </Form.Item>
            <Form.Item label={action === 'edit' ? '修改图片' : '上传'}>
                <UploadImg action={action} initialImageUrl={record?.image}/>
            </Form.Item>
            <Form.Item label="菜单分类" name="menuCategory">
                <Cascader options={options} onChange={onChange} disabled={isCheckMode}
                          placeholder="请选择"/>
            </Form.Item>
            <Form.Item label="服务分类" name="serveCategory">
                <Select mode="multiple" options={serveOptions} disabled={isCheckMode}
                        placeholder="请选择"/>
            </Form.Item>
            <Form.Item label="今日优选">
                <Switch checkedChildren="今日优选" unCheckedChildren="关闭" defaultChecked disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="商品描述" name="describe">
                <Input placeholder="请输入描述" disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="每单提成" name="commission">
                <InputNumber
                    placeholder="请输入"
                    disabled={isCheckMode || isCommissionDisabled}
                    value={form.getFieldValue('commission') || 0}
                />
            </Form.Item>
            {action === 'addTomorrowGoods' && (
                <Form.Item label="时间范围" name="dateRange">
                    <DatePicker.RangePicker
                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['开始时间', '结束时间']}
                        style={{width: 275}}
                        allowClear
                    />
                </Form.Item>
            )}

            <Form.Item label="操作">
                <Button type="primary" onClick={onSubmit}>
                    {action === 'check' ? '关闭' : '提交'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GoodsAction;
