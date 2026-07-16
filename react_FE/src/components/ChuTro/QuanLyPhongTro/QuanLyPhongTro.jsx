import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./QuanLyPhongTro.css";

export default function QuanLyPhongTro() {
  const navigate = useNavigate();
  const [nhaTros, setNhaTros] = useState([]);
  const [selectedNhaTroId, setSelectedNhaTroId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Modal display states
  const [showAddNhaTroModal, setShowAddNhaTroModal] = useState(false);
  const [showAddPhongTroModal, setShowAddPhongTroModal] = useState(false);
  const [showNguoiOModal, setShowNguoiOModal] = useState(false);

  // Modal "Người ở" data
  const [selectedRoomForNguoiO, setSelectedRoomForNguoiO] = useState(null);
  const [nguoiOs, setNguoiOs] = useState([]);
  const [loadingNguoiOs, setLoadingNguoiOs] = useState(false);

  // Form "Thêm nhà trọ" states
  const [newNhaTroName, setNewNhaTroName] = useState("");
  const [newNhaTroTinhThanhId, setNewNhaTroTinhThanhId] = useState("");
  const [newNhaTroQuanHuyenId, setNewNhaTroQuanHuyenId] = useState("");
  const [newNhaTroPhuongXaId, setNewNhaTroPhuongXaId] = useState("");
  const [newNhaTroDiaChi, setNewNhaTroDiaChi] = useState("");
  const [newNhaTroViDo, setNewNhaTroViDo] = useState("");
  const [newNhaTroKinhDo, setNewNhaTroKinhDo] = useState("");
  const [listTinhThanh, setListTinhThanh] = useState([]);
  const [listQuanHuyen, setListQuanHuyen] = useState([]);
  const [listPhuongXa, setListPhuongXa] = useState([]);

  // Form "Thêm phòng trọ" states
  const [newPhongName, setNewPhongName] = useState("");
  const [newPhongGiaThue, setNewPhongGiaThue] = useState("");
  const [newPhongDienTich, setNewPhongDienTich] = useState("");
  const [newPhongSucChua, setNewPhongSucChua] = useState("2");
  const [newPhongGioiTinh, setNewPhongGioiTinh] = useState("KHONG_GIOI_HAN");
  const [newPhongNoiThat, setNewPhongNoiThat] = useState("TRONG");
  const [newPhongGhiChu, setNewPhongGhiChu] = useState("");
  const [newPhongAnhDaiDien, setNewPhongAnhDaiDien] = useState("");
  const [newPhongTienIchIds, setNewPhongTienIchIds] = useState([]);
  const [listTienIch, setListTienIch] = useState([]);

  const handlePhongTienIchCheckboxChange = (id) => {
    if (newPhongTienIchIds.includes(id)) {
      setNewPhongTienIchIds(newPhongTienIchIds.filter(item => item !== id));
    } else {
      setNewPhongTienIchIds([...newPhongTienIchIds, id]);
    }
  };

  // Form "Sửa phòng trọ" states
  const [showEditPhongTroModal, setShowEditPhongTroModal] = useState(false);
  const [editPhongId, setEditPhongId] = useState("");
  const [editPhongName, setEditPhongName] = useState("");
  const [editPhongGiaThue, setEditPhongGiaThue] = useState("");
  const [editPhongDienTich, setEditPhongDienTich] = useState("");
  const [editPhongSucChua, setEditPhongSucChua] = useState("2");
  const [editPhongGioiTinh, setEditPhongGioiTinh] = useState("KHONG_GIOI_HAN");
  const [editPhongNoiThat, setEditPhongNoiThat] = useState("TRONG");
  const [editPhongGhiChu, setEditPhongGhiChu] = useState("");
  const [editPhongAnhDaiDien, setEditPhongAnhDaiDien] = useState("");
  const [editPhongTienIchIds, setEditPhongTienIchIds] = useState([]);

  const handleEditPhongTienIchCheckboxChange = (id) => {
    if (editPhongTienIchIds.includes(id)) {
      setEditPhongTienIchIds(editPhongTienIchIds.filter(item => item !== id));
    } else {
      setEditPhongTienIchIds([...editPhongTienIchIds, id]);
    }
  };

  // State "Người ở phòng" & "Lịch hẹn"
  const [appointments, setAppointments] = useState([]);
  const [showAddTenantForm, setShowAddTenantForm] = useState(false);
  const [newTenantHoTen, setNewTenantHoTen] = useState("");
  const [newTenantSdt, setNewTenantSdt] = useState("");
  const [newTenantGioiTinh, setNewTenantGioiTinh] = useState("NAM");
  const [newTenantNgayVao, setNewTenantNgayVao] = useState(new Date().toISOString().split('T')[0]);
  const [newTenantKhachHangId, setNewTenantKhachHangId] = useState(null);

  // Load houses
  const loadHouses = (selectNewId = null) => {
    if (!token) return;
    axios.get("http://127.0.0.1:8000/api/nha-tro", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setNhaTros(res.data.data);
        if (res.data.data.length > 0) {
          if (selectNewId) {
            setSelectedNhaTroId(selectNewId);
          } else if (!selectedNhaTroId) {
            setSelectedNhaTroId(res.data.data[0].id);
          }
        }
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách nhà trọ:", err));
  };

  // Load houses on mount
  useEffect(() => {
    loadHouses();
  }, [token]);

  // Load provinces and utilities on mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tinh-thanh")
      .then(res => {
        if (res.data.status === 1) {
          setListTinhThanh(res.data.data);
        }
      })
      .catch(err => console.error(err));

    axios.get("http://127.0.0.1:8000/api/tien-ich")
      .then(res => {
        if (res.data.status === 1) {
          setListTienIch(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleTinhThanhChangeForAdd = (e) => {
    const tinhId = e.target.value;
    setNewNhaTroTinhThanhId(tinhId);
    setNewNhaTroQuanHuyenId("");
    setNewNhaTroPhuongXaId("");
    setListQuanHuyen([]);
    setListPhuongXa([]);
    if (tinhId) {
      axios.get(`http://127.0.0.1:8000/api/quan-huyen?tinh_thanh_id=${tinhId}`)
        .then(res => {
          if (res.data.status === 1) {
            setListQuanHuyen(res.data.data);
          }
        })
        .catch(err => console.error(err));
    }
  };

  const handleQuanHuyenChangeForAdd = (e) => {
    const quanId = e.target.value;
    setNewNhaTroQuanHuyenId(quanId);
    setNewNhaTroPhuongXaId("");
    setListPhuongXa([]);
    if (quanId) {
      axios.get(`http://127.0.0.1:8000/api/phuong-xa?quan_huyen_id=${quanId}`)
        .then(res => {
          if (res.data.status === 1) {
            setListPhuongXa(res.data.data);
          }
        })
        .catch(err => console.error(err));
    }
  };

  // Submit handers
  const handleAddNhaTro = (e) => {
    e.preventDefault();
    if (!token) return;
    
    const payload = {
      ten_nha_tro: newNhaTroName,
      tinh_thanh_id: newNhaTroTinhThanhId,
      quan_huyen_id: newNhaTroQuanHuyenId,
      phuong_xa_id: newNhaTroPhuongXaId,
      dia_chi_chi_tiet: newNhaTroDiaChi,
      vi_do: newNhaTroViDo ? Number(newNhaTroViDo) : null,
      kinh_do: newNhaTroKinhDo ? Number(newNhaTroKinhDo) : null,
    };

    axios.post("http://127.0.0.1:8000/api/nha-tro", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Thêm nhà trọ thành công!");
        setShowAddNhaTroModal(false);
        setNewNhaTroName("");
        setNewNhaTroTinhThanhId("");
        setNewNhaTroQuanHuyenId("");
        setNewNhaTroPhuongXaId("");
        setNewNhaTroDiaChi("");
        setNewNhaTroViDo("");
        setNewNhaTroKinhDo("");
        loadHouses(res.data.data.id);
      } else {
        alert(res.data.message || "Thêm nhà trọ thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi thêm nhà trọ.");
    });
  };

  const handleAddPhongTro = (e) => {
    e.preventDefault();
    if (!token) return;
    if (!selectedNhaTroId) {
      alert("Vui lòng chọn nhà trọ trước.");
      return;
    }

    const payload = {
      nha_tro_id: Number(selectedNhaTroId),
      ten_phong: newPhongName,
      gia_thue: Number(newPhongGiaThue),
      dien_tich: Number(newPhongDienTich),
      suc_chua_toi_da: Number(newPhongSucChua),
      gioi_tinh_duoc_thue: newPhongGioiTinh,
      tinh_trang_noi_that: newPhongNoiThat,
      ghi_chu: newPhongGhiChu,
      anh_dai_dien: newPhongAnhDaiDien || null,
      tien_ich_ids: newPhongTienIchIds,
    };

    axios.post("http://127.0.0.1:8000/api/phong-tro", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Thêm phòng trọ thành công!");
        setShowAddPhongTroModal(false);
        setNewPhongName("");
        setNewPhongGiaThue("");
        setNewPhongDienTich("");
        setNewPhongSucChua("2");
        setNewPhongGioiTinh("KHONG_GIOI_HAN");
        setNewPhongNoiThat("TRONG");
        setNewPhongGhiChu("");
        setNewPhongAnhDaiDien("");
        setNewPhongTienIchIds([]);
        loadRooms();
      } else {
        alert(res.data.message || "Thêm phòng trọ thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi thêm phòng trọ.");
    });
  };

  const handleShowNguoiO = (room) => {
    setSelectedRoomForNguoiO(room);
    setShowNguoiOModal(true);
    setLoadingNguoiOs(true);
    setNguoiOs([]);
    setAppointments([]);
    setShowAddTenantForm(false);
    setNewTenantHoTen("");
    setNewTenantSdt("");
    setNewTenantGioiTinh("NAM");
    setNewTenantKhachHangId(null);

    axios.get(`http://127.0.0.1:8000/api/nguoi-o-phong?phong_tro_id=${room.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setNguoiOs(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi lấy thông tin người ở:", err))
    .finally(() => setLoadingNguoiOs(false));

    // Fetch viewing appointments for this room (approved or pending)
    axios.get("http://127.0.0.1:8000/api/lich-hen-xem-phong", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        const filtered = res.data.data.filter(
          appt => appt.phong_tro_id === room.id && 
          (appt.trang_thai === "DA_CHAP_NHAN" || appt.trang_thai === "DA_XAC_NHAN" || appt.trang_thai === "CHO_XAC_NHAN")
        );
        setAppointments(filtered);
      }
    })
    .catch(err => console.error("Lỗi lấy lịch hẹn:", err));
  };

  // Delete Room from warehouse
  const handleDeleteRoom = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa phòng trọ này khỏi kho?")) return;
    axios.delete(`http://127.0.0.1:8000/api/phong-tro/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Xóa phòng trọ thành công!");
        loadRooms();
      } else {
        alert(res.data.message || "Xóa phòng trọ thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi xóa phòng trọ.");
    });
  };

  // Toggle Room Status (Ẩn/Hiện / Đổi trạng thái)
  const handleToggleRoomStatus = (room) => {
    const newStatus = room.trang_thai === "CON_TRONG" ? "HET_PHONG" : "CON_TRONG";
    const payload = {
      id: room.id,
      ten_phong: room.ten_phong,
      gia_thue: Number(room.gia_thue),
      dien_tich: Number(room.dien_tich),
      trang_thai: newStatus,
      suc_chua_toi_da: Number(room.suc_chua_toi_da),
      gioi_tinh_duoc_thue: room.gioi_tinh_duoc_thue,
      tinh_trang_noi_that: room.tinh_trang_noi_that,
      ghi_chu: room.ghi_chu,
      anh_dai_dien: room.anh_dai_dien,
      tien_ich_ids: room.tien_ich_ids,
    };

    axios.put("http://127.0.0.1:8000/api/phong-tro", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert(`Cập nhật trạng thái phòng thành công!`);
        loadRooms();
      } else {
        alert(res.data.message || "Cập nhật trạng thái thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái phòng.");
    });
  };

  // Prepare Edit Room states
  const handleEditRoom = (room) => {
    setEditPhongId(room.id);
    setEditPhongName(room.ten_phong);
    setEditPhongGiaThue(room.gia_thue);
    setEditPhongDienTich(room.dien_tich);
    setEditPhongSucChua(room.suc_chua_toi_da);
    setEditPhongGioiTinh(room.gioi_tinh_duoc_thue);
    setEditPhongNoiThat(room.tinh_trang_noi_that);
    setEditPhongGhiChu(room.ghi_chu || "");
    setEditPhongAnhDaiDien(room.anh_dai_dien || "");
    setEditPhongTienIchIds(room.tien_ich_ids || []);
    setShowEditPhongTroModal(true);
  };

  // Update Room Action
  const handleUpdatePhongTro = (e) => {
    e.preventDefault();
    if (!token) return;

    const payload = {
      id: editPhongId,
      ten_phong: editPhongName,
      gia_thue: Number(editPhongGiaThue),
      dien_tich: Number(editPhongDienTich),
      trang_thai: "CON_TRONG",
      suc_chua_toi_da: Number(editPhongSucChua),
      gioi_tinh_duoc_thue: editPhongGioiTinh,
      tinh_trang_noi_that: editPhongNoiThat,
      ghi_chu: editPhongGhiChu,
      anh_dai_dien: editPhongAnhDaiDien || null,
      tien_ich_ids: editPhongTienIchIds,
    };

    axios.put("http://127.0.0.1:8000/api/phong-tro", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Cập nhật phòng trọ thành công!");
        setShowEditPhongTroModal(false);
        loadRooms();
      } else {
        alert(res.data.message || "Cập nhật phòng trọ thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi sửa phòng trọ.");
    });
  };

  // Select Appointment to prefill tenant details
  const handleSelectAppointment = (appt) => {
    if (appt.khach_hang) {
      setNewTenantHoTen(appt.khach_hang.ho_ten || "");
      setNewTenantSdt(appt.khach_hang.so_dien_thoai || "");
      setNewTenantGioiTinh(appt.khach_hang.gioi_tinh === "NU" ? "NU" : "NAM");
      setNewTenantKhachHangId(appt.khach_hang.id);
    }
  };

  // Add Tenant to Room
  const handleAddTenant = (e) => {
    e.preventDefault();
    if (!selectedRoomForNguoiO) return;

    const payload = {
      phong_tro_id: selectedRoomForNguoiO.id,
      khach_hang_id: newTenantKhachHangId,
      ho_ten: newTenantHoTen,
      so_dien_thoai: newTenantSdt,
      gioi_tinh: newTenantGioiTinh,
      ngay_vao: newTenantNgayVao,
    };

    axios.post("http://127.0.0.1:8000/api/nguoi-o-phong", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Thêm người ở thành công!");
        setNewTenantHoTen("");
        setNewTenantSdt("");
        setNewTenantKhachHangId(null);
        setShowAddTenantForm(false);
        handleShowNguoiO(selectedRoomForNguoiO);
        loadRooms();
      } else {
        alert(res.data.message || "Thêm người ở thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi thêm người ở.");
    });
  };

  // Delete/Remove Tenant
  const handleDeleteTenant = (tenantId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người này khỏi phòng?")) return;

    axios.delete(`http://127.0.0.1:8000/api/nguoi-o-phong/${tenantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Đã xóa người ở khỏi phòng!");
        handleShowNguoiO(selectedRoomForNguoiO);
        loadRooms();
      } else {
        alert(res.data.message || "Xóa người ở thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Đã xảy ra lỗi khi xóa người ở.");
    });
  };

  // Load rooms for selected house
  const loadRooms = () => {
    if (!selectedNhaTroId) return;
    setLoading(true);
    axios.get(`http://127.0.0.1:8000/api/phong-tro?nha_tro_id=${selectedNhaTroId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setRooms(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi lấy danh sách phòng trọ:", err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRooms();
  }, [selectedNhaTroId]);

  // Delete listing (Hủy / Xóa tin đăng)
  const handleCancelListing = async (tinDangId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy/xóa tin đăng này không? Tin đăng sẽ bị xóa khỏi hệ thống và phòng trọ sẽ trở lại trạng thái chưa đăng tin.")) return;

    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/tin-dang/${tinDangId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 1) {
        alert("Hủy đăng tin thành công!");
        loadRooms(); // Refresh room list
      } else {
        alert(res.data.message || "Hủy đăng tin thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi hủy đăng tin.");
    }
  };

  return (
    <div className="room-warehouse">
      <div className="warehouse-container">
        
        {/* THANH ĐẦU KHO: TIÊU ĐỀ, TÌM KIẾM & THÊM PHÒNG */}
        <div className="warehouse-header d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="warehouse-header__title">
            <h4>
              <i className="fa-solid fa-house-chimney-user icon-main"></i>
              Kho Quản Lý Phòng Trọ
            </h4>
            <p>Tổng cộng {rooms.length} phòng đang được quản lý trong nhà trọ</p>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-secondary text-nowrap">Chọn nhà trọ:</span>
              <select 
                className="form-select form-select-sm"
                value={selectedNhaTroId}
                onChange={(e) => setSelectedNhaTroId(e.target.value)}
                style={{ minWidth: "200px", borderRadius: "8px" }}
              >
                {nhaTros.length === 0 && <option value="">-- Chưa có nhà trọ --</option>}
                {nhaTros.map((house) => (
                  <option key={house.id} value={house.id}>
                    {house.ten_nha_tro}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
              style={{ borderRadius: "8px" }}
              onClick={() => setShowAddNhaTroModal(true)}
            >
              <i className="fa-solid fa-plus-circle"></i>
              Thêm nhà trọ
            </button>

            <button 
              className="btn btn-sm btn-success d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
              style={{ borderRadius: "8px" }}
              onClick={() => setShowAddPhongTroModal(true)}
              disabled={!selectedNhaTroId}
            >
              <i className="fa-solid fa-house-medical"></i>
              Thêm phòng trọ
            </button>
          </div>
        </div>

        {/* BẢNG LƯU TRỮ PHÒNG CHÍNH */}
        <div className="warehouse-content mt-3">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 border">
              <i className="fa-solid fa-folder-open text-muted fs-1 mb-3"></i>
              <p className="text-secondary fw-medium">Chưa có phòng trọ nào thuộc nhà trọ này.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="warehouse-table">
                <thead>
                  <tr>
                    <th>Tên phòng</th>
                    <th>Loại hình / Diện tích</th>
                    <th>Giá thuê (VNĐ)</th>
                    <th>Liên kết tin đăng</th>
                    <th className="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id} className="warehouse-table__row">
                      <td className="col-name fw-bold">Phòng {room.ten_phong}</td>
                      <td className="col-type">
                        <span className="type-name">
                          {room.tinh_trang_noi_that === "TRONG" ? "Trống" : 
                           room.tinh_trang_noi_that === "CO_BAN" ? "Nội thất cơ bản" :
                           room.tinh_trang_noi_that === "DAY_DU" ? "Nội thất đầy đủ" : "Cao cấp"}
                        </span>
                        <span className="type-divider">•</span>
                        <span className="type-size">{room.dien_tich}m²</span>
                      </td>
                      <td className="col-price">
                        {Number(room.gia_thue).toLocaleString("vi-VN")} <span className="price-unit">/tháng</span>
                      </td>
                      <td className="col-status">
                        {room.tin_dang_id === null ? (
                          <button
                            onClick={() => navigate(`/chu-tro/dang-tin-phong-tro?phong_tro_id=${room.id}`)}
                            className="btn-action-publish"
                            title="Phòng chưa có bài đăng - Click để đăng tin"
                          >
                            <i className="fa-solid fa-paper-plane me-1"></i>
                            Đăng tin
                          </button>
                        ) : (
                          <div className="d-flex align-items-center gap-2">
                            <span className="status-tag status-tag--green">
                              <span className="status-tag__dot"></span>
                              Đã đăng
                            </span>
                            <button
                              onClick={() => handleCancelListing(room.tin_dang_id)}
                              className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill fw-bold"
                              style={{ fontSize: "11px" }}
                              title="Hủy bài đăng và hoàn tác trạng thái phòng"
                            >
                              Hủy
                            </button>
                          </div>
                        )}
                      </td>
                      
                      <td className="col-actions text-right">
                        <div className="action-buttons">
                          <button 
                            className="btn-icon btn-icon--tenants text-primary" 
                            title="Thông tin người ở"
                            onClick={() => handleShowNguoiO(room)}
                          >
                            <i className="fa-solid fa-users"></i>
                          </button>
                          <button 
                            className="btn-icon btn-icon--edit text-warning" 
                            title="Chỉnh sửa phòng"
                            onClick={() => handleEditRoom(room)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button 
                            className="btn-icon btn-icon--toggle" 
                            title={room.trang_thai === "HET_PHONG" ? "Hiện phòng (Trống)" : "Ẩn phòng (Hết phòng)"}
                            onClick={() => handleToggleRoomStatus(room)}
                          >
                            <i className={room.trang_thai === "HET_PHONG" ? "fa-solid fa-eye-slash text-secondary" : "fa-solid fa-eye text-success"}></i>
                          </button>
                          <button 
                            className="btn-icon btn-icon--delete text-danger" 
                            title="Xóa khỏi kho"
                            onClick={() => handleDeleteRoom(room.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* PHÂN TRANG DƯỚI ĐÁY BẢNG */}
          <div className="warehouse-pagination mt-3">
            <span>Hiển thị {rooms.length} phòng</span>
          </div>

        </div>
      </div>

      {/* MODAL THÊM NHÀ TRỌ */}
      {showAddNhaTroModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card">
            <div className="custom-modal-header bg-primary text-white py-3">
              <h5 className="modal-title text-white fw-bold"><i className="fa-solid fa-house-circle-check me-2"></i>Thêm Nhà Trọ Mới</h5>
              <button className="close-btn text-white" onClick={() => setShowAddNhaTroModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddNhaTro}>
              <div className="custom-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên nhà trọ <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ví dụ: Nhà trọ Thanh Xuân" 
                    value={newNhaTroName}
                    onChange={(e) => setNewNhaTroName(e.target.value)}
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Tỉnh/Thành phố <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={newNhaTroTinhThanhId}
                      onChange={handleTinhThanhChangeForAdd}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {listTinhThanh.map(t => (
                        <option key={t.id} value={t.id}>{t.ten_tinh}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Quận/Huyện <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={newNhaTroQuanHuyenId}
                      onChange={handleQuanHuyenChangeForAdd}
                      disabled={!newNhaTroTinhThanhId}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {listQuanHuyen.map(q => (
                        <option key={q.id} value={q.id}>{q.ten_quan}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Phường/Xã <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={newNhaTroPhuongXaId}
                      onChange={(e) => setNewNhaTroPhuongXaId(e.target.value)}
                      disabled={!newNhaTroQuanHuyenId}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {listPhuongXa.map(p => (
                        <option key={p.id} value={p.id}>{p.ten_xa}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Địa chỉ chi tiết <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Số nhà, tên đường..." 
                    value={newNhaTroDiaChi}
                    onChange={(e) => setNewNhaTroDiaChi(e.target.value)}
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Vĩ độ (Latitude)</label>
                    <input 
                      type="number" 
                      step="any" 
                      className="form-control" 
                      placeholder="16.0544" 
                      value={newNhaTroViDo}
                      onChange={(e) => setNewNhaTroViDo(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Kinh độ (Longitude)</label>
                    <input 
                      type="number" 
                      step="any" 
                      className="form-control" 
                      placeholder="108.2022" 
                      value={newNhaTroKinhDo}
                      onChange={(e) => setNewNhaTroKinhDo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="custom-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddNhaTroModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">Xác nhận thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL THÊM PHÒNG TRỌ */}
      {showAddPhongTroModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card">
            <div className="custom-modal-header bg-success text-white py-3">
              <h5 className="modal-title text-white fw-bold"><i className="fa-solid fa-house-medical me-2"></i>Thêm Phòng Trọ Mới</h5>
              <button className="close-btn text-white" onClick={() => setShowAddPhongTroModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddPhongTro}>
              <div className="custom-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên/Số phòng <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ví dụ: 101, A2,..." 
                    value={newPhongName}
                    onChange={(e) => setNewPhongName(e.target.value)}
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Giá thuê (VNĐ/tháng) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Ví dụ: 2500000" 
                      value={newPhongGiaThue}
                      onChange={(e) => setNewPhongGiaThue(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Diện tích (m²) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      step="any"
                      className="form-control" 
                      placeholder="Ví dụ: 25" 
                      value={newPhongDienTich}
                      onChange={(e) => setNewPhongDienTich(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Sức chứa tối đa (người) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={newPhongSucChua}
                      onChange={(e) => setNewPhongSucChua(e.target.value)}
                      min="1"
                      required 
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Giới tính được thuê <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={newPhongGioiTinh}
                      onChange={(e) => setNewPhongGioiTinh(e.target.value)}
                      required
                    >
                      <option value="KHONG_GIOI_HAN">Không giới hạn</option>
                      <option value="NAM">Nam</option>
                      <option value="NU">Nữ</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Nội thất <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={newPhongNoiThat}
                      onChange={(e) => setNewPhongNoiThat(e.target.value)}
                      required
                    >
                      <option value="TRONG">Trống</option>
                      <option value="CO_BAN">Cơ bản</option>
                      <option value="DAY_DU">Đầy đủ</option>
                      <option value="CAO_CAP">Cao cấp</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Ghi chú / Mô tả chi tiết</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Ghi chú về tiền điện, tiền nước hoặc các quy định..."
                    value={newPhongGhiChu}
                    onChange={(e) => setNewPhongGhiChu(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">URL hình ảnh phòng trọ</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nhập URL liên kết ảnh (ví dụ: https://images.unsplash.com/...)" 
                    value={newPhongAnhDaiDien}
                    onChange={(e) => setNewPhongAnhDaiDien(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold d-block text-start">Tiện ích phòng trọ kèm theo</label>
                  <div className="border rounded p-3 bg-light" style={{ maxHeight: '160px', overflowY: 'auto', textAlign: 'left' }}>
                    {listTienIch.length > 0 ? (
                      <div className="row">
                        {listTienIch.map(item => (
                          <div className="col-md-6 mb-2 text-start" key={item.id}>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`phong-utility-${item.id}`}
                                checked={newPhongTienIchIds.includes(item.id)}
                                onChange={() => handlePhongTienIchCheckboxChange(item.id)}
                                style={{ cursor: "pointer" }}
                              />
                              <label className="form-check-label small ms-2" htmlFor={`phong-utility-${item.id}`} style={{ cursor: "pointer" }}>
                                {item.bieu_tuong && <i className={`${item.bieu_tuong} me-1 text-muted`}></i>}
                                {item.ten_tien_ich}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted small">Không tìm thấy tiện ích nào</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="custom-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddPhongTroModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-success">Thêm phòng</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL SỬA PHÒNG TRỌ */}
      {showEditPhongTroModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card">
            <div className="custom-modal-header bg-warning text-white py-3">
              <h5 className="modal-title text-white fw-bold"><i className="fa-solid fa-pen-to-square me-2"></i>Chỉnh Sửa Phòng Trọ</h5>
              <button className="close-btn text-white" onClick={() => setShowEditPhongTroModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleUpdatePhongTro}>
              <div className="custom-modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên/Số phòng <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ví dụ: 101, A2,..." 
                    value={editPhongName}
                    onChange={(e) => setEditPhongName(e.target.value)}
                    required 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Giá thuê (VNĐ/tháng) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Ví dụ: 2500000" 
                      value={editPhongGiaThue}
                      onChange={(e) => setEditPhongGiaThue(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Diện tích (m²) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      step="any"
                      className="form-control" 
                      placeholder="Ví dụ: 25" 
                      value={editPhongDienTich}
                      onChange={(e) => setEditPhongDienTich(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Sức chứa tối đa (người) <span className="text-danger">*</span></label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editPhongSucChua}
                      onChange={(e) => setEditPhongSucChua(e.target.value)}
                      min="1"
                      required 
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Giới tính được thuê <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={editPhongGioiTinh}
                      onChange={(e) => setEditPhongGioiTinh(e.target.value)}
                      required
                    >
                      <option value="KHONG_GIOI_HAN">Không giới hạn</option>
                      <option value="NAM">Nam</option>
                      <option value="NU">Nữ</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Nội thất <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      value={editPhongNoiThat}
                      onChange={(e) => setEditPhongNoiThat(e.target.value)}
                      required
                    >
                      <option value="TRONG">Trống</option>
                      <option value="CO_BAN">Cơ bản</option>
                      <option value="DAY_DU">Đầy đủ</option>
                      <option value="CAO_CAP">Cao cấp</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Ghi chú / Mô tả chi tiết</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Ghi chú..."
                    value={editPhongGhiChu}
                    onChange={(e) => setEditPhongGhiChu(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">URL hình ảnh phòng trọ</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nhập URL liên kết ảnh..." 
                    value={editPhongAnhDaiDien}
                    onChange={(e) => setEditPhongAnhDaiDien(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold d-block text-start">Tiện ích phòng trọ kèm theo</label>
                  <div className="border rounded p-3 bg-light" style={{ maxHeight: '160px', overflowY: 'auto', textAlign: 'left' }}>
                    {listTienIch.length > 0 ? (
                      <div className="row">
                        {listTienIch.map(item => (
                          <div className="col-md-6 mb-2 text-start" key={item.id}>
                            <div className="form-check d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`edit-phong-utility-${item.id}`}
                                checked={editPhongTienIchIds.includes(item.id)}
                                onChange={() => handleEditPhongTienIchCheckboxChange(item.id)}
                                style={{ cursor: "pointer" }}
                              />
                              <label className="form-check-label small ms-2" htmlFor={`edit-phong-utility-${item.id}`} style={{ cursor: "pointer" }}>
                                {item.bieu_tuong && <i className={`${item.bieu_tuong} me-1 text-muted`}></i>}
                                {item.ten_tien_ich}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted small">Không tìm thấy tiện ích nào</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="custom-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditPhongTroModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-warning text-white fw-bold">Cập nhật phòng</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL THÔNG TIN NGƯỜI Ở */}
      {showNguoiOModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card" style={{ maxWidth: "750px" }}>
            <div className="custom-modal-header bg-info text-white py-3">
              <h5 className="modal-title text-white fw-bold">
                <i className="fa-solid fa-users me-2"></i>
                Danh sách người ở - Phòng {selectedRoomForNguoiO?.ten_phong}
              </h5>
              <button className="close-btn text-white" onClick={() => setShowNguoiOModal(false)}>&times;</button>
            </div>
            <div className="custom-modal-body">
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0 text-start">Danh sách người thuê phòng</h6>
                <button 
                  className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                  onClick={() => setShowAddTenantForm(!showAddTenantForm)}
                >
                  <i className={`fa-solid ${showAddTenantForm ? "fa-minus-circle" : "fa-plus-circle"}`}></i>
                  {showAddTenantForm ? "Đóng form thêm" : "Thêm người ở"}
                </button>
              </div>

              {/* FORM THÊM NGƯỜI Ở */}
              {showAddTenantForm && (
                <div className="border rounded p-3 mb-4 bg-light">
                  <div className="row">
                    
                    {/* PANEL CHỌN TỪ LỊCH HẸN */}
                    <div className="col-md-6 border-end text-start">
                      <h6 className="fw-bold text-success mb-2 small"><i className="fa-solid fa-calendar-check me-1"></i>Chọn từ lịch hẹn đã duyệt/chờ</h6>
                      <p className="text-muted" style={{ fontSize: "11px" }}>Danh sách khách đặt lịch hẹn xem phòng này:</p>
                      <div style={{ maxHeight: "200px", overflowY: "auto" }} className="pe-2">
                        {appointments.length === 0 ? (
                          <div className="text-center py-3 bg-white rounded border">
                            <span className="text-muted small">Không tìm thấy lịch hẹn phù hợp.</span>
                          </div>
                        ) : (
                          appointments.map(appt => (
                            <div key={appt.id} className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2 bg-white p-2 rounded border">
                              <div style={{ fontSize: "12px" }}>
                                <strong className="text-primary">{appt.khach_hang?.ho_ten}</strong><br/>
                                <span className="text-secondary small">{appt.khach_hang?.so_dien_thoai}</span>
                              </div>
                              <button 
                                type="button" 
                                className="btn btn-xs btn-success py-0 px-2 fw-semibold"
                                style={{ fontSize: "11px" }}
                                onClick={() => handleSelectAppointment(appt)}
                              >
                                Chọn
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* FORM NHẬP THÔNG TIN */}
                    <div className="col-md-6 text-start">
                      <h6 className="fw-bold text-primary mb-2 small"><i className="fa-solid fa-user-plus me-1"></i>Thông tin người thuê</h6>
                      <p className="text-muted" style={{ fontSize: "11px" }}>Nhập thủ công hoặc bấm Chọn từ danh sách lịch hẹn bên trái:</p>
                      <form onSubmit={handleAddTenant}>
                        <div className="mb-2">
                          <label className="form-label small fw-bold mb-0">Họ và tên *</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            value={newTenantHoTen} 
                            onChange={e => setNewTenantHoTen(e.target.value)} 
                            required 
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label small fw-bold mb-0">Số điện thoại *</label>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            value={newTenantSdt} 
                            onChange={e => setNewTenantSdt(e.target.value)} 
                            required 
                          />
                        </div>
                        <div className="row mb-2">
                          <div className="col-6 text-start">
                            <label className="form-label small fw-bold mb-0">Giới tính *</label>
                            <select 
                              className="form-select form-select-sm" 
                              value={newTenantGioiTinh} 
                              onChange={e => setNewTenantGioiTinh(e.target.value)}
                            >
                              <option value="NAM">Nam</option>
                              <option value="NU">Nữ</option>
                            </select>
                          </div>
                          <div className="col-6 text-start">
                            <label className="form-label small fw-bold mb-0">Ngày vào *</label>
                            <input 
                              type="date" 
                              className="form-control form-control-sm" 
                              value={newTenantNgayVao} 
                              onChange={e => setNewTenantNgayVao(e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowAddTenantForm(false)}>Hủy</button>
                          <button type="submit" className="btn btn-sm btn-primary">Xác nhận thêm</button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
              )}

              {loadingNguoiOs ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                  </div>
                </div>
              ) : nguoiOs.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-3">
                  <i className="fa-solid fa-user-slash text-muted fs-2 mb-2"></i>
                  <p className="text-secondary mb-0 fw-medium">Phòng này hiện chưa có thông tin người ở.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0 text-start">
                    <thead className="table-light">
                      <tr>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Ngày vào</th>
                        <th>Ngày rời</th>
                        <th>Trạng thái</th>
                        <th className="text-end">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nguoiOs.map((tenant) => (
                        <tr key={tenant.id}>
                          <td className="fw-bold">{tenant.ho_ten}</td>
                          <td>{tenant.so_dien_thoai}</td>
                          <td>
                            {tenant.gioi_tinh === "NAM" ? "Nam" : 
                             tenant.gioi_tinh === "NU" ? "Nữ" : "Khác"}
                          </td>
                          <td>{tenant.ngay_vao ? new Date(tenant.ngay_vao).toLocaleDateString("vi-VN") : "N/A"}</td>
                          <td>{tenant.ngay_roi ? new Date(tenant.ngay_roi).toLocaleDateString("vi-VN") : "-"}</td>
                          <td>
                            {tenant.trang_thai === "DANG_O" ? (
                              <span className="badge bg-success">Đang ở</span>
                            ) : (
                              <span className="badge bg-secondary">Đã rời</span>
                            )}
                          </td>
                          <td className="text-end">
                            {tenant.trang_thai === "DANG_O" && (
                              <button 
                                className="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill fw-bold"
                                style={{ fontSize: "11px" }}
                                onClick={() => handleDeleteTenant(tenant.id)}
                              >
                                Xóa
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
            <div className="custom-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowNguoiOModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}