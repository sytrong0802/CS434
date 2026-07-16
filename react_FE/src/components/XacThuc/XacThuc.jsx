import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./XacThuc.css";

export default function XacThucChuTro() {
  const navigate = useNavigate();
  
  // State giả lập để hiển thị tên file sau khi chủ trọ chọn ảnh
  const [files, setFiles] = useState({
    cccdTruoc: null,
    cccdSau: null,
    soDo: null,
  });

  const handleFileChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [key]: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi dữ liệu lên Server ở đây
    alert("Gửi thông tin xác thực thành công! Vui lòng chờ Admin phê duyệt.");
    navigate("/"); // Quay lại trang chủ hoặc trang quản lý
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        
        {/* Header trang */}
        <div className="verify-header">
          <div className="verify-icon-main">
            <i className="bx bx-check-shield"></i>
          </div>
          <h2>Xác Thực Tài Khoản Chủ Trọ</h2>
          <p>
            Để bảo vệ quyền lợi khách thuê và tăng độ uy tín cho tin đăng, vui lòng hoàn thiện các thông tin minh chứng chính chủ dưới đây.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          
          {/* PHẦN 1: THÔNG TIN CÁ NHÂN */}
          <div className="verify-section">
            <h3 className="section-title"><i className="bx bx-user"></i> 1. Thông tin cá nhân</h3>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Số điện thoại liên hệ (Nhận OTP)</label>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bx bx-phone"></i></span>
                  <input type="tel" className="verify-input" placeholder="Ví dụ: 0912345xxx" required />
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label-custom">Số CCCD / Định danh</label>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bx bx-id-card"></i></span>
                  <input type="text" className="verify-input" placeholder="Nhập số CCCD gồm 12 số" required />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label-custom">Địa chỉ thường trú / Tạm trú</label>
              <div className="input-group-custom">
                <span className="input-icon"><i className="bx bx-map"></i></span>
                <input type="text" className="verify-input" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." required />
              </div>
            </div>
          </div>

          {/* PHẦN 2: TẢI ẢNH CCCD */}
          <div className="verify-section">
            <h3 className="section-title"><i className="bx bx-image-add"></i> 2. Ảnh chụp Căn cước công dân</h3>
            <p className="section-subtitle">Yêu cầu ảnh chụp rõ nét, không bị lóa sáng, không mất góc giấy tờ.</p>
            
            <div className="upload-grid">
              {/* Mặt trước CCCD */}
              <div className="upload-box-wrapper">
                <label className="form-label-custom text-center d-block">Mặt trước CCCD</label>
                <label className="upload-drag-zone">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cccdTruoc")} required />
                  <i className="bx bx-cloud-upload upload-icon"></i>
                  <span className="upload-text">
                    {files.cccdTruoc ? files.cccdTruoc : "Bấm hoặc kéo thả ảnh vào đây"}
                  </span>
                </label>
              </div>

              {/* Mặt sau CCCD */}
              <div className="upload-box-wrapper">
                <label className="form-label-custom text-center d-block">Mặt sau CCCD</label>
                <label className="upload-drag-zone">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cccdSau")} required />
                  <i className="bx bx-cloud-upload upload-icon"></i>
                  <span className="upload-text">
                    {files.cccdSau ? files.cccdSau : "Bấm hoặc kéo thả ảnh vào đây"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* PHẦN 3: MINH CHỨNG SỞ HỮU */}
          <div className="verify-section">
            <h3 className="section-title"><i className="bx bx-home-heart"></i> 3. Minh chứng sở hữu / Quản lý trọ</h3>
            <p className="section-subtitle">Tải lên ảnh Sổ đỏ/Sổ hồng, Giấy phép kinh doanh hoặc Hợp đồng ủy quyền quản lý nhà trọ.</p>
            
            <label className="upload-drag-zone solo-upload">
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "soDo")} required />
              <i className="bx bx-file-find upload-icon-large"></i>
              <span className="upload-text">
                {files.soDo ? files.soDo : "Chọn ảnh chụp Sổ đỏ / Sổ hồng hoặc Giấy tờ pháp lý liên quan"}
              </span>
              <small className="upload-hint">Hỗ trợ định dạng định dạng JPG, PNG. Dung lượng tối đa 5MB</small>
            </label>
          </div>

          {/* CHÚ Ý & HỦY/GỬI */}
          <div className="verify-info-note">
            <i className="bx bx-shield-quarter"></i>
            <span>
              <strong>Cam kết bảo mật:</strong> Các thông tin và hình ảnh giấy tờ pháp lý của bạn chỉ phục vụ cho mục đích đối chiếu xác thực tài khoản nội bộ của Ban quản trị TroViet, tuyệt đối không công khai ra bên ngoài.
            </span>
          </div>

          <div className="verify-actions-row">
            <button type="button" className="btn-cancel" onClick={() => navigate("/dang-ky")}>
              Để sau, quay lại
            </button>
            <button type="submit" className="btn-submit-verify">
              Gửi hồ sơ duyệt
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}