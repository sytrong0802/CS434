import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BaoCaoViPham.css";

export default function BaoCaoViPham() {
  const [tinDangs, setTinDangs] = useState([]);
  const [selectedTinDangId, setSelectedTinDangId] = useState("");
  const [lyDo, setLyDo] = useState("");
  const [moTa, setMoTa] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Load listings on mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tin-dang?limit=100")
      .then(res => {
        if (res.data.status === 1) {
          const list = res.data.data.data || res.data.data;
          setTinDangs(list);
        }
      })
      .catch(err => {
        console.error("Lỗi lấy danh sách tin đăng:", err);
      });
  }, []);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedTinDangId) {
      setError("Vui lòng chọn tin đăng phòng trọ cần báo cáo.");
      return;
    }

    if (!lyDo) {
      setError("Vui lòng chọn lý do báo cáo vi phạm.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/bao-cao-vi-pham", {
        tin_dang_id: Number(selectedTinDangId),
        ly_do: lyDo,
        mo_ta: moTa
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.status === 1) {
        setSuccess("Báo cáo vi phạm đã được gửi lên hệ thống thành công!");
        setSelectedTinDangId("");
        setLyDo("");
        setMoTa("");
      } else {
        setError(res.data.message || "Gửi báo cáo vi phạm thất bại.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Có lỗi xảy ra hoặc bạn không có quyền báo cáo phòng trọ này.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-header">
          <div className="report-header-icon">
            <i className="fa-solid fa-flag text-danger"></i>
          </div>

          <div>
            <h2>Lập báo cáo vi phạm</h2>
            <p>
              Nếu bạn phát hiện phòng trọ có thông tin sai lệch, lừa đảo hoặc vi phạm
              quy định, hãy gửi báo cáo để ban quản trị xử lý kịp thời.
            </p>
          </div>
        </div>

        <div className="report-form-card p-4 bg-white rounded-4 shadow-sm">
          <form onSubmit={handleSubmitReport}>
            {error && (
              <div className="alert alert-danger py-2 mb-4" style={{ fontSize: "14px", borderRadius: "8px" }}>
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 mb-4" style={{ fontSize: "14px", borderRadius: "8px" }}>
                <i className="fa-solid fa-circle-check me-2"></i>
                {success}
              </div>
            )}

            <div className="report-section-title mb-3">
              <i className="fa-solid fa-house text-primary me-2"></i>
              <span className="fw-bold">Thông tin phòng trọ cần báo cáo</span>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-lg-12">
                <label className="report-label fw-semibold mb-1">Chọn tin đăng phòng trọ *</label>
                <select
                  className="form-select report-input"
                  value={selectedTinDangId}
                  onChange={(e) => setSelectedTinDangId(e.target.value)}
                >
                  <option value="">-- Chọn tin đăng cần báo cáo --</option>
                  {tinDangs.map((item) => (
                    <option key={item.id} value={item.id}>
                      [Mã tin: {item.id}] {item.tieu_de} - {item.dia_chi_chi_tiet}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="report-section-title mb-3">
              <i className="fa-solid fa-file-circle-exclamation text-primary me-2"></i>
              <span className="fw-bold">Nội dung báo cáo</span>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-lg-12">
                <label className="report-label text-danger fw-semibold mb-1">Loại vi phạm *</label>
                <select
                  className="form-select report-input report-select-danger"
                  value={lyDo}
                  onChange={(e) => setLyDo(e.target.value)}
                >
                  <option value="">-- Chọn lý do vi phạm --</option>
                  <option value="SAI_THONG_TIN">Sai thông tin phòng</option>
                  <option value="PHONG_KHONG_TON_TAI">Phòng không tồn tại</option>
                  <option value="LUA_DAO">Lừa đảo / Thu phí bất thường</option>
                  <option value="SAI_GIA">Sai thông tin giá thuê</option>
                  <option value="SAI_HINH_ANH">Hình ảnh không thực tế</option>
                  <option value="CHU_TRO_KHONG_PHU_HOP">Chủ trọ có hành vi không phù hợp</option>
                  <option value="KHAC">Lý do khác</option>
                </select>
              </div>

              <div className="col-lg-12">
                <label className="report-label fw-semibold mb-1">Mô tả chi tiết / Bằng chứng</label>
                <textarea
                  className="form-control report-input report-textarea"
                  rows="5"
                  placeholder="Nhập mô tả chi tiết hành vi vi phạm của phòng trọ hoặc chủ trọ..."
                  value={moTa}
                  onChange={(e) => setMoTa(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="report-warning-box p-3 rounded-3 bg-light d-flex align-items-center gap-2 mb-4">
              <i className="fa-solid fa-shield-halved text-warning fs-5"></i>
              <span className="text-secondary" style={{ fontSize: "13px" }}>
                Hệ thống chỉ tiếp nhận báo cáo từ người đang thuê phòng thuộc tin đăng này (trong danh sách người ở phòng). Mọi thông tin cung cấp cần đảm bảo trung thực và chính xác.
              </span>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => {
                  setSelectedTinDangId("");
                  setLyDo("");
                  setMoTa("");
                  setError("");
                  setSuccess("");
                }}
              >
                Nhập lại
              </button>
              <button
                type="submit"
                className="btn btn-danger px-4"
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi báo cáo vi phạm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}