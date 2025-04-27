import api from '../../utils/api';
import { receiveThreadDetailActionCreator } from '../threadDetail/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveLeaderboardsActionCreator } from '../leaderboards/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}


function asyncPopulateUsersAndDetailThread(id) {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const detailThread = await api.getThreadDetail(id);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getAllLeaderboards();

      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersAndThreads, asyncPopulateUsersAndDetailThread, asyncPopulateLeaderboards };