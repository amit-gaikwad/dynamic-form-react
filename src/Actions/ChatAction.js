import Axios from 'axios';
import {
  GET_ONE_TO_ONE_CHAT_HISTORY_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_ERROR,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_ERROR
} from './types';

export function getOneToOneChatHistoryLoading() {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_LOADING
  };
}

export function getOneToOneChatHistorySuccess(value) {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS,
    payload: value
  };
}

export function getOneToOneChatHistoryError(error) {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_ERROR,
    error
  };
}

export const getOneToOneChatHistoryByUserId = (userId) => {
  return (dispatch) => {
    dispatch(getOneToOneChatHistoryLoading());
    Axios.get(`http://localhost:8110/chat/retrieve/oneToOneChatHistory/${userId}`)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(getOneToOneChatHistorySuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(getOneToOneChatHistoryError(error));
      });
  };
};

export function getOneToOneChatHistoryBetweenTwoUsersLoading() {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_LOADING
  };
}

export function getOneToOneChatHistoryBetweenTwoUsersSuccess(value) {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_SUCCESS,
    payload: value
  };
}

export function getOneToOneChatHistoryBetweenTwoUsersError(error) {
  return {
    type: GET_ONE_TO_ONE_CHAT_HISTORY_BETWEEN_TWO_USERS_ERROR,
    error
  };
}

export const getOneToOneChatHistoryBetweenTwoUsers = (userId, uniqueId) => {
  return (dispatch) => {
    dispatch(getOneToOneChatHistoryBetweenTwoUsersLoading());
    return Axios.get(
      `http://localhost:8110/chat/retrieve/oneToOneChatHistory/${userId}/${uniqueId}`
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(getOneToOneChatHistoryBetweenTwoUsersSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(getOneToOneChatHistoryBetweenTwoUsersError(error));
      });
  };
};
