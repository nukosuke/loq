import React       from 'react'
import ReactDOM    from 'react-dom'
import ReactRouter from 'react-router'

/**
 * App for Login and SignUp
 */
class UserSignApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <p>this is login page</p>
      </div>
    );
  }
}

ReactDOM.render(<UserSignApp/>, document.getElementById('app'));
