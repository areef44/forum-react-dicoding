import React from 'react';
import { Layout, Typography, Flex, Card } from 'antd';
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import HeaderNavbar from '../components/Header';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
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
              Login
            </Title>

            <Title level={5} style={{ textAlign: 'left' }}>
              Login To Access Your Forum
            </Title>

            <LoginInput login={onLogin} />

            <Text>
              Don&apos;t have an account? <Link to="/register">Register</Link>
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

export default LoginPage;
