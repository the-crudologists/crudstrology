import React from 'react';
import { PostInput } from '../Styled.jsx';

const PostForm = (props) => {
  const { submitPost, setSubmitPost } = props;

  const handleChangeInput = (event) => {
    setSubmitPost(event.target.value);
  };

  return (
    <div>
      <PostInput id='post-input' type='text' onChange={(e) => handleChangeInput(e)}/>
    </div>
  );
};

export default PostForm;
