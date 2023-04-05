import React, { useState, useEffect } from 'react';
import ZenQuotes from './ZenQuotes.jsx';
import axios from 'axios';
import Chat from './Chat/Chat.jsx';
import PostForm from './Chat/PostForm.jsx';
import { PostButton } from './Styled.jsx';

const Feed = () => {
  const [feed, setFeed] = useState([{ post: 'Loading...' }]);
  const [users, setUsers] = useState([{ name: 'X' }]);
  const [userPost, setUserPost] = useState([]);
  const [submitPost, setSubmitPost] = useState('');
  const [newPost, setNewPost] = useState(false);

  // Grab the posts made by a user
  const renderFeed = () => {
    axios.get('/users/feed')
      .then(({ data }) => {
        setFeed(data);
      })
      .catch((err) => {
        console.error('Failed to meet request:', err);
      });
  };

  // Post Form Creator
  const makePostFormAppear = () => {
    const chat = document.getElementById('chat-post');
    const post = document.getElementById('post-box');
    const postButton = document.getElementById('post-button');
    const submitButton = document.getElementById('submit-button');

    chat.style.display = 'none';
    postButton.style.display = 'none';
    submitButton.style.display = '';
    post.style.display = 'block';
  };

  const submitNewPost = (post) => {
    axios.post('/user/post', { post: post })
      .then(() => {
        console.log('ding!');
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  // Makes the posts from all users seen again
  const makePostsReappear = () => {
    const chat = document.getElementById('chat-post');
    const post = document.getElementById('post-box');
    const postButton = document.getElementById('post-button');
    const submitButton = document.getElementById('submit-button');

    submitNewPost(submitPost);
    setNewPost(true);

    chat.style.display = 'block';
    submitButton.style.display = 'none';
    postButton.style.display = '';
    post.style.display = 'none';
  };

  // Renders the post to state
  useEffect(() => {
    renderFeed();
    setNewPost(false);
  }, [newPost]);

  // Renders the users to state after posts
  useEffect(() => {
    axios.get('/users/username')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [feed]);

  // Renders a user to a post after the user populates
  useEffect(() => {
    const userPostArr = [];
    let userObj = {};
    feed.forEach(message => {
      users.forEach(user => {
        const userId = message.user_id;
        if (userId === user.user_id) {
          userObj.user = user.name;
          userObj.post = message.post;
          userPostArr.push(userObj);
          userObj = {};
        } else if (!userId && !user.user_id) {
          userObj.user = user.name;
          userObj.post = message.post;
          userPostArr.push(userObj);
          userObj = {};
        }
      });
    });
    setUserPost(userPostArr);
  }, [users]);

  return (
    <div style={{
      display: 'grid',
      'grid-template-columns': '1fr 1fr',
      'grid-gap': '20px',
      border: '1px solid black',
      width: '100%',
      height: '480px',
      maxHeight: '480px'
    }}>
      <div style={{ display: 'inline-block', 'border-style': 'solid', maxHeight: '100%', overflow: 'auto hidden' }}>
        <h1 className='chat-feed' style={{ textAlign: 'center' }}> Chat Timeline</h1>
        <div style={{ fontSize: '20px', textAlign: 'center' }}><b><p>
          See everyone's posts
          <PostButton id='post-button' style={{ display: '' }} onClick={() => makePostFormAppear()}>Post</PostButton>
          <PostButton id='submit-button' style={{ display: 'none'}} onClick={() => makePostsReappear()}>Submit</PostButton>
        </p></b></div>
        <div id='post-box' style={{ display: 'none'}}>
          <PostForm submitPost={submitPost} setSubmitPost={setSubmitPost}/>
        </div>
        <div id='chat-post'>
          <Chat userPost={userPost} />
        </div>
      </div>
      <div style={{ display: 'inline-block', 'border-style': 'solid', maxHeight: '100%', overflow: 'auto hidden' }}>
        <h1 className='horo-title' style={{ textAlign: 'center' }}>Wise Quotes</h1>
        <div style={{ fontSize: '20px', textAlign: 'center' }}><b><p>Like a quote to add to Favorites</p></b></div>
        <div style={{ maxHeight: '73%', overflow: 'auto' }}>
          <ZenQuotes />
        </div>
      </div>
    </div>

  );
};
export default Feed;
