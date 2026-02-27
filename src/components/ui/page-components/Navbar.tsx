import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { Images } from "../../Assets/assets";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    // Close any open mega menu when toggling main menu
    if (!isMenuOpen) {
      setActiveMegaMenu(null);
    }
  };

  const handleMegaMenuToggle = (menuName: string): void => {
    setActiveMegaMenu(activeMegaMenu === menuName ? null : menuName);
  };

  const closeAllMenus = (): void => {
    setIsMenuOpen(false);
    setActiveMegaMenu(null);
  };

  // New function to handle link clicks and immediately close menus
  const handleLinkClick = (): void => {
    closeAllMenus();
  };

  return (
    <header className={styles.header}>
      {/* Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <Link to="/find-church" className={styles.topBarLink}>
              Address: 81 Calabar Rd, Calabar, Cross River State
            </Link>
            <span>/</span>
            <Link to="/vacancies" className={styles.topBarLink}>
              info@dioceseofcalabar.org
            </Link>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.socialIcons}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialIcon} 
                aria-label="Facebook"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialIcon} 
                aria-label="Twitter"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
            <Link to="/give" className={styles.giveButton}>
              GIVE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.navLogo}>
            <a href="/" onClick={handleLinkClick}>
              <img src={Images.logoCalabar} alt="Diocese of Calabar" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <ul
            className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
          >
            <li className={`${styles.navItem} ${styles.dropdown}`}>
              <Link
                to="#"
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleMegaMenuToggle("about");
                }}
              >
                ABOUT US
                <svg
                  className={`${styles.dropdownIcon} ${
                    activeMegaMenu === "about" ? styles.rotated : ""
                  }`}
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
              </Link>
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
                        <Link to="/about-us/" onClick={handleLinkClick}>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/bishop-of-calabar/"
                          onClick={handleLinkClick}
                        >
                          The Bishop of Calabar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/diocesan-officials/"
                          onClick={handleLinkClick}
                        >
                          Diocesan Officials
                        </Link>
                      </li>
                      <li>
                        <Link to="/synod-office" onClick={handleLinkClick}>
                          Synod Office
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>CHURCHES</h4>
                    <ul>
                      <li>
                        <Link to="/archdeaconries" onClick={handleLinkClick}>
                          Our Archdeaconries / Deaneries
                        </Link>
                      </li>
                      <li>
                        <Link to="/schools" onClick={handleLinkClick}>
                          Our Schools
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>DIRECTORATE </h4>
                    <ul>
                      <li>
                        <Link to="/find-church" onClick={handleLinkClick}>
                          Find A Church
                        </Link>
                      </li>
                      <li>
                        <Link to="/clergy-directory" onClick={handleLinkClick}>
                          Clergy Directory
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={handleLinkClick}>
                          Contact Us
                        </Link>
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
                        <Link to="/directorates" onClick={handleLinkClick}>
                          Directorates
                        </Link>
                      </li>
                      <li>
                        <Link to="/womens-girls" onClick={handleLinkClick}>
                          Women's & Girls Organisations
                        </Link>
                      </li>
                      <li>
                        <Link to="/children" onClick={handleLinkClick}>
                          Children
                        </Link>
                      </li>
                      <li>
                        <Link to="/young-people" onClick={handleLinkClick}>
                          Young People
                        </Link>
                      </li>
                      <li>
                        <Link to="/elders" onClick={handleLinkClick}>
                          Elders
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className={`${styles.navItem} ${styles.dropdown}`}>
              <Link
                to="#"
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleMegaMenuToggle("resources");
                }}
              >
                RESOURCES
                <svg
                  className={`${styles.dropdownIcon} ${
                    activeMegaMenu === "resources" ? styles.rotated : ""
                  }`}
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
              </Link>
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
                        <Link to="/video" onClick={handleLinkClick}>
                          Bishop's New month message
                        </Link>
                      </li>
                      <li>
                        <Link to="/video" onClick={handleLinkClick}>
                          Video
                        </Link>
                      </li>
                      <li>
                        <Link to="/podcast" onClick={handleLinkClick}>
                          Podcast
                        </Link>
                      </li>
                      <li>
                        <Link to="/lagoon-radio" onClick={handleLinkClick}>
                          Radio
                        </Link>
                      </li>
                      <li>
                        <Link to="/lagoon-tv" onClick={handleLinkClick}>
                          LagoonTV
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>STORE & DOWNLOADS</h4>
                    <ul>
                      <li>
                        <Link to="/store" onClick={handleLinkClick}>
                          Our Store
                        </Link>
                      </li>
                      <li>
                        <Link to="/downloads" onClick={handleLinkClick}>
                          Our Downloads Hub
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className={styles.megaMenuColumn}>
                    <h4>LIBRARY</h4>
                    <ul>
                      <li>
                        <Link to="/diocesan-reports" onClick={handleLinkClick}>
                          Diocesan Reports
                        </Link>
                      </li>
                      <li>
                        <Link to="/policies" onClick={handleLinkClick}>
                          Policies and Procedures
                        </Link>
                      </li>
                      <li>
                        <Link to="/catechism" onClick={handleLinkClick}>
                          Catechism
                        </Link>
                      </li>
                      <li>
                        <Link to="/creeds" onClick={handleLinkClick}>
                          Collection of Creeds
                        </Link>
                      </li>
                      <li>
                        <Link to="/39-articles" onClick={handleLinkClick}>
                          39 Articles of Religion
                        </Link>
                      </li>
                      <li>
                        <Link to="/gafcon" onClick={handleLinkClick}>
                          GAFCON Statements
                        </Link>
                      </li>
                      <li>
                        <Link to="/others-library" onClick={handleLinkClick}>
                          Others
                        </Link>
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
                        <Link to="/forms" onClick={handleLinkClick}>
                          Forms and Applications
                        </Link>
                      </li>
                      <li>
                        <Link to="/vacancies" onClick={handleLinkClick}>
                          Vacancies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className={`${styles.navItem} ${styles.dropdown}`}>
              <Link
                to="#"
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleMegaMenuToggle("news");
                }}
              >
                NEWS & EVENTS
                <svg
                  className={`${styles.dropdownIcon} ${
                    activeMegaMenu === "news" ? styles.rotated : ""
                  }`}
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
              </Link>
              <div
                className={`${styles.simpleDropdown} ${
                  activeMegaMenu === "news" ? styles.show : ""
                }`}
              >
                <ul>
                  <li>
                    <Link to="/news" onClick={handleLinkClick}>
                      News
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" onClick={handleLinkClick}>
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div
            className={`${styles.navToggle} ${isMenuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
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