/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the auth user when given by SET_AUTH_USER action
 *  - should return no auth user when given by UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from "vitest";
import authUserReducer from "./reducer";

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the auth user when given by SET_AUTH_USER action", () => {
    // arrange
    const initialState = {};
    const action = {
      type: "SET_AUTH_USER",
      payload: {
        id: "user-1",
        name: "Muhammad Arif",
        email: "example@example.com",
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return no auth user when given by UNSET_AUTH_USER action", () => {
    // arrange
    const initialState = {
      id: "user-1",
      name: "Muhammad Arif",
      email: "example@example.com",
    };
    const action = {
      type: "UNSET_AUTH_USER",
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
