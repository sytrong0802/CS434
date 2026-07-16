import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';
import MenuKhachHang from '../KhachHang/MenuKhachHang';
import MenuChuTro from '../ChuTro/MenuChuTro';

export default function Header() {
    const navigate = useNavigate();

    // Get auth status and user details reactively
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [role, setRole] = useState(() => localStorage.getItem('role'));
    const [user, setUser] = useState(() => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
            setRole(localStorage.getItem('role'));
            const userStr = localStorage.getItem('user');
            setUser(userStr ? JSON.parse(userStr) : null);
        };

        // Listen for storage events (from other tabs/windows or custom dispatch)
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const hoTen = user ? user.ho_ten : '';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setToken(null);
        setRole(null);
        setUser(null);
        navigate('/dang-nhap');
    };

    const handleProfileRedirect = () => {
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
            navigate('/admin/quan-ly-thong-tin-admin');
        } else if (role === 'CHU_TRO') {
            navigate('/chu-tro/quan-ly-thong-tin-chu-tro');
        } else if (role === 'KHACH_HANG') {
            navigate('/khach-hang/quan-ly-thong-tin-khach-hang');
        } else {
            navigate('/');
        }
    };

    return (
        <header className="sticky-top shadow-sm">
            <nav className="navbar navbar-expand-lg bg-white" style={{ height: '100px', borderBottom: '1px solid #e0e0e0' }}>
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center gap-3" style={{width: '475px'}}>
                        <Link to="/" className="text-decoration-none d-flex flex-column justify-content-center">
                            <h3 className="text-dark mb-0 fw-bold" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>
                                PHONGTRO <span style={{ color: '#1E3A8A' }}>HQC</span>
                            </h3>
                            <small className="text-secondary fw-medium" style={{ fontSize: '0.85rem' }}>
                                Kênh Phòng Trọ Số 1
                            </small>
                        </Link>
                    </div>
                    <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              
                    {/* Trang Chủ */}
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-dark px-4 py-2 rounded-3 hover-effect">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bx bx-home-circle fs-5 lead text-primary"></i>
                            <h6 className="fw-bold mb-0">Trang Chủ</h6>
                        </div>
                        </Link>
                    </li>
                    
                    {/* Tìm Kiếm */}
                    <li className="nav-item">
                        <Link to="/search" className="nav-link text-dark px-4 py-2 rounded-3 hover-effect">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bx bx-search fs-5 lead text-success"></i>
                            <h6 className="fw-bold mb-0">Tìm Kiếm</h6>
                        </div>
                        </Link>
                    </li>
                    
                    {/* Báo Cáo Vi Phạm */}
                    <li className="nav-item">
                        <Link to="/bao-cao-vi-pham" className="nav-link text-dark px-4 py-2 rounded-3 hover-effect">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bx bx-flag fs-5 lead text-danger" style={{ textColor: '#0D2E94'}}></i>
                            <h6 className="fw-bold mb-0">Báo Cáo Vi Phạm</h6>
                        </div>
                        </Link>
                    </li>
    
                    </ul>
                    <div className="ms-auto d-flex align-items-center gap-3">
                        <button 
                            onClick={() => navigate('/chu-tro/dang-tin-phong-tro')}
                            className="btn btn-primary rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm"
                            style={{ backgroundColor: '#2563eb', borderColor: '#2563eb', transition: 'all 0.3s ease' }}
                        >
                            <i className="bx bx-edit-alt fs-5"></i> 
                            <span>Đăng tin +</span>
                        </button>
                        <div className="opacity-25 my-2" style={{ height: '30px', width: '1.5px' }}></div>
                        
                        {token ? (
                            <div className="d-flex align-items-center gap-3">
                                <span 
                                    onClick={handleProfileRedirect}
                                    className="fw-bold text-dark d-flex align-items-center gap-1" 
                                    style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                                    title="Xem thông tin cá nhân"
                                    onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                    onMouseLeave={(e) => e.target.style.color = '#212529'}
                                    role="button"
                                >
                                    <i className="bx bx-user-circle fs-4 text-primary"></i>
                                    Xin chào, {hoTen}
                                </span>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 fw-bold"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate('/dang-nhap')} 
                                className="btn-dang-nhap px-3 py-2"
                                style={{ color: '#212529' }}
                            >
                                Đăng nhập
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {token && role === 'KHACH_HANG' && (
                <div className="bg-white border-bottom py-1">
                    <div className="container d-flex justify-content-center">
                        <MenuKhachHang />
                    </div>
                </div>
            )}
            {token && role === 'CHU_TRO' && (
                <div className="bg-white border-bottom py-1">
                    <div className="container d-flex justify-content-center">
                        <MenuChuTro />
                    </div>
                </div>
            )}
        </header>
    );
}