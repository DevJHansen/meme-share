import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//reducers
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //   window.__REDUX_DEVTOOLS_EXTENSION__({
    //     trace: true,
    //     traceLimit: 25,
    //   })
  )
);

export default store;
