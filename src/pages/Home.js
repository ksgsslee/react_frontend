import { Button } from 'antd';
import React from 'react';
import PostList from 'components/PostList';
import AppLayout from 'components/AppLayout';
import StoryList from 'components/StoryList';
import SuggestionList from 'components/SuggestionList';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/postnew');
  };

  const sidebar = (
    <>
      <Button
        type="primary"
        block={true}
        style={{ marginBottom: '1rem' }}
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList style={{ marginBottom: '1rem' }} />
      <SuggestionList style={{ marginBottom: '1rem' }} />
    </>
  );

  return (
    <AppLayout sidebar={sidebar}>
      <PostList />
    </AppLayout>
  );
}

export default Home;
