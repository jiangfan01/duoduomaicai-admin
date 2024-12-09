import React, {useEffect} from 'react';
import {Button, Cascader, Form, Input, InputNumber, Select} from 'antd';
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
    profit: number;
}

interface EditFormProps {
    action: 'profit' | 'commission'
    record: DataType | null;
    onSubmit: () => void;
}

const GoodsAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const [form]: any = Form.useForm();
    console.log(action, "action")

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
                commission: record.commission || 0,
                profit: record.profit || 0
            });
        } else {
            form.resetFields();
        }
    }, [record, form]);

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
        {
            value:'today',
            label: '今日优选',
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
                <Input placeholder="请输入商品名" disabled/>
            </Form.Item>
            <Form.Item label="价格" name="price">
                <InputNumber placeholder="请输入价格" disabled style={{width: 275}}/>
            </Form.Item>
            <Form.Item label="优惠前价格" name="prePrice">
                <InputNumber placeholder="请输入优惠之前价格" disabled style={{width: 275}}/>
            </Form.Item>
            <Form.Item label="数量" name="amount">
                <InputNumber placeholder="请输入商品数量" disabled style={{width: 275}}/>
            </Form.Item>
            <Form.Item label='图片'>
                <UploadImg action={action} initialImageUrl={record?.image} isDisabled={true}/>
            </Form.Item>
            <Form.Item label="菜单分类" name="menuCategory">
                <Cascader options={options} disabled/>
            </Form.Item>
            <Form.Item label="服务分类" name="serveCategory">
                <Select mode="multiple"
                        placeholder="请选择"
                        disabled
                        options={serveOptions || []}
                />
            </Form.Item>
            {/*<Form.Item label="今日优选">*/}
            {/*    <Switch checkedChildren="今日优选" unCheckedChildren="关闭"*/}
            {/*            onChange={checkedYouXuan}*/}
            {/*            disabled={isCheckMode}/>*/}
            {/*</Form.Item>*/}
            <Form.Item label="商品描述" name="describe">
                <Input placeholder="请输入描述" disabled/>
            </Form.Item>
            <Form.Item label="每单利润" name="profit">
                <InputNumber
                    placeholder="请输入"
                    value={form.getFieldValue('profit') || 0}
                />
            </Form.Item>
            <Form.Item label="每单提成" name="commission">
                <InputNumber
                    placeholder="请输入"
                    value={form.getFieldValue('commission') || 0}
                />
            </Form.Item>
            {/*{isYouXuanDisabled && (*/}
            {/*    <Form.Item label="时间范围" name="dateRange">*/}
            {/*        <DatePicker.RangePicker*/}
            {/*            showTime={{format: 'HH:mm'}}*/}
            {/*            format="YYYY-MM-DD HH:mm"*/}
            {/*            placeholder={['开始时间', '结束时间']}*/}
            {/*            style={{width: 275}}*/}
            {/*            allowClear*/}
            {/*        />*/}
            {/*    </Form.Item>*/}
            {/*)}*/}


            <Form.Item label="操作">
                <Button type="primary" onClick={onSubmit}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GoodsAction;
