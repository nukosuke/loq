/**
 * authenticate actions
 */
'use strict';

export const SIGN_IN  = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_UP  = 'SIGN_UP'

export function signin(identifier, password) {
  return {
    type: SIGN_IN,
    identifier,
    password,
  }
}

export function signout() {
  return {
    type: SIGN_OUT,
  }
}

export function signup() {
  return {
    type: SIGN_UP,
  }
}
