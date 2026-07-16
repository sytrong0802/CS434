import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./DatLaiMatKhau.css";

export default function DatLaiMatKhau() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!otp) {
      setError("Vui lòng nhập mã xác nhận OTP.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu mới.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu mới phải có tối thiểu 6 ký tự.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác thực lại không khớp.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/doi-mat-khau", {
        ma_bi_mat: otp,
        password: password,
      });

      if (response.data.status === 1) {
        setSuccess(response.data.message || "Đặt lại mật khẩu thành công!");
        setTimeout(() => {
          navigate("/dang-nhap");
        }, 2000);
      } else {
        setError(response.data.message || "Đã xảy ra lỗi khi đặt lại mật khẩu.");
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

  const handleResendOtp = async () => {
    if (!email) {
      setError("Không tìm thấy thông tin email. Vui lòng quay lại trang quên mật khẩu.");
      return;
    }

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/quen-mat-khau", {
        email: email,
      });

      if (response.data.status === 1) {
        setSuccess(response.data.message || "Mã OTP mới đã được gửi đến email của bạn.");
      } else {
        setError(response.data.message || "Không thể gửi lại mã xác nhận.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi gửi lại mã xác nhận.");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="reset-page">
      {/* Nút quay lại trang chủ góc trên trái */}
      <button className="btn-back-home" onClick={() => navigate("/")}>
        <i className="bx bx-arrow-back"></i> Quay lại trang chủ
      </button>

      <div className="reset-card">
        <div className="reset-header">
          <div className="reset-icon-box">
            <i className="bx bx-shield-quarter"></i>
          </div>
          <h3>Đặt Lại Mật Khẩu</h3>
          <p>
            Nhập mã xác nhận đã được gửi đến email {email ? <strong>{email}</strong> : "của bạn"} và tạo mật khẩu mới an toàn hơn.
          </p>
        </div>

        <form onSubmit={handleResetPassword}>
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

          {/* Ô nhập Mã xác nhận */}
          <div className="mb-4">
            <label className="form-label-custom">Mã xác nhận (OTP)</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-hash"></i></span>
              <input
                type="text"
                className="reset-input-field"
                placeholder="Nhập mã xác nhận gồm 6 số"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu mới */}
          <div className="mb-4">
            <label className="form-label-custom">Mật khẩu mới</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-lock-alt"></i></span>
              <input
                type="password"
                className="reset-input-field"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Ô Xác nhận mật khẩu mới */}
          <div className="mb-4">
            <label className="form-label-custom">Xác nhận mật khẩu mới</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-check-shield"></i></span>
              <input
                type="password"
                className="reset-input-field"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Khung ghi chú mật khẩu an toàn */}
          <div className="reset-note-box">
            <i className="bx bx-info-circle"></i>
            <span>
              Mật khẩu chuẩn nên có ít nhất 6 ký tự, bao gồm cả chữ cái, số hoặc ký tự đặc biệt để bảo vệ tài khoản tốt nhất.
            </span>
          </div>

          {/* Nút xác nhận chính */}
          <button
            type="submit"
            className="reset-submit-btn"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
          </button>
        </form>

        {/* Gửi lại mã */}
        <div className="reset-footer-text">
          Chưa nhận được mã OTP?{" "}
          <button
            type="button"
            className="resend-code-btn"
            onClick={handleResendOtp}
            disabled={resending || !email}
            style={{
              background: "none",
              border: "none",
              color: email ? "#0d6efd" : "#6c757d",
              padding: 0,
              font: "inherit",
              cursor: email ? "pointer" : "not-allowed",
              textDecoration: email ? "underline" : "none",
            }}
          >
            {resending ? "Đang gửi lại..." : "Gửi lại mã xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}