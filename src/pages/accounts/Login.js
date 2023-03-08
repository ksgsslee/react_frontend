import React, { useState } from 'react';
import { Card, Form, Input, Button, notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from 'utils/useLocalStorage';

export default function Signup() {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', '');
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/accounts/token/',
          data,
        );
        const {
          data: { token: jwtToken },
        } = response;

        console.log(jwtToken);
        setJwtToken(jwtToken);

        notification.open({
          message: '로그인 성공',
          description: '로그인 페이지로 이동합니다.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });

        navigate('/accounts/signup');
      } catch (error) {
        if (error.response) {
          notification.open({
            message: '로그인 실패',
            description: '아이디/암호를 확인해주세요.',
            icon: <FrownOutlined style={{ color: '#ff3333' }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: "m1 m2", password: [] }
          // python: mydict.items()
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                // errors : ["m1", "m2"].join(" ") => "m1 "m2"
                acc[fieldName] = {
                  validateStatus: 'error',
                  help: errors.join(' '),
                };
                return acc;
              },
              {},
            ),
          );
        }
      }
    }
    fn();
  };

  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete={'false'}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 5, message: '5글자 입력해주세요.' },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
