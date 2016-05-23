import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactRouter from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UserSignInForm from './components/UserSignInForm'
import UserSignUpForm from './components/UserSignUpForm'
import reducer from './reducers/authenticate-reducer'

/**
 * App for Login and SignUp
 */
class UserSignApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requesting: false,
      auth: {},
    }
  }

  render() {
    return (
      <div id='authenticate-form'>
        <UserSignInForm />
      </div>
    )
  }
}

const store = createStore(reducer, applyMiddleware(ReduxThunk))

render(
  <Provider store={store}>
    <UserSignApp />
  </Provider>,
  document.getElementById('app')
)
