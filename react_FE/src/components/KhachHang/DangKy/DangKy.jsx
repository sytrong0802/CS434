import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DangKy.css";

export default function DangKy() {
  const navigate = useNavigate();
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [vaiTro, setVaiTro] = useState("KHACH_HANG");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!hoTen || !email || !soDienThoai || !matKhau) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        ho_ten: hoTen,
        email: email,
        so_dien_thoai: soDienThoai,
        mat_khau: matKhau,
        vai_tro: vaiTro,
      });

      if (response.data.status === 1) {
        setSuccess((response.data.message || "Đăng ký tài khoản thành công!") + " Đang chuyển hướng đến trang đăng nhập...");

        // Redirect to login page after a brief moment
        setTimeout(() => {
          navigate("/dang-nhap");
        }, 1500);
      } else {
        setError(response.data.message || "Đăng ký thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const resData = err.response.data;
        if (resData.errors) {
          const firstErrorKey = Object.keys(resData.errors)[0];
          setError(resData.errors[firstErrorKey][0]);
        } else {
          setError(resData.message || "Đăng ký thất bại.");
        }
      } else {
        setError("Đã xảy ra lỗi kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Nút quay lại trang chủ góc trên trái */}
      <button className="btn-back-home" onClick={() => navigate("/")}>
        <i className="bx bx-arrow-back"></i> Quay lại trang chủ
      </button>

      <div className="register-card">
        <div className="register-header">
          <div className="register-icon-box">
            <i className="bx bx-user-plus"></i>
          </div>
          <h3>Đăng Ký Tài Khoản</h3>
          <p>Tạo tài khoản để trải nghiệm đầy đủ tính năng của hệ thống phòng trọ</p>
        </div>

        <form onSubmit={handleRegister}>
          {error && (
            <div className="alert alert-danger py-2 text-center" style={{ fontSize: "14px", borderRadius: "8px", marginBottom: "15px" }}>
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success py-2 text-center" style={{ fontSize: "14px", borderRadius: "8px", marginBottom: "15px" }}>
              {success}
            </div>
          )}

          {/* Ô nhập Họ và Tên */}
          <div className="mb-3">
            <label className="form-label-custom">Họ và Tên</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-id-card"></i></span>
              <input
                type="text"
                className="register-input-field"
                placeholder="Nhập họ tên của bạn"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
              />
            </div>
          </div>

          {/* Ô nhập Email */}
          <div className="mb-3">
            <label className="form-label-custom">Email</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-envelope"></i></span>
              <input
                type="email"
                className="register-input-field"
                placeholder="Ví dụ: nva@gmail.com..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Ô nhập Số điện thoại */}
          <div className="mb-3">
            <label className="form-label-custom">Số điện thoại</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-phone"></i></span>
              <input
                type="text"
                className="register-input-field"
                placeholder="Ví dụ: 0912345678..."
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div className="mb-4">
            <label className="form-label-custom">Mật khẩu</label>
            <div className="input-group-custom">
              <span className="input-icon"><i className="bx bx-lock-alt"></i></span>
              <input
                type="password"
                className="register-input-field"
                placeholder="Nhập mật khẩu an toàn (tối thiểu 6 ký tự)"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
              />
            </div>
          </div>

          {/* Khu vực chọn vai trò */}
          <div className="mb-4">
            <label className="form-label-custom">Bạn tham gia với vai trò</label>

            <div className="role-container">
              <label className="role-card-item">
                <input
                  type="radio"
                  name="role"
                  value="KHACH_HANG"
                  checked={vaiTro === "KHACH_HANG"}
                  onChange={() => setVaiTro("KHACH_HANG")}
                />
                <span className="role-radio-custom"></span>
                <div className="role-details">
                  <span className="role-title">Khách hàng</span>
                  <small className="role-desc">Tìm kiếm, đặt lịch xem phòng và gửi đánh giá</small>
                </div>
              </label>

              <label className="role-card-item">
                <input
                  type="radio"
                  name="role"
                  value="CHU_TRO"
                  checked={vaiTro === "CHU_TRO"}
                  onChange={() => setVaiTro("CHU_TRO")}
                />
                <span className="role-radio-custom"></span>
                <div className="role-details">
                  <span className="role-title">Chủ trọ</span>
                  <small className="role-desc">Đăng tin cho thuê, quản lý phòng và khách thuê</small>
                </div>
              </label>
            </div>

            {/* Khung ghi chú cảnh báo */}
            <div className="register-note-box">
              <i className="bx bx-info-circle"></i>
              <span>
                Tài khoản <strong>Chủ trọ</strong> cần được xác thực thông tin để bắt đầu đăng tin phòng trọ lên hệ thống.
              </span>
            </div>
          </div>

          {/* Nút Đăng ký chính */}
          <button type="submit" className="register-submit-btn" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng ký tài khoản"}
          </button>
        </form>

        {/* Chuyển sang Đăng nhập */}
        <div className="register-footer-text">
          Đã có tài khoản rồi?{" "}
          <Link to="/dang-nhap" className="login-now-link">Đăng nhập tại đây</Link>
        </div>
      </div>
    </div>
  );
}