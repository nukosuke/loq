'use strict'

import { combineReducers } from 'redux'
import {
  PASSWORD_CONFIRM,
  REQUEST_SIGN_UP,
  RESPONSE_SIGN_UP
} from '../actions/signup-actions'

const initialState = {
  JWT: (localStorage.getItem('JWT') || '')
}

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case PASSWORD_CONFIRM:
      return Object.assign({}, state, {

      })

    case REQUEST_SIGN_UP:
      return Object.assign({}, state, {

      })

    case RESPONSE_SIGN_UP:
      return Object.assign({}, state, {
        JWT: action.response.JWT
      })

    default:
      return state
  }
}
