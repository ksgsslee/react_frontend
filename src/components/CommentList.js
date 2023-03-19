import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useAppContext } from 'store';
import useAxios from 'axios-hooks';
import axios from 'axios';
import Comment from 'components/Comment';

const CommentList = ({ post, author }) => {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [commentState, setCommentState] = useState('');
  const headers = { Authorization: `JWT ${jwtToken}` };
  const apiUrl = `http://localhost:8000/api/posts/${post.id}/comments/`;
  const [{ data: commentList }, refetch] = useAxios({
    url: apiUrl,
    headers,
  });
  const handleCommentSave = async () => {
    try {
      await axios.post(apiUrl, { message: commentState }, { headers });
      setCommentState('');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {commentList &&
        commentList.map((comment) => (
          <Comment key={comment.id} comment={comment}></Comment>
        ))}
      <Input
        style={{ marginBottom: '0.5rem' }}
        value={commentState}
        onChange={(e) => setCommentState(e.target.value)}
      />
      <Button
        block
        type="primary"
        disabled={commentState.length === 0}
        onClick={handleCommentSave}
      >
        댓글쓰기
      </Button>
    </>
  );
};

export default CommentList;
