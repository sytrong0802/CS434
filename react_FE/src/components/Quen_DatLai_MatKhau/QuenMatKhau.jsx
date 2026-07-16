import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuenMatKhau.css";

export default function QuenMatKhau() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email) {
      setError("Vui lòng nhập địa chỉ email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/quen-mat-khau", {
        email: email,
      });

      if (response.data.status === 1) {
        setSuccess(response.data.message || "Mã OTP đã được gửi về email của bạn.");
        setTimeout(() => {
          navigate("/dat-lai-mat-khau", { state: { email } });
        }, 1500);
      } else {
        setError(response.data.message || "Không thể gửi yêu cầu xác nhận.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      {/* Nút quay lại trang chủ góc trên trái */}
      <button className="btn-back-home" onClick={() => navigate("/")}>
        <i className="bx bx-arrow-back"></i> Quay lại trang chủ
      </button>

      <div className="forgot-card">
        <div className="forgot-header">
          <div className="forgot-icon-box">
            <i className="bx bx-key"></i>
          </div>
          <h3>Quên Mật Khẩu?</h3>
          <p>
            Đừng lo lắng! Hãy nhập thông tin dưới đây để nhận liên kết đặt lại mật khẩu của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {success && (
            <div className="alert alert-success py-2 text-center" style={{ fontSize: "14px", borderRadius: "8px", marginBottom: "15px" }}>
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger py-2 text-center" style={{ fontSize: "14px", borderRadius: "8px", marginBottom: "15px" }}>
              {error}
            </div>
          )}

          {/* Ô nhập thông tin tài khoản */}
          <div className="mb-4">
            <label className="form-label-custom">Email đăng ký tài khoản</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-envelope"></i></span>
              <input
                type="email"
                className="forgot-input-field"
                placeholder="Nhập email đã đăng ký của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Khung ghi chú thông tin */}
          <div className="forgot-note-box">
            <i className="bx bx-info-circle"></i>
            <span>
              Hệ thống sẽ tự động kiểm tra và gửi mã xác nhận qua email đã đăng ký.
            </span>
          </div>

          {/* Nút gửi yêu cầu */}
          <button
            type="submit"
            className="forgot-submit-btn"
            disabled={loading}
          >
            {loading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu xác nhận"}
          </button>
        </form>

        {/* Quay lại đăng nhập */}
        <div className="forgot-footer-text">
          Bạn đã nhớ lại mật khẩu?{" "}
          <Link to="/dang-nhap" className="back-to-login-link">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}