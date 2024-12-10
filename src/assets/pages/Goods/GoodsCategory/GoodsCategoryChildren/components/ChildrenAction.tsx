import React, {useEffect} from 'react';
import {Button, Form, Input} from 'antd';

interface DataType {
    key: React.Key;
    parentName: string | null;
    name: string;
}

interface EditFormProps {
    action: 'add' | 'edit';
    record: DataType | null;
    onSubmit: (updatedRecord: DataType) => void; // 修改提交函数，传递更新后的记录
}

const ChildrenAction: React.FC<EditFormProps> = ({action, record, onSubmit}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                parentName: record.parentName,
                name: record.name,
            });
        } else {
            form.resetFields();
        }
    }, [record, form]);

    // 提交表单，传递更新的数据到父组件
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit({
                    ...values,
                    key: record ? record.key : `${Date.now()}`, // 新增时生成一个唯一key
                });
            })
            .catch((errorInfo) => {
                console.log('Failed:', errorInfo);
            });
    };

    return (
        <Form
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            form={form}
            style={{maxWidth: 600}}
        >
            <Form.Item label="父分类名" name="parentName">
                <Input disabled/>
            </Form.Item>

            <Form.Item label="子分类名" name="name">
                <Input placeholder="请输入子分类名"/>
            </Form.Item>

            <Form.Item label="操作">
                <Button type="primary" onClick={handleSubmit}>
                    {action === 'add' ? '添加' : '修改'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChildrenAction;
