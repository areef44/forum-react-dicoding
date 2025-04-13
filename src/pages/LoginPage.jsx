import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography, Form, Input, Button, Flex, Card } from 'antd';
import { Header } from 'antd/es/layout/layout';
import LoginInput from '../components/LoginInput';

const { Footer } = Layout;
const { Title } = Typography;

function LoginPage() {
  const dispatch = null; // @TODO: get dispatch function from store

  const onLogin = ({ id, password }) => {
    // @TODO: dispatch async action to login
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Header style={{ backgroundColor: '#1677ff', height: '80px'}}>
         <Title align="left"
          justify="center" style={{color: 'white', paddingTop: '16px', paddingBottom:'16px'}}>
            Forum Dicoding
         </Title>
      </Header>

     <LoginInput login={onLogin} />

      <Footer style={{ textAlign: 'center', backgroundColor: '#1677ff'}}>
        <Title level={5} style={{color:'white'}}>
            Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
  );
}

export default LoginPage;