import React from "react";
import "./QuanLyBaoCao.css";

export default function QuanLyBaoCao() {
  return (
    <div className="admin-report-page">
      <div className="admin-report-container">
        <div className="report-manage-header">
          <div>
            <div className="report-breadcrumb">
              <span>Quản lý</span>
              <i className="fa-solid fa-chevron-right"></i>
              <b>Quản lý báo cáo vi phạm</b>
            </div>

            <h2>Quản lý báo cáo vi phạm</h2>
            <p>
              Theo dõi, kiểm duyệt và xử lý các báo cáo vi phạm từ người thuê phòng.
            </p>
          </div>

          <div className="report-manage-icon">
            <i className="fa-solid fa-flag"></i>
          </div>
        </div>

        <div className="report-stat-grid">
          <div className="report-stat-card">
            <div className="stat-icon red">
              <i className="fa-solid fa-flag"></i>
            </div>
            <div>
              <h4>36</h4>
              <p>Tổng báo cáo</p>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="stat-icon yellow">
              <i className="fa-solid fa-clock"></i>
            </div>
            <div>
              <h4>12</h4>
              <p>Đang chờ duyệt</p>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="stat-icon blue">
              <i className="fa-solid fa-spinner"></i>
            </div>
            <div>
              <h4>8</h4>
              <p>Đang xử lý</p>
            </div>
          </div>

          <div className="report-stat-card">
            <div className="stat-icon green">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <h4>16</h4>
              <p>Đã xử lý</p>
            </div>
          </div>
        </div>

        <div className="report-filter-box">
          <div className="filter-title">
            <i className="fa-solid fa-filter"></i>
            <span>Bộ lọc tìm kiếm</span>
          </div>

          <div className="row g-3">
            <div className="col-lg-4">
              <div className="search-input-wrap">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  className="form-control report-search-input"
                  placeholder="Tìm tên trọ, khách thuê, số điện thoại..."
                />
              </div>
            </div>

            <div className="col-lg-3">
              <input
                type="date"
                className="form-control report-search-input"
                title="Ngày vi phạm"
              />
            </div>

            <div className="col-lg-3">
              <select className="form-select report-search-input">
                <option>Tất cả trạng thái</option>
                <option>Đang chờ duyệt</option>
                <option>Đang xử lý</option>
                <option>Đã xử lý</option>
                <option>Từ chối</option>
              </select>
            </div>

            <div className="col-lg-2">
              <button type="button" className="report-search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        <div className="report-table-card">
          <div className="report-table-header">
            <div>
              <h5>Danh sách báo cáo vi phạm</h5>
              <p>Hiển thị các báo cáo mới nhất trong hệ thống</p>
            </div>

            <button type="button" className="report-export-btn">
              <i className="fa-solid fa-file-export"></i>
              Xuất báo cáo
            </button>
          </div>

          <div className="report-table-responsive">
            <table className="table admin-report-table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thông tin phòng</th>
                  <th>Chủ trọ & SĐT</th>
                  <th>Khách thuê</th>
                  <th>Loại vi phạm</th>
                  <th>Ngày báo cáo</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="table-index">1</span>
                  </td>

                  <td>
                    <div className="room-info-cell">
                      <div className="room-mini-icon">
                        <i className="fa-solid fa-house"></i>
                      </div>

                      <div>
                        <h6>Phòng 101</h6>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>
                          Hải Châu, Đà Nẵng
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="owner-cell">
                      <b>Nguyễn Văn A</b>
                      <span>0905.xxx.xxx</span>
                    </div>
                  </td>

                  <td>
                    <div className="tenant-cell">
                      <i className="fa-solid fa-user"></i>
                      <span>Trần Thị B</span>
                    </div>
                  </td>

                  <td>
                    <span className="violation-badge warning">
                      Gây mất trật tự
                    </span>
                  </td>

                  <td>
                    <span className="date-cell">10/03/2026</span>
                  </td>

                  <td>
                    <span className="status-badge pending">
                      Đang chờ duyệt
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button type="button" className="table-action-btn view">
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      <button type="button" className="table-action-btn approve">
                        <i className="fa-solid fa-check"></i>
                      </button>

                      <button type="button" className="table-action-btn reject">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="table-index">2</span>
                  </td>

                  <td>
                    <div className="room-info-cell">
                      <div className="room-mini-icon">
                        <i className="fa-solid fa-house"></i>
                      </div>

                      <div>
                        <h6>Phòng trọ sinh viên gần DTU</h6>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>
                          Liên Chiểu, Đà Nẵng
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="owner-cell">
                      <b>Lê Văn Minh</b>
                      <span>0912.xxx.xxx</span>
                    </div>
                  </td>

                  <td>
                    <div className="tenant-cell">
                      <i className="fa-solid fa-user"></i>
                      <span>Nguyễn Hoàng Nam</span>
                    </div>
                  </td>

                  <td>
                    <span className="violation-badge danger">
                      Lừa đảo / Thu phí
                    </span>
                  </td>

                  <td>
                    <span className="date-cell">15/03/2026</span>
                  </td>

                  <td>
                    <span className="status-badge processing">
                      Đang xử lý
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button type="button" className="table-action-btn view">
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      <button type="button" className="table-action-btn approve">
                        <i className="fa-solid fa-check"></i>
                      </button>

                      <button type="button" className="table-action-btn reject">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="table-index">3</span>
                  </td>

                  <td>
                    <div className="room-info-cell">
                      <div className="room-mini-icon">
                        <i className="fa-solid fa-house"></i>
                      </div>

                      <div>
                        <h6>Nhà trọ Thanh Lương 21</h6>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>
                          Cẩm Lệ, Đà Nẵng
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="owner-cell">
                      <b>Trần Anh Tuấn</b>
                      <span>0988.xxx.xxx</span>
                    </div>
                  </td>

                  <td>
                    <div className="tenant-cell">
                      <i className="fa-solid fa-user"></i>
                      <span>Phạm Thị Hoa</span>
                    </div>
                  </td>

                  <td>
                    <span className="violation-badge orange">
                      Vệ sinh chung
                    </span>
                  </td>

                  <td>
                    <span className="date-cell">18/03/2026</span>
                  </td>

                  <td>
                    <span className="status-badge done">
                      Đã xử lý
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button type="button" className="table-action-btn view">
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      <button type="button" className="table-action-btn delete">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="table-index">4</span>
                  </td>

                  <td>
                    <div className="room-info-cell">
                      <div className="room-mini-icon">
                        <i className="fa-solid fa-house"></i>
                      </div>

                      <div>
                        <h6>Phòng trọ Bách Khoa</h6>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>
                          Gần ĐH Bách Khoa Đà Nẵng
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="owner-cell">
                      <b>Chị Lan</b>
                      <span>0909.xxx.xxx</span>
                    </div>
                  </td>

                  <td>
                    <div className="tenant-cell">
                      <i className="fa-solid fa-user"></i>
                      <span>Trần Quốc Huy</span>
                    </div>
                  </td>

                  <td>
                    <span className="violation-badge blue">
                      Thông tin sai sự thật
                    </span>
                  </td>

                  <td>
                    <span className="date-cell">20/03/2026</span>
                  </td>

                  <td>
                    <span className="status-badge rejected">
                      Từ chối
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button type="button" className="table-action-btn view">
                        <i className="fa-solid fa-eye"></i>
                      </button>

                      <button type="button" className="table-action-btn delete">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="report-table-footer">
            <span>Hiển thị 1 - 4 trong tổng số 36 báo cáo</span>

            <div className="pagination-box">
              <button type="button">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button type="button" className="active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}