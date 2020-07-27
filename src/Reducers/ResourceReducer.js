import {
  FETCH_RESOURCES_BY_NAMESPACE_SUCCESS,
  FETCH_RESOURCES_BY_NAMESPACE_ERROR,
  FETCH_RESOURCES_BY_NAMESPACE_LOADING,
} from "../Actions/types";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export const resource = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_BY_NAMESPACE_SUCCESS:
      return {
        ...initialState,
        data: action.payload,
      };

    case FETCH_RESOURCES_BY_NAMESPACE_LOADING:
      return {
        ...initialState,
        loading: true,
      };

    case FETCH_RESOURCES_BY_NAMESPACE_ERROR:
      return {
        ...initialState,
        error: action.error,
      };

    default:
      return state;
  }
};
