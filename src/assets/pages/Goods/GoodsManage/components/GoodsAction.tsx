import React, {useEffect} from 'react';
import {
    Button, DatePicker,
    Form,
    Input, InputNumber,
    Select,
} from 'antd';
import UploadImg from "../../../../components/upload.tsx";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.locale('zh-cn');

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string;
    category: string;
    describe: string
}

interface EditFormProps {
    action: 'add' | 'edit' | 'check' | 'addTomorrowGoods';
    record: DataType | null;
    onSubmit: () => void;
}

const category = [
    {value: '1', label: '团购'},
    {value: '2', label: '精选'},
    {value: '3', label: '服务'},
];
const GoodsAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const handleFormSubmit = () => {
        onSubmit();
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                name: record.name,
                price: record.price,
                image: record.image,
                category: record.category,
                describe: record.describe,
            });
        } else {
            form.resetFields();
        }
    }, [record, form]);

    const isCheckMode = action === 'check';
    return (
        <Form
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            form={form}
            style={{maxWidth: 600}}
        >
            <Form.Item label="商品名" name="name">
                <Input placeholder={'请输入商品名'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="价格" name="price">
                <InputNumber placeholder={'请输入价格'} disabled={isCheckMode} style={{width: 275}}/>
            </Form.Item>
            <Form.Item label={action === 'edit' ? '修改图片' : '上传'}>
                <UploadImg action={action} initialImageUrl={record?.image}/>
            </Form.Item>
            <Form.Item label="分类" name="category">
                <Select placeholder="请选择分类" disabled={isCheckMode}>
                    {category.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="商品描述" name="describe">
                <Input placeholder={'请输入描述'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="时间范围" name="dateRange">
                <DatePicker.RangePicker
                    showTime={{format: 'HH:mm'}}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始时间', '结束时间']}
                    style={{width: 275}}
                    disabled={action !== 'addTomorrowGoods'}
                    allowClear
                    value={action === 'addTomorrowGoods' ? undefined : null}
                    allowEmpty={action !== 'addTomorrowGoods'}
                />
            </Form.Item>

            <Form.Item label="操作">
                <Button
                    type="primary"
                    onClick={handleFormSubmit}
                >{action === 'check' ? '关闭' : '提交'}</Button>
            </Form.Item>
        </Form>
    );
};
export default GoodsAction;
