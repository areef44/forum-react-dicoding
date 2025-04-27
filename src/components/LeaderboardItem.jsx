import React from 'react';
import { Avatar, Typography, Flex } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

function LeaderboardItem({
  user, score
}) {
  return (
    <Flex style={{ display: 'flex', justifyContent:'space-between', marginTop:'16px', marginBottom: '16px' }}>
      <Flex style={{ display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px' }}>
        <Avatar size={50} src={user.avatar} />
        <Title level={5}>{user.name}</Title>
      </Flex>
      <Flex style={{ display: 'flex', justifyContent:'center', alignItems: 'center', gap:'16px' }}>
        <Title level={5}>{score}</Title>
      </Flex>
    </Flex>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
