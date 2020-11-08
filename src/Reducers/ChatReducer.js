import {
  GET_ONE_TO_ONE_CHAT_HISTORY_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_ERROR,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_ERROR
} from '../Actions/types';

const initialState = {
  oneToOneChatHistoryByUserIdLoading: false,
  oneToOneChatHistoryByUserIdError: null,
  oneToOneChatHistoryByUserId: [],
  oneToOneChatHistoryBetweenTwoUsersLoading: false,
  oneToOneChatHistoryBetweenTwoUsersError: null,
  oneToOneChatHistoryBetweenTwoUsers: []
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

    case GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_SUCCESS:
      return {
        ...state,
        oneToOneChatHistoryBetweenTwoUsers: action.payload,
        oneToOneChatHistoryBetweenTwoUsersLoading: false,
        oneToOneChatHistoryBetweenTwoUsersError: null
      };

    case GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_LOADING:
      return {
        ...state,
        oneToOneChatHistoryBetweenTwoUsersLoading: true,
        oneToOneChatHistoryBetweenTwoUsersError: null
      };

    case GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_ERROR:
      return {
        ...state,
        oneToOneChatHistoryBetweenTwoUsersError: action.error,
        oneToOneChatHistoryBetweenTwoUsersLoading: false
      };

    default:
      return state;
  }
};
