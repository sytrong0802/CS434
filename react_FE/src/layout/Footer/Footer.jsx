import React from "react";

export default function Footer() {
  const linkStyle = {
    color: "rgba(255,255,255,0.65)",
    transition: "0.25s ease",
    fontSize: "14px",
  };

  const socialStyle = {
    width: "34px",
    height: "34px",
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.25s ease",
  };

  return (
    <footer
      className="text-white w-100 mt-5"
      style={{
        background: "#11161b",
        padding: "36px 0 24px",
      }}
    >
      <div className="container">
        <div className="row gy-4 justify-content-between align-items-start">
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <a href="#" className="text-decoration-none d-inline-block">
                <h3 className="footer-logo mb-3">PHONGTRO HQC</h3>
              </a>

              <p className="footer-desc mb-0">
                Kiến tạo không gian sống hiện đại và minh bạch cho cộng đồng
                người thuê phòng tại Việt Nam.
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6
              className="text-uppercase fw-bold mb-3">
              Khám phá
            </h6>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Tìm phòng trọ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Chung cư mini
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Căn hộ dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Đăng tin cho thuê
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6
              className="text-uppercase fw-bold mb-3">
              Hỗ trợ
            </h6>

            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Giới thiệu
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Quy chế hoạt động
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none footer-link" style={linkStyle}>
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6
              className="text-uppercase fw-bold mb-3">
              Kết nối với chúng tôi
            </h6>

            <div
              className="d-flex align-items-start gap-2 mb-2"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}
            >
              <i className="fa-solid fa-phone fa-fw text-success mt-1"></i>
              <span>077.550.5547</span>
            </div>

            <div
              className="d-flex align-items-start gap-2 mb-2"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}
            >
              <i className="fa-solid fa-envelope fa-fw text-warning mt-1"></i>
              <span>phongtrohqc@gmail.com</span>
            </div>

            <div
              className="d-flex gap-2 mb-2"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}
            >
              <i className="fa-solid fa-location-dot fa-fw text-danger mt-1"></i>
              <span>
                VP Đà Nẵng: 78 Phan Văn Trị, Khuê Trung, Cẩm Lệ, Đà Nẵng
              </span>
            </div>

            <div
              className="d-flex align-items-start gap-2 mb-3"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px" }}
            >
              <i className="fa-solid fa-earth-americas fa-fw text-primary mt-1"></i>
              <span>Việt Nam</span>
            </div>

            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none footer-social"
                style={socialStyle}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none footer-social"
                style={socialStyle}
              >
                <i className="fa-solid fa-envelope"></i>
              </a>

              <a
                href="#"
                className="d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none footer-social"
                style={socialStyle}
              >
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p
            className="mb-0 text-center text-md-start"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            © 2026{" "}
            <strong style={{ color: "#ffffff" }}>PHONGTRO HQC</strong>. A student
            housing solution for Duy Tan University. All rights reserved.
          </p>

          <div className="d-flex align-items-center gap-4">
            <a
              href="#"
              className="text-decoration-none footer-link fw-semibold"
              style={linkStyle}
            >
              Liên hệ
            </a>
            <a
              href="#"
              className="text-decoration-none footer-link fw-semibold"
              style={linkStyle}
            >
              Về chúng tôi
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
          .footer-brand {
            max-width: 390px;
          }

          .footer-logo {
            color: #ffffff !important;
            font-size: 22px;
            font-weight: 800;
            line-height: 1.3;
            letter-spacing: 0.4px;
            margin: 0;
          }
          
          .footer-desc {
            color: #ffffff !important;
            font-size: 14px;
            line-height: 1.75;
            max-width: 360px;
          }
          
          .footer-link:hover {
            color: #93c5fd !important;
          }

          .footer-social:hover {
            background-color: rgba(255,255,255,0.16) !important;
            transform: translateY(-2px);
          }

          @media (max-width: 767px) {
            footer {
              text-align: center;
            }

            footer .d-flex.align-items-start {
              justify-content: center;
              text-align: left;
            }
          }
        `}
      </style>
    </footer>
  );
}