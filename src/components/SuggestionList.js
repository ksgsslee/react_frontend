import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { useAppContext } from 'store';
import useAxios from 'axios-hooks';
import axios from 'axios';

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: oriUserList, loading, error }, refetch] = useAxios({
    url: 'http://127.0.0.1:8000/accounts/suggestions/',
    headers,
  });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!oriUserList) setUserList([]);
    else
      setUserList(oriUserList.map((user) => ({ ...user, is_follow: false })));
  }, [oriUserList]);

  const onFollowUser = (username) => {
    axios
      .post('http://127.0.0.1:8000/accounts/follow/', { username }, { headers })
      .then((response) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true },
          ),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={style}>
      {loading && <div>Loading</div>}
      {error && <div>로딩 중 에러가 발생했습니다.</div>}
      <button onClick={refetch}>Reload</button>
      <Card title="Suggestion For You" size="small">
        {userList.map((suggestionUser, index) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
          />
        ))}
      </Card>
    </div>
  );
}
