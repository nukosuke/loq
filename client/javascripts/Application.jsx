import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Redirect } from 'react-router'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import ReduxThunk from 'redux-thunk'

/**
 * reducers
 */
import userListReducer from './reducers/user-list-reducer'
import { userProfileReducer, userFollowReducer } from './reducers/user-profile-reducer'

/**
 * components
 */
import UserList from './containers/UserList'
import UserProfile from './components/UserProfile'

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
  userListReducer,
  userProfileReducer,
  userFollowReducer,
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
