import React, { useEffect } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndDetailThread } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/action';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import {
  asyncAddCommentDetailThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../states/threadDetail/action';
import Loading from '../components/Loading';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
    users = [],
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndDetailThread(id));
  }, [id, dispatch]);

  const onAddComment = ({ threadId, content }) => {
    dispatch(asyncAddCommentDetailThread({ threadId, content }));
  };

  const onUpVote = (id) => {
    const isThreadUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    if (isThreadUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = (id) => {
    const isThreadDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (isThreadDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  if (!threadDetail || !threadDetail.owner) {
    return <Loading />;
  }

  const owner = users.find((user) => user.id === threadDetail.owner.id);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card style={{ marginTop: '16px' }}>
            <ThreadDetail
              {...threadDetail}
              authUser={authUser.id}
              user={owner}
              upVoteBy={onUpVote}
              downVoteBy={onDownVote}
            />
            <CommentInput threadId={id} addComment={onAddComment} />
            <CommentList
              {...threadDetail}
              authUser={authUser}
              onUpVote={(commentId) =>
                dispatch(
                  asyncUpVoteComment({ threadId: threadDetail.id, commentId })
                )
              }
              onDownVote={(commentId) =>
                dispatch(
                  asyncDownVoteComment({ threadId: threadDetail.id, commentId })
                )
              }
              onNeutralVote={(commentId) =>
                dispatch(
                  asyncNeutralVoteComment({
                    threadId: threadDetail.id,
                    commentId,
                  })
                )
              }
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default DetailPage;
