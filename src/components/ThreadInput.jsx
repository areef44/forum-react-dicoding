import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Input, Form, Button } from "antd";

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [form] = Form.useForm();

  function handleSubmit(values) {
    console.log(values);
    if (
      values.title.trim() &&
      values.category.trim() &&
      values.content.trim()
    ) {
      addThread({
        title: values.title,
        category: values.category,
        body: values.content,
      });
      form.resetFields();
    }
  }

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          style={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}
          title={
            <h2 style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>
              Create New Thread
            </h2>
          }
        >
          <Form
            layout="vertical"
            form={form}
            style={{ marginTop: 12 }}
            onFinish={handleSubmit}
          >
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input size="large" placeholder="Insert Title" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder="Insert Category" />
            </Form.Item>
            <Form.Item label="Content" name="content" rules={[{ required: true }]}>
              <Input.TextArea
                rows={4}
                placeholder="Insert content"
                maxLength={300}
                style={{ minHeight: "100px" }}
              />
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "right" }}>
              <Button type="primary" htmlType="submit">
                Create New Thread
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
