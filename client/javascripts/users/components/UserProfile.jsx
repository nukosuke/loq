import React from 'react'
import { connect } from 'react-redux'
import { userProfileReducer, userFollowReducer } from '../reducers/user-profile-reducer'
import { fetchUserProfile } from '../actions/user-profile-actions'

class UserProfile extends React.Component {
  render() {
    const { id, uid, name, family_name, given_name, bio, avatar, url, articles } = this.props.profile;

    return (
      <div class='user-profile'>
        <ul>
          <li>{ avatar }</li>
          <li>{ name }</li>
          <li>@{ uid }</li>
          <li>{ [family_name,given_name].join(' ') }</li>
          <li>{ bio }</li>
          <li><a class='url' href='{ url }' title='url'>{ url }</a></li>
        </ul>

        <ul>
          { articles.map(article =>
              <li key={ article.id }>{ article.title }</li>
            ) }
        </ul>

        <button>follow</button>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { uid }      = this.props.params;
    dispatch(fetchUserProfile(uid));
  }
}
export default connect(
  state => ({
    profile: state.userProfileReducer,
    follow: state.userFollowReducer,
  })
)(UserProfile);
