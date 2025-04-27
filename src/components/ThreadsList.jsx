import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';
import { Row, Col } from 'antd';

function ThreadsList({ threads, upVoteBy, downVoteBy }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            upVoteBy={upVoteBy}
            downVoteBy={downVoteBy}
          />
        ))}
      </Col>
    </Row>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVoteBy: PropTypes.func.isRequired,
  downVoteBy: PropTypes.func.isRequired,
};

export default ThreadsList;
