import {
  FETCH_NOTIFICATION_BY_USER_ID_LOADING,
  FETCH_NOTIFICATION_BY_USER_ID_SUCCESS,
  FETCH_NOTIFICATION_BY_USER_ID_ERROR
} from '../Actions/types';

const initialState = {
  notificationsByUserIdLoading: false,
  notificationsByUserIdError: null,
  notificationsByUserId: []
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
