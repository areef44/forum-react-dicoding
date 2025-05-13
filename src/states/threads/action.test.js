/**
 * skenario test
 *
 * - threads thunk
 *  - should dispatch action when asyncAddThreads success
 *  - should dispatch action and call alert correctly when asyncAddThreads failed
 *  - should dispatch action when asyncUpVoteThread success
 *  - should dispatch action and call alert correctly when asyncUpVoteThread failed
 *  - should dispatch action when asyncDownVoteThread success
 *  - should dispatch action and call alert correctly when asyncDownVoteThread failed
 *  - should dispatch action when asyncNeutralVoteThread success
 *  - should dispatch action and call alert correctly when asyncNeutralVoteThread failed
 *  -
 */

import { afterEach, beforeEach, describe, it, vi, expect } from "vitest";
import api from "../../utils/api";
import { asyncAddThread, addThreadActionCreator, asyncUpVoteThread, upVoteThreadActionCreator, asyncDownVoteThread, downVoteThreadActionCreator, asyncNeutralVoteThread, neutralVoteThreadActionCreator } from "./action";
const fakeThreadsResponse = {
  id: "thread-1",
  title: "First Example Thread",
  body: "This is Body First Thread",
  category: "Example",
  createdAt: "2025-05-13T09:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeNewThreadsPayload = {
  title: "First New Example Thread",
  body: "This is New Body First Thread",
  category: "Example New",
};

const fakeThreadId = "thread-1";
const fakeUser = { id: 'users-1' }

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("threads thunk", () => {
  beforeEach(() => {
    api._addThread = api.addThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
  });

  afterEach(() => {
    api.addThread = api._addThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;
  });

  it("should dispatch action when asyncAddThread success", async () => {
    // arrange
    // stub implementation
    api.addThread = vi.fn(() => Promise.resolve(fakeThreadsResponse));

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeNewThreadsPayload)(dispatch);

    // assert
    expect(api.addThread).toHaveBeenCalledWith(fakeNewThreadsPayload);
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(fakeThreadsResponse)
    );
  });

  it('should dispatch action and call alert correctly when asyncAddThreads failed', async () => {
    // arrange
    // stub implementation
    api.addThread = vi.fn(() => Promise.reject(fakeErrorResponse));

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncAddThread(fakeNewThreadsPayload)(dispatch)

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  })

  it('should dispatch action when asyncUpVoteThread success', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.upVoteThread = vi.fn(() => Promise.resolve())

    // action
    await asyncUpVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.upVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
  })

  it('should dispatch action and call alert correctly when asyncUpVoteThread failed', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.upVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse))
    window.alert = vi.fn();

    // action
    await asyncUpVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.upVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })

  it('should dispatch action when asyncDownVoteThread success', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.downVoteThread = vi.fn(() => Promise.resolve())

    // action
    await asyncDownVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.downVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
  })

  it('should dispatch action and call alert correctly when asyncDownVoteThread failed', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.downVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse))
    window.alert = vi.fn();

    // action
    await asyncDownVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.downVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(downVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })

  it('should dispatch action when asyncNeutralVoteThread success', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.neutralVoteThread = vi.fn(() => Promise.resolve())

    // action
    await asyncNeutralVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.neutralVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
  })

  it('should dispatch action and call alert correctly when asyncNeutralVoteThread failed', async () => {
    // arrange
    const fakeUserId = fakeUser.id;
   
    const dispatch = vi.fn();

    const getState = vi.fn(() => ({
        authUser: fakeUser,
    }))

    api.neutralVoteThread = vi.fn(() => Promise.reject(fakeErrorResponse))
    window.alert = vi.fn();

    // action
    await asyncNeutralVoteThread(fakeThreadId)(dispatch,getState);

    expect(api.neutralVoteThread).toHaveBeenCalledWith(fakeThreadId);
    expect(dispatch).toHaveBeenCalledWith(neutralVoteThreadActionCreator({ threadId: fakeThreadId, userId: fakeUserId}))
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
  })
});
