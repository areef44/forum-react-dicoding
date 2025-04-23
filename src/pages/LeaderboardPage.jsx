import React from "react";
import { Layout,Typography,Flex } from "antd";
import LeaderboardList from "../components/LeaderboardList";

const { Footer } = Layout;
const { Title } = Typography

function LeaderboardPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <LeaderboardList />
      <Footer style={{ textAlign: "center", backgroundColor: "#1677ff" }}>
        <Title level={5} style={{ color: "white" }}>
          Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
  );
}

export default LeaderboardPage;
