"use client";

import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { AIChatButton } from "./WhatsAppButton.jsx";
import styles from "../../styles/App.module.scss";

export function SiteShell({ children, data }) {
  return <div className={styles.appShell}><Header activePath="" config={data.config} social={data.social || []} />{children}<Footer config={data.config} social={data.social || []} /><AIChatButton /></div>;
}
