import React from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { useAppContext } from 'store';
import useAxios from 'axios-hooks';

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: userList, loading, error }, refetch] = useAxios({
    url: 'http://127.0.0.1:8000/accounts/suggestions/',
    headers,
  });

  return (
    <div style={style}>
      {loading && <div>Loading</div>}
      {error && <div>로딩 중 에러가 발생했습니다.</div>}
      <button onClick={refetch}>Reload</button>
      <Card title="Suggestion For You" size="small">
        {userList &&
          userList.map((suggestionUser, index) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
            />
          ))}
      </Card>
    </div>
  );
}
