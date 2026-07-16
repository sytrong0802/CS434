import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuanLyLichHen.css";

export default function QuanLyLichHen() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Load appointments
  const loadAppointments = () => {
    if (!token) return;
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/lich-hen-xem-phong", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setAppointments(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách lịch hẹn của chủ trọ:", err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, [token]);

  // Filter and search logic
  useEffect(() => {
    let result = [...appointments];

    if (selectedStatus !== "ALL") {
      result = result.filter(item => item.trang_thai === selectedStatus);
    }

    if (searchText.trim() !== "") {
      const search = searchText.toLowerCase();
      result = result.filter(item => 
        (item.khach_hang?.ho_ten && item.khach_hang.ho_ten.toLowerCase().includes(search)) ||
        (item.khach_hang?.so_dien_thoai && item.khach_hang.so_dien_thoai.includes(search)) ||
        (item.tin_dang?.tieu_de && item.tin_dang.tieu_de.toLowerCase().includes(search))
      );
    }

    setFilteredAppointments(result);
  }, [appointments, selectedStatus, searchText]);

  // Update appointment status
  const handleUpdateStatus = async (id, status, reason = "") => {
    const actionText = status === "DA_CHAP_NHAN" ? "duyệt" : "từ chối";
    if (!window.confirm(`Bạn có chắc chắn muốn ${actionText} lịch hẹn này không?`)) return;

    try {
      const payload = {
        id: id,
        trang_thai: status
      };

      if (status === "TU_CHOI") {
        payload.ly_do_tu_choi = reason || "Chủ trọ bận lịch hẹn khác";
      }

      const res = await axios.post("http://127.0.0.1:8000/api/lich-hen-xem-phong/update-status", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === 1) {
        alert("Cập nhật trạng thái lịch hẹn thành công!");
        loadAppointments();
      } else {
        alert(res.data.message || "Thao tác thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái lịch hẹn.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* HEADER NỘI DUNG */}
        <div className="content-header">
          <div className="title-area">
            <h1>Lịch hẹn xem phòng</h1>
            <p>Danh sách khách hàng đăng ký hẹn gặp xem phòng trực tiếp.</p>
          </div>
        </div>

        {/* BỘ LỌC BENTO */}
        <div className="filter-bento">
          <div className="filter-card">
            <span className="filter-label">Trạng thái</span>
            <div className="select-wrapper">
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="ALL">Tất cả trạng thái</option>
                <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
                <option value="DA_CHAP_NHAN">Đã duyệt (Chấp nhận)</option>
                <option value="TU_CHOI">Từ chối</option>
                <option value="DA_HUY">Đã hủy</option>
                <option value="DA_HOAN_THANH">Hoàn thành</option>
              </select>
            </div>
          </div>

          <div className="filter-card">
            <span className="filter-label">Thời gian</span>
            <div className="filter-fake-input">
              <i className="fa-solid fa-calendar-day"></i>
              <span>Lọc tự động</span>
            </div>
          </div>

          <div className="filter-card col-span-2">
            <span className="filter-label">Tìm kiếm khách hàng / bài đăng</span>
            <div className="search-box-inner">
              <input 
                type="text" 
                placeholder="Tên, số điện thoại hoặc bài đăng..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DANH SÁCH LỊCH HẸN */}
        <div className="cards-stack mt-3">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-5 bg-white rounded border">
              <i className="fa-solid fa-calendar-xmark text-muted fs-1 mb-3"></i>
              <p className="text-secondary fw-medium">Không tìm thấy lịch hẹn nào phù hợp.</p>
            </div>
          ) : (
            filteredAppointments.map((item) => {
              // Custom initials helper
              const nameInitials = item.khach_hang?.ho_ten
                ? item.khach_hang.ho_ten.split(" ").slice(-2).map(n => n[0]).join("").toUpperCase()
                : "KH";

              const thoiGian = new Date(item.thoi_gian_hen);
              const formattedTime = thoiGian.toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' }) + " - " + thoiGian.toLocaleDateString("vi-VN");

              return (
                <div key={item.id} className="item-card mb-3">
                  <div className="card-inner">
                    
                    {/* 1. Thông tin khách hàng */}
                    <div className="user-profile">
                      <div className="avatar">{nameInitials}</div>
                      <div className="user-details">
                        <h3>{item.khach_hang?.ho_ten || "Khách thuê"}</h3>
                        <div className="meta-row">
                          <span><i className="fa-solid fa-phone"></i> {item.khach_hang?.so_dien_thoai || "Chưa có SĐT"}</span>
                          <span><i className="fa-solid fa-envelope"></i> {item.khach_hang?.email || "Chưa có Email"}</span>
                        </div>
                        <div className="room-meta mt-1 small text-secondary">
                          <i className="fa-solid fa-house-user text-primary me-1"></i>
                          <b>Phòng muốn xem:</b> {item.tin_dang?.tieu_de || "Bài đăng trọ"}
                        </div>
                        {item.loi_nhan && (
                          <div className="user-note mt-2 p-2 bg-light rounded text-muted" style={{ fontSize: "13px" }}>
                            <strong>Lời nhắn:</strong> {item.loi_nhan}
                          </div>
                        )}
                        {item.ly_do_tu_choi && (
                          <div className="user-note mt-2 p-2 bg-danger-subtle text-danger rounded" style={{ fontSize: "13px" }}>
                            <strong>Lý do từ chối:</strong> {item.ly_do_tu_choi}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 2. Khối thời gian & Trạng thái */}
                    <div className="time-status">
                      <div className="time-badge blue-text">
                        <i className="fa-solid fa-clock"></i>
                        <span>{formattedTime}</span>
                      </div>
                      
                      {item.trang_thai === "CHO_XAC_NHAN" && (
                        <span className="status-pill pill-warning">Chờ xác nhận</span>
                      )}
                      {item.trang_thai === "DA_CHAP_NHAN" && (
                        <span className="status-pill pill-success">Đã duyệt</span>
                      )}
                      {item.trang_thai === "TU_CHOI" && (
                        <span className="status-pill pill-danger">Từ chối</span>
                      )}
                      {item.trang_thai === "DA_HUY" && (
                        <span className="status-pill pill-secondary">Đã hủy</span>
                      )}
                      {item.trang_thai === "DA_HOAN_THANH" && (
                        <span className="status-pill pill-info">Hoàn thành</span>
                      )}
                    </div>

                    {/* 3. KHỐI THAO TÁC (ACTION BUTTONS) */}
                    <div className="card-actions">
                      {item.trang_thai === "CHO_XAC_NHAN" && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(item.id, "DA_CHAP_NHAN")}
                            className="btn-action btn-approve" 
                            title="Duyệt lịch hẹn"
                          >
                            <i className="fa-solid fa-check"></i> Duyệt lịch
                          </button>
                          
                          <button 
                            onClick={() => {
                              const reason = window.prompt("Nhập lý do từ chối lịch hẹn:");
                              if (reason !== null) {
                                handleUpdateStatus(item.id, "TU_CHOI", reason);
                              }
                            }}
                            className="btn-action btn-reject" 
                            title="Từ chối lịch hẹn"
                          >
                            <i className="fa-solid fa-xmark"></i> Từ chối
                          </button>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}