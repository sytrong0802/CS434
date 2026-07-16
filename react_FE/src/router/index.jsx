import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Content from '../layout/Content/Content';
import ContentAdmin from '../layout/Admin/ContentAdmin';
import ContentChuTro from '../layout/ChuTro/ContentChuTro';
import ContentKhachHang from '../layout/KhachHang/ContentKhachHang';

import DangNhap from '../components/DangNhap/DangNhap';
import DangKy from '../components/KhachHang/DangKy/DangKy';
import QuenMatKhau from '../components/Quen_DatLai_MatKhau/QuenMatKhau';
import DatLaiMatKhau from '../components/Quen_DatLai_MatKhau/DatLaiMatKhau';
import XacThucChuTro from '../components/XacThuc/XacThuc';
import ProtectedRoute from '../components/ProtectedRoute';

import TrangChu from '../components/KhachHang/TrangChu/TrangChu';
import TimKiem from '../components/KhachHang/TimKiem/TimKiem';
import QuanLyThongTinKhachHang from '../components/KhachHang/QuanLyThongTinKhachHang/QuanLyThongTinKhachHang';
import DatLichHenXemPhong from '../components/KhachHang/DatLichHenXemPhong/DatLichHenXemPhong';
import BaoCaoViPham from '../components/KhachHang/BaoCaoViPham/BaoCaoViPham';
import DanhGia from '../components/KhachHang/DanhGia/DanhGia';

import QuanLyThongTinAdmin from '../components/Admin/QuanLyThongTinAdmin/QuanLyThongTinAdmin';
import QuanLyDanhGia from '../components/Admin/QuanLyDanhGia/QuanLyDanhGia';
import QuanLyBaoCao from '../components/Admin/QuanLyBaoCao/QuanLyBaoCao';
import QuanLyTaiKhoanNguoiDung from '../components/Admin/QuanLyTaiKhoanNguoiDung/QuanLyTaiKhoanNguoiDung';

import DangTinPhongTro from '../components/ChuTro/DangTinPhongTro/DangTinPhongTro';
import QuanLyThongTinChuTro from '../components/ChuTro/QuanLyThongTinChuTro/QuanLyThongTinChuTro';
import QuanLyLichHen from '../components/ChuTro/QuanLyLichHen/QuanLyLichHen';
import QuanLyPhongTro from '../components/ChuTro/QuanLyPhongTro/QuanLyPhongTro';

// import trangchutest from '../components/trangchutest';
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Content />}>
                <Route path="" element={<TrangChu />} />
                <Route path="trang-chu" element={<TrangChu />} />
                <Route path="tim-kiem" element={<TimKiem />} />
                <Route path="search" element={<TimKiem />} />
                
                {/* Protected report route */}
                <Route element={<ProtectedRoute allowedRoles={['KHACH_HANG', 'CHU_TRO', 'ADMIN']} />}>
                    <Route path="bao-cao-vi-pham" element={<BaoCaoViPham />} />
                </Route>
            </Route>

            {/* Admin routes protected with role ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route path="/admin" element={<ContentAdmin />}>
                    <Route path="quan-ly-danh-gia" element={<QuanLyDanhGia />} />
                    <Route path="quan-ly-bao-cao" element={<QuanLyBaoCao />} />
                    <Route path="quan-ly-thong-tin-admin" element={<QuanLyThongTinAdmin />} />
                    <Route path="quan-ly-tai-khoan-nguoi-dung" element={<QuanLyTaiKhoanNguoiDung />} />
                </Route>
            </Route>

            {/* Landlord (Chủ Trọ) routes protected with role CHU_TRO */}
            <Route element={<ProtectedRoute allowedRoles={['CHU_TRO']} />}>
                <Route path="/chu-tro" element={<ContentChuTro />}>
                    <Route path="dang-tin-phong-tro" element={<DangTinPhongTro/>} />
                    <Route path="quan-ly-thong-tin-chu-tro" element={<QuanLyThongTinChuTro />} />
                    <Route path="quan-ly-lich-hen" element={<QuanLyLichHen />} />
                    <Route path="quan-ly-phong-tro" element={<QuanLyPhongTro />} />
                </Route>
            </Route>

            {/* Customer (Khách Hàng) routes protected with role KHACH_HANG */}
            <Route element={<ProtectedRoute allowedRoles={['KHACH_HANG']} />}>
                <Route path="/khach-hang" element={<ContentKhachHang />}>
                    <Route path="dat-lich-hen-xem-phong" element={<DatLichHenXemPhong />} />
                    <Route path="quan-ly-thong-tin-khach-hang" element={<QuanLyThongTinKhachHang />} />
                    <Route path="danh-gia" element={<DanhGia />} />
                </Route>
            </Route>

            <Route path="/dang-nhap" element={<DangNhap />} />
            <Route path="/dang-ky" element={<DangKy />} />
            <Route path="/quen-mat-khau" element={<QuenMatKhau />} />
            <Route path="/dat-lai-mat-khau" element={<DatLaiMatKhau />} />
            <Route path="/xac-thuc-chu-tro" element={<XacThucChuTro />} />

            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="/trang-chu-test" element={<trangchutest />} /> */}
        </Routes>
    );
}

export default AppRouter;