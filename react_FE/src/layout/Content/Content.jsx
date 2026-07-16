import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Content() {
  return (
    <div className="kvl-layout d-flex flex-column min-vh-100">
      <Header />
      
      <div className="content-body flex-grow-1">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
}