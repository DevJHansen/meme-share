import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

import { APIURL } from "../config/vars";

export const login = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token;

  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${APIURL}auth/me`, config)
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data.data,
          id: res.data.data._id,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  }
};
