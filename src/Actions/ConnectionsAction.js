import Axios from 'axios';
import {
  FETCH_CONNECTION_BY_USER_ID_LOADING,
  FETCH_CONNECTION_BY_USER_ID_SUCCESS,
  FETCH_CONNECTION_BY_USER_ID_ERROR,
  CONNECT_FROM_USER_TO_USER_LOADING,
  CONNECT_FROM_USER_TO_USER_SUCCESS,
  CONNECT_FROM_USER_TO_USER_ERROR
} from './types';

export function fetchConnectionsByUserIdLoading() {
  return {
    type: FETCH_CONNECTION_BY_USER_ID_LOADING
  };
}

export function fetchConnectionsByUserIdSuccess(value) {
  return {
    type: FETCH_CONNECTION_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchConnectionsByUserIdError(error) {
  return {
    type: FETCH_CONNECTION_BY_USER_ID_ERROR,
    error
  };
}

export const fetchConnectionsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchConnectionsByUserIdLoading());
    Axios.get(`http://localhost:8107/mentor/connections/connect/5f1f0c2b91f3775dd4c991a5/${userId}`)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchConnectionsByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchConnectionsByUserIdError(error));
      });
  };
};

export function connectFromToUserLoading() {
  return {
    type: CONNECT_FROM_USER_TO_USER_LOADING
  };
}

export function connectFromToUserSuccess(value) {
  return {
    type: CONNECT_FROM_USER_TO_USER_SUCCESS,
    payload: value
  };
}
export function connectFromToUserError(error) {
  return {
    type: CONNECT_FROM_USER_TO_USER_ERROR,
    error
  };
}

export const connectFromToUser = ({ fromUserId, toUserId, tag }) => {
  return (dispatch) => {
    dispatch(connectFromToUserLoading());
    const tagText = tag ? `/${tag}` : '';
    Axios.post(
      `http://localhost:8107/mentor/connections/connect/5f1f0c2b91f3775dd4c991a5/${fromUserId}/${toUserId}${tagText}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(connectFromToUserSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(connectFromToUserError(error));
      });
  };
};
