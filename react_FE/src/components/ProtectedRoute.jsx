import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Expected: 'ADMIN', 'CHU_TRO', 'KHACH_HANG'

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // If logged in but does not have the required role, redirect to Home page
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Render children routes
  return <Outlet />;
}
