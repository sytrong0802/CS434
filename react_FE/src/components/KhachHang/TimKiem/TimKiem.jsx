import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TimKiem() {
  const navigate = useNavigate();

  // 1. Dữ liệu địa chỉ hành chính từ Backend
  const [listTinhThanh, setListTinhThanh] = useState([]);
  const [listQuanHuyen, setListQuanHuyen] = useState([]);
  const [listPhuongXa, setListPhuongXa] = useState([]);

  // 2. State lưu các bộ lọc đang chọn
  const [selectedTinhThanhId, setSelectedTinhThanhId] = useState('');
  const [selectedQuanHuyenId, setSelectedQuanHuyenId] = useState('');
  const [selectedPhuongXaId, setSelectedPhuongXaId] = useState('');
  const [selectedNoiThat, setSelectedNoiThat] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [searchText, setSearchText] = useState('');

  // 3. State lưu danh sách phòng trọ động và phân trang
  const [listPhongTro, setListPhongTro] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalRooms, setTotalRooms] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 4. State Modal chi tiết phòng
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Danh sách khoảng giá
  const priceRanges = [
    { value: '', label: 'Tất cả khoảng giá' },
    { value: '0-1000000', label: 'Dưới 1 triệu' },
    { value: '1000000-2000000', label: '1 triệu - 2 triệu' },
    { value: '2000000-3000000', label: '2 triệu - 3 triệu' },
    { value: '3000000-5000000', label: '3 triệu - 5 triệu' },
    { value: '5000000-100000000', label: 'Trên 5 triệu' }
  ];

  // Tình trạng nội thất
  const noiThats = [
    { value: 'TRONG', label: 'Trống' },
    { value: 'CO_BAN', label: 'Cơ bản' },
    { value: 'DAY_DU', label: 'Đầy đủ' },
    { value: 'CAO_CAP', label: 'Cao cấp' }
  ];

  // Lấy danh sách phòng trọ phân trang từ Backend
  const fetchPhongTros = (pageNumber = 1, customParams = {}) => {
    setIsLoading(true);
    
    // Resolve values: if customParams has the key, use it, otherwise use state value
    const q = customParams.hasOwnProperty('q') ? customParams.q : searchText;
    const tinhThanhId = customParams.hasOwnProperty('tinh_thanh_id') ? customParams.tinh_thanh_id : selectedTinhThanhId;
    const quanHuyenId = customParams.hasOwnProperty('quan_huyen_id') ? customParams.quan_huyen_id : selectedQuanHuyenId;
    const phuongXaId = customParams.hasOwnProperty('phuong_xa_id') ? customParams.phuong_xa_id : selectedPhuongXaId;
    const noiThat = customParams.hasOwnProperty('tinh_trang_noi_that') ? customParams.tinh_trang_noi_that : selectedNoiThat;
    const rating = customParams.hasOwnProperty('diem_danh_gia') ? customParams.diem_danh_gia : selectedRating;
    const priceRange = customParams.hasOwnProperty('priceRange') ? customParams.priceRange : selectedPriceRange;

    const params = {
      page: pageNumber,
      limit: 10
    };

    if (q && q.trim()) params.q = q.trim();
    if (tinhThanhId) params.tinh_thanh_id = tinhThanhId;
    if (quanHuyenId) params.quan_huyen_id = quanHuyenId;
    if (phuongXaId) params.phuong_xa_id = phuongXaId;
    if (noiThat) params.tinh_trang_noi_that = noiThat;
    if (rating) params.diem_danh_gia = rating;

    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.gia_thue_min = min;
      if (max) params.gia_thue_max = max;
    }

    axios.get('http://127.0.0.1:8000/api/tin-dang', { params })
      .then(res => {
        if (res.data.status === 1) {
          const paginated = res.data.data;
          setListPhongTro(paginated.data || []);
          setTotalRooms(paginated.total || 0);
          setLastPage(paginated.last_page || 1);
          setCurrentPage(paginated.current_page || 1);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Lỗi lấy danh sách bài đăng:", err);
        setIsLoading(false);
      });
  };

  // Gọi Tỉnh/Thành phố khi component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tinh-thanh')
      .then(res => {
        if (res.data.status === 1) {
          setListTinhThanh(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy Tỉnh/Thành:", err));

    fetchPhongTros(1);
  }, []);

  // Khi currentPage thay đổi -> Tải trang dữ liệu tương ứng
  useEffect(() => {
    fetchPhongTros(currentPage);
  }, [currentPage]);

  // Xử lý đổi Tỉnh -> lấy Quận
  const handleTinhThanhChange = (e) => {
    const val = e.target.value;
    setSelectedTinhThanhId(val);
    setSelectedQuanHuyenId('');
    setSelectedPhuongXaId('');
    setListQuanHuyen([]);
    setListPhuongXa([]);
    setCurrentPage(1);

    if (val) {
      axios.get('http://127.0.0.1:8000/api/quan-huyen', {
        params: { tinh_thanh_id: val }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListQuanHuyen(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy Quận/Huyện:", err));
    }
  };

  // Xử lý đổi Quận -> lấy Phường
  const handleQuanHuyenChange = (e) => {
    const val = e.target.value;
    setSelectedQuanHuyenId(val);
    setSelectedPhuongXaId('');
    setListPhuongXa([]);
    setCurrentPage(1);

    if (val) {
      axios.get('http://127.0.0.1:8000/api/phuong-xa', {
        params: { quan_huyen_id: val }
      })
      .then(res => {
        if (res.data.status === 1) {
          setListPhuongXa(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy Phường/Xã:", err));
    }
  };

  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    setCurrentPage(1);
    fetchPhongTros(1);
  };

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedTinhThanhId('');
    setSelectedQuanHuyenId('');
    setSelectedPhuongXaId('');
    setSelectedNoiThat('');
    setSelectedPriceRange('');
    setSelectedRating('');
    setListQuanHuyen([]);
    setListPhuongXa([]);
    setCurrentPage(1);
    fetchPhongTros(1, {
      q: '',
      tinh_thanh_id: '',
      quan_huyen_id: '',
      phuong_xa_id: '',
      tinh_trang_noi_that: '',
      diem_danh_gia: '',
      priceRange: ''
    });
  };

  const handleResetSearch = () => {
    setSearchText('');
    setSelectedTinhThanhId('');
    setSelectedQuanHuyenId('');
    setSelectedPhuongXaId('');
    setListQuanHuyen([]);
    setListPhuongXa([]);
    setCurrentPage(1);
    fetchPhongTros(1, {
      q: '',
      tinh_thanh_id: '',
      quan_huyen_id: '',
      phuong_xa_id: ''
    });
  };

  // Helpers định dạng và hiển thị
  const dinhDangGia = (val) => {
    if (!val) return 'Liên hệ';
    const num = Number(val);
    return `${num.toLocaleString('vi-VN')} đ/tháng`;
  };

  const mapLoaiPhong = (val) => {
    switch (val) {
      case 'PHONG_TRO': return 'Phòng trọ';
      case 'CHUNG_CU_MINI': return 'Chung cư mini';
      case 'NHA_NGUYEN_CAN': return 'Nhà nguyên căn';
      case 'KY_TUC_XA': return 'Ký túc xá';
      case 'CAN_HO_DICH_VU': return 'Căn hộ dịch vụ';
      default: return val || 'Phòng trọ';
    }
  };

  const mapNoiThat = (val) => {
    switch (val) {
      case 'CAO_CAP': return 'Cao cấp';
      case 'DAY_DU': return 'Đầy đủ';
      case 'CO_BAN': return 'Cơ bản';
      case 'TRONG': return 'Trống';
      default: return val || 'Trống';
    }
  };

  const getAnhDaiDien = (tin) => {
    if (!tin.anh_dai_dien) {
      return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
    }
    if (tin.anh_dai_dien.startsWith('http')) return tin.anh_dai_dien;
    const path = tin.anh_dai_dien.startsWith('/') ? tin.anh_dai_dien : `/${tin.anh_dai_dien}`;
    return `http://127.0.0.1:8000${path}`;
  };

  const renderStars = (star) => {
    const numericStar = Number(star) || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(numericStar)) {
        stars.push(<i key={i} className="fa-solid fa-star text-warning me-1" style={{ fontSize: '13px' }}></i>);
      } else if (i === Math.ceil(numericStar) && numericStar % 1 !== 0) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-warning me-1" style={{ fontSize: '13px' }}></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star text-warning me-1" style={{ fontSize: '13px' }}></i>);
      }
    }
    return stars;
  };

  const handleBookRoom = (room) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert("Vui lòng đăng nhập để đặt lịch hẹn xem phòng.");
      navigate('/dang-nhap');
      return;
    }

    if (role !== 'KHACH_HANG') {
      alert("Chỉ tài khoản Khách Hàng mới có quyền đặt lịch hẹn xem phòng.");
      return;
    }

    navigate('/khach-hang/dat-lich-hen-xem-phong', { state: { roomDetails: room } });
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      {/* 1. THANH TÌM KIẾM Ở GIỮA PHÍA TRÊN (LAYOUT 2 DÒNG) */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0 p-4 rounded-3 bg-white">
              <h3 className="fw-bold text-primary mb-3 text-center">Tìm Kiếm Phòng Trọ Phù Hợp</h3>
              
              <form onSubmit={handleSearchClick}>
                {/* Dòng 1: Ô nhập địa chỉ/tiêu đề & Nút Tìm kiếm */}
                <div className="row g-2 mb-3">
                  <div className="col-md-8">
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-0"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
                      <input
                        type="text"
                        className="form-control bg-light border-0 fs-6"
                        placeholder="Nhập địa chỉ hoặc tiêu đề bài đăng trọ cần tìm..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 d-flex gap-2">
                    <button className="btn btn-primary btn-lg flex-fill fw-bold fs-6" type="submit">
                      Tìm kiếm
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary btn-lg flex-fill fw-bold fs-6"
                      onClick={handleResetSearch}
                    >
                      Đặt lại
                    </button>
                  </div>
                </div>

                {/* Dòng 2: Dropdowns Địa chỉ Tỉnh -> Quận -> Phường giống trang chủ */}
                <div className="row g-2">
                  {/* Dropdown Tỉnh thành */}
                  <div className="col-md-4">
                    <select 
                      className="form-select border-0 bg-light"
                      value={selectedTinhThanhId} 
                      onChange={handleTinhThanhChange}
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {listTinhThanh.map(t => (
                        <option key={t.id} value={t.id}>{t.ten_tinh}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Quận huyện */}
                  <div className="col-md-4">
                    <select 
                      className="form-select border-0 bg-light" 
                      value={selectedQuanHuyenId} 
                      onChange={handleQuanHuyenChange}
                      disabled={!selectedTinhThanhId}
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {listQuanHuyen.map(q => (
                        <option key={q.id} value={q.id}>{q.ten_quan}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Phường xã */}
                  <div className="col-md-4">
                    <select 
                      className="form-select border-0 bg-light" 
                      value={selectedPhuongXaId} 
                      onChange={(e) => { setSelectedPhuongXaId(e.target.value); setCurrentPage(1); }}
                      disabled={!selectedQuanHuyenId}
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {listPhuongXa.map(p => (
                        <option key={p.id} value={p.id}>{p.ten_xa}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>

      {/* 2. BỐ CỤC CHÍNH: BỘ LỌC DỌC BÊN TRÁI + DANH SÁCH PHÒNG BÊN PHẢI */}
      <div className="container">
        <div className="row g-4">
          
          {/* CỘT TRÁI: BỘ LỌC DỌC (Chỉ có Khoảng giá, Nội thất và Đánh giá) */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 text-dark">
                  <i className="fa-solid fa-filter me-2 text-primary"></i> Lọc Bộ Chọn
                </h5>
                <button onClick={handleResetFilters} className="btn btn-sm btn-outline-secondary rounded-pill">
                  Đặt lại
                </button>
              </div>
              <hr className="my-2" />

              {/* Lọc khoảng giá */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Giá thuê</label>
                <select 
                  className="form-select form-select-sm" 
                  value={selectedPriceRange} 
                  onChange={(e) => { setSelectedPriceRange(e.target.value); setCurrentPage(1); }}
                >
                  {priceRanges.map(pr => (
                    <option key={pr.value} value={pr.value}>{pr.label}</option>
                  ))}
                </select>
              </div>

              {/* Lọc Nội thất */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Nội thất</label>
                <select 
                  className="form-select form-select-sm" 
                  value={selectedNoiThat} 
                  onChange={(e) => { setSelectedNoiThat(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Tất cả nội thất</option>
                  {noiThats.map(nt => (
                    <option key={nt.value} value={nt.value}>{nt.label}</option>
                  ))}
                </select>
              </div>

              {/* Lọc Đánh giá sao kết nối Backend */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Đánh giá tối thiểu</label>
                <select 
                  className="form-select form-select-sm" 
                  value={selectedRating} 
                  onChange={(e) => { setSelectedRating(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Tất cả đánh giá</option>
                  <option value="4">4 ★ trở lên</option>
                  <option value="3">3 ★ trở lên</option>
                  <option value="2">2 ★ trở lên</option>
                  <option value="1">1 ★ trở lên</option>
                </select>
              </div>

              <button onClick={handleSearchClick} className="btn btn-primary btn-sm w-100 rounded-3 mt-2">
                Áp dụng bộ lọc
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: DANH SÁCH PHÒNG TRỌ (TỐI ĐA 10 TIN) */}
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 text-dark">
                  Danh sách bài đăng ({totalRooms} phòng)
                </h5>
              </div>

              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                  </div>
                  <p className="text-muted mt-2">Đang tìm kiếm dữ liệu...</p>
                </div>
              ) : listPhongTro.length > 0 ? (
                <>
                  <div className="d-flex flex-column gap-3">
                    {listPhongTro.map((room) => {
                      const anhUrl = getAnhDaiDien(room);
                      const diaChi = [room.dia_chi_chi_tiet, room.phuong_xa?.ten_xa, room.quan_huyen?.ten_quan, room.tinh_thanh?.ten_tinh].filter(Boolean).join(', ');
                      return (
                        <div key={room.id} className="card border-0 border-bottom pb-3 rounded-0 bg-transparent">
                          <div className="row g-3 align-items-start">
                            {/* Ảnh phòng trọ */}
                            <div className="col-md-4">
                              <img
                                src={anhUrl}
                                className="img-fluid rounded shadow-sm w-100"
                                style={{ height: '170px', objectFit: 'cover' }}
                                alt={room.tieu_de}
                              />
                            </div>
                            
                            {/* Thông tin phòng trọ */}
                            <div className="col-md-8">
                              <h5 className="fw-bold text-dark mb-1 text-truncate" title={room.tieu_de}>
                                {room.tieu_de}
                              </h5>
                              
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="text-danger fw-bold fs-5">
                                  {dinhDangGia(room.gia_thue_min)}
                                </span>
                                <div className="ms-auto d-flex align-items-center">
                                  {renderStars(room.diem_danh_gia)}
                                  <span className="ms-1 small text-muted">({room.luot_danh_gia || 0} đánh giá)</span>
                                </div>
                              </div>
                              
                              <div className="mb-2 d-flex flex-wrap gap-2 align-items-center">
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                  {mapLoaiPhong(room.loai_phong)}
                                </span>
                                <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">
                                  {Math.round(room.dien_tich_min)} m²
                                </span>
                                <small className="text-muted text-truncate" style={{ maxWidth: '300px' }}>
                                  <i className="fa-solid fa-location-dot me-1"></i>
                                  {diaChi}
                                </small>
                              </div>

                              <p className="text-muted small mb-3 text-truncate-2" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}>
                                {room.mo_ta || "Không có mô tả chi tiết từ chủ trọ."}
                              </p>

                              <div className="d-flex justify-content-between align-items-center">
                                <span 
                                  className="text-primary fw-semibold small cursor-pointer" 
                                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                  onClick={() => { setSelectedRoom(room); setShowDetailModal(true); }}
                                >
                                  Xem chi tiết
                                </span>

                                <div className="d-flex gap-2">
                                  <button 
                                    onClick={() => handleBookRoom(room)} 
                                    className="btn btn-sm btn-primary rounded-pill px-3"
                                  >
                                    <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Phân trang */}
                  {lastPage > 1 && (
                    <nav className="d-flex justify-content-center mt-4">
                      <ul className="pagination pagination-sm">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                            &laquo;
                          </button>
                        </li>
                        {[...Array(lastPage)].map((_, i) => (
                          <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                            &raquo;
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center py-5 text-muted">
                  <i className="fa-solid fa-folder-open fa-3x mb-3 text-secondary"></i>
                  <h6 className="fw-semibold text-secondary">Không tìm thấy phòng trọ nào</h6>
                  <p className="small mb-0">Vui lòng thay đổi từ khóa hoặc bộ lọc để thử lại.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 4. DETAIL MODAL (MODAL CHI TIẾT PHÒNG) */}
      {selectedRoom && showDetailModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '14px' }}>
              <div className="modal-header bg-primary text-white border-0 py-3" style={{ borderTopLeftRadius: '14px', borderTopRightRadius: '14px' }}>
                <h5 className="modal-title fw-bold">Chi Tiết Tin Đăng</h5>
                <button onClick={() => setShowDetailModal(false)} className="btn-close btn-close-white" type="button" aria-label="Close"></button>
              </div>
              <div className="modal-body p-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                {/* Ảnh phòng lớn */}
                <div className="mb-4">
                  <img
                    src={getAnhDaiDien(selectedRoom)}
                    className="img-fluid rounded shadow-sm w-100"
                    style={{ height: '350px', objectFit: 'cover' }}
                    alt={selectedRoom.tieu_de}
                  />
                </div>

                <h4 className="fw-bold text-dark mb-3">{selectedRoom.tieu_de}</h4>

                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <label className="text-muted small fw-semibold">Giá thuê hàng tháng</label>
                    <div className="fs-5 fw-bold text-danger">
                      {dinhDangGia(selectedRoom.gia_thue_min)}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="text-muted small fw-semibold">Diện tích phòng</label>
                    <div className="fs-5 fw-bold text-dark">
                      {Math.round(selectedRoom.dien_tich_min)} m²
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="text-muted small fw-semibold">Điểm đánh giá</label>
                    <div className="fs-5 fw-bold text-warning d-flex align-items-center">
                      <span className="me-2">{selectedRoom.diem_danh_gia || '0.0'}</span>
                      {renderStars(selectedRoom.diem_danh_gia)}
                    </div>
                  </div>
                </div>

                <hr className="my-3" />

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="text-muted small fw-semibold">Loại phòng</label>
                    <input type="text" className="form-control form-control-sm bg-light border-0" value={mapLoaiPhong(selectedRoom.loai_phong)} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small fw-semibold">Tình trạng nội thất</label>
                    <input type="text" className="form-control form-control-sm bg-light border-0" value={mapNoiThat(selectedRoom.tinh_trang_noi_that)} disabled />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="text-muted small fw-semibold">Người liên hệ</label>
                    <input type="text" className="form-control form-control-sm bg-light border-0" value={selectedRoom.ten_lien_he || "Chủ trọ"} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small fw-semibold">Số điện thoại liên hệ</label>
                    <input type="text" className="form-control form-control-sm bg-light border-0 fw-semibold text-primary" value={selectedRoom.so_dien_thoai_lien_he || "Liên hệ trực tiếp"} disabled />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-semibold">Địa chỉ chi tiết</label>
                  <textarea
                    className="form-control form-control-sm bg-light border-0"
                    rows="2"
                    value={[selectedRoom.dia_chi_chi_tiet, selectedRoom.phuong_xa?.ten_xa, selectedRoom.quan_huyen?.ten_quan, selectedRoom.tinh_thanh?.ten_tinh].filter(Boolean).join(', ')}
                    disabled
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="text-muted small fw-semibold">Mô tả thêm</label>
                  <textarea
                    className="form-control form-control-sm bg-light border-0"
                    rows="4"
                    value={selectedRoom.mo_ta || "Không có mô tả chi tiết."}
                    disabled
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer border-0 p-3 bg-light" style={{ borderBottomLeftRadius: '14px', borderBottomRightRadius: '14px' }}>
                <button onClick={() => setShowDetailModal(false)} className="btn btn-sm btn-secondary px-3" type="button">
                  Đóng
                </button>
                <button 
                  onClick={() => { setShowDetailModal(false); handleBookRoom(selectedRoom); }} 
                  className="btn btn-sm btn-primary px-4"
                >
                  <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
