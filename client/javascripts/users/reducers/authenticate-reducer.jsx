/**
 * reducers/auth.js
 * auth reducer
 */
'use strict';

import { combineReducers } from 'redux'
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/authenticate-actions'

const initialState = {
  JWT: '',
  signedin_as: {
    uid:  '',
    name: '',
  },
};

function authenticator(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {

      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        JWT: '',
        signedin_as: {
          uid: '',
          name: '',
        },
      });
    case SIGN_UP:
      return Object.assign({}, state, {

      });
    default:
      return state;
  }
};

const authenticateReducer = combineReducers({
  authenticator,
});

export default authenticateReducer;
