import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { useRouterHistory, Router, Route, Redirect, Link } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UserSignInForm from './components/UserSignInForm'
import UserSignUpForm from './components/UserSignUpForm'
import signInReducer from './reducers/signin-reducer'
import signUpReducer from './reducers/signup-reducer'

/**
 * App for Login and SignUp
 */
class UserSignApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='user-sign-app'>
        <ul>
          <li><Link to='/signin'>sign in</Link></li>
          <li><Link to='/signup'>sign up</Link></li>
        </ul>
        <div id='authenticate-form'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const reducer = combineReducers({
  signInReducer,
  signUpReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk))

const history = useRouterHistory(createHistory)({
  basename: '/authenticate'
})

render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='' to='signin' />
      <Redirect from='/' to='signin' />
      <Route path='/' component={UserSignApp}>
        <Route name='signin' path='signin' component={UserSignInForm} />
        <Route name='signup' path='signup' component={UserSignUpForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
