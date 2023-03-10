import React from 'react';
import { Button, Avatar } from 'antd';
import './Suggestion.scss';

export default function Suggestion({ suggestionUser }) {
  const { username, avatar_url } = suggestionUser;
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
        <Button size="small"> Follow </Button>
      </div>
    </div>
  );
}
