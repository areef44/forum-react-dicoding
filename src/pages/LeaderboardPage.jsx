import React, { useEffect } from "react";
import { Layout, Typography } from "antd";
import LeaderboardList from "../components/LeaderboardList";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateLeaderboards } from "../states/shared/action";

const { Footer } = Layout;
const { Title } = Typography;

function LeaderboardPage() {
  const {
    leaderboards = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  },[dispatch]);

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <div style={{ flexGrow: 1 }}>
        <LeaderboardList leaderboards={leaderboards} />
      </div>
      <Footer style={{ textAlign: "center", backgroundColor: "#1677ff" }}>
        <Title level={5} style={{ color: "white" }}>
          Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
  );
}

export default LeaderboardPage;
