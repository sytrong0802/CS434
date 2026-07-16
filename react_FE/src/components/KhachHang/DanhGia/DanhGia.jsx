import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DanhGia.css";

export default function DanhGia() {
  const [reviews, setReviews] = useState([]);
  const [eligibleListings, setEligibleListings] = useState([]);
  const [selectedTinDangId, setSelectedTinDangId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const token = localStorage.getItem("token");

  // Load reviews from API
  const loadMyReviews = () => {
    if (!token) return;
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/danh-gia/my-reviews", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setReviews(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi tải đánh giá của tôi:", err))
    .finally(() => setLoading(false));
  };

  // Load eligible rooms/listings that this user can review (DA_ROI status)
  const loadEligibleListings = () => {
    if (!token) return;
    axios.get("http://127.0.0.1:8000/api/danh-gia/eligible-listings", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        setEligibleListings(res.data.data);
      }
    })
    .catch(err => console.error("Lỗi tải tin đăng đủ điều kiện đánh giá:", err));
  };

  useEffect(() => {
    loadMyReviews();
    loadEligibleListings();
  }, [token]);

  // Submit Review Form
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!selectedTinDangId) {
      alert("Vui lòng chọn bài đăng trọ để tiến hành đánh giá.");
      return;
    }

    const payload = {
      tin_dang_id: Number(selectedTinDangId),
      so_sao: rating,
      binh_luan: comment,
    };

    axios.post("http://127.0.0.1:8000/api/danh-gia", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Gửi đánh giá phòng trọ thành công!");
        setSelectedTinDangId("");
        setRating(5);
        setComment("");
        loadMyReviews();
      } else {
        alert(res.data.message || "Gửi đánh giá thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.message || "Đã xảy ra lỗi khi gửi đánh giá.");
    });
  };

  // Delete Review
  const handleDeleteReview = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) return;

    axios.delete(`http://127.0.0.1:8000/api/danh-gia/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.status === 1) {
        alert("Xóa đánh giá thành công!");
        loadMyReviews();
      } else {
        alert(res.data.message || "Xóa đánh giá thất bại.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Đã xảy ra lỗi khi xóa đánh giá.");
    });
  };

  // Filter reviews locally
  const filteredReviews = reviews.filter(rev => {
    if (filterStatus === "ALL") return true;
    if (filterStatus === "HIEN_THI") return rev.trang_thai === "HIEN_THI";
    if (filterStatus === "AN_HIEN_THI") return rev.trang_thai !== "HIEN_THI";
    return true;
  });

  // Calculate statistics
  const totalCount = reviews.length;
  const approvedCount = reviews.filter(r => r.trang_thai === "HIEN_THI").length;
  const pendingCount = totalCount - approvedCount;
  const avgRating = totalCount > 0 
    ? (reviews.reduce((sum, r) => sum + Number(r.so_sao), 0) / totalCount).toFixed(1)
    : "0.0";

  return (
    <div className="dgpt-page">
      <div className="dgpt-header">
        <div>
          <p className="dgpt-subtitle">Khách hàng</p>
          <h2>
            Đánh Giá <span>Nhà Trọ & Phòng Trọ</span>
          </h2>
        </div>
      </div>

      <div className="dgpt-overview">
        <div className="dgpt-overview-card">
          <div className="dgpt-icon blue">
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <p>Tổng đánh giá</p>
            <h4>{totalCount}</h4>
          </div>
        </div>

        <div className="dgpt-overview-card">
          <div className="dgpt-icon yellow">
            <i className="fa-solid fa-ranking-star"></i>
          </div>
          <div>
            <p>Điểm trung bình</p>
            <h4>{avgRating}/5</h4>
          </div>
        </div>

        <div className="dgpt-overview-card">
          <div className="dgpt-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <p>Đã duyệt</p>
            <h4>{approvedCount}</h4>
          </div>
        </div>

        <div className="dgpt-overview-card">
          <div className="dgpt-icon orange">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <p>Ẩn / Chờ duyệt</p>
            <h4>{pendingCount}</h4>
          </div>
        </div>
      </div>

      <div className="dgpt-content">
        
        {/* CỘT TRÁI: VIẾT ĐÁNH GIÁ MỚI */}
        <div className="dgpt-form-card">
          <div className="dgpt-card-title">
            <div>
              <h5>Viết đánh giá mới</h5>
              <p>Chia sẻ trải nghiệm chân thực của bạn về phòng trọ/nhà trọ sau khi đã ở và dọn đi</p>
            </div>
          </div>

          <form onSubmit={handleSubmitReview}>
            <div className="dgpt-form-group text-start">
              <label className="fw-bold mb-1 d-block">Chọn tin đăng trọ từng ở <span className="text-danger">*</span></label>
              <select 
                value={selectedTinDangId} 
                onChange={e => setSelectedTinDangId(e.target.value)}
                required
                className="form-select"
              >
                <option value="">-- Chọn bài đăng trọ từng ở --</option>
                {eligibleListings.length === 0 ? (
                  <option disabled value="">(Bạn chưa có phòng trọ nào đã trả phòng dọn đi để đánh giá)</option>
                ) : (
                  eligibleListings.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.tieu_de}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="dgpt-form-group text-start mt-3">
              <label className="fw-bold mb-1 d-block">Điểm đánh giá <span className="text-danger">*</span></label>
              <div className="dgpt-stars-select">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={star <= rating ? "fa-solid fa-star active" : "fa-regular fa-star"}
                    onClick={() => setRating(star)}
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  ></i>
                ))}
                <span className="ms-2 fw-semibold text-warning">{rating} sao</span>
              </div>
            </div>

            <div className="dgpt-form-group text-start mt-3">
              <label className="fw-bold mb-1 d-block">Nội dung đánh giá <span className="text-danger">*</span></label>
              <textarea
                rows="5"
                placeholder="Nhập cảm nhận chân thực của bạn về chất lượng phòng trọ, thái độ chủ trọ, an ninh, giá cả dịch vụ..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                className="form-control"
              ></textarea>
            </div>

            <button type="submit" className="dgpt-submit-btn w-100 mt-4 py-2 fw-bold text-white bg-warning border-0 rounded shadow-sm">
              <i className="fa-solid fa-paper-plane me-1"></i>
              GỬI ĐÁNH GIÁ
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: DANH SÁCH ĐÁNH GIÁ CỦA BẢN THÂN */}
        <div className="dgpt-list-card">
          <div className="dgpt-list-header">
            <div className="text-start">
              <h5>Đánh giá của tôi</h5>
              <p>Danh sách các phản hồi bạn đã gửi lên hệ thống</p>
            </div>

            <select 
              className="form-select form-select-sm w-auto"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="ALL">Tất cả</option>
              <option value="HIEN_THI">Đã duyệt</option>
              <option value="AN_HIEN_THI">Ẩn</option>
            </select>
          </div>

          <div className="dgpt-review-list">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Đang tải...</span>
                </div>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-5 bg-light rounded border">
                <i className="fa-solid fa-star-half-stroke text-muted fs-1 mb-3"></i>
                <p className="text-secondary fw-medium">Bạn chưa gửi đánh giá nào hoặc không có đánh giá phù hợp.</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <div className="dgpt-review-item" key={review.id}>
                  <img 
                    src={review.tin_dang?.anh_dai_dien || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"} 
                    alt={review.tin_dang?.tieu_de || "Phòng trọ"} 
                  />

                  <div className="dgpt-review-info text-start">
                    <div className="dgpt-review-top">
                      <div>
                        <h6>{review.tin_dang?.tieu_de || "Bài đăng trọ"}</h6>
                        <p className="text-muted small">
                          <i className="fa-solid fa-location-dot me-1"></i>
                          {review.tin_dang?.dia_chi_chi_tiet || "Không rõ địa chỉ"}
                        </p>
                      </div>

                      <span
                        className={
                          review.trang_thai === "HIEN_THI"
                            ? "dgpt-status approved"
                            : "dgpt-status pending"
                        }
                      >
                        {review.trang_thai === "HIEN_THI" ? "Đã duyệt" : "Đang ẩn"}
                      </span>
                    </div>

                    <div className="dgpt-rating my-2 text-warning">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={
                            star <= review.so_sao
                              ? "fa-solid fa-star"
                              : "fa-regular fa-star"
                          }
                        ></i>
                      ))}
                      <span className="text-muted small ms-2">{review.so_sao}/5 sao</span>
                    </div>

                    <p className="dgpt-review-content text-secondary italic">
                      "{review.binh_luan}"
                    </p>

                    <div className="dgpt-review-bottom mt-3 d-flex justify-content-between align-items-center">
                      <span className="text-muted small">
                        <i className="fa-regular fa-calendar me-1"></i>
                        {review.tao_luc ? new Date(review.tao_luc).toLocaleDateString("vi-VN") : "Hôm nay"}
                      </span>

                      <div>
                        <button 
                          className="dgpt-delete-btn btn btn-sm btn-outline-danger py-0 px-2 rounded"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <i className="fa-solid fa-trash me-1"></i>Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}