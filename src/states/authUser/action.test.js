/**
 * skenario test
 *
 * - authUser thunk
 *  - should dispatch action correctly when asyncSetAuthUser success
 *  - should dispatch action and call alert correctly when asyncSetAuthUser failed
 *  - should dispatch unsetAuthUser and clear token when asyncUnSetAuthUser is called
 *
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnSetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeUserPayload = {
  id: 'user-1',
  name: 'Muhammad Arif',
  email: 'example@example.com',
};

const fakeToken = 'fake-access-token';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('authUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
  });

  it('should dispatch action correctly when asyncSetAuthUser success', async () => {
    // arrange
    const fakeLoginData = { email: 'example@example.com', password: '123456' };
    api.login = vi.fn(() => Promise.resolve(fakeToken));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUserPayload));

    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(fakeLoginData)(dispatch);

    // assert
    expect(api.login).toHaveBeenCalledWith(fakeLoginData);
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeUserPayload)
    );
  });

  it('should dispatch action and call alert correctly when asyncSetAuthUser failed', async () => {
    // arrange
    const fakeLoginData = { email: 'example@example.com', password: '123456' };
    api.login = vi.fn(() => Promise.reject(fakeErrorResponse));
    window.alert = vi.fn();

    const dispatch = vi.fn();

    await asyncSetAuthUser(fakeLoginData)(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch unsetAuthUser and clear token when asyncUnSetAuthUser is called', async () => {
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    asyncUnSetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
