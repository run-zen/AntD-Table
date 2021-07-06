import React from "react";
import { Drawer, Form, Input, InputNumber, Button, Row, Col } from "antd";
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
        <Row>
            <Col lg={{ span: 10, offset: 14 }}>
                <Drawer
                    title="Add New Row"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    visible={visible}
                    width={"40%"}
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
                        layout="vertical"
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
                            <Input placeholder={"name"} />
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
                            <InputNumber placeholder={"age"} />
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
                            <TextArea rows={2} placeholder={"address"} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
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
            </Col>
        </Row>
    );
}
