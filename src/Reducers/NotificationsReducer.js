import {
  FETCH_NOTIFICATION_BY_USER_ID_LOADING,
  FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
  FETCH_NOTIFICATION_BY_USER_ID_ERROR,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_LOADING,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_SUCCESS,
  FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_ERROR
} from '../Actions/types';

const initialState = {
  notificationsByUserIdLoading: false,
  notificationsByUserIdError: null,
  notificationsByUserId: [],
  userIdsnotificationsByUserIdLoading: false,
  userIdsnotificationsByUserIdError: null,
  userIdsnotificationsByUserId: []
};
export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_BY_USER_ID_SUCCESS:
      return {
        ...state,
        notificationsByUserId: action.payload,
        notificationsByUserIdLoading: false,
        notificationsByUserIdError: null
      };

    case FETCH_NOTIFICATION_BY_USER_ID_LOADING:
      return {
        ...state,
        notificationsByUserIdLoading: true,
        notificationsByUserIdError: null
      };

    case FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_ERROR:
      return {
        ...state,
        userIdsnotificationsByUserIdError: action.error,
        userIdsnotificationsByUserIdLoading: false
      };
    case FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        userIdsnotificationsByUserId: action.payload,
        userIdsnotificationsByUserIdLoading: false,
        userIdsnotificationsByUserIdError: null
      };

    case FETCH_USERIDS_NOTIFICATIONS_BY_USER_ID_LOADING:
      return {
        ...state,
        userIdsnotificationsByUserIdLoading: true,
        userIdsnotificationsByUserIdError: null
      };

    case FETCH_NOTIFICATION_BY_USER_ID_ERROR:
      return {
        ...state,
        notificationsByUserIdError: action.error,
        notificationsByUserIdLoading: false
      };
    default:
      return state;
  }
};
