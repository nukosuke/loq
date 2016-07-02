import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn } from '../actions/signin-actions'

class UserSignInForm extends Component {
  render() {
    const { signin } = this.props

    return (
      <div id='user-sign-in-form'>
        <Link to='/signup'>sign up</Link>
        <form id='sign-in-form'>
          <input type='text'     ref='identifier' placeholder='ID or email' />
          <input type='password' ref='password'   placeholder='password' />
          <button onClick={ e => this.handleClick(e) }>LOGIN</button>
        </form>
      </div>
    )
  }

  handleClick(e) {
    let { dispatch } = this.props

    e.preventDefault()
    const identifierNode = this.refs.identifier
    const passwordNode   = this.refs.password
    const identifier = identifierNode.value.trim()
    const password   = passwordNode.value

    dispatch(signIn(identifier, password))

    identifierNode.value = ''
    passwordNode.value   = ''
  }
}

/*TODO:
UserSignInForm.propTypes = {
}

UserSignInForm.defaultProps = {
}
*/

export default connect(
  state => ({
    signin: state.signInReducer,
  })
)(UserSignInForm)
