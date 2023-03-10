import React from 'react';
import Post from 'components/Post';
import { useAppContext } from 'store';
import useAxios from 'axios-hooks';
import { Alert } from 'antd';

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: postList }] = useAxios({
    url: 'http://localhost:8000/api/posts/',
    headers,
  });

  // 왜 post 안에서 id 하면 안될까..
  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList && postList.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default PostList;
