import { routes, socialLinks } from "../../utils/content";
import { FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Reveal, revealDelay } from "../common/Reveal.jsx";
import styles from "./Layout.module.scss";

function SocialIcon({ name }) {
  const value = String(name || "").toLowerCase();
  if (value.includes("facebook")) return <FaFacebookF />;
  if (value.includes("instagram")) return <FaInstagram />;
  if (value.includes("youtube")) return <FaYoutube />;
  if (value.includes("linkedin")) return <FaLinkedinIn />;
  return <FaGlobe />;
}

export function Footer({ config, social }) {
  const schoolName = config?.school_name || "Nexus International School";
  const slogan = "Bringing World Class Education";
  const footerSocial = socialLinks(social).slice(0, 4);
  const footerGroups = [
    ["Explore", routes.slice(0, 4)],
    ["Nexus", routes.slice(4, 8)]
  ];

  return (
    <footer className={styles.footer}>
      <section className={styles.footerCta}>
        <Reveal direction="up" distance={54}>
          <h2>Bringing World Class <strong>Education</strong></h2>
          <div>
            <a href="/contact" data-link>Contact us</a>
            <a href="/admissions" data-link>Apply now</a>
          </div>
        </Reveal>
      </section>
      <div className={styles.footerGrid}>
        <Reveal as="section" direction="left" kind="soft">
          <img src="/site-images/Logo Nexus.png" alt={`${schoolName} logo`} />
          <h2>{schoolName}</h2>
          <p>{slogan}</p>
          <p>{config?.address || "Pepsicola Townplanning-32, Kathmandu"}</p>
          <div className={styles.socialIcons}>
            {footerSocial.map((item) => (
              <a href={item.url} key={item.url} rel="noreferrer" target="_blank" aria-label={item.platform_name || item.platform || "Social"}>
                <SocialIcon name={item.platform_name || item.platform} />
              </a>
            ))}
          </div>
        </Reveal>
        {footerGroups.map(([title, links], index) => (
          <Reveal as="section" delay={revealDelay(index, 0.08)} direction={index ? "right" : "up"} key={title} kind="soft">
            <h3>{title}</h3>
            {links.map(([label, href]) => <a href={href} data-link key={href}>{label}</a>)}
          </Reveal>
        ))}
        <Reveal as="section" delay={0.18} direction="right" kind="soft">
          <h3>Contact</h3>
          <a href={`tel:${config?.contact_phone?.[0] || "01-4990303"}`}>{config?.contact_phone?.[0] || "01-4990303"}</a>
          <a href={`mailto:${config?.contact_email || "nexusworldeducation@gmail.com"}`}>{config?.contact_email || "nexusworldeducation@gmail.com"}</a>
          <a className={styles.footerButton} href="/contact" data-link>Get in touch</a>
        </Reveal>
      </div>
      <div className={styles.footerBottom}>© Copyright {schoolName}. All rights reserved</div>
    </footer>
  );
}
