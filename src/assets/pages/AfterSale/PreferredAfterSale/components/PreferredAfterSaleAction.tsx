import React, {useEffect} from 'react';
import {
    Button,
    Form,
    Select,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.locale('zh-cn');

interface DataType {
    key: React.Key;
    state:string;
}

interface EditFormProps {
    action: 'add' | 'edit' | 'check' | 'addTomorrowGoods';
    record: DataType | null;
    onSubmit: () => void;
}

const category = [
    {value: '1', label: '已处理'},
    {value: '2', label: "未处理"},
];

const PreferredAfterSaleAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const handleFormSubmit = () => {
        onSubmit();
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                state: record.state,
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

            <Form.Item label="售后状态" name="state">
                <Select placeholder="请选择" disabled={isCheckMode}>
                    {category.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
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
export default PreferredAfterSaleAction;
