import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuanLyThongTinKhachHang.css";

export default function QuanLyThongTinKhachHang() {
  const [user, setUser] = useState(null);
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [email, setEmail] = useState("");
  
  // Alert messages
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdErr, setPwdErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  // Password fields
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [matKhauCu, setMatKhauCu] = useState("");
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");

  const token = localStorage.getItem("token");
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    if (!token) return;
    axios.get("http://127.0.0.1:8000/api/lich-hen-xem-phong", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setAppointments(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách lịch hẹn:", err));
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?")) return;
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/lich-hen-xem-phong/update-status", {
        id: id,
        trang_thai: "DA_HUY"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Đã hủy lịch hẹn thành công.");
        loadAppointments();
      } else {
        alert(res.data.message || "Hủy lịch hẹn thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi hủy lịch hẹn.");
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [token]);

  // Fetch customer profile on mount
  useEffect(() => {
    if (!token) return;

    axios.post("http://127.0.0.1:8000/api/user/profile", {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        const u = res.data.data;
        setUser(u);
        setHoTen(u.ho_ten || "");
        setSoDienThoai(u.so_dien_thoai || "");
        setEmail(u.email || "");
        localStorage.setItem("user", JSON.stringify(u));
      }
    })
    .catch(err => {
      console.error("Lỗi lấy thông tin profile khách hàng:", err);
      // Fallback
      const localUserStr = localStorage.getItem("user");
      if (localUserStr) {
        const u = JSON.parse(localUserStr);
        setUser(u);
        setHoTen(u.ho_ten || "");
        setSoDienThoai(u.so_dien_thoai || "");
        setEmail(u.email || "");
      }
    });
  }, [token]);

  // Handle Save Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileErr("");
    setLoading(true);

    if (!hoTen.trim()) {
      setProfileErr("Họ và tên không được để trống.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/user/update-profile", {
        ho_ten: hoTen,
        so_dien_thoai: soDienThoai
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === 1) {
        setProfileMsg("Cập nhật thông tin thành công!");
        const updated = res.data.data;
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        
        // Notify other components (Header)
        window.dispatchEvent(new Event("storage"));
      } else {
        setProfileErr(res.data.message || "Cập nhật thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setProfileErr(err.response.data.message);
      } else {
        setProfileErr("Đã xảy ra lỗi khi cập nhật thông tin.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset profile changes
  const handleCancelChanges = () => {
    if (user) {
      setHoTen(user.ho_ten || "");
      setSoDienThoai(user.so_dien_thoai || "");
      setProfileMsg("");
      setProfileErr("");
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg("");
    setPwdErr("");

    if (!matKhauCu || !matKhauMoi || !xacNhanMatKhau) {
      setPwdErr("Vui lòng điền đầy đủ các thông tin mật khẩu.");
      return;
    }

    if (matKhauMoi.length < 6) {
      setPwdErr("Mật khẩu mới phải có tối thiểu 6 ký tự.");
      return;
    }

    if (matKhauMoi !== xacNhanMatKhau) {
      setPwdErr("Mật khẩu mới và xác nhận mật khẩu không trùng khớp.");
      return;
    }

    setPwdLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/user/change-password", {
        mat_khau_cu: matKhauCu,
        mat_khau_moi: matKhauMoi
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === 1) {
        setPwdMsg("Đổi mật khẩu thành công!");
        setMatKhauCu("");
        setMatKhauMoi("");
        setXacNhanMatKhau("");
        setTimeout(() => setShowPwdForm(false), 2000);
      } else {
        setPwdErr(res.data.message || "Đổi mật khẩu thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setPwdErr(err.response.data.message);
      } else {
        setPwdErr("Mật khẩu cũ không chính xác hoặc có lỗi xảy ra.");
      }
    } finally {
      setPwdLoading(false);
    }
  };

  return (
    <div className="customer-profile-page">
      <div className="customer-profile-container">
        <div className="customer-profile-header">
          <div>
            <div className="customer-breadcrumb">
              <span>Khách hàng</span>
              <i className="fa-solid fa-chevron-right"></i>
              <b>Thông tin cá nhân</b>
            </div>

            <h2>Quản lý thông tin cá nhân</h2>
            <p>
              Cập nhật thông tin tài khoản, thông tin liên hệ và theo dõi hoạt động
              thuê phòng của bạn.
            </p>
          </div>

          <div className="customer-header-icon">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

        <div className="customer-profile-layout">
          <div className="customer-left-card">
            <div className="customer-cover"></div>

            <div className="customer-avatar-wrap">
              <div className="customer-avatar">
                <i className="fa-solid fa-user"></i>
              </div>

              <button type="button" className="customer-avatar-btn">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>

            <div className="customer-info-main">
              <h4>{hoTen || "Khách hàng"}</h4>
              <p>Khách hàng</p>

              <span className="customer-status">
                <i className="fa-solid fa-circle"></i>
                {user?.trang_thai === "HOAT_DONG" ? "Đang hoạt động" : "Chờ xác thực"}
              </span>
            </div>

            <div className="customer-info-list">
              <div className="customer-info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <span>Email</span>
                  <b>{email || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="customer-info-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <span>Số điện thoại</span>
                  <b>{soDienThoai || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="customer-info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <span>Địa chỉ</span>
                  <b>Đà Nẵng, Việt Nam</b>
                </div>
              </div>

              <div className="customer-info-item">
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <span>Ngày tham gia</span>
                  <b>
                    {user?.tao_luc
                      ? new Date(user.tao_luc).toLocaleDateString("vi-VN")
                      : "12/06/2026"}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <div className="customer-right">
            <div className="customer-stat-grid">
              <div className="customer-stat-card">
                <div className="stat-icon blue">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <div>
                  <h4>5</h4>
                  <p>Lịch hẹn đã đặt</p>
                </div>
              </div>

              <div className="customer-stat-card">
                <div className="stat-icon yellow">
                  <i className="fa-solid fa-heart"></i>
                </div>
                <div>
                  <h4>18</h4>
                  <p>Phòng đã lưu</p>
                </div>
              </div>

              <div className="customer-stat-card">
                <div className="stat-icon green">
                  <i className="fa-solid fa-comment-dots"></i>
                </div>
                <div>
                  <h4>3</h4>
                  <p>Đánh giá đã gửi</p>
                </div>
              </div>
            </div>

            <div className="customer-form-card">
              <div className="customer-card-title">
                <div>
                  <h5>Thông tin tài khoản</h5>
                  <p>Cập nhật thông tin cơ bản của bạn</p>
                </div>

                <span className="customer-role-badge">
                  <i className="fa-solid fa-user-check"></i>
                  Khách hàng
                </span>
              </div>

              <form onSubmit={handleSaveProfile}>
                {profileMsg && <div className="alert alert-success">{profileMsg}</div>}
                {profileErr && <div className="alert alert-danger">{profileErr}</div>}

                <div className="row g-3">
                  <div className="col-lg-6">
                    <label className="customer-label">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control customer-input"
                      value={hoTen}
                      onChange={(e) => setHoTen(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="customer-label">Email (Không thể sửa)</label>
                    <input
                      type="email"
                      className="form-control customer-input"
                      value={email}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="customer-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control customer-input"
                      value={soDienThoai}
                      onChange={(e) => setSoDienThoai(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="customer-label">Vai trò</label>
                    <input
                      type="text"
                      className="form-control customer-input"
                      value={user?.vai_tro || "KHACH_HANG"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="customer-label">Trạng thái tài khoản</label>
                    <input
                      type="text"
                      className="form-control customer-input"
                      value={user?.trang_thai === "HOAT_DONG" ? "Đang hoạt động" : user?.trang_thai || "Đang hoạt động"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="customer-label">Số dư ví</label>
                    <input
                      type="text"
                      className="form-control customer-input"
                      value={user ? Number(user.so_du).toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                </div>

                <div className="customer-form-actions mt-4">
                  <button
                    type="button"
                    className="customer-cancel-btn"
                    onClick={handleCancelChanges}
                  >
                    <i className="fa-solid fa-rotate-left"></i>
                    Hủy thay đổi
                  </button>

                  <button
                    type="submit"
                    className="customer-save-btn"
                    disabled={loading}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    {loading ? "Đang lưu..." : "Lưu thông tin"}
                  </button>
                </div>
              </form>
            </div>

            {/* Lịch Hẹn Xem Phòng Card */}
            <div className="customer-form-card mt-3">
              <div className="customer-card-title">
                <div>
                  <h5>Danh sách lịch hẹn xem phòng</h5>
                  <p>Theo dõi lịch hẹn xem phòng của bạn với chủ trọ</p>
                </div>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-4 bg-light rounded border text-muted">
                  <i className="fa-solid fa-calendar-xmark fs-3 mb-2"></i>
                  <p className="small mb-0">Bạn chưa có lịch hẹn xem phòng nào.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle" style={{ fontSize: "14px" }}>
                    <thead>
                      <tr>
                        <th>Bài đăng phòng</th>
                        <th>Thời gian hẹn</th>
                        <th>Lời nhắn</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="fw-bold">{item.tin_dang?.tieu_de || "Phòng trọ"}</div>
                            <small className="text-muted">{item.tin_dang?.dia_chi_chi_tiet}</small>
                          </td>
                          <td>
                            <div>{new Date(item.thoi_gian_hen).toLocaleDateString("vi-VN")}</div>
                            <small className="text-muted">
                              {new Date(item.thoi_gian_hen).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}
                            </small>
                          </td>
                          <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.loi_nhan || "Không có lời nhắn"}
                          </td>
                          <td>
                            {item.trang_thai === "CHO_XAC_NHAN" && (
                              <span className="badge bg-warning text-dark">Chờ xác nhận</span>
                            )}
                            {item.trang_thai === "DA_CHAP_NHAN" && (
                              <span className="badge bg-success">Đã duyệt</span>
                            )}
                            {item.trang_thai === "TU_CHOI" && (
                              <span className="badge bg-danger" title={`Lý do: ${item.ly_do_tu_choi}`}>Từ chối</span>
                            )}
                            {item.trang_thai === "DA_HUY" && (
                              <span className="badge bg-secondary">Đã hủy</span>
                            )}
                            {item.trang_thai === "DA_HOAN_THANH" && (
                              <span className="badge bg-primary">Hoàn thành</span>
                            )}
                          </td>
                          <td>
                            {item.trang_thai === "CHO_XAC_NHAN" && (
                              <button
                                onClick={() => handleCancelAppointment(item.id)}
                                className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill fw-bold"
                                style={{ fontSize: "11px" }}
                              >
                                Hủy lịch
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Change Password Card for Customer */}
            <div className="customer-form-card mt-3">
              <div className="customer-card-title d-flex justify-content-between align-items-center">
                <div>
                  <h5>Mật khẩu và bảo mật</h5>
                  <p>Thay đổi mật khẩu đăng nhập tài khoản</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPwdForm(!showPwdForm);
                    setPwdMsg("");
                    setPwdErr("");
                  }}
                  className="btn btn-outline-primary btn-sm"
                >
                  {showPwdForm ? "Đóng" : "Thay đổi mật khẩu"}
                </button>
              </div>

              {showPwdForm && (
                <form onSubmit={handleChangePassword} className="p-3 border rounded bg-light mt-3">
                  {pwdMsg && <div className="alert alert-success py-2">{pwdMsg}</div>}
                  {pwdErr && <div className="alert alert-danger py-2">{pwdErr}</div>}

                  <div className="mb-3">
                    <label className="form-label fs-7 fw-bold">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      value={matKhauCu}
                      onChange={(e) => setMatKhauCu(e.target.value)}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fs-7 fw-bold">Mật khẩu mới</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      value={matKhauMoi}
                      onChange={(e) => setMatKhauMoi(e.target.value)}
                      placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fs-7 fw-bold">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      value={xacNhanMatKhau}
                      onChange={(e) => setXacNhanMatKhau(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={pwdLoading}
                    >
                      {pwdLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}