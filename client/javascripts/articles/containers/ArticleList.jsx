import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../actions/article-list-actions'

class ArticleList extends Component {
  render() {
    const { articles } = this.props;

    return(
      <div id='article-list'>
        <ul>
          { articles.articles.map(article =>
            <li>{ article.title } - <a href={ '/' + article.user.uid }>{ article.user.name }</a></li>
          ) }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchArticles(localStorage.getItem('JWT'), {}));
  }
}

export default connect(
  state => ({
    articles: state.articleListReducer,
  })
)(ArticleList);
