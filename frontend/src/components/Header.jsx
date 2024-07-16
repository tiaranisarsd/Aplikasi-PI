import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoDocument, IoLogOut, IoAddCircle, IoImages, IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import '../style.css';

export const Header = ({ isMenuActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const hslValue = 'hsl(200, 90%, 25%)';

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className={`menu pl-2 has-shadow ${isMenuActive ? 'is-active' : ''}`}>
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink style={{ color: hslValue }} to={"/dashboard"}><IoHome /> Dashboard</NavLink>
          </li>
          <li>
            <NavLink style={{ color: hslValue }} to={"/pendaftaran"}><IoDocument /> Pendaftaran</NavLink>
            <NavLink style={{ color: hslValue }} to={"/dokumentasi"}><IoImages /> Dokumentasi</NavLink>
            <NavLink style={{ color: hslValue }} to={"/tentangKegiatan"}><IoInformationCircle /> Tentang Kegiatan</NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink style={{ color: hslValue }} to={"/users"}><IoPerson /> Users</NavLink>
                <NavLink style={{ color: hslValue }} to={"/lomba"}><IoAddCircle /> Lomba</NavLink>
                <NavLink style={{ color: hslValue }} to={"/category"}><IoAddCircle /> Kategori</NavLink>
                <NavLink style={{ color: hslValue }} to={"/dashboardAdmin"}><IoAddCircle /> Dashboard</NavLink>
                <NavLink style={{ color: hslValue }} to={"/banner"}><IoAddCircle /> Banner</NavLink>
                <NavLink style={{ color: hslValue }} to={"/dokumentasiAdmin"}><IoAddCircle /> Dokumentasi</NavLink>
                <NavLink style={{ color: hslValue }} to={"/tentangKegiatanAdmin"}><IoAddCircle /> Tentang Kegiatan</NavLink>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button style={{ color: hslValue }} onClick={logout} className="button is-white">
              <IoLogOut /> Log out
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Header;
