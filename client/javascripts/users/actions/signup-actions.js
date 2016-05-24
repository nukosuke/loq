/**
 * actions for sign-up
 */
'use strict'
import 'whatwg-fetch'

export const PASSWORD_CONFIRM  = 'PASSWORD_CONFIRM'
export const REQUEST_SIGN_UP   = 'REQUEST_SIGN_UP'
export const RESPONSE_SIGN_UP  = 'RESPONSE_SIGN_UP'

/**
 * action creators
 */
export function passwordConfirmFailure() {
  return {
    type: PASSWORD_CONFIRM,
    error: 'CONFIRM_FAILURE',
  }
}

export function passwordConfirmSuccess() {
  return {
    type: PASSWORD_CONFIRM,
    error: 'CONFIRM_SUCCESS',
  }
}

export function requestSignUp() {
  return {
    type: REQUEST_SIGN_UP,
  }
}

export function responseSignUp(response) {
  return {
    type: RESPONSE_SIGN_UP,
    response
  }
}

/**
 * thunk creators
 * asyncronous request for sign-up
 */
export function signUp(identifier, email, password, password_confirm) {
  return (dispatch) => {
    //TODO:
  }
}
