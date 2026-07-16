import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DangTinPhongTro() {
  const [searchParams] = useSearchParams();
  const urlPhongTroId = searchParams.get('phong_tro_id');
  const navigate = useNavigate();

  // 1. Form state variables
  const [tieuDe, setTieuDe] = useState('');
  const [moTa, setMoTa] = useState('');
  const [diaChiChiTiet, setDiaChiChiTiet] = useState('');
  const [selectedTinhThanhId, setSelectedTinhThanhId] = useState('');
  const [selectedQuanHuyenId, setSelectedQuanHuyenId] = useState('');
  const [selectedPhuongXaId, setSelectedPhuongXaId] = useState('');
  const [giaThueMin, setGiaThueMin] = useState('');
  const [dienTichMin, setDienTichMin] = useState('');
  const [loaiPhong, setLoaiPhong] = useState('PHONG_TRO');
  const [tinhTrangNoiThat, setTinhTrangNoiThat] = useState('TRONG');
  const [anhDaiDien, setAnhDaiDien] = useState('');
  const [tenLienHe, setTenLienHe] = useState('');
  const [soDienThoaiLienHe, setSoDienThoaiLienHe] = useState('');

  // House and Room link states
  const [listNhaTro, setListNhaTro] = useState([]);
  const [selectedNhaTroId, setSelectedNhaTroId] = useState('');
  const [listPhongTro, setListPhongTro] = useState([]);
  const [phongTroId, setPhongTroId] = useState(urlPhongTroId || '');

  // 2. Options loaded from Backend
  const [listTinhThanh, setListTinhThanh] = useState([]);
  const [listQuanHuyen, setListQuanHuyen] = useState([]);
  const [listPhuongXa, setListPhuongXa] = useState([]);
  const [listTienIch, setListTienIch] = useState([]);
  const [selectedTienIchIds, setSelectedTienIchIds] = useState([]);

  // 3. Status messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Options lists
  const loaiPhongs = [
    { value: 'PHONG_TRO', label: 'Phòng trọ' },
    { value: 'CHUNG_CU_MINI', label: 'Chung cư mini' },
    { value: 'NHA_NGUYEN_CAN', label: 'Nhà nguyên căn' },
    { value: 'KY_TUC_XA', label: 'Ký túc xá' },
    { value: 'CAN_HO_DICH_VU', label: 'Căn hộ dịch vụ' }
  ];

  const noiThats = [
    { value: 'TRONG', label: 'Trống' },
    { value: 'CO_BAN', label: 'Cơ bản' },
    { value: 'DAY_DU', label: 'Đầy đủ' },
    { value: 'CAO_CAP', label: 'Cao cấp' }
  ];

  // Load provinces and utilities on mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tinh-thanh')
      .then(res => {
        if (res.data.status === 1) {
          setListTinhThanh(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy Tỉnh/Thành:", err));

    axios.get('http://127.0.0.1:8000/api/tien-ich')
      .then(res => {
        if (res.data.status === 1) {
          setListTienIch(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy danh sách Tiện ích:", err));

    // Auto-populate landlord profile details
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u.ho_ten) setTenLienHe(u.ho_ten);
      if (u.so_dien_thoai) setSoDienThoaiLienHe(u.so_dien_thoai);
    }

    if (token) {
      axios.get('http://127.0.0.1:8000/api/nha-tro', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListNhaTro(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy danh sách nhà trọ:", err));
    }
  }, []);

  // Prefill form values if phong_tro_id is provided in URL query parameters
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !urlPhongTroId) return;

    axios.get(`http://127.0.0.1:8000/api/phong-tro/${urlPhongTroId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        const room = res.data.data;
        setPhongTroId(room.id);
        setGiaThueMin(room.gia_thue);
        setDienTichMin(room.dien_tich);
        setTinhTrangNoiThat(room.tinh_trang_noi_that);
        if (room.ghi_chu) setMoTa(room.ghi_chu);
        if (room.anh_dai_dien) setAnhDaiDien(room.anh_dai_dien);
        if (room.tien_ich_ids && Array.isArray(room.tien_ich_ids)) {
          setSelectedTienIchIds(room.tien_ich_ids.map(Number));
        }
        
        if (room.nha_tro) {
          const house = room.nha_tro;
          setSelectedNhaTroId(house.id);
          setDiaChiChiTiet(house.dia_chi_chi_tiet);
          setTieuDe(`Cho thuê phòng ${room.ten_phong} tại ${house.ten_nha_tro}`);

          // Load rooms for this house
          axios.get('http://127.0.0.1:8000/api/phong-tro', {
            params: { nha_tro_id: house.id },
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(roomsRes => {
            if (roomsRes.data.status === 1) {
              setListPhongTro(roomsRes.data.data);
            }
          })
          .catch(err => console.error(err));

          // Load locations cascaded
          setSelectedTinhThanhId(house.tinh_thanh_id);
          
          axios.get('http://127.0.0.1:8000/api/quan-huyen', {
            params: { tinh_thanh_id: house.tinh_thanh_id }
          })
          .then(qhRes => {
            if (qhRes.data.status === 1) {
              setListQuanHuyen(qhRes.data.data);
              setSelectedQuanHuyenId(house.quan_huyen_id);

              return axios.get('http://127.0.0.1:8000/api/phuong-xa', {
                params: { quan_huyen_id: house.quan_huyen_id }
              });
            }
          })
          .then(pxRes => {
            if (pxRes && pxRes.data.status === 1) {
              setListPhuongXa(pxRes.data.data);
              setSelectedPhuongXaId(house.phuong_xa_id);
            }
          })
          .catch(err => console.error("Lỗi lấy danh mục địa lý khi prefill:", err));
        }
      }
    })
    .catch(err => console.error("Lỗi lấy chi tiết phòng trọ:", err));
  }, [urlPhongTroId]);

  // Handle TinhThanh change
  const handleTinhThanhChange = (e) => {
    const val = e.target.value;
    setSelectedTinhThanhId(val);
    setSelectedQuanHuyenId('');
    setSelectedPhuongXaId('');
    setListQuanHuyen([]);
    setListPhuongXa([]);

    if (val) {
      axios.get('http://127.0.0.1:8000/api/quan-huyen', {
        params: { tinh_thanh_id: val }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListQuanHuyen(res.data.data);
        }
      })
      .catch(err => console.error(err));
    }
  };

  // Handle QuanHuyen change
  const handleQuanHuyenChange = (e) => {
    const val = e.target.value;
    setSelectedQuanHuyenId(val);
    setSelectedPhuongXaId('');
    setListPhuongXa([]);

    if (val) {
      axios.get('http://127.0.0.1:8000/api/phuong-xa', {
        params: { quan_huyen_id: val }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListPhuongXa(res.data.data);
        }
      })
      .catch(err => console.error(err));
    }
  };

  // Handle NhaTro change to load associated rooms
  const handleNhaTroChange = (e) => {
    const val = e.target.value;
    setSelectedNhaTroId(val);
    setPhongTroId('');
    setListPhongTro([]);

    if (val) {
      const token = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/phong-tro', {
        params: { nha_tro_id: val },
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListPhongTro(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy danh sách phòng trọ:", err));
    }
  };

  // Handle utility selection checkbox
  const handleTienIchCheckboxChange = (id) => {
    if (selectedTienIchIds.includes(id)) {
      setSelectedTienIchIds(selectedTienIchIds.filter(item => item !== id));
    } else {
      setSelectedTienIchIds([...selectedTienIchIds, id]);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Retrieve Auth token
    const token = localStorage.getItem('token') || '';

    const payload = {
      tieu_de: tieuDe,
      mo_ta: moTa,
      dia_chi_chi_tiet: diaChiChiTiet,
      tinh_thanh_id: selectedTinhThanhId,
      quan_huyen_id: selectedQuanHuyenId,
      phuong_xa_id: selectedPhuongXaId,
      gia_thue_min: Number(giaThueMin),
      dien_tich_min: dienTichMin ? Number(dienTichMin) : null,
      loai_phong: loaiPhong,
      tinh_trang_noi_that: tinhTrangNoiThat,
      anh_dai_dien: anhDaiDien || null,
      vi_do: 16.0544, // Tọa độ mẫu ngẫu nhiên
      kinh_do: 108.2022,
      ten_lien_he: tenLienHe || null,
      so_dien_thoai_lien_he: soDienThoaiLienHe || null,
      tien_ich_ids: selectedTienIchIds,
      phong_tro_id: phongTroId ? Number(phongTroId) : null
    };

    axios.post('http://127.0.0.1:8000/api/tin-dang', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert('Đăng tin thành công! Vui lòng chờ Ban quản trị duyệt bài.');
        navigate('/chu-tro/quan-ly-thong-tin-chu-tro');
      } else {
        setError(res.data.message || 'Đăng tin thất bại.');
      }
    })
    .catch(err => {
      console.error("Lỗi đăng tin:", err);
      if (err.response && err.response.status === 401) {
        setError('Phiên làm việc hết hạn hoặc bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || 'Đăng tin thất bại. Vui lòng kiểm tra lại dữ liệu.');
      } else {
        setError('Có lỗi xảy ra khi kết nối máy chủ.');
      }
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow">
        <div className="card-header bg-danger py-3">
          <h5 className="mb-0 text-white fw-bold">
            <i className="fa-solid fa-square-plus me-2"></i> ĐĂNG TIN PHÒNG TRỌ MỚI
          </h5>
        </div>

        <div className="card-body p-4">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* CỘT TRÁI: THÔNG TIN CHI TIẾT PHÒNG */}
              <div className="col-md-8">
                {/* 1. Tiêu đề */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Tiêu đề bài đăng <span className="text-danger">*</span></b></h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ví dụ: Căn hộ Studio cao cấp gần Đại học Duy Tân, full nội thất..."
                    value={tieuDe}
                    onChange={(e) => setTieuDe(e.target.value)}
                    required
                  />
                </div>

                {/* 2. Ảnh phòng trọ & Giá thuê */}
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>URL hình ảnh phòng trọ</b></h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập URL liên kết ảnh (ví dụ: https://images.unsplash.com/...)"
                      value={anhDaiDien}
                      onChange={(e) => setAnhDaiDien(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>Giá thuê (/tháng) VNĐ <span className="text-danger">*</span></b></h6>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ví dụ: 3000000"
                      value={giaThueMin}
                      onChange={(e) => setGiaThueMin(e.target.value)}
                      required
                      min="0"
                    />
                  </div>
                </div>

                {/* 3. Người liên hệ & SĐT */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>Người liên hệ</b></h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên người liên hệ"
                      value={tenLienHe}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>Số điện thoại liên hệ</b></h6>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập số điện thoại liên hệ"
                      value={soDienThoaiLienHe}
                      disabled
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                </div>

                {/* 4. Loại phòng & Tình trạng nội thất */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>Loại phòng <span className="text-danger">*</span></b></h6>
                    </label>
                    <select 
                      className="form-select" 
                      value={loaiPhong} 
                      onChange={(e) => setLoaiPhong(e.target.value)}
                      required
                    >
                      {loaiPhongs.map(lp => (
                        <option key={lp.value} value={lp.value}>{lp.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start w-100">
                      <h6><b>Tình trạng nội thất <span className="text-danger">*</span></b></h6>
                    </label>
                    <select 
                      className="form-select" 
                      value={tinhTrangNoiThat} 
                      onChange={(e) => setTinhTrangNoiThat(e.target.value)}
                      required
                    >
                      {noiThats.map(nt => (
                        <option key={nt.value} value={nt.value}>{nt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Mô tả chi tiết */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Mô tả chi tiết phòng trọ</b></h6>
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Mô tả các chi tiết, giờ giấc ra vào, chi phí điện nước, dịch vụ kèm theo..."
                    value={moTa}
                    onChange={(e) => setMoTa(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* CỘT PHẢI: ĐỊA CHỈ & DIỆN TÍCH & TIỆN ÍCH */}
              <div className="col-md-4">
                {/* Nhà trọ & Phòng trọ liên kết */}
                <div className="mb-4 border rounded p-3 bg-light text-start">
                  <h6 className="fw-bold mb-3 text-primary"><i className="fa-solid fa-link me-1"></i>Liên kết phòng trọ của bạn</h6>
                  
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Chọn Nhà trọ</label>
                    <select 
                      className="form-select form-select-sm" 
                      value={selectedNhaTroId} 
                      onChange={handleNhaTroChange}
                    >
                      <option value="">-- Chọn Nhà trọ --</option>
                      {listNhaTro.map(n => (
                        <option key={n.id} value={n.id}>{n.ten_nha_tro}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label small fw-bold">Chọn Phòng trọ</label>
                    <select 
                      className="form-select form-select-sm" 
                      value={phongTroId} 
                      onChange={(e) => setPhongTroId(e.target.value)}
                      disabled={!selectedNhaTroId}
                    >
                      <option value="">-- Chọn Phòng trọ --</option>
                      {listPhongTro.map(p => (
                        <option key={p.id} value={p.id}>{p.ten_phong} ({Number(p.gia_thue).toLocaleString('vi-VN')}đ)</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6. Thành phố */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Thành phố <span className="text-danger">*</span></b></h6>
                  </label>
                  <select 
                    className="form-select" 
                    value={selectedTinhThanhId} 
                    onChange={handleTinhThanhChange}
                    required
                  >
                    <option value="">Chọn Thành phố</option>
                    {listTinhThanh.map(t => (
                      <option key={t.id} value={t.id}>{t.ten_tinh}</option>
                    ))}
                  </select>
                </div>

                {/* 7. Quận/Huyện */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Quận/Huyện <span className="text-danger">*</span></b></h6>
                  </label>
                  <select 
                    className="form-select" 
                    value={selectedQuanHuyenId} 
                    onChange={handleQuanHuyenChange}
                    disabled={!selectedTinhThanhId}
                    required
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {listQuanHuyen.map(q => (
                      <option key={q.id} value={q.id}>{q.ten_quan}</option>
                    ))}
                  </select>
                </div>

                {/* 8. Phường/Xã */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Phường/Xã <span className="text-danger">*</span></b></h6>
                  </label>
                  <select 
                    className="form-select" 
                    value={selectedPhuongXaId} 
                    onChange={(e) => setSelectedPhuongXaId(e.target.value)}
                    disabled={!selectedQuanHuyenId}
                    required
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {listPhuongXa.map(p => (
                      <option key={p.id} value={p.id}>{p.ten_xa}</option>
                    ))}
                  </select>
                </div>

                {/* 9. Địa điểm chi tiết */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Địa chỉ cụ thể <span className="text-danger">*</span></b></h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số nhà, tên đường, khu vực..."
                    value={diaChiChiTiet}
                    onChange={(e) => setDiaChiChiTiet(e.target.value)}
                    required
                  />
                </div>

                {/* 10. Diện tích */}
                <div className="mb-3">
                  <label className="form-label fw-bold text-start w-100">
                    <h6><b>Diện tích (m²)</b></h6>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Diện tích sử dụng"
                    value={dienTichMin}
                    onChange={(e) => setDienTichMin(e.target.value)}
                    min="0"
                  />
                </div>

                {/* 11. Danh sách tiện ích (Tải động từ DB) */}
                <div className="mb-3 text-start">
                  <label className="form-label fw-bold w-100">
                    <h6><b>Tiện ích trọ kèm theo</b></h6>
                  </label>
                  <div className="border rounded p-3 bg-light" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                    {listTienIch.length > 0 ? (
                      listTienIch.map(item => (
                        <div className="form-check mb-2" key={item.id}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`utility-${item.id}`}
                            checked={selectedTienIchIds.includes(item.id)}
                            onChange={() => handleTienIchCheckboxChange(item.id)}
                          />
                          <label className="form-check-label small" htmlFor={`utility-${item.id}`}>
                            {item.bieu_tuong && <i className={`${item.bieu_tuong} me-1 text-muted`}></i>}
                            {item.ten_tien_ich}
                          </label>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted small">Không tìm thấy tiện ích nào</span>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-danger w-100 mt-3 py-2 fw-bold shadow-sm">
                  XÁC NHẬN ĐĂNG TIN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}