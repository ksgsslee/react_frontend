import React from 'react';
import { Card } from 'antd';
import PostNewForm from 'components/PostNewForm';
import './PostNew.scss';

const PostNew = () => (
  <div className="PostNew">
    <Card title="새 포스팅 쓰기">
      <PostNewForm />
    </Card>
  </div>
);

export default PostNew;
