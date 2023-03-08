import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'antd';

export default function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInput] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    axios
      .post('http://127.0.0.1:8000/accounts/signup/', inputs)
      .then((response) => {
        console.log(response);
        navigate('/accounts/login');
      })
      .catch((error) => {
        if (error.response) {
          setErrors({
            username: (error.response.data.username || []).join(' '),
            password: (error.response.data.password || []).join(' '),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setDisabled(!Object.values(inputs).every((s) => s.length > 0));
  }, [inputs]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password && <Alert type="error" message={errors.password} />}
        </div>
        <input type="submit" value="회원가입" disabled={loading || disabled} />
      </form>
      accounts/signup
    </div>
  );
}
