import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import api from "../../utils/api";
import {
  asyncPopulateLeaderboards,
  asyncPopulateUsersAndDetailThread,
  asyncPopulateUsersAndThreads,
} from "./action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadDetailActionCreator } from "../threadDetail/action";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";

const fakeUsersResponse = [
  {
    id: "arif_123",
    name: "Muhammad Arif",
    email: "example@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeThreadsResponse = [
  {
    id: "thread-1",
    title: "First Example Thread",
    body: "This is Body First Thread",
    category: "Example",
    createdAt: "2025-05-13T09:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeThreadDetailResponse = {
  id: "thread-1",
  title: "First Example Thread",
  body: "This is Body First Thread",
  category: "Example",
  createdAt: "2025-05-13T09:00:00.000Z",
  owner: {
    id: "users-1",
    name: "Muhammad Arif",
    avatar: "https://generated-avatar.com",
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeLeaderboardsResponse = {
  user: {
    id: "users-1",
    name: "Muhammad Arif",
    email: "example@example.com",
    avatar: "https://generated-image-url.jpg",
  },
  score: 10,
};

const fakeErrorResponse = new Error("Ups, something went wrong");

/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it("should dispatch action correctly when data fetching success"),
    async () => {
      // arrange
      // stub implementation
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

      // mock dispatch
      const dispatch = vi.fn();

      // action
      await asyncPopulateUsersAndThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        receiveUsersActionCreator(fakeUsersResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(
        receiveThreadsActionCreator(fakeThreadsResponse)
      );
    };

  it(
    "should dispatch action and call alert correctly when data fetching failed"
  ),
    async () => {
      // arrange
      // stub implementation
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

      // mock dispatch
      const dispatch = vi.fn();

      // mock alert
      window.alert = vi.fn();

      // action
      await asyncPopulateUsersAndThreads()(dispatch);

      // assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    };
});

/**
 * skenario test
 *
 * - asyncPopulateUsersAndDetailThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

describe("asyncPopulateUsersAndDetailThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getThreadDetail = api._getThreadDetail;

    // delete backup data
    delete api._getAllUsers;
    delete api._getThreadDetail;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndDetailThread("thread-1")(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetailResponse)
    );
  });

  it(
    "should dispatch action and call alert correctly when data fetching failed"
  ),
    async () => {
      // arrange
      // stub implementation
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

      // mock dispatch
      const dispatch = vi.fn();

      // mock alert
      window.alert = vi.fn();

      // action
      await asyncPopulateUsersAndThreads()(dispatch);

      // assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    };
});

/**
 * skenario test
 *
 * - asyncPopulateLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

describe("asyncPopulateLeaderboards thunk", () => {
  beforeEach(() => {
    api._getAllLeaderboards = api.getAllLeaderboards;
  });

  afterEach(() => {
    api.getAllLeaderboards = api._getAllLeaderboards;
    delete api._getAllLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
  });

  it(
    "should dispatch action and call alert correctly when data fetching failed"
  ),
    async () => {
      // arrange
      // stub implementation
      api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

      // mock dispatch
      const dispatch = vi.fn();

      // mock alert
      window.alert = vi.fn();

      // action
      await asyncPopulateLeaderboards()(dispatch);

      // assert
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    };
});
