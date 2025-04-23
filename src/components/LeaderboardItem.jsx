import React from "react";
import { Avatar, Typography, Flex } from "antd";

const { Title } = Typography;

function LeaderboardItem({
  user, score
}) {
  return (
      <Flex style={{display: 'flex', justifyContent:'space-between', marginTop:'16px', marginBottom: '16px'}}>
        <Flex style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px'}}>
          <Avatar size={50} src={user.avatar} />
          <Title level={5}>{user.name}</Title>
        </Flex>
        <Flex style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px'}}>
          <Title level={5}>{score}</Title>
        </Flex>
      </Flex>
  );
}

export default LeaderboardItem;
