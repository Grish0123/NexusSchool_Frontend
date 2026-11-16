"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaTimes, FaYoutube } from "react-icons/fa";
import { routes, socialLinks } from "../../utils/content";
import { ResponsiveImage } from "../common/ResponsiveImage.jsx";
import styles from "./Layout.module.scss";

function SocialIcon({ name }) {
  const value = String(name || "").toLowerCase();
  if (value.includes("facebook")) return <FaFacebookF />;
  if (value.includes("instagram")) return <FaInstagram />;
  if (value.includes("youtube")) return <FaYoutube />;
  if (value.includes("linkedin")) return <FaLinkedinIn />;
  return <FaGlobe />;
}

export function Header({ activePath, config, social }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRoutes = routes.filter(([, href]) => href !== "/");
  const menuSocial = socialLinks([
    ...social,
    { platform_name: "YouTube", url: "https://www.youtube.com/@nexusinternationalacademy4360" },
  ]).slice(0, 5);
  const slogan = "संस्कार सहितको शिक्षा";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <a className={styles.brand} href="/" data-link>
          <ResponsiveImage src="/site-images/Logo Nexus.png" alt="Nexus logo" width={72} height={72} sizes="72px" />
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
        <div className={styles.navMenu}>
          {navRoutes.map(([label, href]) => (
            <a
              className={(pathname || activePath) === href ? styles.active : ""}
              href={href}
              data-link
              key={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <div className={styles.sideMenuSocial}>
          {menuSocial.map((item) => (
            <a
              href={item.url}
              key={item.url}
              rel="noreferrer"
              target="_blank"
              aria-label={`Visit Nexus International Academy on ${item.platform_name || item.platform || "social media"} (opens in a new tab)`}
            >
              <SocialIcon name={item.platform_name || item.platform} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
