import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuanLyThongTinAdmin.css";

export default function QuanLyThongTinAdmin() {
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

  const [pendingList, setPendingList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPendingListings = () => {
    axios.get("http://127.0.0.1:8000/api/admin/tin-dang/pending", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setPendingList(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách tin chờ duyệt:", err));
  };

  const handleApproveListing = async (id) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/tin-dang/change-status", {
        id: id,
        trang_thai: 'HIEN_THI'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Duyệt tin đăng thành công!");
        fetchPendingListings();
      } else {
        alert(res.data.message || "Duyệt thất bại");
      }
    } catch (err) {
      console.error("Lỗi duyệt tin đăng:", err);
      alert("Lỗi duyệt tin đăng.");
    }
  };

  const handleRejectListing = async (id) => {
    const reason = prompt("Nhập lý do từ chối bài đăng này:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("Lý do từ chối không được để trống!");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/admin/tin-dang/change-status", {
        id: id,
        trang_thai: 'TU_CHOI',
        ly_do_tu_choi: reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Từ chối tin đăng thành công!");
        fetchPendingListings();
      } else {
        alert(res.data.message || "Từ chối thất bại");
      }
    } catch (err) {
      console.error("Lỗi từ chối tin đăng:", err);
      alert("Lỗi từ chối tin đăng.");
    }
  };

  // Fetch user profile on mount
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
      console.error("Lỗi lấy thông tin profile:", err);
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

    fetchPendingListings();
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
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <div className="profile-header">
          <div>
            <div className="profile-breadcrumb">
              <span>Admin</span>
              <i className="fa-solid fa-chevron-right"></i>
              <b>Thông tin cá nhân</b>
            </div>

            <h2>Quản lý thông tin cá nhân</h2>
            <p>Xem và cập nhật thông tin tài khoản quản trị viên trong hệ thống.</p>
          </div>

          <div className="profile-header-icon">
            <i className="fa-solid fa-user-shield"></i>
          </div>
        </div>

        <div className="profile-layout">
          <div className="profile-left-card">
            <div className="profile-cover"></div>

            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <button type="button" className="avatar-edit-btn">
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>

            <div className="profile-user-info">
              <h4>{hoTen || "Quản trị viên"}</h4>
              <p>Admin hệ thống PHONGTRO HQC</p>

              <span className="profile-status">
                <i className="fa-solid fa-circle"></i>
                Đang hoạt động
              </span>
            </div>

            <div className="profile-info-list">
              <div className="profile-info-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <span>Email</span>
                  <b>{email || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="profile-info-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <span>Số điện thoại</span>
                  <b>{soDienThoai || "Chưa cập nhật"}</b>
                </div>
              </div>

              <div className="profile-info-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <span>Địa chỉ</span>
                  <b>Đà Nẵng, Việt Nam</b>
                </div>
              </div>

              <div className="profile-info-item">
                <i className="fa-solid fa-calendar-check"></i>
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

          <div className="profile-right">
            <div className="profile-stat-grid">
              <div className="profile-stat-card">
                <div className="stat-icon blue">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div>
                  <h4>245</h4>
                  <p>Người dùng quản lý</p>
                </div>
              </div>

              <div className="profile-stat-card">
                <div className="stat-icon green">
                  <i className="fa-solid fa-house-circle-check"></i>
                </div>
                <div>
                  <h4>128</h4>
                  <p>Phòng đã duyệt</p>
                </div>
              </div>

              <div className="profile-stat-card">
                <div className="stat-icon red">
                  <i className="fa-solid fa-flag"></i>
                </div>
                <div>
                  <h4>36</h4>
                  <p>Báo cáo xử lý</p>
                </div>
              </div>
            </div>

            <div className="profile-form-card">
              <div className="profile-card-title">
                <div>
                  <h5>Thông tin tài khoản</h5>
                  <p>Cập nhật thông tin cơ bản của quản trị viên</p>
                </div>

                <span className="admin-role-badge">
                  <i className="fa-solid fa-shield-halved"></i>
                  Super Admin
                </span>
              </div>

              <form onSubmit={handleSaveProfile}>
                {profileMsg && <div className="alert alert-success">{profileMsg}</div>}
                {profileErr && <div className="alert alert-danger">{profileErr}</div>}

                <div className="row g-3">
                  <div className="col-lg-6">
                    <label className="profile-label">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={hoTen}
                      onChange={(e) => setHoTen(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="profile-label">Email (Không thể sửa)</label>
                    <input
                      type="email"
                      className="form-control profile-input"
                      value={email}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="profile-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={soDienThoai}
                      onChange={(e) => setSoDienThoai(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="profile-label">Vai trò</label>
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={user?.vai_tro || "ADMIN"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="profile-label">Trạng thái tài khoản</label>
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={user?.trang_thai === "HOAT_DONG" ? "Đang hoạt động" : user?.trang_thai || "Đang hoạt động"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="profile-label">Số dư ví</label>
                    <input
                      type="text"
                      className="form-control profile-input"
                      value={user ? Number(user.so_du).toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ"}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                </div>

                <div className="profile-form-actions mt-4">
                  <button
                    type="button"
                    className="profile-cancel-btn"
                    onClick={handleCancelChanges}
                  >
                    <i className="fa-solid fa-rotate-left"></i>
                    Hủy thay đổi
                  </button>

                  <button
                    type="submit"
                    className="profile-save-btn"
                    disabled={loading}
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    {loading ? "Đang lưu..." : "Lưu thông tin"}
                  </button>
                </div>
              </form>
            </div>

            <div className="profile-security-card">
              <div className="profile-card-title">
                <div>
                  <h5>Bảo mật tài khoản</h5>
                  <p>Quản lý mật khẩu và bảo mật đăng nhập</p>
                </div>
              </div>

              <div className="security-grid">
                <div className="security-item">
                  <div className="security-icon">
                    <i className="fa-solid fa-lock"></i>
                  </div>

                  <div>
                    <h6>Đổi mật khẩu</h6>
                    <p>Cập nhật mật khẩu đăng nhập tài khoản admin.</p>
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
                    {showPwdForm ? "Đóng" : "Đổi"}
                  </button>
                </div>

                {showPwdForm && (
                  <form onSubmit={handleChangePassword} className="p-3 border rounded bg-light mt-3">
                    {pwdMsg && <div className="alert alert-success py-2">{pwdMsg}</div>}
                    {pwdErr && <div className="alert alert-danger py-2">{pwdErr}</div>}

                    <div className="mb-3">
                      <label className="form-label fs-7 fw-bold">Mật khẩu cũ</label>
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
                        {pwdLoading ? "Đang đổi..." : "Cập nhật mật khẩu"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="security-item">
                  <div className="security-icon green">
                    <i className="fa-solid fa-shield-check"></i>
                  </div>

                  <div>
                    <h6>Xác thực bảo mật</h6>
                    <p>Tài khoản đang được bảo vệ ở mức an toàn.</p>
                  </div>

                  <button type="button" className="btn btn-outline-success btn-sm">Xem</button>
                </div>
              </div>
            </div>

            {/* Danh sách tin đăng chờ duyệt */}
            <div className="profile-form-card mt-3">
              <div className="profile-card-title d-flex justify-content-between align-items-center">
                <div>
                  <h5>Danh sách tin đăng chờ duyệt</h5>
                  <p>Xem và kiểm duyệt các bài đăng mới từ chủ trọ</p>
                </div>
                <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill">
                  {pendingList.length} tin chờ duyệt
                </span>
              </div>

              <div className="pending-listings-list mt-3">
                {pendingList.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {pendingList.map(item => (
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
                              <span><i className="fa-solid fa-user me-1"></i>{item.ten_lien_he || (item.chu_tro?.ho_ten)}</span>
                              <span><i className="fa-solid fa-phone me-1"></i>{item.so_dien_thoai_lien_he || (item.chu_tro?.so_dien_thoai)}</span>
                              <span><i className="fa-solid fa-money-bill-wave me-1"></i>{Number(item.gia_thue_min).toLocaleString('vi-VN')} đ/tháng</span>
                            </div>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            <button onClick={() => handleApproveListing(item.id)} className="btn btn-sm btn-success px-3">
                              <i className="fa-solid fa-check me-1"></i> Duyệt
                            </button>
                            <button onClick={() => handleRejectListing(item.id)} className="btn btn-sm btn-danger px-3">
                              <i className="fa-solid fa-xmark me-1"></i> Từ chối
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted bg-white rounded border">
                    <i className="fa-solid fa-clipboard-check fa-2x mb-2 text-secondary"></i>
                    <p className="mb-0 small">Không có tin đăng nào đang chờ duyệt.</p>
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