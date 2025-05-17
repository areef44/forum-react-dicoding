/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new threads when given by ADD_THREADS action
 *  - should return the threads with the upvoted threads when given by UPVOTE_THREAD action
 *  - should return the threads with the downvoted threads when given by DOWNVOTE_THREAD action
 *  - should return the threads with the neutral threads when given by NEUTRAL_VOTE_THREAD action
 *
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'First Example Thread',
            body: 'This is Body First Thread',
            category: 'Example',
            createdAt: '2025-05-13T09:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Example Thread',
        body: 'This is Body First Thread',
        category: 'Example',
        createdAt: '2025-05-13T09:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: [
          {
            id: 'thread-2',
            title: 'First Example New Thread',
            body: 'This is Body First New Thread',
            category: 'Example New',
            createdAt: '2025-05-13T10:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the upvoted threads when given by UPVOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Example Thread',
        body: 'This is Body First Thread',
        category: 'Example',
        createdAt: '2025-05-13T09:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    // action
    const action = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the downvoted threads when given by DOWNVOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Example Thread',
        body: 'This is Body First Thread',
        category: 'Example',
        createdAt: '2025-05-13T09:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the neutralvoted threads when given by NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Example Thread',
        body: 'This is Body First Thread',
        category: 'Example',
        createdAt: '2025-05-13T09:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: ['users-3'],
        totalComments: 0,
      },
    ];

    const actionNeutralUpVotes = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const actionNeutralDownVotes = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };

    // action neutral upvotes
    const nextStateNeutralUpVotes = threadsReducer(
      initialState,
      actionNeutralUpVotes
    );

    // assert neutral upvotes
    expect(nextStateNeutralUpVotes).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      },
    ]);

    // action neutral downvotes
    const nextStateNeutralDownVotes = threadsReducer(
      initialState,
      actionNeutralDownVotes
    );

    // assert neutral downvotes
    expect(nextStateNeutralDownVotes).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      },
    ]);
  });
});
