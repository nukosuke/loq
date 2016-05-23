/**
 * reducers/auth.js
 * auth reducer
 */
'use strict';

import { combineReducers } from 'redux'
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

function authenticator(state = initialState, action) {
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

    case REQUEST_SIGN_OUT:
      return Object.assign({}, state, {
        requesting: true,
      })

    case RESPONSE_SIGN_OUT:
      return Object.assign({}, state, {
        requesting: false,
        auth: action.response,
      })

    default:
      return state
  }
}

/*
export function userCreator(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SIGN_UP:
      return Object.assign({}, state, {
        requesting: true
      })

    case RESPONSE_SIGN_UP:
      return Object.assign({}, state, {
        requesting: false,
      })

    default:
      return state
  }
}
*/

const authenticateReducer = combineReducers({
  authenticator,
  //userCreator,
})

export default authenticateReducer
