import React from "react";
import "./QuanLyDanhGia.css";

export default function QuanLyDanhGia() {
  return (
    <div className="admin-review-page">
      <div className="admin-review-container">
        <div className="review-page-header">
          <div>
            <div className="review-breadcrumb">
              <span>Quản lý</span>
              <i className="fa-solid fa-chevron-right"></i>
              <b>Quản lý đánh giá</b>
            </div>

            <h2>Quản lý đánh giá phòng trọ</h2>
            <p>
              Theo dõi, kiểm duyệt và quản lý các đánh giá của khách thuê về phòng trọ.
            </p>
          </div>

          <div className="review-header-icon">
            <i className="fa-solid fa-star-half-stroke"></i>
          </div>
        </div>

        <div className="review-stat-grid">
          <div className="review-stat-card">
            <div className="stat-icon yellow">
              <i className="fa-solid fa-star"></i>
            </div>
            <div>
              <h4>128</h4>
              <p>Tổng đánh giá</p>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon green">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <h4>96</h4>
              <p>Đánh giá tích cực</p>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon red">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <h4>12</h4>
              <p>Cần kiểm duyệt</p>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon blue">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <h4>4.5</h4>
              <p>Điểm trung bình</p>
            </div>
          </div>
        </div>

        <div className="review-filter-box">
          <div className="filter-title">
            <i className="fa-solid fa-filter"></i>
            <span>Bộ lọc tìm kiếm</span>
          </div>

          <div className="row g-3">
            <div className="col-lg-5">
              <div className="search-input-wrap">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  className="form-control review-input"
                  placeholder="Tìm tên trọ, khách thuê, số điện thoại..."
                />
              </div>
            </div>

            <div className="col-lg-3">
              <input type="date" className="form-control review-input" />
            </div>

            <div className="col-lg-2">
              <select className="form-select review-input">
                <option>Tất cả sao</option>
                <option>5 sao</option>
                <option>4 sao</option>
                <option>3 sao</option>
                <option>2 sao</option>
                <option>1 sao</option>
              </select>
            </div>

            <div className="col-lg-2">
              <button type="button" className="review-search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        <div className="review-list">
          <div className="admin-review-card">
            <div className="review-card-left">
              <div className="review-room-icon">
                <i className="fa-solid fa-house"></i>
              </div>
            </div>

            <div className="review-card-body">
              <div className="review-card-top">
                <div>
                  <h4>Phòng Trọ Sinh Viên Liên Chiểu</h4>
                  <div className="review-address">
                    <i className="fa-solid fa-location-dot"></i>
                    16 Sư Hy Nhan, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng
                  </div>
                </div>

                <span className="review-status approved">Đã duyệt</span>
              </div>

              <div className="review-meta-grid">
                <div className="review-meta-item">
                  <i className="fa-solid fa-user-tie"></i>
                  <span>
                    Chủ nhà: <b>Hà</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-phone"></i>
                  <span>1234567890</span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-user"></i>
                  <span>
                    Khách thuê: <b>Nguyễn Văn Minh</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>12/06/2026</span>
                </div>
              </div>

              <div className="review-rating-row">
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <span>5.0 / 5.0</span>
              </div>

              <div className="review-content-box">
                <i className="fa-solid fa-quote-left"></i>
                <p>Phòng sạch sẽ, chủ nhà thân thiện, an ninh tốt.</p>
              </div>
            </div>

            <div className="review-card-actions">
              <button type="button" className="action-btn view">
                <i className="fa-solid fa-eye"></i>
              </button>

              <button type="button" className="action-btn hide">
                <i className="fa-solid fa-eye-slash"></i>
              </button>

              <button type="button" className="action-btn delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <div className="admin-review-card">
            <div className="review-card-left">
              <div className="review-room-icon">
                <i className="fa-solid fa-house"></i>
              </div>
            </div>

            <div className="review-card-body">
              <div className="review-card-top">
                <div>
                  <h4>Nhà trọ Thanh Lương 21</h4>
                  <div className="review-address">
                    <i className="fa-solid fa-location-dot"></i>
                    35 Thanh Lương 21, Hoà Xuân, Cẩm Lệ
                  </div>
                </div>

                <span className="review-status pending">Chờ kiểm duyệt</span>
              </div>

              <div className="review-meta-grid">
                <div className="review-meta-item">
                  <i className="fa-solid fa-user-tie"></i>
                  <span>
                    Chủ nhà: <b>Anh Tuấn</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-phone"></i>
                  <span>0988888888</span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-user"></i>
                  <span>
                    Khách thuê: <b>Lê Thị Hoa</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>10/06/2026</span>
                </div>
              </div>

              <div className="review-rating-row">
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <span>4.0 / 5.0</span>
              </div>

              <div className="review-content-box">
                <i className="fa-solid fa-quote-left"></i>
                <p>Phòng ổn, giá hợp lý, gần trường.</p>
              </div>
            </div>

            <div className="review-card-actions">
              <button type="button" className="action-btn view">
                <i className="fa-solid fa-eye"></i>
              </button>

              <button type="button" className="action-btn approve">
                <i className="fa-solid fa-check"></i>
              </button>

              <button type="button" className="action-btn delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <div className="admin-review-card">
            <div className="review-card-left">
              <div className="review-room-icon">
                <i className="fa-solid fa-house"></i>
              </div>
            </div>

            <div className="review-card-body">
              <div className="review-card-top">
                <div>
                  <h4>Phòng trọ Bách Khoa</h4>
                  <div className="review-address">
                    <i className="fa-solid fa-location-dot"></i>
                    Gần ĐH Bách Khoa Đà Nẵng
                  </div>
                </div>

                <span className="review-status warning">Cần xem xét</span>
              </div>

              <div className="review-meta-grid">
                <div className="review-meta-item">
                  <i className="fa-solid fa-user-tie"></i>
                  <span>
                    Chủ nhà: <b>Chị Lan</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-phone"></i>
                  <span>0909999999</span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-user"></i>
                  <span>
                    Khách thuê: <b>Trần Quốc Huy</b>
                  </span>
                </div>

                <div className="review-meta-item">
                  <i className="fa-solid fa-calendar-days"></i>
                  <span>08/06/2026</span>
                </div>
              </div>

              <div className="review-rating-row">
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <span>3.0 / 5.0</span>
              </div>

              <div className="review-content-box">
                <i className="fa-solid fa-quote-left"></i>
                <p>Phòng nhỏ nhưng đầy đủ tiện nghi.</p>
              </div>
            </div>

            <div className="review-card-actions">
              <button type="button" className="action-btn view">
                <i className="fa-solid fa-eye"></i>
              </button>

              <button type="button" className="action-btn hide">
                <i className="fa-solid fa-eye-slash"></i>
              </button>

              <button type="button" className="action-btn delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}