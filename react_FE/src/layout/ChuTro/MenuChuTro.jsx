import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <ul className="nav nav-tabs border-bottom-0 gap-3 py-1 justify-content-center">
      <li className="nav-item">
        <NavLink to="/chu-tro/quan-ly-phong-tro" className={({ isActive }) => `nav-link border-0 fw-semibold px-3 py-2 rounded-3 text-secondary ${isActive ? 'bg-light text-primary' : 'hover-bg-light'}`}>
          <i className="fa-solid fa-list-check me-2"></i>Quản lý phòng trọ
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/chu-tro/dang-tin-phong-tro" className={({ isActive }) => `nav-link border-0 fw-semibold px-3 py-2 rounded-3 text-secondary ${isActive ? 'bg-light text-primary' : 'hover-bg-light'}`}>
          <i className="fa-solid fa-file-signature me-2"></i>Đăng tin phòng trọ
        </NavLink>
      </li>
    </ul>
  );
}