import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "./MenuAdmin";
import Footer from "../Footer/Footer";
import "./ContentAdmin.css";

export default function ContentAdmin() {
  return (
    <div className="admin-layout">
      <Header />

      <div className="admin-body">
        <aside className="admin-sidebar">
          <Menu />
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}