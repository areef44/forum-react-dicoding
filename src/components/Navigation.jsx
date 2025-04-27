import React from 'react';
import { Layout, Menu, Button, Typography, Flex } from 'antd';
import {
  LogoutOutlined,
  GoldOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Header } = Layout;
const { Title } = Typography;

function Navigation({ authUser, signOut }) {
  const location = useLocation();

  return (
    <Header
      style={{
        backgroundColor: '#1677ff',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
      }}
    >
      <div style={{ flex: 1 }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Forum Dicoding
        </Title>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{
          flex: 2,
          justifyContent: 'center',
          background: 'transparent',
          borderBottom: 'none',
        }}
      >
        <Menu.Item
          key="/"
          icon={<WechatOutlined style={{ fontSize: '18px', color: 'white' }} />}
        >
          <Link to="/" style={{ color: 'white' }}>
            Threads
          </Link>
        </Menu.Item>
        <Menu.Item
          key="/leaderboards"
          icon={<GoldOutlined style={{ fontSize: '18px', color: 'white' }} />}
        >
          <Link to="/leaderboards" style={{ color: 'white' }}>
            Leaderboard
          </Link>
        </Menu.Item>
      </Menu>

      <Flex
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Title
          level={5}
          style={{
            color: 'white',
            margin: 0,
            lineHeight: 'inherit',
          }}
        >
          Hello, {authUser.name}
        </Title>
        <Button
          type="default"
          danger
          icon={<LogoutOutlined />}
          onClick={signOut}
        >
          Logout
        </Button>
      </Flex>
    </Header>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
