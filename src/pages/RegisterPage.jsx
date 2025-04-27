import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { Layout, Typography, Flex, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import HeaderNavbar from '../components/Header';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderNavbar />
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ minHeight: '80vh', padding: '24px' }}
        >
          <Card style={{ width: 600 }}>
            <Title level={2} style={{ textAlign: 'left' }}>
              Create Account
            </Title>

            <Title level={5} style={{ textAlign: 'left' }}>
              Join With Our Forum
            </Title>

            <RegisterInput register={onRegister} />

            <Text>
              already have an account? <Link to="/">Login</Link>
            </Text>
          </Card>
        </Flex>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#1677ff' }}>
        <Title level={5} style={{ color: 'white' }}>
          Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
  );
}

export default RegisterPage;
