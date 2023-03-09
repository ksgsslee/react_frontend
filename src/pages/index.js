import React from 'react';
import About from './About';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import AppLayout from 'components/AppLayout';
import AccountRoutes from './accounts';
import LoginRequiredPage from 'utils/loginRequiredRouter';

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={
            <LoginRequiredPage>
              <Home />
            </LoginRequiredPage>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/accounts/*" element={<AccountRoutes />} />
      </Routes>
    </AppLayout>
  );
}

export default Root;
