import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SynodAdminLogin.module.css";
import SEO from "../../page-components/SEO";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";

export default function SynodAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await signInWithEmailAndPassword(auth, email, password);

    sessionStorage.setItem("synodAdminAuth", "true");

    toast.success("Login Successful!");
    navigate("/synod-2026-admin/dashboard");
  } catch (error: any) {
    console.error(error);
    toast.error("Invalid admin email or password.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className={styles.pageWrapper}>
      {/* <SEO
        title="Synod Admin Portal | Synod 2026"
        description="Secure login for the Diocese of Calabar Synod Admin Portal."
      />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#0e9f6e",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#c52810",
              color: "#fff",
            },
          },
        }}
      /> */}

      {/* MOBILE WARNING (Only shows on phones) */}
      <div className={styles.mobileWarning}>
        <div className={styles.warningIcon}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c52810"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <h2>Desktop Required</h2>
        <p>
          The Synod Admin Dashboard is highly detailed and requires a larger
          screen.
        </p>
        <p className={styles.subText}>
          Please access this secure portal using a desktop computer or a tablet
          in landscape mode.
        </p>
      </div>

      {/* DESKTOP LOGIN (Only shows on larger screens) */}
      <div className={styles.desktopContainer}>
        <div className={styles.loginCard}>
          <div className={styles.brandSection}>
            <div className={styles.logoBadge}>
              <span className={styles.badgeDot}></span>
              Diocese of Calabar
            </div>
            <h2>Synod Admin Portal</h2>
            <p>Sign in to manage Synod delegates and revenue.</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <div className={styles.inputWrapper}>
                <svg
                  className={styles.inputIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dioceseofcalabar.org"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <svg
                  className={styles.inputIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Secure Sign In →"}
            </button>
          </form>

          <div className={styles.footerText}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            End-to-End Encrypted Portal
          </div>
        </div>
      </div>
    </div>
  );
}
