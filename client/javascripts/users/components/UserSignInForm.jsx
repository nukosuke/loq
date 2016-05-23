import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn } from '../actions/authenticate-actions'

class UserSignInForm extends Component {
  render() {
    const { auth } = this.props

    return (
      <div id='user-sign-in-form'>
        <form id='sign-in-form'>
          <input type='text'     ref='identifier' placeholder='ID or email' />
          <input type='password' ref='password'   placeholder='password' />
          <button onClick={e => this.handleClick(e)}>LOGIN</button>
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
    auth: state.authenticator,
  })
)(UserSignInForm)
