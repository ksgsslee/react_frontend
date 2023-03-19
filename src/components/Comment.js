import React from 'react';
import { Comment as AntdComment } from '@ant-design/compatible';
import { Avatar, Tooltip } from 'antd';
import moment from 'moment';

const Comment = ({ comment }) => {
  const {
    author: { username, avatar_url },
    message,
    created_at,
  } = comment;
  return (
    <AntdComment
      author={username}
      avatar={
        <Avatar
          icon={<img src={'http://localhost:8000' + avatar_url} alt={'asdf'} />}
          alt={username}
        />
      }
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    ></AntdComment>
  );
};

export default Comment;
