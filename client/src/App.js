import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div className='root-container'>
      <div className='navbar'></div>
      <div className='body-container'>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <Posts setCurrentId={setCurrentId}/>
      </div>
    </div>
  );
};
export default App;
