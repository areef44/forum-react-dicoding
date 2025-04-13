import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';
import { Layout, Typography, Form, Input, Button, Flex, Card } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

function LoginInput({ login }) {
  const [id, onIdChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Content>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ minHeight: '80vh', padding: '24px' }}
      >
        <Card style={{ width: 400 }}>
          <Title level={2} style={{ textAlign: 'left' }}>
            Login
          </Title>

          <Title level={5} style={{ textAlign: 'left' }}>
            Login To Access Your Forum
          </Title>

          <Form layout="vertical" style={{ marginTop: 24 }}>
            <Form.Item label="Username" name="id">
              <Input value={id} onChange={onIdChange} placeholder="Input Username" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                value={password}
                onChange={onPasswordChange}
                placeholder="Input Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={() => login({ id, password })} block>
                Login
              </Button>
            </Form.Item>
          </Form>

          <Text>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </Text>
        </Card>
      </Flex>
    </Content>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
