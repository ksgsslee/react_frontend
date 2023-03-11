import React, { useEffect, useState } from 'react';
import Post from 'components/Post';
import { useAppContext } from 'store';
import useAxios from 'axios-hooks';
import { Alert } from 'antd';
import axios from 'axios';

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };
  const [postList, setPostList] = useState([]);

  const [{ data: originPostList }] = useAxios({
    url: 'http://localhost:8000/api/posts/',
    headers,
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `http://localhost:8000/api/posts/${post.id}/like/`;
    const method = isLike ? 'POST' : 'DELETE';

    try {
      await axios({
        url: apiUrl,
        method,
        headers,
      });

      setPostList((prevList) => {
        return prevList.map((curPost) =>
          curPost === post ? { ...curPost, is_like: isLike } : curPost,
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 왜 post 안에서 id 하면 안될까..
  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList &&
        postList.map((post) => (
          <Post post={post} key={post.id} handleLike={handleLike} />
        ))}
    </div>
  );
}

export default PostList;
