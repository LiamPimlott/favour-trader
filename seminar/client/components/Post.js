import React, {Component} from 'react';

class Post extends Component {
    render() {
        const mapRedditPost = post => post.data;

        const { permalink, title } = mapRedditPost(this.props.post);
        return (
          <div className='Post'>
            <a className={'link'} href={`https://www.reddit.com${permalink}`} target='_blank'>{title}</a>
          </div>
        );
      }
}

export default Post;