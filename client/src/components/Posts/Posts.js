import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import './styles.css';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return (
<div className='posts'>
    <div className='posts-container'>
        {posts.map((post) => (
            <Post post={post} setCurrentId={setCurrentId} />
        ))}
    </div>
</div>
  );
};

export default Posts;