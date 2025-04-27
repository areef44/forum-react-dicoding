import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';


function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Form layout="vertical" style={{ marginTop: 24 }}>
      <Form.Item label="Name" name="name">
        <Input value={name} onChange={onNameChange} placeholder="Input Name" />
      </Form.Item>
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
        <Button type="primary" onClick={() => register({ name, email, password })} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
