import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from 'components/Post';

const apiUrl = 'http://localhost:8000/api/posts/';

function PostList() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get(apiUrl)
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
      {postList.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;