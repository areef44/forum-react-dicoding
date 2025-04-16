import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads, upVoteBy, downVoteBy }) {
  return (
    <div className="talks-list">
      {
        threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} upVotesBy={upVoteBy} downVoteBy={downVoteBy} />
        ))
      }
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVoteBy: PropTypes.func.isRequired,
  downVoteBy: PropTypes.func.isRequired,
};

export default ThreadsList;
