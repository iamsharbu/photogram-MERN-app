import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';

import './styles.css';

import '../../Buttons/buttons.css';

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

const LikeClickHandler = (e, postId) => {
    const likeButton = e.currentTarget;
    const isLiked = likeButton.getAttribute("isLiked");
    if(isLiked=="true"){
        removeClass(likeButton,"heart-liked");
        addClass(likeButton, "heart-unliked");
        likeButton.setAttribute("isLiked","false");
    }
    else{
        removeClass(likeButton,"heart-unliked");
        addClass(likeButton, "heart-liked");
        likeButton.setAttribute("isLiked","true");
    }
}

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    return (
        <div className='post-container'>
            <div className='post-body' onClick={() => setCurrentId(post._id)}>
                <img className='post-image' src={post.selectedFile}></img>
            </div>
            <div className='post-meta'>
                <div className='post-meta-heading'>
                    <p className='post-title'>{post.title}</p>
                    <p className='post-creator'>{post.creator}</p>
                </div>
                <div className='post-meta-body'>
                    <p className='post-tags'>{post.tags.map((tag) => `#${tag} `)}</p>
                    <p className='post-createdat'>{moment(post.createdAt).fromNow()}</p>
                </div>
                <div className='post-meta-footer'>
                    <p className='post-message'>{post.message}</p>
                    <div className='post-actions'>
                        <span className='heart-unliked post-action-icons' onClick={(e) => {dispatch(likePost(post._id));LikeClickHandler(e, post._id)}}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart like-heart-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M472.1 270.5l-193.1 199.7c-12.64 13.07-33.27 13.08-45.91 .0107l-193.2-199.7C-16.21 212.5-13.1 116.7 49.04 62.86C103.3 15.88 186.4 24.42 236.3 75.98l19.7 20.27l19.7-20.27c49.95-51.56 132.1-60.1 187.3-13.12C525.1 116.6 528.2 212.5 472.1 270.5z"></path></svg>
                            <span className='like-count'>{post.likeCount}</span>
                        </span>
                        <span className='trash-icon-span post-action-icons' onClick={() => dispatch(deletePost(post._id))}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-can" class="svg-inline--fa fa-trash-can trash-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464C32 490.5 53.5 512 80 512h288c26.5 0 48-21.5 48-48V128H32V464zM304 208C304 199.1 311.1 192 320 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM208 208C208 199.1 215.1 192 224 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM112 208C112 199.1 119.1 192 128 192s16 7.125 16 16v224C144 440.9 136.9 448 128 448s-16-7.125-16-16V208zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z"></path></svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;