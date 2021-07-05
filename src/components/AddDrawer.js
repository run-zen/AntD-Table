import React from "react";
import { Drawer, Form, Input, InputNumber, Button } from "antd";
const { TextArea } = Input;

export default function AddDrawer({ onClose, visible, onSubmit }) {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        // form.resetFields();
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Drawer
            title="Add New Row"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={500}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={(values) => onFinish(values)}
                onFinishFailed={onFinishFailed}
                labelAlign="left"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: "Please input your age!",
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your address!",
                        },
                    ]}
                >
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button
                        htmlType="button"
                        onClick={onReset}
                        style={{ marginLeft: "8px" }}
                    >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}
