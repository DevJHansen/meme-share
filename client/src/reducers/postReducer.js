import {
  GET_MY_POSTS,
  GET_POSTS,
  GET_POST,
  LOAD_MORE_POSTS,
  LOADING_MORE_POSTS,
  LOADING_MY_POSTS,
  GET_COMMENTS,
} from "../actions/types";

const initialState = {
  myPosts: [],
  posts: [],
  post: null,
  page: 2,
  loadingPosts: false,
  loadingMyPosts: false,
  comments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      };
    case LOADING_MY_POSTS:
      return {
        ...state,
        loadingMyPosts: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LOADING_MORE_POSTS:
      return {
        ...state,
        loadingPosts: action.payload,
      };
    case LOAD_MORE_POSTS:
      return {
        ...state,
        posts: action.payload,
        page: action.page,
        loadingPosts: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
}
