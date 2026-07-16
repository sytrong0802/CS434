import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuanLyThongTinChuTro.css";

export default function QuanLyThongTinChuTro() {
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

  const [pendingListings, setPendingListings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMyListings = () => {
    axios.post("http://127.0.0.1:8000/api/tin-dang/my-listings", {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        const pending = res.data.data.filter(item => item.trang_thai === 'CHO_XU_LY');
        setPendingListings(pending);
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách tin đăng của tôi:", err));
  };

  const fetchAppointments = () => {
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

  const handleApproveAppointment = async (id) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/lich-hen-xem-phong/update-status", {
        id: id,
        trang_thai: 'DA_CHAP_NHAN'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Duyệt lịch hẹn thành công!");
        fetchAppointments();
      } else {
        alert(res.data.message || "Duyệt thất bại");
      }
    } catch (err) {
      console.error("Lỗi duyệt lịch hẹn:", err);
      alert("Lỗi duyệt lịch hẹn.");
    }
  };

  const handleRejectAppointment = async (id) => {
    const reason = prompt("Nhập lý do từ chối lịch hẹn này:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("Lý do từ chối không được để trống!");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/lich-hen-xem-phong/update-status", {
        id: id,
        trang_thai: 'TU_CHOI',
        ly_do_tu_choi: reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Từ chối lịch hẹn thành công!");
        fetchAppointments();
      } else {
        alert(res.data.message || "Từ chối thất bại");
      }
    } catch (err) {
      console.error("Lỗi từ chối lịch hẹn:", err);
      alert("Lỗi từ chối lịch hẹn.");
    }
  };

  // Fetch landlord user profile on mount
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
      console.error("Lỗi lấy thông tin profile chủ trọ:", err);
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

    fetchMyListings();
    fetchAppointments();
  }, [token]);

  // Handle Save Landlord Profile
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
        setProfileMsg("Cập nhật thông tin chủ trọ thành công!");
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
    <div className="owner-profile-page">
      <div className="owner-profile-container">
        <div className="owner-profile-header">
          <div>
            <div className="owner-breadcrumb">
              <span>Chủ trọ</span>
              <i className="fa-solid fa-chevron-right"></i>
              <b>Thông tin cá nhân</b>
            </div>

            <h2>Quản lý thông tin chủ trọ</h2>
            <p>
              Quản lý thông tin tài khoản, thông tin liên hệ và hoạt động đăng phòng
              của chủ trọ.
            </p>
          </div>

          <div className="owner-header-icon">
            <i className="fa-solid fa-user-tie"></i>
          </div>
        </div>

        <div className="owner-profile-layout">
          <div className="owner-left-card">
            <div className="owner-cover"></div>

            <div className="owner-avatar-wrap">
              <div className="owner-avatar">
                <i className="fa-solid fa-user-tie"></i>
              </div>

              <button type="button" className="owner-avatar-btn">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>

            <div className="owner-info-main">
              <h4>{hoTen || "Chủ trọ"}</h4>
              <p>Chủ trọ</p>

              <span className="owner-status">
                <i className="fa-solid fa-circle"></i>
                {user?.trang_thai === "HOAT_DONG" ? "Đã xác minh" : "Chờ xác thực"}
              </span>
            </div>

            <div className="owner-info-list">
              <div className="owner-info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <span>Email</span>
                  <b>{email || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="owner-info-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <span>Số điện thoại</span>
                  <b>{soDienThoai || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="owner-info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <span>Địa chỉ</span>
                  <b>Đà Nẵng, Việt Nam</b>
                </div>
              </div>

              <div className="owner-info-item">
                <i className="fa-solid fa-calendar-check"></i>
                <div>
                  <span>Ngày tham gia</span>
                  <b>
                    {user?.tao_luc
                      ? new Date(user.tao_luc).toLocaleDateString("vi-VN")
                      : "05/05/2026"}
                  </b>
                </div>
              </div>
            </div>
          </div>

          <div className="owner-right">
            <div className="owner-stat-grid">
              <div className="owner-stat-card">
                <div className="stat-icon blue">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div>
                  <h4>12</h4>
                  <p>Phòng đã đăng</p>
                </div>
              </div>

              <div className="owner-stat-card">
                <div className="stat-icon green">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h4>9</h4>
                  <p>Phòng đã duyệt</p>
                </div>
              </div>

              <div className="owner-stat-card">
                <div className="stat-icon yellow">
                  <i className="fa-solid fa-clock"></i>
                </div>
                <div>
                  <h4>3</h4>
                  <p>Chờ kiểm duyệt</p>
                </div>
              </div>

              <div className="owner-stat-card">
                <div className="stat-icon red">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <div>
                  <h4>7</h4>
                  <p>Lịch hẹn xem phòng</p>
                </div>
              </div>
            </div>

            <div className="owner-form-card">
              <div className="owner-card-title">
                <div>
                  <h5>Thông tin tài khoản chủ trọ</h5>
                  <p>Cập nhật thông tin cá nhân và thông tin liên hệ</p>
                </div>

                <span className="owner-role-badge">
                  <i className="fa-solid fa-house-user"></i>
                  Chủ trọ
                </span>
              </div>

              <form onSubmit={handleSaveProfile}>
                {profileMsg && <div className="alert alert-success">{profileMsg}</div>}
                {profileErr && <div className="alert alert-danger">{profileErr}</div>}

                <div className="row g-3">
                  <div className="col-lg-6">
                    <label className="owner-label">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control owner-input"
                      value={hoTen}
                      onChange={(e) => setHoTen(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="owner-label">Email (Không thể sửa)</label>
                    <input
                      type="email"
                      className="form-control owner-input"
                      value={email}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="owner-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control owner-input"
                      value={soDienThoai}
                      onChange={(e) => setSoDienThoai(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="owner-label">Vai trò</label>
                    <input
                      type="text"
                      className="form-control owner-input"
                      value={user?.vai_tro || "CHU_TRO"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="owner-label">Trạng thái tài khoản</label>
                    <input
                      type="text"
                      className="form-control owner-input"
                      value={user?.trang_thai === "HOAT_DONG" ? "Đang hoạt động" : user?.trang_thai || "Đang hoạt động"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="owner-label">Số dư ví tài khoản</label>
                    <input
                      type="text"
                      className="form-control owner-input"
                      value={user ? Number(user.so_du).toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                </div>

                <div className="owner-form-actions mt-4">
                  <button
                    type="button"
                    className="owner-cancel-btn"
                    onClick={handleCancelChanges}
                  >
                    <i className="fa-solid fa-rotate-left"></i>
                    Hủy thay đổi
                  </button>

                  <button
                    type="submit"
                    className="owner-save-btn"
                    disabled={loading}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    {loading ? "Đang lưu..." : "Lưu thông tin"}
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Card for Landlord */}
            <div className="owner-form-card mt-3">
              <div className="owner-card-title d-flex justify-content-between align-items-center">
                <div>
                  <h5>Mật khẩu và bảo mật</h5>
                  <p>Thay đổi mật khẩu đăng nhập chủ trọ</p>
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

            <div className="owner-extra-card mt-3">
              <div className="owner-card-title">
                <div>
                  <h5>Thông tin kinh doanh phòng trọ</h5>
                  <p>Tổng quan hoạt động đăng phòng của chủ trọ</p>
                </div>
              </div>

              <div className="owner-business-grid">
                <div className="business-item">
                  <i className="fa-solid fa-house-circle-check"></i>
                  <div>
                    <h6>Phòng đang hoạt động</h6>
                    <p>9 phòng đang được hiển thị trên hệ thống</p>
                  </div>
                </div>

                <div className="business-item">
                  <i className="fa-solid fa-calendar-check"></i>
                  <div>
                    <h6>Lịch hẹn mới</h6>
                    <p>7 lịch hẹn xem phòng đang chờ xác nhận</p>
                  </div>
                </div>

                <div className="business-item">
                  <i className="fa-solid fa-star"></i>
                  <div>
                    <h6>Đánh giá trung bình</h6>
                    <p>4.6 / 5.0 từ khách thuê</p>
                  </div>
                </div>

                <div className="business-item">
                  <i className="fa-solid fa-flag"></i>
                  <div>
                    <h6>Báo cáo liên quan</h6>
                    <p>1 báo cáo cần kiểm tra lại thông tin phòng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tin đăng đang chờ admin duyệt */}
            <div className="owner-form-card mt-3">
              <div className="owner-card-title d-flex justify-content-between align-items-center">
                <div>
                  <h5>Tin đăng đang chờ admin duyệt</h5>
                  <p>Danh sách các bài đăng của bạn đang đợi Admin kiểm duyệt</p>
                </div>
                <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill">
                  {pendingListings.length} tin chờ duyệt
                </span>
              </div>

              <div className="pending-listings-list mt-3">
                {pendingListings.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {pendingListings.map(item => (
                      <div key={item.id} className="p-3 border rounded bg-light">
                        <div className="d-flex gap-3 align-items-start">
                          <img 
                            src={item.anh_dai_dien ? (item.anh_dai_dien.startsWith('http') ? item.anh_dai_dien : `http://127.0.0.1:8000/${item.anh_dai_dien}`) : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=80'} 
                            alt={item.tieu_de} 
                            className="rounded"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1">{item.tieu_de}</h6>
                            <p className="text-muted small mb-2 text-truncate" style={{ maxWidth: '400px' }}>{item.dia_chi_chi_tiet}</p>
                            <div className="d-flex gap-3 text-muted small">
                              <span><i className="fa-solid fa-money-bill-wave me-1"></i>{Number(item.gia_thue_min).toLocaleString('vi-VN')} đ/tháng</span>
                              <span><i className="fa-solid fa-vector-square me-1"></i>{item.dien_tich_min} m²</span>
                              <span><i className="fa-solid fa-clock me-1"></i>Chờ duyệt</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted bg-white rounded border">
                    <i className="fa-solid fa-circle-check fa-2x mb-2 text-success"></i>
                    <p className="mb-0 small">Không có tin đăng nào đang chờ duyệt.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lịch hẹn xem phòng của khách hàng */}
            <div className="owner-form-card mt-3">
              <div className="owner-card-title">
                <div>
                  <h5>Lịch hẹn xem phòng của khách hàng</h5>
                  <p>Quản lý và phê duyệt lịch hẹn xem phòng từ khách thuê</p>
                </div>
              </div>

              <div className="appointments-list mt-3">
                {appointments.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {appointments.map(item => {
                      const isPending = item.trang_thai === 'CHO_XAC_NHAN';
                      return (
                        <div key={item.id} className={`p-3 border rounded ${isPending ? 'border-warning' : ''}`} style={isPending ? { backgroundColor: '#fffdf5' } : { backgroundColor: '#f8f9fa' }}>
                          <div className="d-flex gap-3 align-items-start">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <h6 className="fw-bold mb-0">{item.tin_dang?.tieu_de || "Tin đăng đã xóa"}</h6>
                                {isPending ? (
                                  <span className="badge bg-warning text-dark fw-bold small">Chờ duyệt</span>
                                ) : item.trang_thai === 'DA_CHAP_NHAN' ? (
                                  <span className="badge bg-success fw-bold small">Đã duyệt (Đồng ý)</span>
                                ) : item.trang_thai === 'TU_CHOI' ? (
                                  <span className="badge bg-danger fw-bold small">Từ chối</span>
                                ) : (
                                  <span className="badge bg-secondary fw-bold small">Đã hủy</span>
                                )}
                              </div>
                              <p className="text-muted small mb-2"><i className="fa-solid fa-clock me-1"></i>Thời gian: <b className="text-dark">{new Date(item.thoi_gian_hen).toLocaleString('vi-VN')}</b></p>
                              <div className="p-2 border rounded bg-white small mb-2">
                                <div className="row g-2">
                                  <div className="col-md-6"><b>Khách hàng:</b> {item.khach_hang?.ho_ten}</div>
                                  <div className="col-md-6"><b>SĐT:</b> {item.khach_hang?.so_dien_thoai || "Chưa cung cấp"}</div>
                                  <div className="col-md-12"><b>Lời nhắn:</b> "{item.loi_nhan || 'Không có lời nhắn'}"</div>
                                  {item.trang_thai === 'TU_CHOI' && item.ly_do_tu_choi && (
                                    <div className="col-md-12 text-danger"><b>Lý do từ chối:</b> "{item.ly_do_tu_choi}"</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {isPending && (
                              <div className="d-flex flex-column gap-2 align-self-center">
                                <button onClick={() => handleApproveAppointment(item.id)} className="btn btn-sm btn-success px-3">
                                  <i className="fa-solid fa-check me-1"></i> Duyệt
                                </button>
                                <button onClick={() => handleRejectAppointment(item.id)} className="btn btn-sm btn-danger px-3">
                                  <i className="fa-solid fa-xmark me-1"></i> Từ chối
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted bg-white rounded border">
                    <i className="fa-solid fa-calendar-xmark fa-2x mb-2 text-secondary"></i>
                    <p className="mb-0 small">Không có yêu cầu đặt lịch hẹn nào.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}