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
  const [newPost, setNewPost] = useState(true);

  // Grab the posts made by a user
  const renderFeed = () => {
    axios.get('/users/feed')
      .then(({ data }) => {
        const reverseData = [];
        for (let i = data.length - 1; i >= 0; i--) {
          reverseData.push(data[i]);
        }
        setFeed(reverseData);
      })
      .catch((err) => {
        console.error('Failed to meet request:', err);
      });
  };

  ///////// Post Form Functionality /////////

  // Makes the Post Form appear on screen
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

  // Sends axios post request to the db, then changes our newPost boolean state
  const submitNewPost = (post) => {
    axios.post('/user/post', { post: post })
      .then(() => {
        setNewPost(true);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  // Unhides the post that are hidden when making a post
  const makePostsReappear = () => {
    const chat = document.getElementById('chat-post');
    const post = document.getElementById('post-box');
    const postButton = document.getElementById('post-button');
    const submitButton = document.getElementById('submit-button');

    if (submitPost !== '') {
      submitNewPost(submitPost);

      setTimeout(() => {
        chat.style.display = 'block';
        submitButton.style.display = 'none';
        postButton.style.display = '';
        post.style.display = 'none';
      }, 1000);

    } else {
      alert('No message to post');
    }
  };

  ///////// This is all for rendering all post in chat /////////
  // Renders the post to state
  useEffect(() => {
    renderFeed();
    // const interval = setInterval(() => {
    //   renderFeed();
    // }, 10000);
  }, [newPost]);

  // Renders the users to state after posts
  useEffect(() => {
    // console.log(newPost);
    axios.get('/users/username')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Helper for making the post
  const handlePosts = () => {
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
  };

  // Renders a user to a post after the user populates
  useEffect(() => {
    handlePosts();
  }, [feed]);

  // Changes our state condition when there is a new post by user in actual time
  useEffect(() => {
    setNewPost(false);
  }, [userPost]);

  ///////// Finished /////////


  // Interval for rendering the feed in real time
  useEffect(() => {
    const interval = setInterval(() => {
      renderFeed();
    }, 60000);
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '20px',
      border: '1px solid black',
      width: '100%',
      height: '480px',
      maxHeight: '480px'
    }}>
      <div style={{ display: 'inline-block', borderStyle: 'solid', maxHeight: '100%', overflow: 'auto hidden' }}>
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
      <div style={{ display: 'inline-block', borderStyle: 'solid', maxHeight: '100%', overflow: 'auto hidden' }}>
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
