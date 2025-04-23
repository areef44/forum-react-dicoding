import React from "react";
import { Avatar, Typography, Flex } from "antd";

const { Title } = Typography;

function LeaderboardItem() {
  return (
      <Flex style={{display: 'flex', justifyContent:'space-between'}}>
        <Flex style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px'}}>
          <Avatar size={50}/>
          <Title level={5}>Bang Walid</Title>
        </Flex>
        <Flex style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px'}}>
          <Title level={5}>185</Title>
        </Flex>
      </Flex>
  );
}

export default LeaderboardItem;
