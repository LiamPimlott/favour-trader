import React, {Component} from 'react';
import Post from './components/Post.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
    this.fetch = this.fetch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetch (subreddit) {
    return fetch('https://www.reddit.com/r/' + subreddit + '.json')
    .then(res =>  {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(json => json.data.children)
    .catch(err => this.setState({
      error: true,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const subreddit = e.target.elements.subreddit.value.trim();

    if (!subreddit) {
      Promise.resolve([]).then(posts => this.setState({ posts }))
      return;
    }

    this.fetch(subreddit)
    .then(posts => this.setState({
      posts,
      error: false,
    }))
    .catch(err => console.error(err));
  }

  render() {
    const { posts = [] } = this.state;
    return (
      <div className='App'>
        <p className={'TitleText'}>RedditGrabber</p>
        <form onSubmit={this.handleSubmit}>
          <input name='subreddit' type='text' placeholder='Enter subreddit...' />
        </form>
        {posts.length ? (
          <ol className='Posts'>
            {posts.map((post, i) => (
              <li key={i}>
                <Post post={post} />
              </li>
            ))}
          </ol>
        ) : <h2>No subreddit posts found :(</h2>}
      </div>
    );
  }
}

export default App;