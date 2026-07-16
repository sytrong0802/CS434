import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function ContentKhachHang() {
  return (
    <div className="khachhang-layout d-flex flex-column min-vh-100">
      <Header />
      
      <div className="content-body flex-grow-1 py-4">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
}