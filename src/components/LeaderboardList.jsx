import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import { Row, Col, Card, Typography, Flex } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

function LeaderboardList({ leaderboards }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card style={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
          <Title level={4}>Klasemen Pengguna Aktif</Title>
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              marginBottom: '16px',
            }}
          >
            <Flex
              style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
            >
              <Title level={5}>Pengguna</Title>
            </Flex>
            <Flex>
              <Title level={5}>Skor</Title>
            </Flex>
          </Flex>
          {leaderboards.map((leaderboard) => (
            <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
          ))}
        </Card>
      </Col>
    </Row>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderboardList;
