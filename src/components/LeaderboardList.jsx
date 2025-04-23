import React from "react";
import LeaderboardItem from "./LeaderboardItem";
import { Row, Col, Card, Typography, Flex, Avatar } from "antd";

const { Title } = Typography;

function LeaderboardList() {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Title level={4}>Klasemen Pengguna</Title>
          <Flex style={{ display: "flex", justifyContent: "space-between", marginTop: '16px', marginBottom: '16px' }}>
            <Flex
              style={{ display: "flex", justifyContent: "center", gap: "16px" }}
            >
              <Title level={5}>Pengguna</Title>
            </Flex>
            <Flex>
              <Title level={5}>Skor</Title>
            </Flex>
          </Flex>
          <LeaderboardItem />
        </Card>
      </Col>
    </Row>
  );
}

export default LeaderboardList;
