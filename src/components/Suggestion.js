import React from 'react';
import { Button, Avatar } from 'antd';
import './Suggestion.scss';

export default function Suggestion({ suggestionUser, onFollowUser }) {
  const { username, avatar_url, is_follow } = suggestionUser;
  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar
          size="small"
          icon={
            <img src={'http://127.0.0.1:8000' + avatar_url} alt={username} />
          }
        />
      </div>
      <div className="username">{username}</div>
      <div className="action">
        {is_follow && '팔로잉 중'}
        {!is_follow && (
          <Button size="small" onClick={() => onFollowUser(username)}>
            {' '}
            Follow{' '}
          </Button>
        )}
      </div>
    </div>
  );
}
