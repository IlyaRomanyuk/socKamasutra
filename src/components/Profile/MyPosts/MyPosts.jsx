import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/Preloader/Textarea';
import { maxLengthCreator, required } from '../../../utils/validators';


const MyPosts = (props) => {
  let postsItems = props.posts.map(p => <Post message={p.post} likeCount={p.likeCount} />)

  let addPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.myPosts}>
      My posts
      <ProfileForm onSubmit={addPost} />
      {postsItems}
    </div>
  )
}

let maxLength = maxLengthCreator(50)

let ProfileForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.newPost}>
      <Field component={Textarea} validate={[required, maxLength]} name="newPostText" className={s.textarea} />
      <button className={s.button}>Add Post</button>
    </form>
  )
}

ProfileForm = reduxForm({form: 'addPost'})(ProfileForm)

export default MyPosts