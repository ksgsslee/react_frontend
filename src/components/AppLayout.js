import React from 'react';
import { Input, Menu } from 'antd';
import './AppLayout.scss';
import Logoimage from 'assets/logo.png';

function AppLayout({ children, sidebar }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={Logoimage} alt="logo" />
        </h1>

        <div className="search">
          <Input.Search placeholder="검색어" />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item>메뉴 1</Menu.Item>
            <Menu.Item>메뉴 2</Menu.Item>
            <Menu.Item>메뉴 3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="sidebar">{sidebar}</div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2023. FDA</div>
    </div>
  );
}

export default AppLayout;
