import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './profile';
import Login from './Login';
import SignUp from './SignUp';

function AccountRoutes() {
  return (
    <>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default AccountRoutes;
