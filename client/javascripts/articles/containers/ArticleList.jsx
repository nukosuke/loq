import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../actions/article-list-actions'

class ArticleList extends Component {
  render() {
    const { articles } = this.props;

    return(
      <div id='article-list'>
        <ul>
          { articles.articles.map(article => {
              const date = new Date(article.published_at);
              return (
                <li><a href={ '/' + article.user.uid + '/articles/' + date.getFullYear() + '/' + date.getMonth()+1 + '/' + date.getDate() + '/' + article.slug }>{ article.title }</a> - <a href={ '/' + article.user.uid }>{ article.user.name }</a></li>
              );
            }
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
