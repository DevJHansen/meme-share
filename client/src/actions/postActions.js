import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  GET_MY_POSTS,
  GET_POSTS,
  GET_POST,
  LOAD_MORE_POSTS,
  LOADING_MORE_POSTS,
  LOADING_MY_POSTS,
  GET_COMMENTS,
} from "./types";

import { APIURL } from "../config/vars";

export const getPost = (postId) => (dispatch) => {
  axios
    .get(`${APIURL}posts/${postId}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getMyPosts = () => (dispatch, getState) => {
  const user = getState().auth.user;
  if (user) {
    dispatch({
      type: LOADING_MY_POSTS,
      payload: true,
    });
    axios
      .get(`${APIURL}posts?user=${user._id}`)
      .then((res) => {
        dispatch({
          type: GET_MY_POSTS,
          payload: res.data.data,
        });
        dispatch({
          type: LOADING_MY_POSTS,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOADING_MY_POSTS,
          payload: false,
        });
      });
  }
};

export const getPosts = (category) => (dispatch) => {
  dispatch({
    type: GET_POSTS,
    payload: [],
  });
  if (category) {
    axios
      .get(`${APIURL}posts?category=${category}`)
      .then((res) => {
        dispatch({
          type: GET_POSTS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  } else {
    axios
      .get(`${APIURL}posts`)
      .then((res) => {
        dispatch({
          type: GET_POSTS,
          payload: res.data.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

export const loadMorePosts = (category) => (dispatch, getState) => {
  const posts = getState().posts.posts;
  const page = getState().posts.page;
  dispatch({
    type: LOADING_MORE_POSTS,
    payload: true,
  });
  if (category) {
    axios
      .get(`${APIURL}posts?category=${category}&page=${page + 1}`)
      .then((res) => {
        const newPosts = [...posts, ...res.data.data];
        dispatch({
          type: LOAD_MORE_POSTS,
          payload: newPosts,
          page: page + 1,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOADING_MORE_POSTS,
          payload: false,
        });
      });
  } else {
    axios
      .get(`${APIURL}posts?&page=${page}`)
      .then((res) => {
        const newPosts = [...posts, ...res.data.data];
        dispatch({
          type: LOAD_MORE_POSTS,
          payload: newPosts,
          page: page + 1,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: LOADING_MORE_POSTS,
          payload: false,
        });
      });
  }
};

export const upVote = (post) => async (dispatch, getState) => {
  const user = getState().auth;
  const posts = getState().posts.posts;

  const upVote = await axios.post(`${APIURL}votes/upvotepost`, {
    post: post._id,
    user: user.user._id,
  });

  if (upVote.data.success) {
    let newPosts = [];
    posts.forEach((post) => {
      if (post._id !== upVote.data.data._id) {
        newPosts.push(post);
      } else {
        const updatedPost = {
          category: post.category,
          upVotes: upVote.data.data.upVotes,
          downVotes: upVote.data.data.downVotes,
          _id: post._id,
          title: post.title,
          content: post.content,
          user: post.user,
          createdAt: post.createdAt,
          __v: post.__v,
          comments: post.comments,
          id: post._id,
        };
        newPosts.push(updatedPost);
      }
    });
    dispatch({
      type: GET_POSTS,
      payload: newPosts,
    });
  } else {
    // remove up vote with put request
    const removedUpVote = await axios.put(`${APIURL}votes/upvotepost`, {
      post: post._id,
      user: user.user._id,
    });

    if (removedUpVote.data.success) {
      let newPosts = [];
      posts.forEach((post) => {
        if (post._id !== removedUpVote.data.data._id) {
          newPosts.push(post);
        } else {
          const updatedPost = {
            category: post.category,
            upVotes: removedUpVote.data.data.upVotes,
            downVotes: removedUpVote.data.data.downVotes,
            _id: post._id,
            title: post.title,
            content: post.content,
            user: post.user,
            createdAt: post.createdAt,
            __v: post.__v,
            comments: post.comments,
            id: post._id,
          };
          newPosts.push(updatedPost);
        }
      });
      dispatch({
        type: GET_POSTS,
        payload: newPosts,
      });
    }
  }
};

export const downVote = (post) => async (dispatch, getState) => {
  const user = getState().auth;
  const posts = getState().posts.posts;

  const downVote = await axios.post(`${APIURL}votes/downvotepost`, {
    post: post._id,
    user: user.user._id,
  });

  if (downVote.data.success) {
    let newPosts = [];
    posts.forEach((post) => {
      if (post._id !== downVote.data.data._id) {
        newPosts.push(post);
      } else {
        const updatedPost = {
          category: post.category,
          upVotes: downVote.data.data.upVotes,
          downVotes: downVote.data.data.downVotes,
          _id: post._id,
          title: post.title,
          content: post.content,
          user: post.user,
          createdAt: post.createdAt,
          __v: post.__v,
          comments: post.comments,
          id: post._id,
        };
        newPosts.push(updatedPost);
      }
    });
    dispatch({
      type: GET_POSTS,
      payload: newPosts,
    });
  } else {
    const removedDownVote = await axios.put(`${APIURL}votes/downvotepost`, {
      post: post._id,
      user: user.user._id,
    });

    if (removedDownVote.data.success) {
      let newPosts = [];
      posts.forEach((post) => {
        if (post._id !== removedDownVote.data.data._id) {
          newPosts.push(post);
        } else {
          const updatedPost = {
            category: post.category,
            upVotes: removedDownVote.data.data.upVotes,
            downVotes: removedDownVote.data.data.downVotes,
            _id: post._id,
            title: post.title,
            content: post.content,
            user: post.user,
            createdAt: post.createdAt,
            __v: post.__v,
            comments: post.comments,
            id: post._id,
          };
          newPosts.push(updatedPost);
        }
      });
      dispatch({
        type: GET_POSTS,
        payload: newPosts,
      });
    }
  }
};

export const postPageUpVote = (post) => async (dispatch, getState) => {
  const user = getState().auth;
  const post = getState().posts.post;

  const upVote = await axios.post(`${APIURL}votes/upvotepost`, {
    post: post._id,
    user: user.user._id,
  });

  if (upVote.data.success) {
    dispatch({
      type: GET_POST,
      payload: upVote.data.data,
    });
  } else {
    // remove up vote with put request
    const removedUpVote = await axios.put(`${APIURL}votes/upvotepost`, {
      post: post._id,
      user: user.user._id,
    });

    if (removedUpVote.data.success) {
      dispatch({
        type: GET_POST,
        payload: removedUpVote.data.data,
      });
    }
  }
};

export const postPageDownVote = (post) => async (dispatch, getState) => {
  const user = getState().auth;
  const post = getState().posts.post;

  const downVote = await axios.post(`${APIURL}votes/downvotepost`, {
    post: post._id,
    user: user.user._id,
  });

  if (downVote.data.success) {
    dispatch({
      type: GET_POST,
      payload: downVote.data.data,
    });
  } else {
    // remove up vote with put request
    const removedDownVote = await axios.put(`${APIURL}votes/downvotepost`, {
      post: post._id,
      user: user.user._id,
    });

    if (removedDownVote.data.success) {
      dispatch({
        type: GET_POST,
        payload: removedDownVote.data.data,
      });
    }
  }
};

export const getComments = (postId) => (dispatch) => {
  axios
    .get(`${APIURL}posts/${postId}/comments`)
    .then((res) => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteComment = (commentId) => (dispatch, getState) => {
  const comments = getState().posts.comments;
  let newComments = [];
  comments.forEach((comment) => {
    if (comment._id.toString() !== commentId) {
      newComments.push(comment);
    }
  });
  dispatch({
    type: GET_COMMENTS,
    payload: newComments,
  });
};

export const deletePost = (postId) => (dispatch, getState) => {
  const myPosts = getState().posts.myPosts;
  let newPosts = [];
  myPosts.forEach((post) => {
    if (post._id.toString() !== postId) {
      newPosts.push(post);
    }
  });
  dispatch({
    type: GET_MY_POSTS,
    payload: newPosts,
  });
};
