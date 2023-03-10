import React from 'react';
import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function Post({ post }) {
  const { author, caption, location, photo } = post;
  const { username, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[<HeartFilled />, <HeartOutlined />]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={'http://localhost:8000' + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
        />
      </Card>
      {caption}, {location}
    </div>
  );
}

export default Post;
