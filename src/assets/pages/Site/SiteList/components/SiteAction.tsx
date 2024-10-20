import React, {useEffect} from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';

interface DataType {
    key: React.Key;
    id: number;
    name: string;
    address: string;
    receiver: string;
    phone: number;
    profit: number;
}


interface SiteActionProps {
    action: 'add' | 'edit' | 'check';
    record: DataType | null;
    onSubmit: () => void;
}

const ProductAction: React.FC<SiteActionProps> = ({action, record, onSubmit,}) => {
    const handleFormSubmit = () => {
        onSubmit();
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                id: record.id,
                name: record.name,
                address: record.address,
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
            <Form.Item label="序号" name="id">
                <Input placeholder={'请输入站点序号'} disabled={isCheckMode || isEditMode}/>
            </Form.Item>
            <Form.Item label="站点名" name="name">
                <Input placeholder={'请输入站点名'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="站点负责人" name="receiver">
                <Input placeholder={'请输入站点负责人'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="站长电话" name="phone">
                <Input placeholder={'请输入站长电话'} disabled={isCheckMode}/>
            </Form.Item>
            <Form.Item label="站点地址" name="address">
                <Input placeholder={'请输入收货地址'} disabled={isCheckMode}/>
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
export default ProductAction;
