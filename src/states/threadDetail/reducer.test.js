/**
 * test scenario for threadDetailReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return no threads detail when given by CLEAR_THREAD_DETAIL action
 *  - should return the threads detail with the new comment when given by ADD_COMMENT action
 *  - should return the threads detail with the upvoted comment when given by UPVOTE_COMMENT action
 *  - should return the threads detail with the downvoted comment when given by DOWNVOTE_COMMENT action
 *  - should return the threads detail with the neutral comment when given by NEUTRALVOTE_COMMENT action
 *
 */

import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads detail when given by RECEIVE_THREAD_DETAIL', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'First Example Thread',
          body: 'This is Body First Thread',
          category: 'Example',
          createdAt: '2025-05-13T09:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'Muhammad Arif',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'this is first comment',
              createdAt: '2025-05-13T09:10:00.000Z',
              owner: {
                id: 'users-1',
                name: 'Muhammad Arif',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return no threads detail when given by CLEAR_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'First Example Thread',
    };
    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the threads detail with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'First Example Thread',
      body: 'This is Body First Thread',
      category: 'Example',
      createdAt: '2025-05-13T09:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'Muhammad Arif',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'this is first comment',
          createdAt: '2025-05-13T09:10:00.000Z',
          owner: {
            id: 'users-1',
            name: 'Muhammad Arif',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment],
    });
  });

  it('should return the threads detail with the upvoted comment when given by UPVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'First Example Thread',
      body: 'This is Body First Thread',
      category: 'Example',
      createdAt: '2025-05-13T09:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'Muhammad Arif',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'UPVOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('users-2');
  });

  it('should return the threads detail with the downvoted comment when given by DOWNVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'First Example Thread',
      body: 'This is Body First Thread',
      category: 'Example',
      createdAt: '2025-05-13T09:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'Muhammad Arif',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].downVotesBy).toContain('users-2');
  });

  it('should return the threads detail with the neutral comment when given by NEUTRALVOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'First Example Thread',
      body: 'This is Body First Thread',
      category: 'Example',
      createdAt: '2025-05-13T09:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'Muhammad Arif',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment',
          upVotesBy: ['users-2'],
          downVotesBy: ['users-3'],
        },
      ],
    };
    const neutralUpVoteActionComment = {
      type: 'NEUTRALVOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const neutralDownVoteActionComment = {
      type: 'NEUTRALVOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    // action neutral upvote comment
    const nextStateNeutralUpVotesComment = threadDetailReducer(
      initialState,
      neutralUpVoteActionComment
    );

    // action neutral downvote comment
    const nextStateNeutralDownVotesComment = threadDetailReducer(
      initialState,
      neutralDownVoteActionComment
    );

    // assert
    expect(nextStateNeutralUpVotesComment.comments[0].upVotesBy).not.toContain(
      'users-2'
    );
    expect(
      nextStateNeutralDownVotesComment.comments[0].downVotesBy
    ).not.toContain('users-3');
  });
});
