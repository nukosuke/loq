import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signin } from '../actions/authenticate-actions'

class UserSignInForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form id='sign-in-form'>
        <input type='text'     ref='identifier' placeholder='ID or email' />
        <input type='password' ref='password'   placeholder='password' />
        <button onClick={e => this.handleClick(e)}>LOGIN</button>
      </form>
    )
  }

  handleClick(e) {
    let { dispatch } = this.props

    e.preventDefault()
    const identifierNode = this.refs.identifier
    const passwordNode   = this.refs.password
    const identifier = identifierNode.value.trim()
    const password   = passwordNode.value

    dispatch(signin(identifier, password))

    identifierNode.value = ''
    passwordNode.value   = ''
  }
}

UserSignInForm.propTypes = {
}

UserSignInForm.defaultProps = {
}

export default connect(
  state => ({
    JWT: state.JWT,
    signedin_as: state.signedin_as,
  })
)(UserSignInForm)
