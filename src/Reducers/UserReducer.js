import {
  SEND_CONNECTION_REQUEST_LOADING,
  SEND_CONNECTION_REQUEST_SUCCESS,
  SEND_CONNECTION_REQUEST_ERROR,
  SET_BLUR_BACKGROUND
} from '../Actions/types';

const initialState = {
  sendConnectedUserLoading: false,
  sendConnectedUserError: null,
  sendConnectedUser: [],
  blurBackground: false
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CONNECTION_REQUEST_SUCCESS:
      return {
        ...state,
        sendConnectedUser: action.payload,
        sendConnectedUserLoading: false,
        sendConnectedUserError: null
      };

    case SET_BLUR_BACKGROUND:
      return {
        ...state,
        blurBackground: action.payload
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
