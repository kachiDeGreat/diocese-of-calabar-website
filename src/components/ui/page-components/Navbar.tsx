import { useState } from "react";
import styles from "../styles/navbar.module.css";
import { Images } from "../../Assets/assets";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMegaMenuToggle = (menuName: string): void => {
    setActiveMegaMenu(activeMegaMenu === menuName ? null : menuName);
  };

  return (
    <header className={styles.header}>
      {/* Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <a href="/find-church" className={styles.topBarLink}>
              Address: 81 Calabar Rd, Calabar, Cross River State
            </a>
            <span>/</span>
            <a href="/vacancies" className={styles.topBarLink}>
              info@dioceseofcalabar.org
            </a>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <a href="/give" className={styles.giveButton}>
              GIVE
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.navLogo}>
            <a href="/">
              <img src={Images.logoCalabar} alt="Diocese of Calabar" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul
            className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
          >
            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setActiveMegaMenu("about")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <a href="#" className={styles.navLink}>
                ABOUT US
                <svg
                  className={styles.dropdownIcon}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="currentColor"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              <div
                className={`${styles.megaMenu} ${
                  activeMegaMenu === "about" ? styles.show : ""
                }`}
              >
                <div className={styles.megaMenuGrid}>
                  <div className={styles.megaMenuColumn}>
                    <h4>THE DIOCESE</h4>
                    <ul>
                      <li>
                        <a href="/mission-vision">Our Mission And Vision</a>
                      </li>
                      <li>
                        <a href="/beliefs">Our Beliefs</a>
                      </li>
                      <li>
                        <a href="/history">History</a>
                      </li>
                      <li>
                        <a href="/bishop">The Bishop of Calabar</a>
                      </li>
                      <li>
                        <a href="/past-bishops">Past Bishops of Calabar</a>
                      </li>
                      <li>
                        <a href="/diocesan-officials">Diocesan Officials</a>
                      </li>
                      <li>
                        <a href="/synod-office">Synod Office</a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>CHURCHES</h4>
                    <ul>
                      <li>
                        <a href="/cathedral">The Cathedral</a>
                      </li>
                      <li>
                        <a href="/archdeaconries">
                          Our Archdeaconries / Deaneries
                        </a>
                      </li>
                      <li>
                        <a href="/schools">Our Schools</a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>DIRECTORATE </h4>
                    <ul>
                      <li>
                        <a href="/find-church">Find A Church</a>
                      </li>
                      <li>
                        <a href="/clergy-directory">Clergy Directory</a>
                      </li>
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={styles.megaMenuColumn}
                    style={{ borderRight: "none" }}
                  >
                    <h4>MINISTRIES / ORGANISATIONS </h4>
                    <ul>
                      <li>
                        <a href="/directorates">Directorates</a>
                      </li>
                      <li>
                        <a href="/womens-girls">
                          Women's & Girls Organisations
                        </a>
                      </li>
                      <li>
                        <a href="/children">Children</a>
                      </li>
                      <li>
                        <a href="/young-people">Young People</a>
                      </li>
                      <li>
                        <a href="/elders">Elders</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setActiveMegaMenu("resources")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <a href="#" className={styles.navLink}>
                RESOURCES
                <svg
                  className={styles.dropdownIcon}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="currentColor"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              <div
                className={`${styles.megaMenu} ${
                  activeMegaMenu === "resources" ? styles.show : ""
                }`}
              >
                <div className={styles.megaMenuGrid}>
                  <div className={styles.megaMenuColumn}>
                    <h4>MEDIA</h4>
                    <ul>
                      <li>
                        <a href="/video">Bishop's New month message</a>
                      </li>
                      <li>
                        <a href="/video">Video</a>
                      </li>
                      <li>
                        <a href="/podcast">Podcast</a>
                      </li>
                      <li>
                        <a href="/lagoon-radio">Radio</a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>STORE & DOWNLOADS</h4>
                    <ul>
                      <li>
                        <a href="/store">Our Store</a>
                      </li>
                      <li>
                        <a href="/downloads">Our Downloads Hub</a>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>LIBRARY</h4>
                    <ul>
                      <li>
                        <a href="/diocesan-reports">Diocesan Reports</a>
                      </li>
                      <li>
                        <a href="/policies">Policies and Procedures</a>
                      </li>
                      <li>
                        <a href="/catechism">Catechism</a>
                      </li>
                      <li>
                        <a href="/creeds">Collection of Creeds</a>
                      </li>
                      <li>
                        <a href="/39-articles">39 Articles of Religion</a>
                      </li>
                      <li>
                        <a href="/gafcon">GAFCON Statements</a>
                      </li>
                      <li>
                        <a href="/others-library">Others</a>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={styles.megaMenuColumn}
                    style={{ borderRight: "none" }}
                  >
                    <h4>OTHERS</h4>
                    <ul>
                      <li>
                        <a href="/forms">Forms and Applications</a>
                      </li>
                      <li>
                        <a href="/vacancies">Vacancies</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li
              className={`${styles.navItem} ${styles.dropdown}`}
              onMouseEnter={() => setActiveMegaMenu("news")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <a href="#" className={styles.navLink}>
                NEWS & EVENTS
                <svg
                  className={styles.dropdownIcon}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="currentColor"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </a>
              <div
                className={`${styles.simpleDropdown} ${
                  activeMegaMenu === "news" ? styles.show : ""
                }`}
              >
                <ul>
                  <li>
                    <a href="/news">News</a>
                  </li>
                  <li>
                    <a href="/events">Events</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className={styles.navToggle} onClick={toggleMenu}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
