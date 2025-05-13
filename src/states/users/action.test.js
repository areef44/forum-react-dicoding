/**
 * skenario test
 *
 * - users thunk
 *  - should dispatch action correctly when asyncRegisterUser success
 *  - should dispatch action and call alert correctly when asyncRegisterUser failed
 *  
 */

import { afterEach, beforeEach, describe, it, vi,expect } from "vitest";
import api from "../../utils/api";
import { asyncRegisterUser } from "./action";

const fakeUserPayload = {
    name: 'Muhammad Arif',
    email: 'example@example.com',
    password: '123456',
}

const fakeErrorResponse = new Error("Ups, something went wrong");

describe('users thunk', () => {
    beforeEach(() => {
        api._register = api.register
    })

    afterEach(() => {
        api.register = api._register
        delete api._register;
    })

    it('should dispatch action correctly when asyncRegisterUser success', async () => {
        // arrange
        api.register = vi.fn(() => Promise.resolve())

        const dispatch = vi.fn();

        // action
        await asyncRegisterUser(fakeUserPayload)(dispatch);

        // assert
        expect(api.register).toHaveBeenCalledWith(fakeUserPayload);
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('should dispatch action and call alert correctly when asyncRegisterUser failed', async () => {
        // arrange
        api.register = vi.fn(() => Promise.reject(fakeErrorResponse))

        const dispatch = vi.fn();

        window.alert = vi.fn();

        // action
        await asyncRegisterUser(fakeUserPayload)(dispatch);

        // assert
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
})