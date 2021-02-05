import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("meme-sahre token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  userId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.id,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("meme-sahre token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("meme-sahre token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null,
        userId: null,
      };

    default:
      return state;
  }
}
