import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UPVOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const isAlreadyUpvoted = comment.upVotesBy.includes(userId);
          return {
            ...comment,
            upVotesBy: isAlreadyUpvoted
              ? comment.upVotesBy.filter((id) => id !== userId)
              : [...comment.upVotesBy, userId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  case ActionType.DOWNVOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const isAlreadyDownvoted = comment.downVotesBy.includes(userId);
          return {
            ...comment,
            downVotesBy: isAlreadyDownvoted
              ? comment.downVotesBy.filter((id) => id !== userId)
              : [...comment.downVotesBy, userId],
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  case ActionType.NEUTRALVOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
