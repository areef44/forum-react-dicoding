import { Input, Form, Button, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const { Title } = Typography;

function CommentInput({ addComment, threadId }) {
  const [form] = Form.useForm();

  function handleSubmit(values) {
    if (values.content.trim()) {
      addComment({ threadId, content: values.content });
      form.resetFields();
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      style={{ marginTop: '32px' }}
      onFinish={handleSubmit}
    >
      <Title level={4} style={{ marginTop: '16px' }}>
        Tambah Komentar
      </Title>
      <Form.Item name="content" rules={[{ required: true }]}>
        <Input.TextArea
          rows={4}
          placeholder="Add Comment Here"
          maxLength={300}
          style={{ minHeight: '100px' }}
        />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'right' }}>
        <Button type="primary" htmlType="submit">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
