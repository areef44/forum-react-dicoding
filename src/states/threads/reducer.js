import { ActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
              ...thread,
              upVotesBy: [...thread.upVotesBy, action.payload.userId],
              downVotesBy: thread.downVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : thread
      );
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) =>
        thread.id === action.payload.threadId
          ? {
              ...thread,
              downVotesBy: [...thread.downVotesBy, action.payload.userId],
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== action.payload.userId
              ),
            }
          : thread
      );
    case ActionType.NEUTRAL_VOTE_THREAD:
        return threads.map((thread) => 
        thread.id === action.payload.threadId
        ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
                (id) => id !== action.payload.userId
            ),
            downVotesBy: thread.downVotesBy.filter(
                (id) => id !== action.payload.userId
            ),
        }
        : thread
        )
    default:
      return threads;
  }
}

export default threadsReducer;
