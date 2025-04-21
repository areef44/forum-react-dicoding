import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  ADD_COMMENT: "ADD_COMMENT",
  UPVOTE_COMMENT: "UPVOTE_COMMENT",
  DOWNVOTE_COMMENT: "DOWNVOTE_COMMENT",
  NEUTRALVOTE_COMMENT: "NEUTRALVOTE_COMMENT"
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({threadId, commentId, userId}) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId
    }
  }
}

function downVoteCommentActionCreator({threadId, commentId, userId}) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId
    }
  }
}

function neutralVoteCommentActionCreator({threadId, commentId, userId}) {
  return {
    type: ActionType.NEUTRALVOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId
    }
  }
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
        const threadDetail = await api.getThreadDetail(threadId);
        dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
        alert(error.message)
    }
  };
}

function asyncAddCommentDetailThread({threadId, content}) {
  return async (dispatch) => {
    try {
      const comment = await api.addComment(threadId, content);
      dispatch(addCommentActionCreator(comment))
    } catch (error) {
      alert(error.message)
    }
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      await api.upVoteComment(threadId, commentId);
      dispatch(upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      await api.downVoteComment(threadId, commentId);
      dispatch(downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    try {
      await api.neutralVoteComment(threadId, commentId);
      dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
    ActionType,
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    upVoteCommentActionCreator,
    downVoteCommentActionCreator,
    neutralVoteCommentActionCreator,
    asyncReceiveThreadDetail,
    asyncAddCommentDetailThread,
    asyncUpVoteComment,
    asyncDownVoteComment,
    asyncNeutralVoteComment
}
