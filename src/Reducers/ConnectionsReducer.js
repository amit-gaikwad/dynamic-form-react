import {
  SEND_CONNECTION_REQUEST_LOADING,
  SEND_CONNECTION_REQUEST_SUCCESS,
  SEND_CONNECTION_REQUEST_ERROR,
  FETCH_CONNECTION_BY_USER_ID_LOADING,
  FETCH_CONNECTION_BY_USER_ID_SUCCESS,
  FETCH_CONNECTION_BY_USER_ID_ERROR,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_LOADING,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_SUCCESS,
  FETCH_USER_IDS_CONNECTION_BY_USER_ID_ERROR
} from '../Actions/types';

const initialState = {
  sendConnectedUserLoading: false,
  sendConnectedUserError: null,
  sendConnectedUser: [],
  connectionsByUserIdLoading: false,
  connectionsByUserIdError: null,
  connectionsByUserId: [],
  userIdsconnectionsByUserIdLoading: false,
  userIdsconnectionsByUserIdError: null,
  userIdsconnectionsByUserId: []
};
export const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONNECTION_BY_USER_ID_SUCCESS:
      return {
        ...state,
        connectionsByUserId: action.payload,
        connectionsByUserIdLoading: false,
        connectionsByUserIdError: null
      };

    case FETCH_CONNECTION_BY_USER_ID_LOADING:
      return {
        ...state,
        connectionsByUserIdLoading: true,
        connectionsByUserIdError: null
      };

    case FETCH_USER_IDS_CONNECTION_BY_USER_ID_ERROR:
      return {
        ...state,
        userIdsconnectionsByUserIdError: action.error,
        userIdsconnectionsByUserIdLoading: false
      };

    case FETCH_USER_IDS_CONNECTION_BY_USER_ID_SUCCESS:
      return {
        ...state,
        userIdsconnectionsByUserId: action.payload,
        userIdsconnectionsByUserIdLoading: false,
        userIdsconnectionsByUserIdError: null
      };

    case FETCH_USER_IDS_CONNECTION_BY_USER_ID_LOADING:
      return {
        ...state,
        userIdsconnectionsByUserIdLoading: true,
        userIdsconnectionsByUserIdError: null
      };

    case FETCH_CONNECTION_BY_USER_ID_ERROR:
      return {
        ...state,
        connectionsByUserIdError: action.error,
        connectionsByUserIdLoading: false
      };
    case SEND_CONNECTION_REQUEST_SUCCESS:
      return {
        ...state,
        sendConnectedUser: action.payload,
        sendConnectedUserLoading: false,
        sendConnectedUserError: null
      };

    case SEND_CONNECTION_REQUEST_LOADING:
      return {
        ...state,
        sendConnectedUserLoading: true,
        sendConnectedUserError: null
      };

    case SEND_CONNECTION_REQUEST_ERROR:
      return {
        ...state,
        sendConnectedUserError: action.error,
        sendConnectedUserLoading: false
      };
    default:
      return state;
  }
};
