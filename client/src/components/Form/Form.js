import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';

import './styles.css';
import '../Buttons/buttons.css';

import file_upload_bw from './../icons/file_upload_bw.png';
import file_upload_c from './../icons/file_upload_c.png';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = (e) => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
      
    }
    clear(e);
    revertImageUploadSucessMsg();
  };

  const addClass = (e, className) => {
    const classList = Array.prototype.slice.call(e.classList);
    if(!classList.indexOf(className)>-1){
      e.className += ' ' + className;
    }
  }

  const removeClass = (e, className) => {
    const classList = Array.prototype.slice.call(e.classList);
    while(classList.indexOf(className)>-1){
      const index = classList.indexOf(className);
      classList.splice(index, 1);
    }
    e.className = classList.join(' ');
  }

  const showImageUploadSucessMsg = (file) => {
    const file_upload_bw = document.getElementById('file_upload_bw');
    const file_upload_c = document.getElementById('file_upload_c');
    const file_upload_label = document.getElementById('file_upload_label');
    addClass(file_upload_bw,'hide');
    removeClass(file_upload_c,'hide');
    file_upload_label.innerText = file.name;  
  }

  const revertImageUploadSucessMsg = () => {
    const file_upload_bw = document.getElementById('file_upload_bw');
    const file_upload_c = document.getElementById('file_upload_c');
    const file_upload_label = document.getElementById('file_upload_label');
    removeClass(file_upload_bw,'hide');
    addClass(file_upload_c,'hide');
    file_upload_label.innerText = 'Upload an image';  
  }

  const imageUploadHandler = async (e, postData) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPostData({ ...postData, selectedFile: base64 });
    showImageUploadSucessMsg(file);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error.message);
      };
    });
  }

  return (
    <div className='form-container'>
      <form className='form-element' onSubmit={handleSubmit}>
        <h6 className='form-title'>{currentId ? `Editing "${post.title}"` : 'Photor App.'}</h6>
        <input
          value={postData.creator}
          className='form-field'
          placeholder='Your Name'
          name='Creator'
          maxLength="20"
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <input
          value={postData.title}
          className='form-field'
          placeholder='Enter subject'
          name='Title'
          maxLength="50"
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          value={postData.message}
          className='form-field'
          placeholder='Enter message'
          name='Message'
          maxLength="250"
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <input
          value={postData.tags}
          className='form-field'
          placeholder='Enter tags (comma separated)'
          name='Tags'
          maxLength="250"
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <label for="file-upload" class="form-file-upload">
            <img id="file_upload_bw" class="form-file-upload-img" alt="no image" src={file_upload_bw}></img>
            <img id="file_upload_c" class="form-file-upload-img hide" alt="no image" src={file_upload_c}></img>
            <p id="file_upload_label">Upload an image</p>
        </label>
        <input 
          id="file-upload" 
          className='form-file'
          type="file" 
          onChange={(e) => imageUploadHandler(e,postData)}/>
        <div className='form-footer'>
          <button 
            className='submit-button'
            type="submit"
            value='Submit'
          >Submit</button>
          <button 
            className='clear-button clear-button-hover'
            value='Clear'
            onClick={clear}
          >Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
