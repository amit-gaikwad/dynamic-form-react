import Axios from 'axios';
import {
  FETCH_USERS_BY_SEARCH_STRING_LOADING,
  FETCH_USERS_BY_SEARCH_STRING_SUCCESS,
  FETCH_USERS_BY_SEARCH_STRING_ERROR,
  SEND_CONNECTION_REQUEST_LOADING,
  SEND_CONNECTION_REQUEST_SUCCESS,
  SEND_CONNECTION_REQUEST_ERROR
} from './types';

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
      `http://localhost:8190/mentor/search/user/5f1f0c2b91f3775dd4c991a5/${categories}/${searchStr}`
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
  namesapceId = '5f1f0c2b91f3775dd4c991a5',
  userIdFrom,
  userIdTo,
  notificationAbout
}) => {
  return (dispatch) => {
    dispatch(sendConnectionRequestLoading());
    Axios.post(
      `http://localhost:8107/mentor/notifications/userNotifications/${namesapceId}/${userIdFrom}/${userIdTo}/${notificationAbout}`
    )
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

//GET /mentor/notifications/initiated/{namesapceId}/{userId}

export const getsentConnectionRequest = ({ namesapceId = '5f1f0c2b91f3775dd4c991a5', userId }) => {
  return (dispatch) => {
    dispatch(sendConnectionRequestLoading());
    Axios.get(`http://localhost:8107/mentor/notifications/initiated/${namesapceId}/${userId}`)
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

//POST /mentor/notifications/userNotifications/{namesapceId}/{userIdFrom}/{userIdTo}/{notificationAbout}

//http://localhost:8107/mentor/notifications/userNotifications/5f1f0c2b91f3775dd4c991a5/amol/amit2/Connection
