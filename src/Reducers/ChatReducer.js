import {
  GET_ONE_TO_ONE_CHAT_HISTORY_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_ERROR
} from '../Actions/types';

const initialState = {
  oneToOneChatHistoryByUserIdLoading: false,
  oneToOneChatHistoryByUserIdError: null,
  oneToOneChatHistoryByUserId: []
};
export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        oneToOneChatHistoryByUserId: action.payload,
        oneToOneChatHistoryByUserIdLoading: false,
        oneToOneChatHistoryByUserIdError: null
      };

    case GET_ONE_TO_ONE_CHAT_HISTORY_LOADING:
      return {
        ...state,
        oneToOneChatHistoryByUserIdLoading: true,
        oneToOneChatHistoryByUserIdError: null
      };

    case GET_ONE_TO_ONE_CHAT_HISTORY_ERROR:
      return {
        ...state,
        oneToOneChatHistoryByUserIdError: action.error,
        oneToOneChatHistoryByUserIdLoading: false
      };

    default:
      return state;
  }
};
