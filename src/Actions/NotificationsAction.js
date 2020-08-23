import Axios from 'axios';
import {
  FETCH_NOTIFICATION_BY_USER_ID_LOADING,
  FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
  FETCH_NOTIFICATION_BY_USER_ID_ERROR,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_LOADING,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_SUCCESS,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_ERROR
} from './types';

export function fetchNotificationsByUserIdLoading() {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_LOADING
  };
}

export function fetchNotificationsByUserIdSuccess(value) {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchNotificationsByUserIdError(error) {
  return {
    type: FETCH_NOTIFICATION_BY_USER_ID_ERROR,
    error
  };
}

//http://localhost:8106/mentor/notifications/connection/requests/5f1f0c2b91f3775dd4c991a5/suraj
export const fetchNotificationsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchNotificationsByUserIdLoading());
    Axios.get(
      `http://localhost:8106/mentor/notifications/connection/requests/5f1f0c2b91f3775dd4c991a5/${userId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchNotificationsByUserIdSuccess(res.data)); //res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchNotificationsByUserIdError(error));
      });
  };
};

export function fetchUserIdsNotificationsByUserIdLoading() {
  return {
    type: FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_LOADING
  };
}

export function fetchUserIdsNotificationsByUserIdSuccess(value) {
  return {
    type: FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchUserIdsNotificationsByUserIdError(error) {
  return {
    type: FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_ERROR,
    error
  };
}

export const fetchUserIdsNotificationsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserIdsNotificationsByUserIdLoading());
    Axios.get(
      `http://localhost:8106/mentor/notifications/requests/5f1f0c2b91f3775dd4c991a5/${userId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchUserIdsNotificationsByUserIdSuccess(res.data)); //res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchUserIdsNotificationsByUserIdError(error));
      });
  };
};
