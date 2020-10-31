import Axios from 'axios';
import {
  CREATE_POST_LOADING,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  EDIT_POST_LOADING,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR
} from './types';
import { fetchUserIdsConnectionsByUserId } from './ConnectionsAction';
import { fetchUserIdsNotificationsByUserId } from './NotificationsAction';

export function createPostLoading() {
  return {
    type: CREATE_POST_LOADING
  };
}

export function createPostSuccess(value) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: value
  };
}

export function createPostError(error) {
  return {
    type: CREATE_POST_ERROR,
    error
  };
}
//http://localhost:8190/mentor/search/user/n/u/si/ss

export const createPost = (postResource) => {
  return (dispatch) => {
    dispatch(createPostLoading());
    Axios.post(`http://localhost:8111/mentor/resources/addAttribute`, postResource)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(createPostSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(createPostError(error));
      });
  };
};

export function editPostLoading() {
  return {
    type: EDIT_POST_LOADING
  };
}

export function editPostSuccess(value) {
  return {
    type: EDIT_POST_SUCCESS,
    payload: value
  };
}

export function editPostError(error) {
  return {
    type: EDIT_POST_ERROR,
    error
  };
}
//http://localhost:8190/mentor/search/user/n/u/si/ss

export const editPost = (postResource) => {
  return (dispatch) => {
    dispatch(editPostLoading());
    return Axios.post(
      `http://localhost:8111//mentor/resources/operationsOnResourceAttribute`,
      postResource
    )
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(editPostSuccess(res.data));
        return res;
      })
      .catch((error) => {
        dispatch(editPostError(error));
      });
  };
};
