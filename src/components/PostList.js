import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from 'components/Post';
import { useAppContext } from 'store';
import { Alert } from 'antd';

const apiUrl = 'http://localhost:8000/api/posts/';

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [postList, setPostList] = useState([]);

  console.log(jwtToken);
  useEffect(() => {
    const headers = { Authorization: `JWT ${jwtToken}` };

    Axios.get(apiUrl, { headers })
      .then((response) => {
        const { data } = response;
        setPostList(data);
      })
      .catch((error) => {
        // error.response;
      });

    console.log('mounted');
  }, []); // mount시에

  // 왜 post 안에서 id 하면 안될까..
  return (
    <div>
      {postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
