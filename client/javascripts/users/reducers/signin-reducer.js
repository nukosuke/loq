/**
 * reducers/auth.js
 * auth reducer
 */
'use strict';

import {
  REQUEST_SIGN_IN,
  RESPONSE_SIGN_IN,
  REQUEST_SIGN_OUT,
  RESPONSE_SIGN_OUT
} from '../actions/authenticate-actions'


const initialState = {
  requesting: false,
  JWT: (localStorage.getItem('JWT') || ''),
  signedin_as: {
    uid:  '',
    name: '',
  },
}

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return Object.assign({}, state, {
        requesting: true,
      })

    case RESPONSE_SIGN_IN:
      return Object.assign({}, state, {
        requesting: false,
        JWT: action.response.JWT,
      })
      //TODO: failure時の処理

    case REQUEST_SIGN_OUT:
      return Object.assign({}, state, {
        requesting: true,
      })

    case RESPONSE_SIGN_OUT:
      return Object.assign({}, state, {
        requesting: false,
        JWT: '',
      })

    default:
      return state
  }
}
