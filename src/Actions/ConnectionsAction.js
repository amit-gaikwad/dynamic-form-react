import Axios from 'axios';
import {
  FETCH_CONNECTION_BY_USER_ID_LOADING,
  FETCH_CONNECTION_BY_USER_ID_SUCCESS,
  FETCH_CONNECTION_BY_USER_ID_ERROR,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_LOADING,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_SUCCESS,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_ERROR,
  CONNECT_FROM_USER_TO_USER_LOADING,
  CONNECT_FROM_USER_TO_USER_SUCCESS,
  CONNECT_FROM_USER_TO_USER_ERROR
} from './types';
import {
  fetchNotificationsByUserId,
  fetchUserIdsNotificationsByUserId
} from './NotificationsAction';

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
//http://localhost:8107/mentor/connections/userProfiles/5f420797fc99e13c8cf8d145/rohan
export const fetchConnectionsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchConnectionsByUserIdLoading());
    Axios.get(
      `http://localhost:8107/mentor/connections/userProfiles/5f420797fc99e13c8cf8d145/${userId}`
    )
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

export function fetchUserIdsConnectionsByUserIdLoading() {
  return {
    type: FETCH_USER_IDS_CONNECTION_BY_USER_ID_LOADING
  };
}

export function fetchUserIdsConnectionsByUserIdSuccess(value) {
  return {
    type: FETCH_USER_IDS_CONNECTION_BY_USER_ID_SUCCESS,
    payload: value
  };
}
export function fetchUserIdsConnectionsByUserIdError(error) {
  return {
    type: FETCH_USER_IDS_CONNECTION_BY_USER_ID_ERROR,
    error
  };
}
//http://localhost:8107/mentor/connections/userProfiles/5f420797fc99e13c8cf8d145/rohan
export const fetchUserIdsConnectionsByUserId = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserIdsConnectionsByUserIdLoading());
    Axios.get(
      `http://localhost:8107/mentor/connections/retrieve/5f420797fc99e13c8cf8d145/${userId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchUserIdsConnectionsByUserIdSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(fetchUserIdsConnectionsByUserIdError(error));
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
    const tagText = tag ? `/${tag}` : '/connection';
    Axios.post(
      `http://localhost:8107/mentor/connections/connect/5f420797fc99e13c8cf8d145/${fromUserId}/${toUserId}${tagText}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchNotificationsByUserId(fromUserId));
        dispatch(connectFromToUserSuccess(res.data));
        dispatch(fetchUserIdsConnectionsByUserId(fromUserId));
        dispatch(fetchUserIdsNotificationsByUserId(fromUserId));
        return res;
      })
      .catch((error) => {
        dispatch(connectFromToUserError(error));
      });
  };
};

// export function rejectConnectionLoading() {
//   return {
//     type: CONNECT_FROM_USER_TO_USER_LOADING
//   };
// }

// export function rejectConnectionSuccess(value) {
//   return {
//     type: CONNECT_FROM_USER_TO_USER_SUCCESS,
//     payload: value
//   };
// }
// export function rejectConnectionError(error) {
//   return {
//     type: CONNECT_FROM_USER_TO_USER_ERROR,
//     error
//   };
// }

export const rejectConnection = ({ fromUserId, toUserId, tag }) => {
  return (dispatch) => {
    // dispatch(rejectConnectionLoading());
    const tagText = tag ? `/${tag}` : '/connection';
    Axios.post(
      `http://localhost:8107/mentor/connections/reject/5f420797fc99e13c8cf8d145/${fromUserId}/${toUserId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchNotificationsByUserId(fromUserId));
        dispatch(fetchUserIdsConnectionsByUserId(fromUserId));
        dispatch(fetchUserIdsNotificationsByUserId(fromUserId));
        // dispatch(rejectConnectionSuccess(res.data));
        return res;
      })
      .catch((error) => {
        // dispatch(rejectConnectionError(error));
      });
  };
};

export const disconnectConnection = ({ fromUserId, toUserId, tag }) => {
  return (dispatch) => {
    // dispatch(rejectConnectionLoading());
    const tagText = tag ? `/${tag}` : '/connection';
    Axios.post(
      `http://localhost:8107/mentor/connections/disconnect/5f420797fc99e13c8cf8d145/${fromUserId}/${toUserId}${tagText}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchConnectionsByUserId(fromUserId));
        dispatch(fetchUserIdsConnectionsByUserId(fromUserId));
        dispatch(fetchUserIdsNotificationsByUserId(fromUserId));
        // dispatch(rejectConnectionSuccess(res.data));
        return res;
      })
      .catch((error) => {
        // dispatch(rejectConnectionError(error));
      });
  };
};
