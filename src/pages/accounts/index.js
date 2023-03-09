import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './profile';
import Login from './Login';
import SignUp from './SignUp';
import LoginRequiredPage from 'utils/loginRequiredRouter';
function AccountRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="profile"
          element={
            <LoginRequiredPage>
              <Profile />
            </LoginRequiredPage>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default AccountRoutes;
