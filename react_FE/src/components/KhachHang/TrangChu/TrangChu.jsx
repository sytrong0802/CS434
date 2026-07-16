import React, { useState, useEffect } from 'react';
import './TrangChu.css';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import axios from 'axios';

export default function TrangChu() {
  const navigate = useNavigate(); // 2. Khởi tạo hàm điều hướng

  const [listTinhThanh, setListTinhThanh] = useState([]);
  const [listQuanHuyen, setListQuanHuyen] = useState([]);
  const [listPhuongXa, setListPhuongXa] = useState([]);
  const [listPhongTro, setListPhongTro] = useState([]);

  const [selectedTinhThanhId, setSelectedTinhThanhId] = useState('');
  const [selectedQuanHuyenId, setSelectedQuanHuyenId] = useState('');
  const [selectedPhuongXaId, setSelectedPhuongXaId] = useState('');
  const [selectedNoiThat, setSelectedNoiThat] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mockPhongTros = [
    {
      id: 'mock-1',
      tieu_de: 'Căn hộ Studio cao cấp - Thảo Điền',
      gia_thue_min: 8500000,
      dien_tich_min: 45,
      diem_danh_gia: 5,
      luot_danh_gia: 24,
      loai_phong: 'CAN_HO_DICH_VU',
      tinh_trang_noi_that: 'CAO_CAP',
      ten_lien_he: 'Nguyễn Văn A',
      so_dien_thoai_lien_he: '0901234567',
      dia_chi_chi_tiet: 'Thảo Điền, Quận 2, TP. Hồ Chí Minh',
      mo_ta: 'Căn hộ Studio cao cấp đầy đủ tiện nghi, view sông Sài Gòn thoáng mát, khu an ninh 24/7.',
      anh_dai_dien: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhnIvpiMla3FHGMefxnat6bkxGEzqndsTocOyS_zxF8PFCBXhoEbHOlyXZVHIe1tqIkl8n5QEFktceGR8VxkEVQZxaTdRKw54c6mj1HGnBCWwZ9OErwYR5hCevdVvawNmp7tK-7ekN09wu9SJOeRqnz0MuOCb6oz5mUa3KIW8QxWYEK8410u5z9mClEgX9xZBQktdhXxYhFPlGAssGgl4jaQ5rpFOuUx9cZt_uGyLkRsfjRPCnZrZHS4g_kmYDINxSNNRkwLRWtmXR'
    },
    {
      id: 'mock-2',
      tieu_de: 'Phòng trọ sinh viên tiện nghi',
      gia_thue_min: 3200000,
      dien_tich_min: 20,
      diem_danh_gia: 4.5,
      luot_danh_gia: 12,
      loai_phong: 'PHONG_TRO',
      tinh_trang_noi_that: 'CO_BAN',
      ten_lien_he: 'Trần Thị B',
      so_dien_thoai_lien_he: '0907654321',
      dia_chi_chi_tiet: 'Đường Quang Trung, Quận Gò Vấp, HCM',
      mo_ta: 'Phòng trọ giá rẻ cho sinh viên, gần các trường đại học, giờ giấc tự do, wifi tốc độ cao.',
      anh_dai_dien: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Z1CCR1AZtkFy2u_c1fq8Ei910XBjbOGR-jatR0kukWrQ5_tR9XTahCbfOKzavlwqFVZ5Ym5BQPkblrIpTN4ED8MUqHFrPhmpH4ms7gSvZ3a3td6oOC0bDb_cmTBlTBfgZdrAjQUDGIeYCU2GkqHSyH2YC02WB7qRJS8GZlRfkpLw9y4az4hYlZj-ZrjEjuzLRs8wK8m2niP4W-WJDO5TNUju83rKCIHGM5l_fUycaBiCx_kKGFDI9bA1YCGNccwpftZBdIELfLd4'
    },
    {
      id: 'mock-3',
      tieu_de: 'Căn hộ mini Full nội thất',
      gia_thue_min: 5500000,
      dien_tich_min: 30,
      diem_danh_gia: 4.8,
      luot_danh_gia: 18,
      loai_phong: 'CHUNG_CU_MINI',
      tinh_trang_noi_that: 'DAY_DU',
      ten_lien_he: 'Lê Văn C',
      so_dien_thoai_lien_he: '0912345678',
      dia_chi_chi_tiet: 'Huỳnh Tấn Phát, Quận 7, HCM',
      mo_ta: 'Căn hộ mini thiết kế hiện đại, đầy đủ tủ lạnh, máy giặt, máy lạnh, ban công riêng biệt.',
      anh_dai_dien: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTCA-gZVGj2BUh6ak28aItK84t6i_Gsd-lZmz7IaXsb0kqciM4EozeKzPH2fd3_9i9V83YdyHbW3UTetE7bmuHCgw9qDVzK-N8F28mDreHzKQ3fQTV0xhaGcv6JlCvXgHy9B8LbngPizJZRrHoP8zFrZXFTnI9A1qFVBI7Bpj1AdBqgKVxL1ioij7QF-B2ERugE_aBCtvxc9rUrp8oYwFHQ8S44f4PTeQHC2lCOLPwj7J3Xd2Dw_k9FKecgvKDFbMUkvBXmy7voX8n'
    },
    {
      id: 'mock-4',
      tieu_de: 'Ký túc xá cao cấp Homestay',
      gia_thue_min: 1800000,
      dien_tich_min: 25,
      diem_danh_gia: 4.7,
      luot_danh_gia: 30,
      loai_phong: 'KY_TUC_XA',
      tinh_trang_noi_that: 'DAY_DU',
      ten_lien_he: 'Phạm Văn D',
      so_dien_thoai_lien_he: '0987654321',
      dia_chi_chi_tiet: 'Bạch Đằng, Quận Bình Thạnh, HCM',
      mo_ta: 'Ký túc xá cao cấp đầy đủ tiện ích như homestay, máy lạnh 24/24, có người dọn dẹp hàng tuần.',
      anh_dai_dien: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtWmLJv_nYJvoQIwa9tAy0M9inLJGTcfr7kBbmbu0-Lum4hdbBAzQKB3qjPyv3Yr1Xt0jzjtOsIlsblW-cZa1U3blfoYgnSuqtaLwmXefpBDmTL_sjw2AodMDDM0SAwYNCWmd4sgvHStvk3ePQTmIDqp8jMdGXFpCvKqrOLwqAuU4b2wb8KbGZ9b46znbJDpReDRaQNY7ckBEZviR9ZvAW8fv3dAqA3ghLZIGk13vcVvJZZLQvTlVNLyyW9W_XpmLDsgogkcHBiitX'
    },
    {
      id: 'mock-5',
      tieu_de: 'Phòng đẹp gần trung tâm',
      gia_thue_min: 4000000,
      dien_tich_min: 22,
      diem_danh_gia: 4.6,
      luot_danh_gia: 15,
      loai_phong: 'PHONG_TRO',
      tinh_trang_noi_that: 'CO_BAN',
      ten_lien_he: 'Hoàng Văn E',
      so_dien_thoai_lien_he: '0934567890',
      dia_chi_chi_tiet: 'Lê Văn Sỹ, Quận 3, HCM',
      mo_ta: 'Phòng trọ đẹp, ban công rộng, an ninh 24/7, nằm ngay trung tâm Quận 3 di chuyển thuận tiện.',
      anh_dai_dien: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeVX3_Ix_NCyVROMEOKz9s7uG4g2eg59O6wVySTeQN6csJmKSkXiMuHy8lzNsBFSFewjdIUChuyVdNbw03KXMYuz9SJwv63vmdU7J7RdY57ZiAJdO_4sIgjmimeKg3sONBBIWQJIMaFY--4LFOT4nKcqVbBD5J7XSywxNTMjJtB9lm9YzFWOyi2Mi12UQxbqnULIoHECsZehHV0SPLw4ZpFdY4S9zCmHd4gslSD6V2YJK7l0wqX4GZcAtvi0VcU2F7093k2W2jv1P2'
    }
  ];

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

  const khiDiChuotVao = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const khiDiChuotVaLaFallback = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  };

  const khiDiChuotRa = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
  };

  // Hàm hỗ trợ cuộn màn hình lên khu vực tìm kiếm khi bấm nút "Tìm kiếm phòng"
  const cuonDenThanhTimKiem = () => {
    const thanhTimKiem = document.querySelector('.thanh-tim-kiem-2-dong');
    if (thanhTimKiem) {
      thanhTimKiem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Lấy danh sách phòng trọ
  const fetchPhongTros = (filters = {}) => {
    setIsSearching(true);
    axios.get('http://127.0.0.1:8000/api/tin-dang', {
      params: {
        limit: 5,
        ...filters
      }
    })
    .then(res => {
      if (res.data.status === 1) {
        const tinDangs = res.data.data.data || res.data.data;
        setListPhongTro(tinDangs);
      }
      setIsSearching(false);
    })
    .catch(err => {
      console.error("Lỗi lấy danh sách phòng trọ:", err);
      setIsSearching(false);
    });
  };

  useEffect(() => {
    // 1. Lấy danh sách Tỉnh/Thành
    axios.get('http://127.0.0.1:8000/api/tinh-thanh')
      .then(res => {
        if (res.data.status === 1) {
          setListTinhThanh(res.data.data);
        }
      })
      .catch(err => console.error("Lỗi lấy Tỉnh/Thành:", err));

    // 2. Lấy danh sách phòng trọ ban đầu
    fetchPhongTros();
  }, []);

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
      .catch(err => console.error("Lỗi lấy Quận/Huyện:", err));
    }
  };

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
      .catch(err => console.error("Lỗi lấy Phường/Xã:", err));
    }
  };

  const handleSearch = () => {
    const params = {};
    if (searchText.trim()) params.q = searchText.trim();
    if (selectedTinhThanhId) params.tinh_thanh_id = selectedTinhThanhId;
    if (selectedQuanHuyenId) params.quan_huyen_id = selectedQuanHuyenId;
    if (selectedPhuongXaId) params.phuong_xa_id = selectedPhuongXaId;
    if (selectedNoiThat) params.tinh_trang_noi_that = selectedNoiThat;

    fetchPhongTros(params);
  };

  const handleReset = () => {
    setSearchText('');
    setSelectedTinhThanhId('');
    setSelectedQuanHuyenId('');
    setSelectedPhuongXaId('');
    setSelectedNoiThat('');
    setListQuanHuyen([]);
    setListPhuongXa([]);
    fetchPhongTros();
  };

  const dinhDangGia = (gia) => {
    if (!gia) return 'Liên hệ';
    const numericGia = Number(gia);
    return `${numericGia.toLocaleString('vi-VN')}đ/tháng`;
  };

  const dinhDangGiaNgan = (gia) => {
    if (!gia) return 'Liên hệ';
    const numericGia = Number(gia);
    if (numericGia >= 1000000) {
      const formatted = (numericGia / 1000000).toFixed(1);
      return `${formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted}tr/tháng`;
    }
    return `${numericGia.toLocaleString('vi-VN')}đ/tháng`;
  };

  const getAnhDaiDien = (tin) => {
    if (!tin.anh_dai_dien) {
      return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
    }
    if (tin.anh_dai_dien.startsWith('http')) return tin.anh_dai_dien;
    const path = tin.anh_dai_dien.startsWith('/') ? tin.anh_dai_dien : `/${tin.anh_dai_dien}`;
    return `http://127.0.0.1:8000${path}`;
  };

  return (
    <main className="vung-noi-dung-chinh">
      
      {/* KHU VỰC HERO (BANNER CHÍNH) */}
      <section className="khu-vuc-banner">
        <div className="khung-chua-banner">
          <h1 className="tieu-de-banner">
            Tìm Kiếm Không Gian Sống <span className="chu-nhan-manh-banner">Lý Tưởng</span>
          </h1>
          <p className="mo-ta-banner">
            Hàng ngàn phòng trọ chất lượng, giá tốt đang chờ đón bạn. Nền tảng kết nối trực tiếp, minh bạch và hiệu quả.
          </p>
          
          {/* THANH TÌM KIẾM NỔI - LAYOUT 2 DÒNG MỚI */}
          <div className="thanh-tim-kiem-2-dong">
            
            {/* DÒNG TRÊN: INPUT VÀ NÚT TÌM KIẾM */}
            <div className="dong-tren">
              <div className="o-nhap-lieu-cum-khoi-dia-chi">
                <i className="fa-solid fa-location-dot icon-tim-kiem"></i>
                <input 
                  type="text" 
                  className="o-nhap-chu" 
                  placeholder="Nhập địa chỉ cần tìm..." 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <button className="nut-bam-tim-kiem" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
              </button>
            </div>

            {/* DÒNG DƯỚI: CÁC BỘ LỌC SELECT VÀ NÚT RESET */}
            <div className="dong-duoi">
              {/* Tỉnh thành */}
              <div className="o-nhap-lieu-cum">
                <i className="fa-solid fa-map icon-tim-kiem"></i>
                <select 
                  className="o-lua-chon-thong-tin"
                  value={selectedTinhThanhId}
                  onChange={handleTinhThanhChange}
                >
                  <option value="">Tỉnh/Thành phố</option>
                  {listTinhThanh.map(t => (
                    <option key={t.id} value={t.id}>{t.ten_tinh}</option>
                  ))}
                </select>
              </div>
              
              {/* Quận huyện */}
              <div className="o-nhap-lieu-cum">
                <i className="fa-solid fa-house-chimney-window icon-tim-kiem"></i>
                <select 
                  className="o-lua-chon-thong-tin"
                  value={selectedQuanHuyenId}
                  onChange={handleQuanHuyenChange}
                  disabled={!selectedTinhThanhId}
                >
                  <option value="">Quận/Huyện</option>
                  {listQuanHuyen.map(q => (
                    <option key={q.id} value={q.id}>{q.ten_quan}</option>
                  ))}
                </select>
              </div>

              {/* Phường xã */}
              <div className="o-nhap-lieu-cum">
                <i className="fa-solid fa-map-pin icon-tim-kiem"></i>
                <select 
                  className="o-lua-chon-thong-tin"
                  value={selectedPhuongXaId}
                  onChange={(e) => setSelectedPhuongXaId(e.target.value)}
                  disabled={!selectedQuanHuyenId}
                >
                  <option value="">Phường/Xã</option>
                  {listPhuongXa.map(p => (
                    <option key={p.id} value={p.id}>{p.ten_xa}</option>
                  ))}
                </select>
              </div>

              {/* Nội thất */}
              <div className="o-nhap-lieu-cum">
                <i className="fa-solid fa-couch icon-tim-kiem"></i>
                <select 
                  className="o-lua-chon-thong-tin"
                  value={selectedNoiThat}
                  onChange={(e) => setSelectedNoiThat(e.target.value)}
                >
                  <option value="">Nội thất</option>
                  <option value="CAO_CAP">Cao cấp</option>
                  <option value="CO_BAN">Cơ bản</option>
                  <option value="TRONG">Trống</option>
                  <option value="DAY_DU">Đầy đủ</option>
                </select>
              </div>

              {/* Nút Đặt lại lọc */}
              <button className="nut-dat-lai" title="Đặt lại bộ lọc" onClick={handleReset}>
                <i className="fa-solid fa-arrow-rotate-left me-1"></i>
                Đặt lại
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* KHU VỰC PHÒNG TRỌ NỔI BẬT */}
      <section className="khu-vuc-phong-noi-bat">
        <div className="dau-trang-khu-vuc">
          <div>
            <h2 className="tieu-de-khu-vuc">Phòng trọ nổi bật</h2>
            <p className="mo-ta-khu-vuc">Những không gian sống được đánh giá cao nhất tuần này</p>
          </div>
          <a 
            href="#" 
            className="duong-dan-xem-tat-ca"
            onClick={(e) => {
              e.preventDefault();
              navigate('/tim-kiem');
            }}
          >
            Xem tất cả <i className="fa-solid fa-arrow-right" style={{ fontSize: '16px', marginLeft: '4px' }}></i>
          </a>
        </div>

        <div className="luoi-danh-sach-phong">
          {listPhongTro.length > 0 ? (
            <>
              {/* Thẻ phòng lớn nổi bật (tin thứ nhất) */}
              {(() => {
                const tinDau = listPhongTro[0];
                const anhUrl = getAnhDaiDien(tinDau);
                const diaChi = [tinDau.quan_huyen?.ten_quan, tinDau.tinh_thanh?.ten_tinh].filter(Boolean).join(', ');
                return (
                  <div key={tinDau.id} className="the-phong-lon" onMouseEnter={khiDiChuotVao} onMouseLeave={khiDiChuotRa}>
                    <img className="anh-the-phong-lon" alt={tinDau.tieu_de} src={anhUrl} />
                    <div className="lop-phu-toi-anh"></div>
                    <div className="noi-dung-the-phong-lon">
                      <div className="nhan-noi-bat">Nổi bật nhất</div>
                      <h3 className="tieu-de-the-phong-lon">{tinDau.tieu_de}</h3>
                      <p className="dia-chi-the-phong-lon">
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '16px', marginRight: '4px' }}></i> {diaChi || tinDau.dia_chi_chi_tiet}
                      </p>
                      <div className="phan-chan-the-lon">
                        <span className="gia-tien-the-lon">{dinhDangGia(tinDau.gia_thue_min)}</span>
                        <div className="d-flex gap-2">
                          <button 
                            className="nut-xem-chi-tiet-the-lon btn btn-sm btn-light fw-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoom(tinDau);
                              setShowDetailModal(true);
                            }}
                          >
                            Xem chi tiết
                          </button>
                          <button 
                            className="btn btn-sm btn-primary fw-bold rounded-pill px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookRoom(tinDau);
                            }}
                          >
                            <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Các thẻ phòng tiêu chuẩn (tin từ thứ 2 trở đi) */}
              {listPhongTro.slice(1).map((tin) => {
                const anhUrl = getAnhDaiDien(tin);
                const diaChi = [tin.quan_huyen?.ten_quan, tin.tinh_thanh?.ten_tinh].filter(Boolean).join(', ');
                return (
                  <div key={tin.id} className="the-phong-tieu-chuan" onMouseEnter={khiDiChuotVao} onMouseLeave={khiDiChuotRa}>
                    <div className="khung-chua-anh-nho">
                      <img className="anh-the-phong-nho" alt={tin.tieu_de} src={anhUrl} />
                      <span className="nhan-gia-tien-the-nho">{dinhDangGiaNgan(tin.gia_thue_min)}</span>
                    </div>
                    <div className="noi-dung-the-phong-nho">
                      <h4 className="tieu-de-the-phong-nho" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }} onClick={() => navigate(`/tin-dang/${tin.id}`)}>
                        {tin.tieu_de}
                      </h4>
                      <p className="dia-chi-the-phong-nho">
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '14px', marginRight: '4px' }}></i> {diaChi || tin.dia_chi_chi_tiet}
                      </p>
                      <div className="tien-ich-the-phong">
                        <span className="o-tien-ich-nho">
                          <i className="fa-solid fa-vector-square" style={{ fontSize: '14px', marginRight: '4px' }}></i> 
                          {Math.round(tin.dien_tich_min)}m²
                        </span>
                        <span className="o-tien-ich-nho">
                          <i className="fa-solid fa-couch" style={{ fontSize: '14px', marginRight: '4px' }}></i> 
                          {tin.tinh_trang_noi_that === 'CAO_CAP' ? 'Cao cấp' : tin.tinh_trang_noi_that === 'DAY_DU' ? 'Đầy đủ' : tin.tinh_trang_noi_that === 'CO_BAN' ? 'Cơ bản' : 'Trống'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                        <span 
                          className="text-primary fw-semibold small cursor-pointer" 
                          style={{ textDecoration: 'underline', cursor: 'pointer' }}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedRoom(tin); 
                            setShowDetailModal(true); 
                          }}
                        >
                          Xem chi tiết
                        </span>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleBookRoom(tin); 
                          }} 
                          className="btn btn-sm btn-primary rounded-pill px-3"
                          style={{ fontSize: '12px' }}
                        >
                          <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (selectedTinhThanhId || selectedQuanHuyenId || selectedPhuongXaId || selectedNoiThat || searchText.trim()) ? (
            <div className="o-lo-ket-qua-trong" style={{ gridColumn: 'span 4', textAlign: 'center', padding: '60px 20px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '16px' }}></i>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#475569', margin: '0 0 8px 0' }}>Không tìm thấy phòng trọ nào phù hợp</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Vui lòng thay đổi địa điểm hoặc bộ lọc để thử lại.</p>
            </div>
          ) : (
            <>
              {/* Thẻ phòng lớn nổi bật (Mock fallback khi DB trống và chưa chọn bộ lọc nào) */}
              {(() => {
                const tinDau = mockPhongTros[0];
                const anhUrl = tinDau.anh_dai_dien;
                const diaChi = tinDau.dia_chi_chi_tiet;
                return (
                  <div key={tinDau.id} className="the-phong-lon" onMouseEnter={khiDiChuotVaLaFallback} onMouseLeave={khiDiChuotRa}>
                    <img className="anh-the-phong-lon" alt={tinDau.tieu_de} src={anhUrl} />
                    <div className="lop-phu-toi-anh"></div>
                    <div className="noi-dung-the-phong-lon">
                      <div className="nhan-noi-bat">Phổ biến nhất</div>
                      <h3 className="tieu-de-the-phong-lon">{tinDau.tieu_de}</h3>
                      <p className="dia-chi-the-phong-lon">
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '16px', marginRight: '4px' }}></i> {diaChi}
                      </p>
                      <div className="phan-chan-the-lon">
                        <span className="gia-tien-the-lon">{dinhDangGia(tinDau.gia_thue_min)}</span>
                        <div className="d-flex gap-2">
                          <button 
                            className="nut-xem-chi-tiet-the-lon btn btn-sm btn-light fw-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoom(tinDau);
                              setShowDetailModal(true);
                            }}
                          >
                            Xem chi tiết
                          </button>
                          <button 
                            className="btn btn-sm btn-primary fw-bold rounded-pill px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookRoom(tinDau);
                            }}
                          >
                            <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Các thẻ phòng tiêu chuẩn (tin từ thứ 2 trở đi) */}
              {mockPhongTros.slice(1).map((tin) => {
                const anhUrl = tin.anh_dai_dien;
                const diaChi = tin.dia_chi_chi_tiet;
                return (
                  <div key={tin.id} className="the-phong-tieu-chuan" onMouseEnter={khiDiChuotVaLaFallback} onMouseLeave={khiDiChuotRa}>
                    <div className="khung-chua-anh-nho">
                      <img className="anh-the-phong-nho" alt={tin.tieu_de} src={anhUrl} />
                      <span className="nhan-gia-tien-the-nho">{dinhDangGiaNgan(tin.gia_thue_min)}</span>
                    </div>
                    <div className="noi-dung-the-phong-nho">
                      <h4 className="tieu-de-the-phong-nho" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }} onClick={() => navigate(`/tin-dang/${tin.id}`)}>
                        {tin.tieu_de}
                      </h4>
                      <p className="dia-chi-the-phong-nho">
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '14px', marginRight: '4px' }}></i> {diaChi}
                      </p>
                      <div className="tien-ich-the-phong">
                        <span className="o-tien-ich-nho">
                          <i className="fa-solid fa-vector-square" style={{ fontSize: '14px', marginRight: '4px' }}></i> 
                          {Math.round(tin.dien_tich_min)}m²
                        </span>
                        <span className="o-tien-ich-nho">
                          <i className="fa-solid fa-couch" style={{ fontSize: '14px', marginRight: '4px' }}></i> 
                          {tin.tinh_trang_noi_that === 'CAO_CAP' ? 'Cao cấp' : tin.tinh_trang_noi_that === 'DAY_DU' ? 'Đầy đủ' : tin.tinh_trang_noi_that === 'CO_BAN' ? 'Cơ bản' : 'Trống'}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                        <span 
                          className="text-primary fw-semibold small cursor-pointer" 
                          style={{ textDecoration: 'underline', cursor: 'pointer' }}
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedRoom(tin); 
                            setShowDetailModal(true); 
                          }}
                        >
                          Xem chi tiết
                        </span>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleBookRoom(tin); 
                          }} 
                          className="btn btn-sm btn-primary rounded-pill px-3"
                          style={{ fontSize: '12px' }}
                        >
                          <i className="fa-solid fa-calendar-check me-1"></i> Thuê phòng
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

      {/* KHU VỰC GIẢI PHÁP TOÀN DIỆN */}
      <section className="khu-vuc-giai-phap">
        <div className="khung-chua-giai-phap">
          <div className="dau-trang-giai-phap">
            <h2 className="tieu-de-lon-giai-phap">Giải pháp toàn diện cho mọi nhu cầu</h2>
            <p className="mo-ta-ngan-giai-phap">TroViet mang đến sự minh bạch cho khách hàng và sự hiệu quả cho chủ trọ thông qua ứng dụng công nghệ hiện đại.</p>
          </div>

          <div className="luoi-hai-cot-giai-phap">
            {/* CỘT 1: KHÁCH HÀNG (NGƯỜI THUÊ) */}
            <div className="the-giai-phap-chi-tiet" onMouseEnter={khiDiChuotVao} onMouseLeave={khiDiChuotRa}>
              <div className="dau-the-giai-phap">
                <div className="vong-tron-icon-nguoi-thue">
                  <i className="fa-solid fa-user-gear" style={{ fontSize: '26px' }}></i>
                </div>
                <h3 className="tieu-de-nhom-doi-tuong">Dành cho Khách hàng</h3>
              </div>
              <ul className="danh-sach-tinh-nang">
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-calendar-days icon-tinh-nang-nguoi-thue"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Đặt lịch hẹn trực tuyến</h4>
                    <p className="mo-ta-tinh-nang-nho">Chủ động gửi yêu cầu hẹn lịch xem phòng trực tiếp tới Chủ trọ chỉ với một cú click.</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-triangle-exclamation icon-tinh-nang-nguoi-thue"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Báo cáo vi phạm minh bạch</h4>
                    <p className="mo-ta-tinh-nang-nho">Gửi báo cáo ngay tới Admin nếu phát hiện tin giả, sai giá, lừa đảo hoặc hình ảnh không đúng thực tế.</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-star-half-stroke icon-tinh-nang-nguoi-thue"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Đánh giá & Bình luận phòng</h4>
                    <p className="mo-ta-tinh-nang-nho">Chấm điểm sao và gửi nhận xét thực tế về không gian sống (áp dụng cho người dùng đã tương tác hợp lệ).</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-robot icon-tinh-nang-nguoi-thue"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Hỏi hỗ trợ / ChatAI</h4>
                    <p className="mo-ta-tinh-nang-nho">Trải nghiệm trợ lý ảo thông minh giúp giải đáp thắc mắc và hướng dẫn sử dụng hệ thống tức thì.</p>
                  </div>
                </li>
              </ul>
              
              {/* KHU VỰC 2 NÚT CỦA KHÁCH HÀNG */}
              <div className="nhom-nut-hanh-dong" style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button 
                  onClick={cuonDenThanhTimKiem} 
                  className="nut-hanh-dong-phu" 
                  style={{ flex: 1 }}
                >
                  Tìm kiếm phòng
                </button>
                <button 
                  onClick={() => navigate('/dang-nhap')} 
                  className="nut-hanh-dong-xanh-duong" 
                  style={{ flex: 1 }}
                >
                  Đăng nhập
                </button>
              </div>
            </div>

            {/* CỘT 2: CHỦ TRỌ */}
            <div className="the-giai-phap-chi-tiet" onMouseEnter={khiDiChuotVao} onMouseLeave={khiDiChuotRa}>
              <div className="dau-the-giai-phap">
                <div className="vong-tron-icon-chu-tro">
                  <i className="fa-solid fa-house-laptop" style={{ fontSize: '24px' }}></i>
                </div>
                <h3 className="tieu-de-nhom-doi-tuong">Dành cho Chủ trọ</h3>
              </div>
              <ul className="danh-sach-tinh-nang">
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-square-plus icon-tinh-nang-chu-tro"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Đăng tin phòng dễ dàng</h4>
                    <p className="mo-ta-tinh-nang-nho">Tạo bài đăng nhanh chóng với đầy đủ tiêu đề, hình ảnh, diện tích, giá thuê và loại phòng cụ thể.</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-list-check icon-tinh-nang-chu-tro"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Quản lý tin đăng & Phòng trọ</h4>
                    <p className="mo-ta-tinh-nang-nho">Theo dõi trạng thái duyệt của Admin; chủ động thêm, sửa, xóa hoặc cập nhật tình trạng phòng trống.</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-clock-history icon-tinh-nang-chu-tro"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Duyệt lịch hẹn xem phòng</h4>
                    <p className="mo-ta-tinh-nang-nho">Quản lý danh sách khách đặt lịch; dễ dàng Chấp nhận hoặc Từ chối lịch hẹn kèm theo lý do cụ thể.</p>
                  </div>
                </li>
                <li className="dong-tinh-nang">
                  <i className="fa-solid fa-bell icon-tinh-nang-chu-tro"></i>
                  <div>
                    <h4 className="tieu-de-tinh-nang-nho">Xem phản hồi & Thông báo</h4>
                    <p className="mo-ta-tinh-nang-nho">Nhận thông báo cập nhật tức thời khi có khách đặt lịch, tin được duyệt hoặc có đánh giá mới.</p>
                  </div>
                </li>
              </ul>
              
              {/* KHU VỰC 2 NÚT CỦA CHỦ TRỌ */}
              <div className="nhom-nut-hanh-dong" style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <button 
                  onClick={() => navigate('/chu-tro/dang-tin-phong-tro')} 
                  className="nut-hanh-dong-phu" 
                  style={{ flex: 1 }}
                >
                  Đăng tin phòng
                </button>
                <button 
                  onClick={() => navigate('/dang-nhap')} 
                  className="nut-hanh-dong-xanh-dam" 
                  style={{ flex: 1 }}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </main>
  );
}