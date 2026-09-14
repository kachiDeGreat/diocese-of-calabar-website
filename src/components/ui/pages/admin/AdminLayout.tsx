import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import toast, { Toaster } from "react-hot-toast";
import styles from "./AdminLayout.module.css";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Menu,
  X,
  UserCheck
} from "lucide-react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("synodAdminAuth");
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Posts", path: "/admin/blog", icon: FileText },
    { name: "Synod 2027", path: "/admin/synod", icon: Users },
    { name: "Staff", path: "/admin/staff", icon: UserCheck, disabled: true },
  ];

  return (
    <div className={styles.layout}>
      <Toaster position="top-right" />
      
      {/* Mobile Topbar */}
      <div className={styles.mobileTopbar}>
        <div className={styles.brand}>Diocese Admin</div>
        <button 
          className={styles.menuBtn} 
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay} 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>
            <div className={styles.logoBadge}></div>
            <div>
              <h3>Admin Portal</h3>
              <p>Diocese of Calabar</p>
            </div>
          </div>
          <button 
            className={styles.closeBtn} 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.disabled ? "#" : item.path}
              onClick={() => !item.disabled && setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive && !item.disabled ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
              {item.disabled && <span className={styles.badge}>Soon</span>}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
