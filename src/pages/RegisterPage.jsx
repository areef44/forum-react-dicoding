import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { Layout, Typography, Flex, Card } from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../states/users/action";

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({name, email, password}))
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#1677ff", height: "80px" }}>
        <Title
          align="left"
          justify="center"
          style={{ color: "white", paddingTop: "16px", paddingBottom: "16px" }}
        >
          Forum Dicoding
        </Title>
      </Header>
      <Content>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{ minHeight: "80vh", padding: "24px" }}
        >
          <Card style={{ width: 600 }}>
            <Title level={2} style={{ textAlign: "left" }}>
              Create Account
            </Title>

            <Title level={5} style={{ textAlign: "left" }}>
              Join With Our Forum
            </Title>

            <RegisterInput register={onRegister} />

            <Text>
              already have an account? <Link to="/">Login</Link>
            </Text>
          </Card>
        </Flex>
      </Content>

      <Footer style={{ textAlign: "center", backgroundColor: "#1677ff" }}>
        <Title level={5} style={{ color: "white" }}>
          Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
  );
}

export default RegisterPage;
