import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function ContentChuTro() {
  return (
    <div className="chutro-layout d-flex flex-column min-vh-100">
      <Header />
      <div className="content-body flex-grow-1 py-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}