import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { useRouterHistory, Router, Route, Redirect, Link } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import UserSignInForm from './components/UserSignInForm'
import UserSignUpForm from './components/UserSignUpForm'
import signInReducer from './reducers/signin-reducer'
import signUpReducer from './reducers/signup-reducer'

/**
 * App for Login and SignUp
 */
class UsersAuthenticateApp extends Component {
  render() {
    return (
      <div id='users-authenticate-app'>
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

/**
 * authenticate page uses sign-in and sign-up actions
 * these reducers return new state as props by `Redux.connect`
 */
const reducer = combineReducers({
  signInReducer,
  signUpReducer,
})

/**
 * create store
 * ReduxThunk is middleware for asyncronous process
 */
const store = createStore(reducer, applyMiddleware(ReduxThunk))

/**
 * `/authenticate` is server side route by Express
 */
const history = useRouterHistory(createHistory)({
  basename: '/authenticate'
})


render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='' to='signin' />
      <Redirect from='/' to='signin' />
      <Route path='/' component={UsersAuthenticateApp}>
        <Route name='signin' path='signin' component={UserSignInForm} />
        <Route name='signup' path='signup' component={UserSignUpForm} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
