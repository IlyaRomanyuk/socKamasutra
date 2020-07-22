import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <div className={s.message}>
        <img src="https://lh6.googleusercontent.com/proxy/WImOSRuUIprN0Gsr-J81DuDZiep86iaWXTTPjyt72rD78zLW_Vsu4BvePHriGkHUJXukrihNQ7Po2_Ac9hqflV1-TghicU-CG-QYDEiY3NenrncoD177L6id7hUZHq2Z1bos-3-5WT6fsyBncvOegy2c9CErFVmBuJrW0hT_VUlodRlM" />
        {props.message}
      </div>
      <div>
        <span>Like {props.likeCount}</span>
      </div>
    </div>
  )
}

export default Post