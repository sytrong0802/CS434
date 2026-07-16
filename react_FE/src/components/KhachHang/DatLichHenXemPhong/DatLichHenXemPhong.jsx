import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DatLichHenXemPhong.css";

export default function DatLichHenXemPhong() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomDetails = location.state?.roomDetails;

  const userStr = localStorage.getItem("user");
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem("token");

  // Prefill details from localStorage and state
  const [hoTen] = useState(currentUser?.ho_ten || "");
  const [soDienThoai] = useState(currentUser?.so_dien_thoai || "");
  const [email] = useState(currentUser?.email || "");

  // Form inputs
  const [ngayHen, setNgayHen] = useState("");
  const [gioHen, setGioHen] = useState("");
  const [soNguoi, setSoNguoi] = useState(1);
  const [hinhThucLienHe, setHinhThucLienHe] = useState("Gọi điện thoại");
  const [loiNhan, setLoiNhan] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!roomDetails) {
      setError("Không tìm thấy thông tin phòng trọ cần đặt lịch.");
      return;
    }

    if (!ngayHen || !gioHen) {
      setError("Vui lòng chọn ngày và giờ hẹn xem phòng.");
      return;
    }

    // Combine date and time
    const thoiGianHen = `${ngayHen} ${gioHen}:00`;

    // Basic date validation
    if (new Date(thoiGianHen) <= new Date()) {
      setError("Thời gian hẹn phải ở tương lai.");
      return;
    }

    setLoading(true);

    const payload = {
      tin_dang_id: roomDetails.id,
      phong_tro_id: roomDetails.phong_tros?.[0]?.id || roomDetails.phong_tro_id || null,
      thoi_gian_hen: thoiGianHen,
      loi_nhan: `Số người đi: ${soNguoi}. Hình thức liên hệ: ${hinhThucLienHe}. Lời nhắn: ${loiNhan}`
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/lich-hen-xem-phong", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === 1) {
        setSuccess("Gửi yêu cầu đặt lịch hẹn xem phòng thành công!");
        setTimeout(() => {
          navigate("/khach-hang/quan-ly-thong-tin-khach-hang");
        }, 1500);
      } else {
        setError(res.data.message || "Đặt lịch thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi khi kết nối máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-card">
        <div className="appointment-header">
          <div className="appointment-title">
            <div className="appointment-icon">
              <i className="bx bx-calendar-check"></i>
            </div>
            <div>
              <h5>Đặt lịch hẹn xem phòng</h5>
              <p>Điền thông tin để chủ trọ xác nhận thời gian xem phòng phù hợp.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="appointment-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <div className="row g-4">
            <div className="col-md-8">
              <div className="form-section">
                <div className="section-title">
                  <i className="bx bx-user"></i>
                  <span>Thông tin người đặt lịch (Được lấy tự động)</span>
                </div>

                <div className="mb-3">
                  <label className="form-label">Họ và tên người đặt lịch</label>
                  <input
                    type="text"
                    className="form-control appointment-input"
                    value={hoTen}
                    disabled
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control appointment-input"
                      value={soDienThoai}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control appointment-input"
                      value={email}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section mt-4">
                <div className="section-title">
                  <i className="bx bx-home"></i>
                  <span>Thông tin phòng muốn xem</span>
                </div>

                <div className="mb-3">
                  <label className="form-label">Phòng trọ muốn xem</label>
                  <input
                    type="text"
                    className="form-control appointment-input"
                    value={roomDetails?.tieu_de || "Chưa chọn phòng"}
                    disabled
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Địa chỉ phòng trọ</label>
                  <input
                    type="text"
                    className="form-control appointment-input"
                    value={roomDetails?.dia_chi_chi_tiet || "Chưa có địa chỉ"}
                    disabled
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                </div>

                <div className="mb-0">
                  <label className="form-label">Lời nhắn / Nội dung cần trao đổi</label>
                  <textarea
                    className="form-control appointment-input"
                    rows="4"
                    placeholder="Ví dụ: Tôi muốn xem phòng vào cuối tuần, cần phòng có máy lạnh..."
                    value={loiNhan}
                    onChange={(e) => setLoiNhan(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="appointment-side-box">
                <div className="side-title">
                  <i className="bx bx-time-five"></i>
                  <span>Thời gian hẹn</span>
                </div>

                <div className="mb-3">
                  <label className="form-label text-danger">Ngày hẹn xem phòng *</label>
                  <input
                    type="date"
                    className="form-control appointment-input"
                    value={ngayHen}
                    onChange={(e) => setNgayHen(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-danger">Giờ hẹn *</label>
                  <input
                    type="time"
                    className="form-control appointment-input"
                    value={gioHen}
                    onChange={(e) => setGioHen(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Số người đi xem</label>
                  <input
                    type="number"
                    className="form-control appointment-input"
                    min="1"
                    value={soNguoi}
                    onChange={(e) => setSoNguoi(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Hình thức liên hệ</label>
                  <select
                    className="form-select appointment-input"
                    value={hinhThucLienHe}
                    onChange={(e) => setHinhThucLienHe(e.target.value)}
                  >
                    <option>Gọi điện thoại</option>
                    <option>Nhắn tin Zalo</option>
                    <option>Gửi email</option>
                  </select>
                </div>

                <div className="appointment-note">
                  <i className="bx bx-info-circle"></i>
                  <span>
                    Chủ trọ sẽ nhận thông báo và phản hồi lịch hẹn cho bạn sau khi gửi yêu cầu.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn appointment-btn w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Gửi yêu cầu đặt lịch"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}