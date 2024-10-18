import React, {useEffect} from 'react';
import {
    Button,
    Form,
    Input, InputNumber,
    Select,
} from 'antd';
import UploadImg from "../../../../components/upload.tsx";

interface DataType {
    key: React.Key;
    id: number;
    name: string;
    price: number;
    address: string;
    image: string;
    siteAddress: string;
    receiver: string;
    phone: number
}

interface EditFormProps {
    action: 'add' | 'edit' | 'check';
    record: DataType | null;
    onSubmit: () => void;
}

const siteAddress = [
    {value: '1', label: '南泰中央华府'},
    {value: '2', label: '安达小区'},
];
const PreferredAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const handleFormSubmit = () => {
        onSubmit();
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                id: record.id,
                name: record.name,
                price: record.price,
                siteAddress: record.siteAddress,
                receiver: record.receiver,
                phone: record.phone
            });
        } else {
            form.resetFields();
        }
    }, [record, form]);

    const isCheckMode = action === 'check';
    const isEditMode = action === 'edit';
    return (
        <Form
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            form={form}
            style={{maxWidth: 600}}
        >
            <Form.Item label="订单号" name="id">
                <Input placeholder={'请输入订单号'} disabled={isCheckMode || isEditMode}/>
            </Form.Item>
            <Form.Item label="商品名" name="name">
                <Input placeholder={'请输入商品名'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="价格" name="price">
                <InputNumber placeholder={'请输入价格'} disabled={isCheckMode} style={{width: 275}}/>
            </Form.Item>
            <Form.Item label="收货人" name="receiver">
                <Input placeholder={'请输入收货人'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="收货人电话" name="phone">
                <Input placeholder={'请输入收货人电话'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label={action === 'edit' ? '修改图片' : '上传'}>
                <UploadImg action={action} initialImageUrl={record?.image}/>
            </Form.Item>
            <Form.Item label="站点" name="siteAddress">
                <Select placeholder="请选择站点" disabled={isCheckMode}>
                    {siteAddress.map((item) => (
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
export default PreferredAction;
