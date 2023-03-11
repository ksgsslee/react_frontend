import React from 'react';
import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

function Post({ post, handleLike }) {
  const { author, caption, location, photo, is_like } = post;
  const { username, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="blue"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
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
