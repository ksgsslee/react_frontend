import React from 'react';
import About from './About';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import PostNew from './PostNew';
import AccountRoutes from './accounts';
import LoginRequiredPage from 'utils/loginRequiredRouter';

function Root() {
  return (
    <>
      <Routes>
        <Route element={<LoginRequiredPage />}>
          <Route path="/" element={<Home />} />
          <Route path="postnew" element={<PostNew />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="accounts/*" element={<AccountRoutes />} />
      </Routes>
    </>
  );
}

export default Root;
