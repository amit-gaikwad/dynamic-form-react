import Axios from 'axios';
import {
  GET_ONE_TO_ONE_CHAT_HISTORY_LOADING,
  GET_ONE_TO_ONE_CHAT_HISTORY_SUCCESS,
  GET_ONE_TO_ONE_CHAT_HISTORY_ERROR
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
    console.log('oneToOneChatHistory -->>', userId);
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
