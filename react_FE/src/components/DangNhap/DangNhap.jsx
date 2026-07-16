import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DangNhap.css";

export default function DangNhap() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !matKhau) {
      setError("Vui lòng nhập đầy đủ email/số điện thoại và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        mat_khau: matKhau,
      });

      if (response.data.status === 1) {
        const { access_token, data } = response.data;
        // Save auth details to localStorage
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", data.vai_tro); // Expected values: 'ADMIN', 'CHU_TRO', 'KHACH_HANG'
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect based on role
        if (data.vai_tro === "ADMIN") {
          navigate("/admin/quan-ly-thong-tin-admin");
        } else if (data.vai_tro === "CHU_TRO") {
          navigate("/chu-tro/quan-ly-thong-tin-chu-tro");
        } else {
          // KHACH_HANG goes to Search page
          navigate("/tim-kiem");
        }
      } else {
        setError(response.data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Nút quay lại trang chủ góc trên trái */}
      <button className="btn-back-home" onClick={() => navigate("/")}>
        <i className="bx bx-arrow-back"></i> Quay lại trang chủ
      </button>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-box">
            <i className="bx bx-lock-open-alt"></i>
          </div>
          <h3>Chào mừng trở lại!</h3>
          <p>Đăng nhập để quản lý và tìm kiếm phòng trọ nhanh chóng</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="alert alert-danger py-2 text-center" style={{ fontSize: "14px", borderRadius: "8px", marginBottom: "15px" }}>
              {error}
            </div>
          )}

          {/* Ô nhập Tài khoản */}
          <div className="mb-4">
            <label className="form-label-custom">Email hoặc Số điện thoại</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-user"></i></span>
              <input
                type="text"
                className="login-input-field"
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div className="mb-4">
            <label className="form-label-custom">Mật khẩu</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-key"></i></span>
              <input
                type="password"
                className="login-input-field"
                placeholder="Nhập mật khẩu"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
              />
            </div>
          </div>

          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="login-options-row">
            <label className="checkbox-container">
              <input type="checkbox" id="rememberLogin" />
              <span className="checkmark"></span>
              Ghi nhớ đăng nhập
            </label>
            <Link to="/quen-mat-khau" className="forgot-password-link">Quên mật khẩu?</Link>
          </div>

          {/* Nút Đăng nhập chính */}
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập hệ thống"}
          </button>
        </form>

        {/* Chuyển sang Đăng ký */}
        <div className="login-footer-text">
          Bạn chưa có tài khoản?{" "}
          <Link to="/dang-ky" className="register-now-link">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}