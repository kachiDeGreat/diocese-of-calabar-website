import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.mainFooter}>
        <div className={styles.cover}>
          <div className={styles.container}>
            <div className={styles.footerContent}>
              {/* Church Info Section */}
              <div className={styles.churchSection}>
                <div className={styles.logoArea}>
                  <div className={styles.logoContainer}>
                    <img
                      src="https://i.ibb.co/5hHtYQVs/logo-alt-removebg-preview-1.png"
                      alt="Logo"
                      className={styles.logo}
                    />
                  </div>
                  <div className={styles.churchInfo}>
                    <h3 className={styles.churchName}>
                      Anglican Diocese of Calabar
                    </h3>
                    <p className={styles.churchTagline}>Jesus is Lord</p>
                  </div>
                </div>
                <p className={styles.churchDescription}>
                  Anglican Diocese of Calabar is a diocese within the
                  Ecclesiastical Province of Niger Delta in the Church of
                  Nigeria (Anglican Communion).
                </p>
                <div className={styles.socialMedia}>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Facebook"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="YouTube"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polygon
                        points="9.75,15.02 15.5,11.75 9.75,8.48"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
              
               
                </div>
              </div>

              {/* Quick Links */}
              <div className={styles.linksSection}>
                <h4 className={styles.sectionTitle}>Explore</h4>
                <ul className={styles.linksList}>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/bishop-of-calabar">Our Bishop</Link>
                  </li>
                  <li>
                    <Link to="/archdeaconries">Archdeaconries</Link>
                  </li>
                  <li>
                    <Link to="/ministries">Ministries</Link>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                </ul>
              </div>

              {/* Contact & Service Times */}
              <div className={styles.contactSection}>
                <h4 className={styles.sectionTitle}>Visit Us</h4>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div>
                      <p style={{ textTransform: "capitalize" }}>
                        Cathedral Church of the holy trinity
                      </p>
                      <p>81 Calabar Rd, Calabar, Cross River State</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <p>+234-801-234-5678</p>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.iconWrapper}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polyline
                          points="22,6 12,13 2,6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <p>info@dioceseofCalabar.org</p>
                  </div>
                </div>

                <div className={styles.serviceTimes}>
                  <h5 className={styles.serviceTitle}>Service Times</h5>
                  <div className={styles.serviceSchedule}>
                    <div className={styles.serviceItem}>
                      <span className={styles.serviceDay}>Sunday</span>
                      <span className={styles.serviceTime}>
                        8:00 AM & 10:30 AM
                      </span>
                    </div>
                    <div className={styles.serviceItem}>
                      <span className={styles.serviceDay}>Wednesday</span>
                      <span className={styles.serviceTime}>6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>
                &copy; 2025 Anglican Diocese of Calabar. Website by{" "}
                <a
                  href="https://www.onyekachi.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bolder",
                    textDecoration: "none",
                    color: "#c52810",
                  }}
                >
                  KACHIDEGREAT
                </a>
              </p>
            </div>
            <div className={styles.footerLinks}>
              <Link to="/privacy">Privacy Policy</Link>
              <span className={styles.divider}>•</span>
              <Link to="/terms">Terms of Service</Link>
              <span className={styles.divider}>•</span>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
