import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Form layout="vertical" style={{ marginTop: 24 }}>
      <Form.Item label="Email" name="email">
        <Input value={email} onChange={onEmailChange} placeholder="Input Email" />
      </Form.Item>

      <Form.Item label="Password" name="password">
        <Input.Password
          value={password}
          onChange={onPasswordChange}
          placeholder="Input Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={() => login({ email, password })} block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
