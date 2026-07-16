import React from "react";
import "./QuanLyTaiKhoanNguoiDung.css";

export default function QuanLyTaiKhoanNguoiDung() {
  const users = [
    {
      id: 1,
      username: "nguyenvana",
      fullname: "Nguyễn Văn A",
      email: "vana@gmail.com",
      phone: "0901234567",
      role: "Khách hàng",
      status: "Hoạt động",
    },
    {
      id: 2,
      username: "tranthib",
      fullname: "Trần Thị B",
      email: "thib@gmail.com",
      phone: "0912345678",
      role: "Chủ trọ",
      status: "Hoạt động",
    },
    {
      id: 3,
      username: "phamvanc",
      fullname: "Phạm Văn C",
      email: "vanc@gmail.com",
      phone: "0923456789",
      role: "Khách hàng",
      status: "Bị khoá",
    },
    {
      id: 4,
      username: "admin01",
      fullname: "Quản trị viên",
      email: "admin@gmail.com",
      phone: "0934567890",
      role: "Admin",
      status: "Hoạt động",
    },
  ];

  return (
    <div className="qltk-page">
      <div className="qltk-header">
        <div>
          <p className="qltk-subtitle">Quản lý hệ thống</p>
          <h2>
            Quản Lý <span>Tài Khoản Người Dùng</span>
          </h2>
        </div>

        <button className="qltk-refresh-btn">
          <i className="fa-solid fa-rotate-right"></i>
          Làm mới
        </button>
      </div>

      <div className="qltk-stat-list">
        <div className="qltk-stat-card">
          <div className="qltk-stat-icon blue">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <p>Tổng tài khoản</p>
            <h4>120</h4>
          </div>
        </div>

        <div className="qltk-stat-card">
          <div className="qltk-stat-icon green">
            <i className="fa-solid fa-user-check"></i>
          </div>
          <div>
            <p>Đang hoạt động</p>
            <h4>105</h4>
          </div>
        </div>

        <div className="qltk-stat-card">
          <div className="qltk-stat-icon red">
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <div>
            <p>Bị khoá</p>
            <h4>15</h4>
          </div>
        </div>

        <div className="qltk-stat-card">
          <div className="qltk-stat-icon yellow">
            <i className="fa-solid fa-house-user"></i>
          </div>
          <div>
            <p>Chủ trọ</p>
            <h4>38</h4>
          </div>
        </div>
      </div>

      <div className="qltk-card">
        <div className="qltk-toolbar">
          <div className="qltk-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Tìm username, họ tên, email, số điện thoại..."
            />
          </div>

          <select>
            <option>Tất cả vai trò</option>
            <option>Khách hàng</option>
            <option>Chủ trọ</option>
            <option>Admin</option>
          </select>

          <select>
            <option>Tất cả trạng thái</option>
            <option>Đang hoạt động</option>
            <option>Bị khoá</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="qltk-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tài khoản</th>
                <th>Liên hệ</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="qltk-id">#{user.id}</span>
                  </td>

                  <td>
                    <div className="qltk-user">
                      <div className="qltk-avatar">
                        {user.fullname.charAt(0)}
                      </div>

                      <div>
                        <h6>{user.fullname}</h6>
                        <p>@{user.username}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="qltk-contact">
                      <p>
                        <i className="fa-solid fa-envelope"></i>
                        {user.email}
                      </p>
                      <p>
                        <i className="fa-solid fa-phone"></i>
                        {user.phone}
                      </p>
                    </div>
                  </td>

                  <td>
                    <span
                      className={
                        user.role === "Admin"
                          ? "qltk-role admin"
                          : user.role === "Chủ trọ"
                          ? "qltk-role landlord"
                          : "qltk-role customer"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        user.status === "Hoạt động"
                          ? "qltk-status active"
                          : "qltk-status locked"
                      }
                    >
                      <span></span>
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="qltk-actions">
                      <button className="qltk-view-btn">
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      {user.status === "Hoạt động" ? (
                        <button className="qltk-lock-btn">
                          <i className="fa-solid fa-lock"></i>
                          Khoá
                        </button>
                      ) : (
                        <button className="qltk-unlock-btn">
                          <i className="fa-solid fa-unlock"></i>
                          Mở khoá
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}