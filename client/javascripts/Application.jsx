import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'

/**
 * reducers
 */
import signInReducer   from './reducers/signin-reducer'
import signUpReducer   from './reducers/signup-reducer'
import userListReducer from './reducers/user-list-reducer'
import { userProfileReducer, userFollowReducer } from './reducers/user-profile-reducer'
import articleListReducer from './reducers/article-list-reducer'

/**
 * components
 */
import UserSignInForm     from './components/UserSignInForm'
import UserSignUpForm     from './components/UserSignUpForm'
import UserSignUpSentMail from './components/UserSignUpSentMail'
import UserList           from './containers/UserList'
import UserProfile        from './components/UserProfile'
import ArticleList        from './containers/ArticleList'

/**
 * root component
 */
class Application extends Component {
  render() {
    return (
    <div id='root'>
      { this.props.children }
    </div>
  );
  }
}

/**
 * combine all reducers
 */
const reducer = combineReducers({
  signInReducer,
  signUpReducer,
  userListReducer,
  userProfileReducer,
  userFollowReducer,
  articleListReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

Application = connect(
  state => ({
    users: state.userListReducer
  })
)(Application);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Application}>
        <IndexRoute name='portal' component={ArticleList} />

        <Route name='signin'   path='signin'   component={UserSignInForm} />
        <Route name='signup'   path='signup'   component={UserSignUpForm} />
        <Route name='sentmail' path='sentmail' component={UserSignUpSentMail} />

        <Route path='users/' component={UserList} />
        <Route path=':uid' component={UserProfile}>
          <Route path='/following' />
          <Route path='/followers' />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
