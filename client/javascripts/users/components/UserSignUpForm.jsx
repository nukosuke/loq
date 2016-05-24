import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions/authenticate-actions'

/**
 * Sign Up form for new user
 */
class UserSignUpForm extends Component {
  render() {
    return (
      <form id='sign-up-form'>
        <input type='text'     ref='name'             placeholder='ID' />
        <input type='text'     ref='email'            placeholder='email address' />
        <input type='password' ref='password'         placeholder='password' />
        <input type='password' ref='password_confirm' placeholder='password again' />
        <button onClick={ e => this.handleClick(e) }>SIGNUP</button>
      </form>
    )
  }

  handleClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    const { name, email, password, password_confirm } = this.refs

    dispatch(signUp(name.value, email.value, password.value, password_confirm.value))
  }
}

UserSignUpForm.propTypes = {
}

UserSignUpForm.defaultProps = {
}

export default connect(
  state => ({
    signup: state.authenticator,
  })
)(UserSignUpForm)
