import { useState } from "react";
import { FaBars, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaTimes } from "react-icons/fa";
import { routes, socialLinks } from "../../utils/content";
import styles from "./Layout.module.scss";

function SocialIcon({ name }) {
  const value = String(name || "").toLowerCase();
  if (value.includes("facebook")) return <FaFacebookF />;
  if (value.includes("instagram")) return <FaInstagram />;
  if (value.includes("linkedin")) return <FaLinkedinIn />;
  return <FaGlobe />;
}

export function Header({ activePath, config, social }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRoutes = routes.filter(([, href]) => href !== "/");
  const menuSocial = socialLinks(social).slice(0, 4);
  const slogan = "संस्कार सहितको शिक्षा";

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <a className={styles.brand} href="/" data-link>
          <img src="/site-images/Logo Nexus.png" alt="Nexus logo" />
          <span>
            <strong>{config?.school_name || "Nexus International School"}</strong>
            <small>{slogan}</small>
          </span>
        </a>
        <div className={styles.headerActions}>
          <a className={styles.applyButton} href="/admissions" data-link>Apply Now</a>
          <button
            className={styles.navToggle}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
        id="site-navigation"
      >
        {navRoutes.map(([label, href]) => (
          <a
            className={activePath === href ? styles.active : ""}
            href={href}
            data-link
            key={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <div className={styles.sideMenuSocial}>
          {menuSocial.map((item) => (
            <a
              href={item.url}
              key={item.url}
              rel="noreferrer"
              target="_blank"
              aria-label={item.platform_name || item.platform || "Social"}
            >
              <SocialIcon name={item.platform_name || item.platform} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
