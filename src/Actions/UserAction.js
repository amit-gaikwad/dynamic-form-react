import Axios from 'axios';
import {
  FETCH_USERS_BY_SEARCH_STRING_LOADING,
  FETCH_USERS_BY_SEARCH_STRING_SUCCESS,
  FETCH_USERS_BY_SEARCH_STRING_ERROR,
  SEND_CONNECTION_REQUEST_LOADING,
  SEND_CONNECTION_REQUEST_SUCCESS,
  SEND_CONNECTION_REQUEST_ERROR,
  SET_BLUR_BACKGROUND
} from './types';
import { fetchUserIdsConnectionsByUserId } from './ConnectionsAction';
import { fetchUserIdsNotificationsByUserId } from './NotificationsAction';

export function fetchUsersBySearchStringLoading() {
  return {
    type: FETCH_USERS_BY_SEARCH_STRING_LOADING
  };
}

export function fetchUsersBySearchStringSuccess(value) {
  return {
    type: FETCH_USERS_BY_SEARCH_STRING_SUCCESS,
    payload: value
  };
}

export function setBlurBackground(value) {
  return {
    type: SET_BLUR_BACKGROUND,
    payload: value
  };
}

export function fetchUsersBySearchStringError(error) {
  return {
    type: FETCH_USERS_BY_SEARCH_STRING_ERROR,
    error
  };
}

export const fetchUsersBySearchString = ({ categories, searchStr }) => {
  return (dispatch) => {
    dispatch(fetchUsersBySearchStringLoading());
    Axios.get(
      `http://localhost:8190/mentor/search/user/5f420797fc99e13c8cf8d145/${categories}/${searchStr}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchUsersBySearchStringSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchUsersBySearchStringError(error));
      });
  };
};

export function sendConnectionRequestLoading() {
  return {
    type: SEND_CONNECTION_REQUEST_LOADING
  };
}

export function sendConnectionRequestSuccess(value) {
  return {
    type: SEND_CONNECTION_REQUEST_SUCCESS,
    payload: value
  };
}
export function sendConnectionRequestError(error) {
  return {
    type: SEND_CONNECTION_REQUEST_ERROR,
    error
  };
}

export const sendConnectionRequest = ({
  namesapceId = '5f420797fc99e13c8cf8d145',
  userIdFrom,
  userIdTo,
  notificationAbout
}) => {
  return (dispatch) => {
    dispatch(sendConnectionRequestLoading());
    Axios.post(
      `http://localhost:8106/mentor/notifications/userNotifications/${namesapceId}/${userIdFrom}/${userIdTo}/${notificationAbout}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(sendConnectionRequestSuccess(res.data));
        dispatch(fetchUserIdsConnectionsByUserId(userIdFrom));
        dispatch(fetchUserIdsNotificationsByUserId(userIdFrom));
        return res;
      })
      .catch((error) => {
        dispatch(sendConnectionRequestError(error));
      });
  };
};

export const getsentConnectionRequest = ({ namesapceId = '5f420797fc99e13c8cf8d145', userId }) => {
  return (dispatch) => {
    dispatch(sendConnectionRequestLoading());
    Axios.get(`http://localhost:8106/mentor/notifications/initiated/${namesapceId}/${userId}`)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(sendConnectionRequestSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(sendConnectionRequestError(error));
      });
  };
};
