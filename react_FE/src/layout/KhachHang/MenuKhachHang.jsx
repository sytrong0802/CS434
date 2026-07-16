import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <ul className="d-flex align-items-center gap-4 list-unstyled mb-0 py-1 justify-content-center" style={{ fontSize: '14.5px' }}>
      <li>
        <NavLink 
          to="/khach-hang/quan-ly-thong-tin-khach-hang" 
          className={({ isActive }) => `text-decoration-none fw-semibold py-2 px-1 ${isActive ? 'text-primary' : 'text-secondary'}`}
          style={({ isActive }) => ({
            display: 'inline-block',
            transition: 'all 0.2s ease',
            borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent'
          })}
        >
          <i className="fa-solid fa-user me-2"></i>Thông tin cá nhân & Lịch hẹn
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/khach-hang/danh-gia" 
          className={({ isActive }) => `text-decoration-none fw-semibold py-2 px-1 ${isActive ? 'text-primary' : 'text-secondary'}`}
          style={({ isActive }) => ({
            display: 'inline-block',
            transition: 'all 0.2s ease',
            borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent'
          })}
        >
          <i className="fa-solid fa-star me-2"></i>Đánh giá của tôi
        </NavLink>
      </li>
    </ul>
  );
}