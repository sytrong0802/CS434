import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuAdmin.css";

export default function MenuAdmin() {
  return (
    <aside className="admin-menu">
      <div className="admin-menu-header">
        <div className="admin-logo-box">
          <i className="fa-solid fa-house-chimney"></i>
        </div>

        <div>
          <h4>PHONGTRO HQC</h4>
          <p>Admin Dashboard</p>
        </div>
      </div>

      <div className="admin-profile-card">
        <div className="admin-avatar">
          <i className="fa-solid fa-user-shield"></i>
        </div>

        <div>
          <h6>Quản trị viên</h6>
          <span>Online</span>
        </div>
      </div>

      <nav className="admin-nav">
        <div className="menu-group-title">Tổng quan</div>

        <NavLink to="/admin/thong-ke" className="admin-nav-link">
          <i className="fa-solid fa-chart-pie"></i>
          <span>Thống kê</span>
        </NavLink>

        <div className="menu-group-title">Quản lý hệ thống</div>

        <NavLink to="/admin/quan-ly-tai-khoan-nguoi-dung" className="admin-nav-link">
          <i className="fa-solid fa-users"></i>
          <span>Quản lý tài khoản người dùng</span>
        </NavLink>

        <NavLink to="/admin/duyet-phong-tro" className="admin-nav-link">
          <i className="fa-solid fa-house-circle-check"></i>
          <span>Duyệt phòng trọ</span>
        </NavLink>

        <NavLink to="/admin/quan-ly-danh-gia" className="admin-nav-link">
          <i className="fa-solid fa-star-half-stroke"></i>
          <span>Quản lý đánh giá</span>
        </NavLink>

        <NavLink to="/admin/quan-ly-bao-cao" className="admin-nav-link">
          <i className="fa-solid fa-flag"></i>
          <span>Quản lý báo cáo</span>
        </NavLink>

        <div className="menu-group-title">Tài khoản</div>

        <NavLink to="/admin/quan-ly-thong-tin-admin" className="admin-nav-link">
          <i className="fa-solid fa-user-gear"></i>
          <span>Thông tin cá nhân</span>
        </NavLink>

        <NavLink to="/admin/cai-dat" className="admin-nav-link">
          <i className="fa-solid fa-gear"></i>
          <span>Cài đặt</span>
        </NavLink>
      </nav>
    </aside>
  );
}